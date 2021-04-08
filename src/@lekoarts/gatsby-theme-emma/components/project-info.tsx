/** @jsx jsx */
import { Flex, jsx } from "theme-ui"
import Item from "@lekoarts/gatsby-theme-emma/src/components/project-info-item"

import ItemLink from "../../../components/project-info-item-link"


type ProjectInfoProps = {
    project: {
        client: string
        date: string
        service: string
        engine: string
        link: string
        linkDescription: string
        game: string
    }
}

// const fieldData = {
//         slug: node.frontmatter.slug ? node.frontmatter.slug : undefined,
//         title: node.frontmatter.title,
//         client: node.frontmatter.client,
//         cover: node.frontmatter.cover,
//         date: node.frontmatter.date,
//         service: node.frontmatter.service,
//         color: node.frontmatter.color,
//         category: node.frontmatter.category ? node.frontmatter.category : undefined
//     }

const ProjectInfo = ({ project }: ProjectInfoProps) => (
    <Flex sx={{ mt: 4, mb: [2, 4], flexWrap: `wrap` }}>
        {console.log(project)}
        { project.engine ? <Item name="Engine" content={project.engine} /> : "" }
        { project.game ? <Item name="game" content={project.game} /> : "" }


        <Item name="Category" content={project.service} />
        <Item name="Date" content={project.date} />

        { project.link ? <ItemLink name="Link" href={project.link} content={project.linkDescription} /> : "" }


    </Flex>
)

export default ProjectInfo