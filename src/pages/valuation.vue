<template>
  <Layout>
    <BNav />
        <PB>
            <PH back="portfolio" title="Business Valuation" />
            <div class="card col-sm-12 col-lg-12 mx-auto text-center mt-5">
                <div class="card-body">
                    <ul class="list-group">
                        <li v-for="edge in $page.allContentfulValuation.edges" v-bind:key="edge.node.id" class="list-group-item border-0">
                            <g-link :to="'valuation/'+edge.node.slug" class="card-text bg-white fs-6 text-dark">{{edge.node.companyName}}</g-link>
                                on {{edge.node.date}}
                        </li>
                    </ul>                                        
                </div>
            </div>
        </PB>
    <Footer />
  </Layout>
</template>

<page-query>
query Valuation { 
  allContentfulValuation(sortBy: "updatedAt", order: DESC) {
    edges {
      node {
        updatedAt
        id
        slug
        ticker
        companyName
        date
        valuationWorkbook {
          file {
            url
          }
        }
      }
    }
  }
}
</page-query>

<script>
import BlogNavbar from '../components/Blog/BlogNavbar'
import PageBody from '../components/PageBody'
import PageHeader from '../components/PageHeader'

export default {
    components: {
        BNav: BlogNavbar,
        PB: PageBody,
        PH: PageHeader
    },
    data() {
        return {

        }
    }
}
</script>

<style scoped>
.bg-over {
    height: 100vh !important;
}
</style>