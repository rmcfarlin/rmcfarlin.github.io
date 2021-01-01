<template>
  <Layout>
    <BNav />

    <div class="container mt-5">
      <div class="row" style="height: 100vh">
        <div class="card col-sm-12 col-lg-8">            
          <div class="card-body">
            <div class="card-header text-light bg-dark mt-5 rounded-0">
              <div class="col-sm-12 d-flex justify-content-between py-1">
                  <a href="/portfolio" class="rounded-0 btn btn-primary btn-lg">Back</a>
                  <h2 class="pe-5">{{$page.post.title}}</h2>
                  <h2 class="ps-4"></h2>
              </div>
            </div>
          </div>
        </div>

<!-- SIDEBAR -->
        <div class="ms-2 card col-sm-12 offset-lg-1 col-lg-3">
          <div class="card-body">
            <h2 class="card-header text-light bg-dark rounded-0 mt-5 text-center py-3 mb-3">Previous Posts</h2>
            <ul class="list-group list-group-flush text-center">
              <li v-for="edge in $page.allContentfulBlog.edges" :key="edge.node.id" class="list-group-item list-group-item-action">
                <g-link :to="'blog/'+edge.node.slug" class="text-dark text-decoration-none">{{edge.node.title}}</g-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </Layout>
</template>

<page-query>
query Blog($id: ID) {
  post: contentfulBlog(id: $id) {
    title
    content(html: true)
    id
    updatedAt
  }

  allContentfulBlog(sortBy: "updatedAt", order: DESC) {
    edges {
      node {
        id
        title
        slug
        updatedAt
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
