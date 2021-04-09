/** @jsx jsx */
import React from "react"
import { jsx, Link as TLink } from "theme-ui"
import { Box } from "@theme-ui/components"
import { Link } from "gatsby"
import ItemTags from "./item-tags"
import useMinimalBlogConfig from "../hooks/use-minimal-blog-config"
import replaceSlashes from "../utils/replaceSlashes"

type BlogListItemProps = {
    post: {
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
    }
    showTags?: boolean
}

const BlogListItem = ({ post, showTags = true }: BlogListItemProps) => {

  const { postsPrefix, basePath } = useMinimalBlogConfig()


    return (
        <Box mb={4}>
            <TLink as={Link} to={replaceSlashes(`/${basePath}/${postsPrefix}/${post.slug}`)} sx={{ fontSize: [1, 2, 3], color: `text` }}>
                {post.title}
            </TLink>
            <p sx={{ color: `textMuted`, mt: 1, a: { color: `primary` }, fontSize: [1, 1, 2] }}>
                <time>{post.date}</time>
                {post.tags && showTags && (
                    <React.Fragment>
                        {` — `}
                        <ItemTags tags={post.tags} />
                    </React.Fragment>
                )}
            </p>
        </Box>
    )
}

export default BlogListItem
