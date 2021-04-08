/** @jsx jsx */
import React, { useState } from "react"
import { ChildImageSharp } from "@lekoarts/gatsby-theme-emma/src/types"
import { useTrail } from "react-spring"
import { jsx, Heading, Container, Link } from "theme-ui"
import ProjectItem from "@lekoarts/gatsby-theme-emma/src/components/project-item"

const isBrowser = typeof window !== "undefined"

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

const categories = [{
    label: "All Categories",
    content: "All",
    href: "/portfolio#all",
    id: "all"
}, {
    label: "Game Development",
    content: "Game Development",
    href: "/portfolio#gamedev",
    id: "gamedev"
}, {
    label: "Modding",
    content: "Modding",
    href: "/portfolio#modding",
    id: "modding"
}, {
    label: "Open Source Software",
    content: "OSS",
    href: "/portfolio#oss",
    id: "oss"
}]

const Projects = ({ projects }: ProjectsProps) => {
    const hash = isBrowser ? location.hash.slice(1) : ""
    const defaultCategory = categories.find(category => hash === category.id)
    const [selected, setSelected] = useState(defaultCategory ? defaultCategory.id : "gamedev");

    if (selected !== "all") {
        projects = projects.filter(project => project.category.toLowerCase() === selected)
    }

    const trail = useTrail(projects.length, {
        from: { height: `0%` },
        to: { height: `100%` },
    })

    const onCategoryClick = (e, id) => {
        setSelected(id)
        e.preventDefault()
    }

    return (
        <React.Fragment>
            <Container>
                <Heading as="h1" variant="styles.h1" sx={{ textAlign: 'center' }}>
                    Projects
                </Heading>

                <div data-testid="projects-categories" sx={{ mt: 4, a: { mx: 2 }, textAlign: 'center' }}>
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            aria-label={category.label}
                            title={category.label}
                            href={category.href}
                            onClick={(e) => onCategoryClick(e, category.id)}
                            sx={{ 
                                color: "primary",
                                fontWeight: category.id === selected ? 700 : "normal"
                            }}
                        >
                            {category.content}
                        </Link>
                    ))}
                </div>
            </Container>

            <Container
                sx={{
                    display: `grid`,
                    gridTemplateColumns: `repeat(auto-fit, minmax(280px, 20%))`,
                    justifyContent: `center`,
                    width: `100%`,
                    maxWidth: `100%`,
                    padding: `2rem 0`

                }}
            >
                {trail.map((style, index) => (
                    <ProjectItem style={style} node={projects[index]} key={projects[index].slug} />
                ))}
            </Container>
        </React.Fragment>
    )
}

export default Projects