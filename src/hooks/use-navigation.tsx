// import { graphql, useStaticQuery } from "gatsby"

type UseNavigationProps = {
  allPage: {
    nodes: {
      title: string
      slug: string
    }[]
  }
}

const useNavigation = () => {
//   const data = useStaticQuery<UseNavigationProps>(graphql`
//     query {
//       allPage {
//         nodes {
//           title
//           slug
//         }
//       }
//     }
//   `)

  return [{
      title: "Home",
      slug: "/"
  }, {
      title: "Portolio",
      slug: "/portfolio"
  }, {
    title: "Blog",
    slug: "/blog"
  }, {
    title: "About",
    slug: "/about"
  }]
}

export default useNavigation
