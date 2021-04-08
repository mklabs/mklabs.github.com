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

    nav.sort((a, b) => {
        return a.title < b.title ? -1 : 1;
    })

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

            <div
                sx={{
                    a: {
                        fontSize: 4,
                        color: `text`,
                        display: `flex`,
                        alignItems: `center`,
                        "&:hover": {
                            color: `primary`,
                        },
                        "&:not(:first-of-type)": {
                            ml: 2,
                        },
                    },
                    justifyContent: `flex-end`,
                    marginRight: '2rem',
                    paddingRight: '2rem',
                    flex: 1,
                    display: `flex`,
                    borderRightWidth: '1px',
                    borderRightStyle: 'solid',
                    borderRightColor: 'text'
                }}
            >
                {/* <SocialLinks />  */}
            </div>

            {!navEmpty && <Navigation nav={nav} />}

            <ColorModeToggle isDark={isDark} toggle={toggleColorMode} />
            {/* <button
                sx={{ variant: `buttons.toggle`, fontWeight: `semibold`, justifyContent: 'end' }}
                onClick={toggleColorMode}
                type="button"
                aria-label="Toggle dark mode"
            >
                {isDark ? `Light` : `Dark`}
            </button> */}



        </Flex>
    )
}

export default Header