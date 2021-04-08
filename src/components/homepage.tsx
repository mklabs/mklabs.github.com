/** @jsx jsx */
import { jsx, Flex, Heading, Container } from "theme-ui"
import { animated, useSpring, useTrail, config } from "react-spring"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "@lekoarts/gatsby-theme-emma/src/components/layout"
import { ChildImageSharp } from "@lekoarts/gatsby-theme-emma/src/types"
import Hero from "@lekoarts/gatsby-theme-emma/src/components/hero"
import Projects from "./projects"


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
    [key: string]: any
}

const Homepage = (props: ProjectsProps) => {
    const { projects, data: { page } } = props

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
                    <Heading as="h1" variant="styles.h1" sx={{ textAlign: 'center', position: 'absolute', top: '-100px' }}>
                        Hi, I'm Mickael.
                    </Heading>
                </animated.div>
                <animated.div style={contentProps}>
                    <MDXRenderer>{page.body}</MDXRenderer>
                </animated.div>
            </Container>

            <Projects projects={projects}/>
        </Layout >
    )
}

export default Homepage