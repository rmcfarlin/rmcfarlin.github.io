(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"4Tuw":function(t,a,s){"use strict";var e=s("KHd+"),r=Object(e.a)({},(function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"container py-3 my-3 text-dark bg-over"},[a("div",{staticClass:"mt-3 pt-5 row mx-auto"},[a("div",{staticClass:"card bg-light border-dark rounded-0 shadow"},[a("div",{staticClass:"card-body"},[this._t("default")],2)])])])}),[],!1,null,null,null);a.a=r.exports},Nq0A:function(t,a,s){"use strict";var e={props:["title"]},r=s("KHd+"),i=Object(r.a)(e,(function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"row card-header rounded-0 text-light bg-dark"},[a("div",{staticClass:"col-sm-12 text-center"},[a("h1",{staticClass:"pe-5 fs-3"},[this._v(this._s(this.title))])])])}),[],!1,null,null,null);a.a=i.exports},RM4Z:function(t,a,s){"use strict";var e={data:function(){return{headerList:[["Home","/"],["My Work","/portfolio"],["LinkedIn","https://www.linkedin.com/in/rdmcfarlin/"],["GitHub","https://github.com/rmcfarlin"]]}},props:["back","showBack"]},r=s("KHd+"),i=Object(r.a)(e,(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("nav",{staticClass:"header navbar navbar-expand-lg navbar-dark bg-dark px-5 fixed-top",attrs:{id:"navbar"}},[s("div",{staticClass:"container-fluid"},[s("g-link",{staticClass:"navbar-brand fs-4",attrs:{to:"/"}},[t._v("Robert McFarlin")]),t._m(0),s("div",{staticClass:"px-4 collapse navbar-collapse",attrs:{id:"navbarSupportedContent"}},[s("ul",{staticClass:"navbar-nav me-auto nav mb-2 mb-lg-0"},t._l(t.headerList,(function(a){return s("li",{key:a[0],staticClass:"nav-item my-2 mx-1"},[s("a",{staticClass:"nav-link text-white",attrs:{role:"button",href:a[1],"aria-expanded":"false",target:"__blank"}},[t._v("\n            "+t._s(a[0])+"\n          ")])])})),0),s("ul",{staticClass:"navbar-nav nav mb-2 mb-lg-0 d-flex"},[s("a",{directives:[{name:"show",rawName:"v-show",value:!t.showBack,expression:"!showBack"}],staticClass:"rounded-0 btn btn-primary text-white btn-lg border-white",attrs:{href:"/"+t.back}},[t._v("Back")])])])],1)])}),[function(){var t=this.$createElement,a=this._self._c||t;return a("button",{staticClass:"col-link navbar-toggler",attrs:{type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"}},[a("span",{staticClass:"col-link navbar-toggler-icon"})])}],!1,null,null,null);a.a=i.exports},sAMW:function(t,a,s){"use strict";s.r(a);var e=s("RM4Z"),r=s("Nq0A"),i=s("4Tuw"),l={components:{BNav:e.a,PH:r.a,PB:i.a},data:function(){return{}}},n=s("KHd+"),o=null,c=Object(n.a)(l,(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("Layout",[s("BNav",{attrs:{back:"book"}}),s("PB",[s("div",{staticClass:"row"},[s("div",{staticClass:"card col-sm-12 col-lg-8 bg-light border-0"},[s("div",{staticClass:"card-body"},[s("div",{staticClass:"card-header text-light bg-dark mb-3 rounded-0"},[s("div",{staticClass:"col-sm-12 text-center py-1"},[s("h1",{staticClass:"px-5 fs-3"},[t._v(t._s(t.$page.book.title))])])]),s("div",[s("img",{staticClass:"float-sm-start pe-3",attrs:{"v-show":null!=t.$page.book.image.file.url,src:t.$page.book.image.file.url,alt:t.$page.book.title+" Book Cover",height:"300px",width:"200px"}}),s("div",{directives:[{name:"g-image",rawName:"v-g-image"}],staticClass:"card-text mx-3",domProps:{innerHTML:t._s(t.$page.book.summary)}})])])]),s("div",{staticClass:"ms-2 card col-sm-12 offset-lg-1 col-lg-3 bg-light border-0"},[s("div",{staticClass:"card-body"},[s("h2",{staticClass:"card-header text-light bg-dark rounded-0 text-center py-3 mb-3 fs-3"},[t._v("Other Books")]),s("ul",{staticClass:"list-group list-group-flush"},t._l(t.$page.books.edges,(function(a){return s("g-link",{key:a.node.id,staticClass:"text-dark text-decoration-none",attrs:{to:"book/"+a.node.slug}},[s("li",{staticClass:"list-group-item list-group-item-action bg-light"},[t._v("\n                  "+t._s(a.node.title)+"\n                ")])])})),1)])])])]),s("Footer")],1)}),[],!1,null,null,null);"function"==typeof o&&o(c);a.default=c.exports}}]);