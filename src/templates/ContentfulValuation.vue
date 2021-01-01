<template>
  <Layout>
    <BNav />
    <PB>
      <PH back="valuation" :title="$page.contentfulValuation.companyName+' Valuation'" />
      <div class="pt-4">
        <p>Ticker: {{$page.contentfulValuation.ticker}}</p>
      
        <a class="link" :href="$page.contentfulValuation.valuationWorkbook.file.url" download>Download Valuation</a> 
      </div>
    </PB>

<!-- SIDEBAR -->
        <!-- <div class="pt-3 col-sm-12 col-lg-4">
          <div class="card pt-5" style="height: 100vh">
            <div class="card-body">
              <div class="h4 card-title text-center">Previous Posts</div>
              <hr>
              <ul>
                <li v-for="edge in $page.allContentfulBlog.edges" :key="edge.node.id">
                  <g-link :to="'blog/'+edge.node.slug">{{edge.node.title}}</g-link>
                </li>
              </ul>


            </div>
          </div>
        </div> -->

    <Footer />
  </Layout>
</template>

<page-query>
query Valuation($id: ID) { 
  contentfulValuation(id: $id) {
    ticker
    slug
    companyName
    valuationWorkbook {
      file {
        url
      }
    }
    id
  }

  allContentfulValuation {
    edges {
      node {
        id
        slug
        ticker
        companyName
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
