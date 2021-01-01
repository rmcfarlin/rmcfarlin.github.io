// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import Navbar from '~/components/Navbar.vue'
import Hero from '~/components/Pages/Hero.vue'
import Work from '~/components/Pages/Work.vue'
import Education from '~/components/Pages/Education.vue'
import Skills from '~/components/Pages/Skills.vue'
import Values from '~/components/Pages/Values.vue'
import About from '~/components/Pages/About.vue'
import Footer from '~/components/Footer.vue'

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  Vue.component('Hero', Hero)
  Vue.component('Work', Work)
  Vue.component('Education', Education)
  Vue.component('Navbar', Navbar)
  Vue.component('Skills', Skills)
  Vue.component('Values', Values)
  Vue.component('About', About)
  Vue.component('Footer', Footer)

  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Lato&family=Libre+Baskerville&family=Raleway&display=swap'
  })

  head.link.push({
    rel: 'stylesheet',
    href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css'
  })

  head.script.push({
    src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js',
    body: true
  })
}
