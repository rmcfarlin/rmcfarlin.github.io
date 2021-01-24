<template>
  <Layout>
    <BNav back="#education" />

    <PB>

      <div class="row mb-5">

        <div class="card col-sm-12 col-lg-8 bg-light border-0">            
          <div class="card-body">
            <div class="card-header text-light bg-dark mb-3 rounded-0">
              <div class="col-sm-12 text-center py-1">
                  <h1 class="px-5 fs-3">{{$page.cert.title}}</h1>
              </div>
            </div>
            <div>
              <img :src="$page.cert.url" :alt="$page.cert.title+' certificate'" class="img-fluid border border-dark border-1 rounded-0" />
            </div>
              
          </div>
        </div>

        <div class="card col-sm-12 col-lg-4 bg-light border-0">
          <div class="card-body">
            <h2 class="card-header text-light bg-dark rounded-0 text-center py-3 mb-3 fs-3">Other Training</h2>
            <ul class="list-group list-group-flush">
              <g-link v-for="edge in $page.certs.edges" :key="edge.node.id" :to="'certification/'+edge.node.slug" class="text-dark text-decoration-none">
                <li class="list-group-item list-group-item-action bg-light">
                  {{edge.node.title}}
                </li>
              </g-link>
            </ul>
          </div>
        </div>
      </div>
      
    </PB>

    
    <div class="my-5"></div>

    <Footer />
  </Layout>
</template>

<page-query>
query Cert($id: ID) {
  cert: contentfulCertification(id: $id) {
    title
    id
    url
    completedOn
  }

  certs: allContentfulCertification(sortBy: "completedOn", order: DESC) {
    edges {
      node {
        title
        id
        url
        completedOn
        slug
        updatedAt
      }
    }
  }
}
</page-query>

<script>
import BlogNavbar from '../components/Blog/BlogNavbar'
import PageHeader from '../components/PageHeader'
import PageBody from '../components/PageBody'

export default {
    components: {
        BNav: BlogNavbar,
        PH: PageHeader,
        PB: PageBody
    },
    data() {
        return {

        }
    }
}
</script>
