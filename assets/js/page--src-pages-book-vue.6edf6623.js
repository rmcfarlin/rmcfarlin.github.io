(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{"4Tuw":function(t,a,e){"use strict";var s=e("KHd+"),r=Object(s.a)({},(function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"container py-3 my-3 text-dark bg-over"},[a("div",{staticClass:"mt-3 pt-5 row mx-auto"},[a("div",{staticClass:"card bg-light border-dark rounded-0 shadow"},[a("div",{staticClass:"card-body"},[this._t("default")],2)])])])}),[],!1,null,null,null);a.a=r.exports},DQNa:function(t,a,e){var s=e("busE"),r=Date.prototype,n=r.toString,l=r.getTime;new Date(NaN)+""!="Invalid Date"&&s(r,"toString",(function(){var t=l.call(this);return t==t?n.call(this):"Invalid Date"}))},Nq0A:function(t,a,e){"use strict";var s={props:["title"]},r=e("KHd+"),n=Object(r.a)(s,(function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"row card-header rounded-0 text-light bg-dark"},[a("div",{staticClass:"col-sm-12 text-center"},[a("h1",{staticClass:"pe-5 fs-3"},[this._v(this._s(this.title))])])])}),[],!1,null,null,null);a.a=n.exports},RM4Z:function(t,a,e){"use strict";var s={data:function(){return{headerList:[["Home","/"],["My Work","/portfolio"],["LinkedIn","https://www.linkedin.com/in/rdmcfarlin/"],["GitHub","https://github.com/rmcfarlin"]]}},props:["back","showBack"]},r=e("KHd+"),n=Object(r.a)(s,(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("nav",{staticClass:"header navbar navbar-expand-lg navbar-dark bg-dark px-5 fixed-top",attrs:{id:"navbar"}},[e("div",{staticClass:"container-fluid"},[e("g-link",{staticClass:"navbar-brand fs-4",attrs:{to:"/"}},[t._v("Robert McFarlin")]),t._m(0),e("div",{staticClass:"px-4 collapse navbar-collapse",attrs:{id:"navbarSupportedContent"}},[e("ul",{staticClass:"navbar-nav me-auto nav mb-2 mb-lg-0"},t._l(t.headerList,(function(a){return e("li",{key:a[0],staticClass:"nav-item my-2 mx-1"},[e("a",{staticClass:"nav-link text-white",attrs:{role:"button",href:a[1],"aria-expanded":"false",target:"__blank"}},[t._v("\n            "+t._s(a[0])+"\n          ")])])})),0),e("ul",{staticClass:"navbar-nav nav mb-2 mb-lg-0 d-flex"},[e("a",{directives:[{name:"show",rawName:"v-show",value:!t.showBack,expression:"!showBack"}],staticClass:"rounded-0 btn btn-primary text-white btn-lg border-white",attrs:{href:"/"+t.back}},[t._v("Back")])])])],1)])}),[function(){var t=this.$createElement,a=this._self._c||t;return a("button",{staticClass:"col-link navbar-toggler",attrs:{type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"}},[a("span",{staticClass:"col-link navbar-toggler-icon"})])}],!1,null,null,null);a.a=n.exports},lzp5:function(t,a,e){"use strict";e.r(a);e("DQNa");var s=e("RM4Z"),r=e("4Tuw"),n=e("Nq0A"),l={components:{BNav:s.a,PB:r.a,PH:n.a},data:function(){return{}},methods:{appendZero:function(t){return t<=9?"0"+t:t},format_date:function(t){if(t){var a=new Date(t),e=this.appendZero(a.getDate()),s=this.appendZero(a.getMonth()+1);return console.log(s),s+"/"+e+"/"+a.getFullYear()}}}},o=e("KHd+"),i=null,c=Object(o.a)(l,(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("Layout",[e("BNav",{attrs:{back:"portfolio"}}),e("PB",[e("PH",{attrs:{title:"My Favorite Books"}}),e("div",{staticClass:"card col-sm-12 col-lg-10 mx-auto mt-4 rounded-0"},[e("div",{staticClass:"card-body table-responsive px-4"},[e("table",{staticClass:"table table-hover table-striped"},[e("thead",{staticClass:"table-dark"},[e("tr",[e("th",{attrs:{scope:"col"}},[t._v("Title")]),e("th",{attrs:{scope:"col"}},[t._v("Author")]),e("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("Updated On")]),e("th",{staticClass:"text-center",attrs:{scope:"col"}},[t._v("Summary")])])]),e("tbody",t._l(t.$page.allContentfulBook.edges,(function(a){return e("tr",{key:a.node.id},[e("td",[t._v(t._s(a.node.title))]),e("td",[t._v(t._s(a.node.author))]),e("td",{staticClass:"text-center"},[t._v(t._s(t.format_date(a.node.updatedAt)))]),e("td",{staticClass:"text-center"},[e("g-link",{staticClass:"text-decoration-none text-center text-dark",attrs:{to:"book/"+a.node.slug}},[e("svg",{staticClass:"bi bi-journal-text",attrs:{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",viewBox:"0 0 16 16"}},[e("path",{attrs:{d:"M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"}}),e("path",{attrs:{d:"M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"}}),e("path",{attrs:{d:"M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"}})])])],1)])})),0)])])])],1),e("Footer")],1)}),[],!1,null,null,null);"function"==typeof i&&i(c);a.default=c.exports}}]);