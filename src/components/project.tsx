/** @jsx jsx */
import { animated, useSpring, config } from "react-spring"
import { Container, jsx, Flex, Heading } from "theme-ui"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "../@lekoarts/gatsby-theme-emma/components/layout"
import SEO from "@lekoarts/gatsby-theme-emma/src/components/seo"
import { ChildImageSharp } from "@lekoarts/gatsby-theme-emma/src/types"
import Hero from "@lekoarts/gatsby-theme-emma/src/components/hero"
import ProjectInfo from "@lekoarts/gatsby-theme-emma/src/components/project-info"

type ProjectProps = {
    data: {
        mdxPortfolioProject: {
            body: string
            excerpt: string
            client: string
            color: string
            date: string
            service: string
            slug: string
            title: string
            cover: ChildImageSharp

            engine: string,
            link: string
        }
    }
    [key: string]: any
}

const Project = ({ data: { mdxPortfolioProject: project } }: ProjectProps) => {
    const titleProps = useSpring({
        config: config.slow,
        from: { opacity: 0, transform: `translate3d(0, -30px, 0)` },
        to: { opacity: 1, transform: `translate3d(0, 0, 0)` },
    })
    const infoProps = useSpring({ config: config.slow, delay: 500, from: { opacity: 0 }, to: { opacity: 1 } })
    const contentProps = useSpring({ config: config.slow, delay: 1000, from: { opacity: 0 }, to: { opacity: 1 } })

    const heroImage = project.banner ? project.banner : project.cover;

    return (
        <Layout>
            <SEO
                title={project.title}
                description={project.excerpt}
                pathname={project.slug}
                image={project.cover.childImageSharp.resize!.src}
            >
                {/* <meta name="twitter:label1" value="Client" /> */}
                <meta name="twitter:label2" value="Date" />
                {/* <meta name="twitter:data1" value={project.client} /> */}
                <meta name="twitter:data2" value={project.date} />
            </SEO>
            <Hero image={project.cover.childImageSharp.fluid} color={project.color}>
                <Flex
                    sx={{
                        position: `absolute`,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        maxWidth: `5xl`,
                        margin: `0 auto`,
                        padding: 4,
                        zIndex: 2,
                        flexDirection: `column`,
                    }}
                >
                    <animated.div style={titleProps}>
                        <Heading as="h1" variant="styles.h1">
                            {project.title}
                        </Heading>
                    </animated.div>
                    <animated.div style={infoProps}>
                        <ProjectInfo project={project} />
                    </animated.div>
                </Flex>
            </Hero>
            <Container>
                <animated.div style={contentProps}>
                    <MDXRenderer>{project.body}</MDXRenderer>
                </animated.div>
            </Container>
        </Layout>
    )
}

export default Project