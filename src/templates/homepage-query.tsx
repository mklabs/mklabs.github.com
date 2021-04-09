import { graphql } from "gatsby"
import React from "react"
import Homepage from "../components/homepage"

type Props = {
        data: {
                allProject: any
                allPost: any
                [key: string]: string
        }
        [key: string]: any
}

export default function EmmaCoreProjects({ ...props }: Props) {
        const {
                data: { allProject, allPost },
        } = props

        return <Homepage projects={allProject.nodes} posts={allPost.nodes} {...props} />
}

export const query = graphql`
    query($formatString: String!) {
        allProject: allPortfolioProject(sort: { fields: date, order: DESC }) {
            nodes {
                color
                slug
                service
                client
                title
                category
                cover {
                    childImageSharp {
                        fluid(maxWidth: 850, quality: 90, traceSVG: { color: "#e6e6e6" }) {
                            ...GatsbyImageSharpFluid_withWebp_tracedSVG
                        }
                    }
                }
            }
        }

        allPost(sort: { fields: date, order: DESC }, limit: 3) {
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

        page(slug: { eq: "/about" }) {
                title
                slug
                excerpt
                body
                cover {
                    childImageSharp {
                        fluid(maxWidth: 1920, quality: 90) {
                            ...GatsbyImageSharpFluid_withWebp
                        }
                    }
                }
        }
    }
`