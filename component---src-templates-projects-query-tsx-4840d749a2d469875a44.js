(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{v1yo:function(t,e,o){"use strict";o.r(e),o.d(e,"default",(function(){return d}));var i=o("wx14"),n=o("2A+t"),c=o("eJbL"),a=o("zNWb"),r=o("qKvR"),l=function(t){var e=t.projects;return Object(n.c)(c.a,{sx:{}},Object(n.c)(a.a,{projects:e}))};function d(t){var e=Object.assign({},t),o=e.data.allProject;return console.log(e),Object(r.c)(l,Object(i.a)({projects:o.nodes},e))}},zNWb:function(t,e,o){"use strict";var i=o("q1tI"),n=o.n(i),c=o("wEEd"),a=o("2A+t"),r=o("izhR"),l=o("9eSz"),d=o.n(l),s=o("Wbzz"),p=(o("qKvR"),function(t){var e=t.node,o=t.style;return Object(a.c)(c.a.div,{sx:{position:"relative","&:before":{content:'""',display:"block",paddingTop:"100%"}},style:o},Object(a.c)("div",{sx:{left:0,height:"100%",position:"absolute",top:0,width:"100%",a:{color:"white",height:"100%",left:0,opacity:0,padding:4,position:"absolute",top:0,width:"100%",zIndex:10,transition:"all 0.3s ease-in-out",textDecoration:"none","&:hover":{color:"white",opacity:1,textDecoration:"none"}}}},Object(a.c)("div",{sx:{"> div":{height:"100%",left:0,position:"absolute !important",top:0,width:"100%","> div":{position:"static !important"}}}},Object(a.c)(d.a,{fluid:e.cover.childImageSharp.fluid})),Object(a.c)(s.Link,{to:e.slug,"aria-label":"View detail page of "+e.title},Object(a.c)("img",{alt:"",src:e.cover.childImageSharp.fluid.tracedSVG,sx:{position:"absolute",top:0,left:0,right:0,bottom:0,width:"100%",height:"100%",filter:"invert(100%)",zIndex:-1,opacity:.08,objectFit:"cover"}}),Object(a.c)("div",{sx:{backgroundColor:e.color,height:"100%",left:0,position:"absolute",top:0,width:"100%",zIndex:-2}}),Object(a.c)("div",{sx:{fontSize:5,fontWeight:"bold"}},e.client),Object(a.c)("div",{sx:{fontSize:2}},e.service))))}),b="undefined"!=typeof window,f=[{label:"All Categories",content:"All",href:"/portfolio#all",id:"all"},{label:"Game Development",content:"Game Development",href:"/portfolio#gamedev",id:"gamedev"},{label:"Modding",content:"Modding",href:"/portfolio#modding",id:"modding"},{label:"Open Source Software",content:"OSS",href:"/portfolio#oss",id:"oss"}];e.a=function(t){var e=t.projects,o=b?location.hash.slice(1):"",l=f.find((function(t){return o===t.id})),d=Object(i.useState)(l?l.id:"gamedev"),s=d[0],u=d[1];"all"!==s&&(e=e.filter((function(t){return t.category.toLowerCase()===s})));var h=Object(c.d)(e.length,{from:{height:"0%"},to:{height:"100%"}});return Object(a.c)(n.a.Fragment,null,Object(a.c)(r.b,null,Object(a.c)(r.d,{as:"h1",variant:"styles.h1",sx:{textAlign:"center"}},"Projects"),Object(a.c)("div",{"data-testid":"projects-categories",sx:{mt:4,a:{mx:2},textAlign:"center"}},f.map((function(t){return Object(a.c)(r.e,{key:t.id,"aria-label":t.label,title:t.label,href:t.href,onClick:function(e){return function(t,e){u(e),t.preventDefault()}(e,t.id)},sx:{color:"primary",fontWeight:t.id===s?700:"normal"}},t.content)})))),Object(a.c)(r.b,{sx:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 20%))",justifyContent:"center",width:"100%",maxWidth:"100%",padding:"2rem 0"}},h.map((function(t,o){return Object(a.c)(p,{style:t,node:e[o],key:e[o].slug})}))))}}}]);
//# sourceMappingURL=component---src-templates-projects-query-tsx-4840d749a2d469875a44.js.map