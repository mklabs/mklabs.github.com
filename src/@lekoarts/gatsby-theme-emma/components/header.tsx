/** @jsx jsx */
import { Flex, jsx, useColorMode, Link as TLink } from "theme-ui"
import { Link } from "gatsby"
import Navigation from "./navigation"
import ColorModeToggle from "../../../components/colormode-toggle"

type HeaderProps = {
    meta: {
        [key: string]: string
    }
    nav: {
        title: string
        slug: string
    }[]
}

const Header = ({ meta, nav }: HeaderProps) => {
    const [colorMode, setColorMode] = useColorMode()
    const isDark = colorMode === `dark`
    const toggleColorMode = (e: any) => {
        setColorMode(isDark ? `light` : `dark`)
    }

    const navEmpty = nav.length === 0

    return (
        <Flex as="header" variant="layout.header">
            <TLink
                aria-label={`${meta.siteTitle}, Back to homepage`}
                as={Link}
                sx={{ color: `text`, ":hover": { color: `primary`, textDecoration: `none` } }}
                to="/"
            >
                {meta.siteHeadline}
            </TLink>

            

            <div sx={{ display: `flex` }}>
                {!navEmpty && <Navigation nav={nav} />}

                <ColorModeToggle isDark={isDark} toggle={toggleColorMode} />
            </div>


        </Flex>
    )
}

export default Header