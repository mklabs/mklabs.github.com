import { graphql } from "gatsby"
import ProjectsComponent from "../components/projects-page"

export default function EmmaCoreProjects({ ...props }: Props) {
    const {
            data: { allProject },
    } = props

    console.log(props)

    return <ProjectsComponent projects={allProject.nodes} {...props} />
}

export const query = graphql`
  query {
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
  }
`