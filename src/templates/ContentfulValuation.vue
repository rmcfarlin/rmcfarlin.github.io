<template>
  <Layout>
    <BNav back="valuation" />
    <PB>
      <PH :title="$page.contentfulValuation.companyName+' Valuation'" />
      <div class="pt-4">
        <p>Ticker: {{$page.contentfulValuation.ticker}}</p>
      
        <a class="link" :href="$page.contentfulValuation.valuationWorkbook.file.url" download>Download Workbook</a> 
      </div>
    </PB>
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
