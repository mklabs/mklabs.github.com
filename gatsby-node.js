const kebabCase = require(`lodash.kebabcase`)
const withDefaults = require(`@lekoarts/gatsby-theme-emma-core/utils/default-options`)

// These template are only data-fetching wrappers that import components
// const pageTemplate = require.resolve(`@lekoarts/gatsby-theme-emma-core/src/templates/page-query.tsx`)

const homepageTemplate = require.resolve(`./src/templates/homepage-query.tsx`)
const projectsTemplate = require.resolve(`./src/templates/projects-query.tsx`)
const projectTemplate = require.resolve(`./src/templates/project-query.tsx`)


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
  `)
}

exports.onCreateNode = ({ node, actions, getNode, createNodeId, createContentDigest }, themeOptions) => {
  const { createNode, createParentChildLink } = actions;

  const { projectsPath } = withDefaults(themeOptions)

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

    console.log("create node", node.id, node.frontmatter)

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
};

exports.createPages = async ({ actions, graphql, reporter }, themeOptions) => {
  const { createPage } = actions

  const { basePath, formatString } = withDefaults(themeOptions)

  createPage({
    path: basePath,
    component: homepageTemplate,
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
      path: project.slug,
      component: projectTemplate,
      context: {
        slug: project.slug,
        formatString,
      },
    })
  })

}