(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{"4Tuw":function(t,a,s){"use strict";var e=s("KHd+"),n=Object(e.a)({},(function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"container py-3 my-3 text-dark"},[a("div",{staticClass:"bg-over"},[a("div",{staticClass:"mt-3 pt-5 row mx-auto"},[a("div",{staticClass:"card bg-light rounded-0"},[a("div",{staticClass:"card-body"},[this._t("default")],2)])])])])}),[],!1,null,null,null);a.a=n.exports},"4eda":function(t,a,s){"use strict";s("910s")},"910s":function(t,a,s){},Nq0A:function(t,a,s){"use strict";var e={props:["title","back","noBack"]},n=s("KHd+"),l=Object(n.a)(e,(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"row card-header text-light bg-dark"},[t.noBack?s("div",{staticClass:"col-sm-12 text-center"},[s("h2",{staticClass:"pe-5"},[t._v(t._s(t.title))])]):s("div",{staticClass:"col-sm-12 d-flex justify-content-between"},[s("a",{staticClass:"rounded-0 btn btn-primary btn-lg",attrs:{href:"/"+t.back}},[t._v("Back")]),s("h2",{staticClass:"pe-5"},[t._v(t._s(t.title))]),s("h2",{staticClass:"ps-4"})])])}),[],!1,null,null,null);a.a=l.exports},OQlv:function(t,a,s){"use strict";s.r(a);var e=s("RM4Z"),n=s("4Tuw"),l=s("Nq0A"),i={components:{BNav:e.a,PB:n.a,PH:l.a},data:function(){return{}}},r=(s("4eda"),s("KHd+")),c=null,o=Object(r.a)(i,(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("Layout",[s("BNav"),s("PB",[s("PH",{attrs:{noBack:"true",title:"What I'm Working On..."}}),s("div",{staticClass:"row py-4 px-4"},[s("div",{staticClass:"card col-sm-12 col-lg-5 mx-auto text-center"},[s("div",{staticClass:"card-body"},[s("h4",{staticClass:"card-header bg-white mb-2 pb-3"},[t._v("Resources")]),s("ul",{staticClass:"list-group"},t._l(t.$page.allContentfulLink.edges,(function(a){return s("li",{key:a.node.slug,staticClass:"list-group-item border-0"},[s("g-link",{staticClass:"card-text bg-white fs-6 text-dark text-capitalize",attrs:{to:"/"+a.node.slug}},[t._v(t._s(a.node.name))])],1)})),0)])]),s("div",{staticClass:"card col-sm-12 col-lg-5 mx-auto text-center"},[s("div",{staticClass:"card-body"},[s("h4",{staticClass:"card-header bg-white mb-2 pb-3"},[t._v("Blog")]),s("ul",{staticClass:"list-group"},t._l(t.$page.allContentfulBlog.edges,(function(a){return s("li",{key:a.node.path,staticClass:"list-group-item border-0"},[s("g-link",{staticClass:"card-text bg-white fs-6 text-dark",attrs:{to:"blog/"+a.node.slug}},[t._v(t._s(a.node.title))])],1)})),0)])])])],1),s("Footer")],1)}),[],!1,null,"03f74b1e",null);"function"==typeof c&&c(o);a.default=o.exports},RM4Z:function(t,a,s){"use strict";var e={data:function(){return{headerList:[["Home","/"],["My Work","/portfolio"],["LinkedIn","https://www.linkedin.com/in/rdmcfarlin/"],["GitHub","https://github.com/rmcfarlin"]]}}},n=s("KHd+"),l=Object(n.a)(e,(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("nav",{staticClass:"header navbar navbar-expand-lg navbar-dark bg-dark px-5 fixed-top",attrs:{id:"navbar"}},[s("div",{staticClass:"container-fluid"},[s("g-link",{staticClass:"navbar-brand fs-4",attrs:{to:"/"}},[t._v("Robert McFarlin")]),t._m(0),s("div",{staticClass:"px-4 collapse navbar-collapse",attrs:{id:"navbarSupportedContent"}},[s("ul",{staticClass:"navbar-nav me-auto nav mb-2 mb-lg-0"},t._l(t.headerList,(function(a){return s("li",{key:a[0],staticClass:"nav-item my-2 mx-1"},[s("a",{staticClass:"nav-link",attrs:{role:"button",href:a[1],"aria-expanded":"false",target:"__blank"}},[t._v("\n            "+t._s(a[0])+"\n          ")])])})),0)])],1)])}),[function(){var t=this.$createElement,a=this._self._c||t;return a("button",{staticClass:"col-link navbar-toggler",attrs:{type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"}},[a("span",{staticClass:"col-link navbar-toggler-icon"})])}],!1,null,null,null);a.a=l.exports}}]);