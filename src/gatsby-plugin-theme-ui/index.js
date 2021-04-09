import { merge } from "theme-ui"
import { tailwind } from "@theme-ui/presets"

export default merge(tailwind, {
    initialColorModeName: `light`,
    useCustomProperties: true,

    colors: {
        primary: tailwind.colors.pink[7],
        secondary: tailwind.colors.indigo[6],
        toggleIcon: tailwind.colors.black,
        divide: tailwind.colors.gray[4],
        modes: {
            dark: {
                text: tailwind.colors.white,
                primary: "#aca599",
                background: "#131516",
                textMuted: tailwind.colors.gray[5],
                toggleIcon: tailwind.colors.white,
                divide: tailwind.colors.gray[8],
                muted: tailwind.colors.gray[8]
            },
        },
    },


    layout: {
        footer: {
            textAlign: `left`,
            display: `block`,
            color: `textMuted`,
            px: [3, 4],
            py: [4, 5],
            borderTopStyle: `solid`,
            borderTopWidth: `1px`,
            borderTopColor: `divide`,
            mt: '8rem'
        },
        header: {
            px: [3, 4],
            py: [2, 3],
            fontSize: 2,
            display: `flex`,
            alignItems: `center`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            borderBottomStyle: `solid`,
            borderBottomWidth: `1px`,
            borderBottomColor: `divide`
        },
        main: {
            position: `relative`,
        },
        container: {
            maxWidth: `5xl`,
            padding: 4,
        },
    },

    dividers: {
        bottom: {
            borderBottomStyle: `solid`,
            borderBottomWidth: `1px`,
            borderBottomColor: `divide`,
            pb: 3,
        },
        top: {
            borderTopStyle: `solid`,
            borderTopWidth: `1px`,
            borderTopColor: `divide`,
            pt: 3,
        },
    },

    styles: {
        root: {
            color: `text`,
            backgroundColor: `background`,
            margin: 0,
            padding: 0,
            boxSizing: `border-box`,
            textRendering: `optimizeLegibility`,
            WebkitFontSmoothing: `antialiased`,
            MozOsxFontSmoothing: `grayscale`,
        },

        p: {
            // fontSize: [1],
            fontSize: [1, 1, 2],

            letterSpacing: `-0.003em`,
            lineHeight: `body`,
            "--baseline-multiplier": 0.179,
            "--x-height-multiplier": 0.35,
            wordBreak: `break-word`,
        },

        // h1: {
        //     fontSize: [5, 6],
        //     mt: 2,
        // },
        // h2: {
        //     fontSize: [4, 5],
        //     mt: 2,
        // },
        // h3: {
        //     fontSize: [3, 4],
        //     mt: 3,
        // },
        // h4: {
        //     fontSize: [2, 3],
        // },
        // h5: {
        //     fontSize: [1, 2],
        // },
        // h6: {
        //     fontSize: 1,
        //     mb: 2,
        // },

        h1: {
            variant: `text.heading`,
            fontSize: [5, 6, 6, 7],
            mt: 4,
        },
        h2: {
            variant: `text.heading`,
            fontSize: [4, 5, 5, 6],
            mt: 4,
        },
        h3: {
            variant: `text.heading`,
            fontSize: [3, 4, 4, 5],
            mt: 4,
        },
        h4: {
            variant: `text.heading`,
            fontSize: [2, 3, 3, 4],
            mt: 3,
        },
        h5: {
            variant: `text.heading`,
            fontSize: [1, 2, 2, 3],
            mt: 3,
        },
        h6: {
            variant: `text.heading`,
            fontSize: 1,
            mb: 2,
        },
          
        ul: {
            li: {
              fontSize: [1, 1, 2],
              letterSpacing: `-0.003em`,
              lineHeight: `body`,
              "--baseline-multiplier": 0.179,
              "--x-height-multiplier": 0.35,
            },
          },
          ol: {
            li: {
              fontSize: [1, 1, 2],
              letterSpacing: `-0.003em`,
              lineHeight: `body`,
              "--baseline-multiplier": 0.179,
              "--x-height-multiplier": 0.35,
            },
        },

        blockquote: {
            borderLeftColor: `primary`,
            borderLeftStyle: `solid`,
            borderLeftWidth: `6px`,
            mx: 0,
            pl: 4,
            p: {
              fontStyle: `italic`,
            },
        },

        table: {
            width: `100%`,
            my: 4,
            borderCollapse: `separate`,
            borderSpacing: 0,
            [[`th`, `td`]]: {
              textAlign: `left`,
              py: `4px`,
              pr: `4px`,
              pl: 0,
              borderColor: `muted`,
              borderBottomStyle: `solid`,
            },
          },
          th: {
            verticalAlign: `bottom`,
            borderBottomWidth: `2px`,
            color: `heading`,
          },
          td: {
            verticalAlign: `top`,
            borderBottomWidth: `1px`,
          },
          hr: {
            mx: 0,
        }
    },

    buttons: {
        toggle: {
            color: `background`,
            border: `none`,
            backgroundColor: `textMuted`,
            cursor: `pointer`,
            alignSelf: `center`,
            px: 3,
            py: 2,
            ml: 3,
        },
    },

    page: {
        heading: {
            fontSize: [5, 6],
            mt: 2,
        }
    },

    links: {
        primary: {
          color: `primary`,
          textDecoration: `none`,
          ":hover": {
            color: `heading`,
            textDecoration: `underline`,
          },
          ":focus": {
            color: `heading`,
          },
        },
        listItem: {
          fontSize: [1, 2, 3],
          color: `text`,
        },
    },
})