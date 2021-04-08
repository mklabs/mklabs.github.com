import React from "react"
import { Global } from "@emotion/core"
import { Box } from "theme-ui"
import { MDXProvider } from "@mdx-js/react"
import useSiteMetadata from "@lekoarts/gatsby-theme-emma/src/hooks/use-site-metadata"
import useNavigation from "@lekoarts/gatsby-theme-emma/src/hooks/use-navigation"
import SEO from "@lekoarts/gatsby-theme-emma/src/components/seo"
import Footer from "./footer"
import Header from "./header"
import Youtube from "../../../components/youtube"
import Slider from "../../../components/slider"


type LayoutProps = { children: React.ReactNode; className?: string }

const shortcodes = { Youtube, Slider }

const Layout = ({ children, className = `` }: LayoutProps) => {
    const meta = useSiteMetadata()
    const nav = useNavigation()

    return (
        <React.Fragment>
            <Global
                styles={(theme) => ({
                    "*": {
                        boxSizing: `inherit`,
                    },
                    html: {
                        WebkitTextSizeAdjust: `100%`,
                    },
                    img: {
                        borderStyle: `none`,
                    },
                    pre: {
                        fontFamily: `monospace`,
                        fontSize: `1em`,
                    },
                    "[hidden]": {
                        display: `none`,
                    },
                    "::selection": {
                        backgroundColor: theme.colors.text,
                        color: theme.colors.background,
                    },
                    a: {
                        transition: `all 0.3s ease-in-out`,
                    },
                })}
            />
            <SEO />
            <Header meta={meta} nav={nav} />
            <Box as="main" variant="layout.main" className={className}>

                <MDXProvider components={shortcodes}>
                  {children}
                </MDXProvider>
            </Box>
            <Footer />
        </React.Fragment>
    )
}

export default Layout