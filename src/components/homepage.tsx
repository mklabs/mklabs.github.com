/** @jsx jsx */
import { jsx, Flex, Heading, Container } from "theme-ui"
import { Link } from "gatsby"
import { animated, useSpring, useTrail, config } from "react-spring"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "@lekoarts/gatsby-theme-emma/src/components/layout"
import { ChildImageSharp } from "@lekoarts/gatsby-theme-emma/src/types"
import Hero from "@lekoarts/gatsby-theme-emma/src/components/hero"
import SEO from "@lekoarts/gatsby-theme-emma/src/components/seo"
import Projects from "./projects"
import Listing from "./listing"
import Title from "./title"
import useMinimalBlogConfig from "../hooks/use-minimal-blog-config"
import replaceSlashes from "../utils/replaceSlashes"

type ProjectsProps = {
    projects: {
        color: string
        slug: string
        title: string
        service: string
        client: string
        cover: ChildImageSharp
        category: string
    }[]

    posts: {
        slug: string
        title: string
        date: string
        excerpt: string
        description: string
        timeToRead?: number
        tags?: {
            name: string
            slug: string
        }[]
    }[]

    [key: string]: any
}

const Homepage = (props: ProjectsProps) => {
    const { projects, posts, data: { page } } = props

    const { basePath, blogPath } = useMinimalBlogConfig()

    const trail = useTrail(projects.length, {
        from: { height: `0%` },
        to: { height: `100%` },
    })

    const titleProps = useSpring({
        config: config.slow,
        from: { opacity: 0, transform: `translate3d(0, -30px, 0)` },
        to: { opacity: 1, transform: `translate3d(0, 0, 0)` },
    })

    const contentProps = useSpring({ config: config.slow, delay: 1000, from: { opacity: 0 }, to: { opacity: 1 } })

    return (
        <Layout
            sx={{
                width: `100%`,
            }}
        >
            <SEO title="Home" />

            <Hero image={page.cover.childImageSharp.fluid} slim>
                <Flex
                    sx={{
                        position: `absolute`,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        maxWidth: `5xl`,
                        margin: `0 auto`,
                        height: '800px',
                        padding: 4,
                        zIndex: 2,
                        flexDirection: `column`,
                    }}
                >
                </Flex>
            </Hero>


            <Container>
                <animated.div style={titleProps}>
                    <Heading as="h1" variant="page.heading" sx={{ textAlign: 'center', position: 'absolute', top: '-100px' }}>
                        Hi, I'm Mickael.
                    </Heading>
                </animated.div>
                <animated.div style={contentProps}>
                    <MDXRenderer>{page.body}</MDXRenderer>
                </animated.div>
            </Container>

            <Projects projects={projects} />

            <Container>
                <Title text="Latest Posts">
                    <Link 
                        to={replaceSlashes(`/${basePath}/${blogPath}`)}
                    >
                        Read all posts
                    </Link>
                </Title>

                {/* <Heading as="h2" variant="styles.h2" sx={{ textAlign: 'center' }}>
                    Latest Posts
                </Heading> */}

                <div data-testid="projects-categories" sx={{ mt: 4, pb: '2rem', a: { mx: 2 }, textAlign: 'center' }}>
                    {/* <Link 
                        sx={{ color: 'primary', textDecoration: 'none' }}
                        to={replaceSlashes(`/${basePath}/${blogPath}`)}
                    >
                        Read all posts
                    </Link> */}

                    {/* {categories.map((category) => (
                        <Link
                            key={category.id}
                            aria-label={category.label}
                            title={category.label}
                            href={category.href}
                            onClick={(e) => onCategoryClick(e, category.id)}
                            sx={{ 
                                color: "primary",
                                fontWeight: category.id === selected ? 700 : "normal"
                            }}
                        >
                            {category.content}
                        </Link>
                    ))} */}
                </div>

                <Listing posts={posts} showTags={false} />
            </Container>

        </Layout >
    )
}

export default Homepage