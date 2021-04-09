/** @jsx jsx */
import { jsx, Link as TLink, Heading, Container } from "theme-ui"
import { Box, Flex } from "@theme-ui/components"
import kebabCase from "lodash.kebabcase"
import { Link } from "gatsby"
import Layout from "@lekoarts/gatsby-theme-emma/src/components/layout"
import SEO from "@lekoarts/gatsby-theme-emma/src/components/seo"
import useMinimalBlogConfig from "../hooks/use-minimal-blog-config"
import replaceSlashes from "../utils/replaceSlashes"

type PostsProps = {
    list: {
        fieldValue: string
        totalCount: number
    }[]
}

type Props = {
  data: {
    allPost: {
      group: {
        fieldValue: string
        totalCount: number
      }[]
    }
  }
  [key: string]: any
}

const Tags = ({ data }: Props) => {
    const { allPost: { group: list } } = data

    const { tagsPath, basePath } = useMinimalBlogConfig()

    return (
        <Layout>
            <SEO title="Tags" />
            <Container>
                <Heading as="h1" variant="styles.h1">
                    Tags
                </Heading>
                <Box mt={[4, 5]}>
                    {list.map((listItem) => (
                        <Flex key={listItem.fieldValue} mb={[1, 1, 2]} sx={{ alignItems: `center` }}>
                            <TLink
                                as={Link}
                                sx={{ variant: `links.listItem`, mr: 2 }}
                                to={replaceSlashes(`/${basePath}/${tagsPath}/${kebabCase(listItem.fieldValue)}`)}
                            >
                                {listItem.fieldValue} <span sx={{ color: `textMuted` }}>({listItem.totalCount})</span>
                            </TLink>
                        </Flex>
                    ))}
                </Box>
            </Container>
        </Layout>
    )
}

export default Tags
