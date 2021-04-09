/** @jsx jsx */
import React from "react"
import { jsx, Heading } from "theme-ui"
import { Box } from "@theme-ui/components"

type TitleProps = {
    children: React.ReactNode
    as?: string
    className?: string
    variant?: string
    text: string
}

const Title = ({ text, children, as = `h2`, variant = `styles.h2`, className = `` }: TitleProps) => (
    <div
        sx={{
            justifyContent: `space-between`,
            alignItems: `center`,
            // variant: `dividers.bottom`,
            // borderBottomStyle: `solid`,
            // borderBottomWidth: `1px`,
            // borderBottomColor: `divide`,
            // pb: 3,
            // mb: 4,
            flexFlow: `column`,
            boxSizing: `border-box`,
            display: `flex`,
        }}
    >
        <Heading 
            as={as} 
            variant={variant} 
            sx={{ textAlign: 'center', mb: '2rem' }}
            className={className}
        >
            {text}
        </Heading>
        <div
            sx={{
                color: `primary`,
                a: {
                    variant: `links.primary`,
                },
            }}
        >
            {children}
        </div>
    </div>
)

export default Title
