/** @jsx jsx */
import React from "react"
import { jsx, Heading, Container, Link as TLink } from "theme-ui"
import { Link } from "gatsby"
import Layout from "@lekoarts/gatsby-theme-emma/src/components/layout"
import SEO from "@lekoarts/gatsby-theme-emma/src/components/seo"
import Listing from "./listing"
import useMinimalBlogConfig from "../hooks/use-minimal-blog-config"
import replaceSlashes from "../utils/replaceSlashes"

type Props = {
    data: {
        allPost: any
        [key: string]: string
    }
    [key: string]: any
}

export default function MinimalBlogCoreBlog({ ...props }: Props) {
    const {
        data: { allPost },
    } = props

    const posts = allPost.nodes

    const { tagsPath, basePath } = useMinimalBlogConfig()

    return (
        <Layout>
            <SEO title="Blog" />

            <Container>
                <Heading as="h1" variant="styles.h1" sx={{ marginY: 2 }}>
                    Blog
                </Heading>
                <TLink
                    as={Link}
                    sx={{ variant: `links.primary`, marginY: 2 }}
                    to={replaceSlashes(`/${basePath}/${tagsPath}`)}
                >
                    View all tags
                </TLink>

                <Listing posts={posts} sx={{ mt: [4, 5] }} />
            </Container>

        </Layout>
    )
}
