/** @jsx jsx */
import { Flex, jsx, Link } from "theme-ui"


type ProjectInfoItemProps = {
    name: string
    content: string
    href: string
    linkDescription: string
}

const ProjectInfoItemLink = ({ name, content, href }: ProjectInfoItemProps) => (
    <Flex
        sx={{
            flexDirection: `column`,
            "&:not(:last-of-type)": {
                mr: 5,
            },
            mb: 2,
        }}
    >
        <div
            sx={{
                textTransform: `uppercase`,
                color: `primary`,
                letterSpacing: `wider`,
                fontWeight: `semibold`,
            }}
        >
            {name}
        </div>

        <Link sx={{ fontSize: 2, color: "primary" }} aria-label={content} href={href} target="_blank">
            {content}
        </Link>
    </Flex>
)

export default ProjectInfoItemLink