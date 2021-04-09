import { graphql } from "gatsby"
import TagComponent from "../components/tag"

type Props = {
  data: {
    allPost: any
    [key: string]: any
  }
  pageContext: {
    isCreatedByStatefulCreatePages: boolean
    slug: string
    name: string
    [key: string]: any
  }
  [key: string]: any
}

export default function TagComponentQuery({ ...props }: Props) {
  const {
          data: { allPost },
  } = props

  return <TagComponent posts={allPost.nodes} {...props} />
}

export const query = graphql`
  query($slug: String!, $formatString: String!) {
    allPost(sort: { fields: date, order: DESC }, filter: { tags: { elemMatch: { slug: { eq: $slug } } } }) {
      nodes {
        slug
        title
        date(formatString: $formatString)
        excerpt
        timeToRead
        description
        tags {
          name
          slug
        }
      }
    }
  }
`
