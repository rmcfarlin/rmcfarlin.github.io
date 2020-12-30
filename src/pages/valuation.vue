<template>
  <Layout>
    <BNav />
        <div class="container py-3 my-3 text-dark">
            <div class="bg-over">
                <div class="mt-3 pt-5 row mx-auto">
                    <div class="card bg-light rounded-0">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-12">
                                    <h2 class="card-header bg-light text-center">Valuations</h2>
                                </div>
                            </div>
                                <div class="card col-sm-12 col-lg-5 mx-auto text-center mt-5">
                                    <div class="card-body">
                                        <ul class="list-group">
                                            <li v-for="edge in $page.allContentfulValuation.edges" v-bind:key="edge.node.id" class="list-group-item border-0">
                                                <g-link :to="'valuation/'+edge.node.slug" class="card-text bg-white fs-6 text-dark">{{edge.node.companyName}}</g-link>
                                                 on {{edge.node.date}}
                                            </li>
                                        </ul>                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
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

export default {
    components: {
        BNav: BlogNavbar
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