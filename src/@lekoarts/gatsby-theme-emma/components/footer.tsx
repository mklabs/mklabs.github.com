/** @jsx jsx */
import { Container, Box, Link, Flex, jsx } from "theme-ui"
import SocialLinks from "../../../components/social-links"

const Footer = () => (
    <Box as="footer" variant="layout.footer">
        <div sx={{ 
            display: `grid`, 
            gridGap: 4, 
            gridTemplateColumns: [`1fr`, `1fr`, `1fr`, `2fr 1fr`] }}
        >

            <Flex
                sx={{
                    color: `textMuted`,
                    fontWeight: `semibold`,
                    a: { color: `text` },
                    flexDirection: 'column'
                }}
            >
                <div>
                    Built with 
                    <Link
                        aria-label="Link to Gatsby Website"
                        sx={{ ml: 2 }}
                        href="https://www.gatsbyjs.com/"
                    >
                        Gatsby
                    </Link>
                </div>

                <div sx={{ display: 'flex', marginBlock: '1rem' }}>
                    <img width="30" height="30" src="https://img.lekoarts.de/gatsby/logo_w30.png" alt="LekoArts Logo" />
                    {` `}
                    <Link
                        aria-label="Link to the theme's GitHub repository"
                        sx={{ ml: 2 }}
                        href="https://github.com/LekoArts/gatsby-themes/tree/master/themes/gatsby-theme-emma"
                    >
                        Theme
                    </Link>
                    <div sx={{ mx: 1 }}>by</div>
                    {` `}
                    <Link aria-label="Link to the theme author's website" href="https://www.lekoarts.de/en">
                        LekoArts
                    </Link>
                </div>


            </Flex>

            <div sx={{ textAlign: 'right' }}>

                <div sx={{
                    a: {
                        fontSize: 3,
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
                    flex: 1,
                    display: `flex`,
                    order: 3,
                }}>
                    <SocialLinks />
                </div>

                <p>
                    Copyright &copy; {new Date().getFullYear()}. All rights reserved.
                </p>
            </div>
        </div>

    </Box>
)

export default Footer