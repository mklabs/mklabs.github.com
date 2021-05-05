/** @jsx jsx */
import { jsx, Heading, Container } from "theme-ui"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React, { useEffect } from 'react';
import Layout from "@lekoarts/gatsby-theme-emma/src/components/layout"
import SEO from "@lekoarts/gatsby-theme-emma/src/components/seo"
import ItemTags from "./item-tags"
import Comments from "./comments"

type PostProps = {
    data: {
        post: {
            slug: string
            title: string
            date: string
            tags?: {
                name: string
                slug: string
            }[]
            description?: string
            canonicalUrl?: string
            body: string
            excerpt: string
            timeToRead?: number
            banner?: {
                childImageSharp: {
                    resize: {
                        src: string
                    }
                }
            }
        }
    }
}

const px = [`32px`, `16px`, `8px`, `4px`]
const shadow = px.map((v) => `rgba(0, 0, 0, 0.15) 0px ${v} ${v} 0px`)

const Post = ({ data: { post } }: PostProps) => {
    const commentBox = React.createRef()



    useEffect(() => {
      const scriptEl = document.createElement('script')
      scriptEl.async = true
      scriptEl.src = 'https://utteranc.es/client.js'
      scriptEl.setAttribute('repo', 'mklabs/mklabs.github.com')
      scriptEl.setAttribute('issue-term', 'pathname')
      scriptEl.setAttribute('label', 'post-comments')
      scriptEl.setAttribute('id', 'utterances')
      scriptEl.setAttribute('theme', 'photon-dark')
      scriptEl.setAttribute('crossorigin', 'anonymous')

      if (commentBox && commentBox.current) {
        commentBox.current.appendChild(scriptEl)
      } else {
        console.log(`Error adding utterances comments on: ${commentBox}`)
      }
    }, [])


    return (
        <Layout>
            <SEO
                title={post.title}
                description={post.description ? post.description : post.excerpt}
                image={post.banner ? post.banner.childImageSharp.resize.src : undefined}
                pathname={post.slug}
                canonicalUrl={post.canonicalUrl}
            />
            <Container>
                <Heading as="h1" variant="styles.h2">
                    {post.title}
                </Heading>
                
                <p sx={{ color: `textMuted`, mt: 3, a: { color: `primary` }, fontSize: [1, 1, 2] }}>
                    <time>{post.date}</time>
                    {post.tags && (
                        <React.Fragment>
                            {` — `}
                            <ItemTags tags={post.tags} />
                        </React.Fragment>
                    )}
                    {post.timeToRead && ` — `}
                    {post.timeToRead && <span>{post.timeToRead} min read</span>}
                </p>
                <section
                    sx={{
                        my: 5,
                        ".gatsby-resp-image-wrapper": { my: [4, 4, 5], boxShadow: shadow.join(`, `) },
                        variant: `layout.content`,
                    }}
                >
                    <MDXRenderer>{post.body}</MDXRenderer>

                    <Comments commentBox={commentBox} />
                </section>
            </Container>
        </Layout>
    )
}

export default Post
