import React from "react"
import Flicking from "@egjs/react-flicking";
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { ArrowBack, ArrowForward } from "@emotion-icons/evaicons-solid"

const Slider = ({ directory, filtered = [] }) => {
    const { data } = useStaticQuery(graphql`
    query {
        data: allImageSharp {
            edges {
                node {
                    parent {
                        ... on File {
                            id
                            name
                            relativePath
                            relativeDirectory
                        }
                    }

                    fixed(width: 800, quality: 90) {
                        ...GatsbyImageSharpFixed_withWebp
                    }
                }
            }
        }
    }
    `);

    const images = data.edges
        .filter(({ node }) => node.parent.relativeDirectory === directory)
        .filter(({ node }) => !filtered.includes(node.parent.name) )
        .sort((a, b) => {
            return a.node.parent.name > b.node.parent.name ? 1 : -1;
        })

    let flicking;

    const prev = (e) => {
        flicking.prev()
    }

    const next = (e) => {
        flicking.next()
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <a onClick={prev} style={{ flexBasis: '40px', cursor: 'pointer' }}>
                <ArrowBack />
            </a>
            <Flicking 
                style={{ flex: '1 1 auto' }}
                collectStatistics={false} 
                moveType={{type: "snap", count: 5}}
                bound={true}
                gap={10}
                duration = {500}
                ref={e => {
                    flicking = e as Flicking;
                }}
            >
                {images.map(img => (
                    <Img
                        key={img.node.parent.relativePath} 
                        fixed={img.node.fixed} 
                        imgStyle={{ border: "1px solid #a0aec0" }}
                        draggable={false}
                    />
                ))}
            </Flicking>
            <a onClick={next} style={{ flexBasis: '40px', cursor: 'pointer'}}>
                <ArrowForward />
            </a>
        </div>
    )
}

export default Slider