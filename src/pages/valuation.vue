<template>
  <Layout>
    <BNav back="portfolio" />
        <PB>
            <PH title="Business Valuation" />

            <div class="card col-sm-12 col-lg-10 mx-auto mt-5">
                <div class="card-body table-responsive px-4">
                    <table class="table table-hover table-striped">
                        <thead class="table-dark">
                            <tr>
                                <th scope="col">Company Name</th>
                                <th scope="col">Ticker</th>
                                <th scope="col">Last Updated</th>
                                <th scope="col" class="text-center">Valuation</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="edge in $page.allContentfulValuation.edges" v-bind:key="edge.node.id" >
                                <td>{{edge.node.companyName}}</td>
                                <td>{{edge.node.ticker}}</td>
                                <td>{{format_date(edge.node.updatedAt)}}</td>
                                <td class="text-center">
                                    <g-link :to="'valuation/'+edge.node.slug" class="text-decoration-none text-center text-dark">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-wallet" viewBox="0 0 16 16">
                                        <path d="M0 3a2 2 0 0 1 2-2h13.5a.5.5 0 0 1 0 1H15v2a1 1 0 0 1 1 1v8.5a1.5 1.5 0 0 1-1.5 1.5h-12A2.5 2.5 0 0 1 0 12.5V3zm1 1.732V12.5A1.5 1.5 0 0 0 2.5 14h12a.5.5 0 0 0 .5-.5V5H2a1.99 1.99 0 0 1-1-.268zM1 3a1 1 0 0 0 1 1h12V2H2a1 1 0 0 0-1 1z"/>
                                        </svg>
                                    </g-link>
                                </td>
                            </tr>      
                        </tbody>
                    </table>
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
    },
    methods: {
        appendZero(n){
            if(n<=9){
                return "0"+n
            } 
            return n
        },
        format_date(dt){
            if (dt) {
                let da = new Date(dt)
                let d = this.appendZero(da.getDate())
                let m = this.appendZero(da.getMonth()+1)
                console.log(m)
                let y = da.getFullYear()
                let nd = m+"/"+d+"/"+y
                console.log(nd)
                return nd
            }
        }
    }
}
</script>