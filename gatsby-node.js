const kebabCase = require(`lodash.kebabcase`)
const withDefaults = require(`./utils/default-options`)

// These template are only data-fetching wrappers that import components
const homepageTemplate = require.resolve(`./src/templates/homepage-query.tsx`)
const projectsTemplate = require.resolve(`./src/templates/projects-query.tsx`)
const projectTemplate = require.resolve(`./src/templates/project-query.tsx`)
const blogTemplate = require.resolve(`./src/templates/blog-query.tsx`)
const postTemplate = require.resolve(`./src/templates/post-query.tsx`)
const tagTemplate = require.resolve(`./src/templates/tag-query.tsx`)
const tagsTemplate = require.resolve(`./src/templates/tags-query.tsx`)


// Re create project interface to add our custom frontmatter fields
exports.createSchemaCustomization = ({ actions, schema }, themeOptions) => {
  const { createTypes } = actions

  createTypes(`
    interface PortfolioProject @nodeInterface {
      id: ID!
      slug: String! @slugify
      title: String!
      client: String!
      service: String!
      color: String!
      date: Date! @dateformat
      cover: File! @fileByRelativePath
      excerpt(pruneLength: Int = 160): String!
      body: String!
      category: String
    }

    interface Post @nodeInterface {
      id: ID!
      slug: String! @slugify
      title: String!
      date: Date! @dateformat
      excerpt(pruneLength: Int = 160): String!
      body: String!
      html: String
      timeToRead: Int
      tags: [PostTag]
      banner: File @fileByRelativePath
      description: String
      canonicalUrl: String
    }

    type PostTag {
      name: String
      slug: String
    }

    type MdxPost implements Node & Post {
      slug: String! @slugify
      title: String!
      date: Date! @dateformat
      excerpt(pruneLength: Int = 140): String! @mdxpassthrough(fieldName: "excerpt")
      body: String! @mdxpassthrough(fieldName: "body")
      html: String! @mdxpassthrough(fieldName: "html")
      timeToRead: Int @mdxpassthrough(fieldName: "timeToRead")
      tags: [PostTag]
      banner: File @fileByRelativePath
      description: String
      canonicalUrl: String
    }

    type MdxPortfolioProject implements Node & PortfolioProject {
      title: String!
      slug: String! @slugify
      client: String!
      service: String!
      color: String!
      date: Date! @dateformat
      cover: File! @fileByRelativePath
      excerpt(pruneLength: Int = 140): String! @mdxpassthrough(fieldName: "excerpt")
      body: String! @mdxpassthrough(fieldName: "body")
      category: String
    }

    type MinimalBlogConfig implements Node {
      basePath: String
      blogPath: String
      postsPath: String
      postsPrefix: String
      pagesPath: String
      tagsPath: String
      externalLinks: [ExternalLink]
      navigation: [NavigationEntry]
      showLineNumbers: Boolean
      showCopyButton: Boolean
      formatString: String
      projectsPath: String 
      projectsPrefix: String
    }

    type ExternalLink {
      name: String!
      url: String!
    }

    type NavigationEntry {
      title: String!
      slug: String!
    }
  `)
}

exports.sourceNodes = ({ actions, createContentDigest }, themeOptions) => {
  const { createNode } = actions
  const {
    basePath,
    blogPath,
    postsPath,
    postsPrefix,
    pagesPath,
    tagsPath,
    externalLinks,
    navigation,
    showLineNumbers,
    showCopyButton,
    formatString,
    projectsPath,
    projectsPrefix
  } = withDefaults(themeOptions)

  const minimalBlogConfig = {
    basePath,
    blogPath,
    postsPath,
    postsPrefix,
    pagesPath,
    tagsPath,
    externalLinks,
    navigation,
    showLineNumbers,
    showCopyButton,
    formatString,
    projectsPath,
    projectsPrefix
  }

  console.log("source nodes minimalBlogConfig", minimalBlogConfig)

  createNode({
    ...minimalBlogConfig,
    id: `@lekoarts/gatsby-theme-minimal-blog-core-config`,
    parent: null,
    children: [],
    internal: {
      type: `MinimalBlogConfig`,
      contentDigest: createContentDigest(minimalBlogConfig),
      content: JSON.stringify(minimalBlogConfig),
      description: `Options for @lekoarts/gatsby-theme-minimal-blog-core`,
    },
  })
}

exports.onCreateNode = ({ node, actions, getNode, createNodeId, createContentDigest }, themeOptions) => {
  const { createNode, createParentChildLink } = actions;

  const { projectsPath, postsPath } = withDefaults(themeOptions)

  // Make sure that it's an MDX node
  if (node.internal.type !== `Mdx`) {
    return
  }

  // Create a source field
  // And grab the sourceInstanceName to differentiate the different sources
  // In this case "projectsPath" and "pagesPath"
  const fileNode = getNode(node.parent)
  const source = fileNode.sourceInstanceName

  // Check for "projects" and edit the "Project" type
  if (node.internal.type === `Mdx` && source === projectsPath) {

    const fieldData = {
      slug: node.frontmatter.slug ? node.frontmatter.slug : undefined,
      title: node.frontmatter.title,
      client: node.frontmatter.client,
      cover: node.frontmatter.cover,
      date: node.frontmatter.date,
      service: node.frontmatter.service,
      color: node.frontmatter.color,

      category: node.frontmatter.category ? node.frontmatter.category : "",
      engine: node.frontmatter.engine ? node.frontmatter.engine : "",
      game: node.frontmatter.game ? node.frontmatter.game : "",
      link: node.frontmatter.link ? node.frontmatter.link : "",
      linkDescription: node.frontmatter.linkDescription ? node.frontmatter.linkDescription : "Link",

      frontmatter: node.frontmatter
    }

    const mdxProjectId = createNodeId(`${node.id} >>> MdxPortfolioProject`)

    createNode({
      ...fieldData,
      // Required fields
      id: mdxProjectId,
      parent: node.id,
      children: [],
      internal: {
        type: `MdxPortfolioProject`,
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
        description: `Mdx implementation of the Portfolio Project interface`,
      },
    })

    createParentChildLink({ parent: node, child: getNode(mdxProjectId) })
  }

  // Check for "posts" and create the "Post" type
  if (node.internal.type === `Mdx` && source === postsPath) {
    let modifiedTags
    console.log("create node post", node.id)

    if (node.frontmatter.tags) {
      modifiedTags = node.frontmatter.tags.map((tag) => ({
        name: tag,
        slug: kebabCase(tag),
      }))
    } else {
      modifiedTags = null
    }

    const fieldData = {
      slug: node.frontmatter.slug ? node.frontmatter.slug : undefined,
      title: node.frontmatter.title,
      date: node.frontmatter.date,
      tags: modifiedTags,
      banner: node.frontmatter.banner,
      description: node.frontmatter.description,
      canonicalUrl: node.frontmatter.canonicalUrl,
    }

    const mdxPostId = createNodeId(`${node.id} >>> MdxPost`)

    createNode({
      ...fieldData,
      // Required fields
      id: mdxPostId,
      parent: node.id,
      children: [],
      internal: {
        type: `MdxPost`,
        contentDigest: createContentDigest(fieldData),
        content: JSON.stringify(fieldData),
        description: `Mdx implementation of the Post interface`,
      },
    })

    createParentChildLink({ parent: node, child: getNode(mdxPostId) })
  }
};

const createBlog = async ({ actions, graphql, reporter }, themeOptions) => {
  const { createPage } = actions
  const { basePath, blogPath, tagsPath, postsPrefix, formatString } = withDefaults(themeOptions)

  console.log("Create Blog", {
    basePath,
    blogPath,
    tagsPath,
    postsPrefix,
    formatString
  })

  createPage({
    path: `/${basePath}/${blogPath}`.replace(/\/\/+/g, `/`),
    component: blogTemplate,
    context: {
      formatString,
    },
  })

  createPage({
    path: `/${basePath}/${tagsPath}`.replace(/\/\/+/g, `/`),
    component: tagsTemplate,
  })

  const result = await graphql(`
    query {
      allPost(sort: { fields: date, order: DESC }) {
        nodes {
          slug
        }
      }
      allPage {
        nodes {
          slug
        }
      }
      tags: allPost(sort: { fields: tags___name, order: DESC }) {
        group(field: tags___name) {
          fieldValue
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`There was an error loading your posts or pages`, result.errors)
    return
  }

  const posts = result.data.allPost.nodes

  posts.forEach((post) => {
    createPage({
      path: `/${postsPrefix}${post.slug}`.replace(/\/\/+/g, `/`),
      component: postTemplate,
      context: {
        slug: post.slug,
        formatString,
      },
    })
  })

  const tags = result.data.tags.group

  if (tags.length > 0) {
    tags.forEach((tag) => {
      createPage({
        path: `/${basePath}/${tagsPath}/${kebabCase(tag.fieldValue)}`.replace(/\/\/+/g, `/`),
        component: tagTemplate,
        context: {
          slug: kebabCase(tag.fieldValue),
          name: tag.fieldValue,
          formatString,
        },
      })
    })
  }
}

const createProjects = async ({ actions, graphql, reporter }, themeOptions) => {
  const { createPage } = actions
  const { projectsPrefix, formatString } = withDefaults(themeOptions)

  console.log("Create projects", {
    formatString
  })

  createPage({
    path: '/portfolio',
    component: projectsTemplate,
  })

  const result = await graphql(`
    query {
      allProject(sort: { fields: date, order: DESC }) {
        nodes {
          slug
        }
      }
      allPage {
        nodes {
          slug
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`There was an error loading your projects or pages`, result.errors)
    return
  }


  const projects = result.data.allProject.nodes

  projects.forEach((project) => {
    createPage({
      path: `/${projectsPrefix}${project.slug}`.replace(/\/\/+/g, `/`),
      component: projectTemplate,
      context: {
        slug: project.slug,
        formatString,
      },
    })
  })
}

exports.createPages = async ({ actions, graphql, reporter }, themeOptions) => {
  const { createPage } = actions

  const { basePath, formatString } = withDefaults(themeOptions)

  console.log("themeOptions", {
    themeOptions,
    basePath,
    formatString
  })

  // Homepage

  createPage({
    path: basePath,
    component: homepageTemplate,
    context: {
      formatString,
    }
  })

  // Projects

  await createProjects({ actions, graphql, reporter }, themeOptions)

  // Blog

  await createBlog({ actions, graphql, reporter }, themeOptions)
}
