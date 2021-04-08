/** @jsx jsx */
import { jsx, Container, Styled } from "theme-ui"
import { useTrail } from "react-spring"
import Layout from "@lekoarts/gatsby-theme-emma/src/components/layout"
import { ChildImageSharp } from "@lekoarts/gatsby-theme-emma/src/types"
import Projects from "./projects"

type ProjectsProps = {
    projects: {
        color: string
        slug: string
        title: string
        service: string
        client: string
        category: string
        cover: ChildImageSharp
    }[]
    [key: string]: any
}

const ProjectsPage = ({ projects }: ProjectsProps) => {
    return (
        <Layout
            sx={{
            }}
        >
            <Projects projects={projects}/>
        </Layout>
    )
}

export default ProjectsPage