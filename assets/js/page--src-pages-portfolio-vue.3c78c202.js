(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{"4Tuw":function(t,a,s){"use strict";var e=s("KHd+"),r=Object(e.a)({},(function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"container py-3 my-3 text-dark bg-over"},[a("div",{staticClass:"mt-3 pt-5 row mx-auto"},[a("div",{staticClass:"card bg-light border-dark rounded-0 shadow"},[a("div",{staticClass:"card-body"},[this._t("default")],2)])])])}),[],!1,null,null,null);a.a=r.exports},Nq0A:function(t,a,s){"use strict";var e={props:["title"]},r=s("KHd+"),n=Object(r.a)(e,(function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"row card-header rounded-0 text-light bg-dark"},[a("div",{staticClass:"col-sm-12 text-center"},[a("h2",{staticClass:"pe-5"},[this._v(this._s(this.title))])])])}),[],!1,null,null,null);a.a=n.exports},OQlv:function(t,a,s){"use strict";s.r(a);var e=s("RM4Z"),r=s("4Tuw"),n=s("Nq0A"),l={components:{BNav:e.a,PB:r.a,PH:n.a},data:function(){return{}}},i=s("KHd+"),o=null,c=Object(i.a)(l,(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("Layout",[s("BNav",{attrs:{showBack:"true"}}),s("PB",[s("PH",{attrs:{title:"What I'm Working On..."}}),s("div",{staticClass:"row py-4 px-4"},[s("div",{staticClass:"card col-sm-12 col-lg-5 mx-auto rounded-0 text-center border-dark"},[s("div",{staticClass:"card-body"},[s("h4",{staticClass:"card-header bg-white mb-2 pb-3"},[t._v("Resources")]),s("ul",{staticClass:"list-group"},t._l(t.$page.links.edges,(function(a){return s("li",{key:a.node.slug,staticClass:"list-group-item border-0"},[s("g-link",{staticClass:"card-text bg-white fs-6 text-dark text-capitalize",attrs:{to:"/"+a.node.slug}},[t._v(t._s(a.node.name))])],1)})),0)])]),s("div",{staticClass:"card col-sm-12 col-lg-5 mx-auto text-center rounded-0 border-dark"},[s("div",{staticClass:"card-body"},[s("h4",{staticClass:"card-header bg-white mb-2 pb-3"},[t._v("Blog")]),s("ul",{staticClass:"list-group"},t._l(t.$page.posts.edges,(function(a){return s("li",{key:a.node.path,staticClass:"list-group-item border-0"},[s("g-link",{staticClass:"card-text bg-white fs-6 text-dark",attrs:{to:"blog/"+a.node.slug}},[t._v(t._s(a.node.title))])],1)})),0)])])])],1),s("Footer")],1)}),[],!1,null,null,null);"function"==typeof o&&o(c);a.default=c.exports},RM4Z:function(t,a,s){"use strict";var e={data:function(){return{headerList:[["Home","/"],["My Work","/portfolio"],["LinkedIn","https://www.linkedin.com/in/rdmcfarlin/"],["GitHub","https://github.com/rmcfarlin"]]}},props:["back","showBack"]},r=s("KHd+"),n=Object(r.a)(e,(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("nav",{staticClass:"header navbar navbar-expand-lg navbar-dark bg-dark px-5 fixed-top",attrs:{id:"navbar"}},[s("div",{staticClass:"container-fluid"},[s("g-link",{staticClass:"navbar-brand fs-4",attrs:{to:"/"}},[t._v("Robert McFarlin")]),t._m(0),s("div",{staticClass:"px-4 collapse navbar-collapse",attrs:{id:"navbarSupportedContent"}},[s("ul",{staticClass:"navbar-nav me-auto nav mb-2 mb-lg-0"},t._l(t.headerList,(function(a){return s("li",{key:a[0],staticClass:"nav-item my-2 mx-1"},[s("a",{staticClass:"nav-link",attrs:{role:"button",href:a[1],"aria-expanded":"false",target:"__blank"}},[t._v("\n            "+t._s(a[0])+"\n          ")])])})),0),s("ul",{staticClass:"navbar-nav nav mb-2 mb-lg-0 d-flex"},[s("a",{directives:[{name:"show",rawName:"v-show",value:!t.showBack,expression:"!showBack"}],staticClass:"rounded-0 btn btn-primary btn-lg",attrs:{href:"/"+t.back}},[t._v("Back")])])])],1)])}),[function(){var t=this.$createElement,a=this._self._c||t;return a("button",{staticClass:"col-link navbar-toggler",attrs:{type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"}},[a("span",{staticClass:"col-link navbar-toggler-icon"})])}],!1,null,null,null);a.a=n.exports}}]);