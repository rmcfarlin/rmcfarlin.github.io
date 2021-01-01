<template>
  <Layout>
    <BNav back="portfolio" />

    <div class="container mt-5">
      <div class="row" style="height: 100vh">
        <div class="card col-sm-12 col-lg-8 bg-light">            
          <div class="card-body">
            <div class="card-header text-light bg-dark mt-5 mb-3 rounded-0">
              <div class="col-sm-12 text-center py-1">
                  <h2 class="px-5">{{$page.post.title}}</h2>
              </div>
            </div>

            <div class="card-text mx-3" v-html="$page.post.content">
              
            </div>
          </div>
        </div>

<!-- SIDEBAR -->
        <div class="ms-2 card col-sm-12 offset-lg-1 col-lg-3 bg-light">
          <div class="card-body">
            <h2 class="card-header text-light bg-dark rounded-0 mt-5 text-center py-3 mb-3">Previous Posts</h2>
            <ul class="list-group list-group-flush text-center">
              <li v-for="edge in $page.allContentfulBlog.edges" :key="edge.node.id" class="list-group-item list-group-item-action bg-light">
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

<style>
.bg-white{
  background-color: #fff;
}
</style>
