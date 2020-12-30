<template>
  <Layout>
    <BNav />
        <div class="container py-3 my-3 text-dark">
            <div class="bg-over">
                <div class="mt-3 pt-5 row mx-auto">
                    <div class="card bg-light rounded-0">
                        <div class="card-body">
                            <div class="row card-header text-light bg-dark">
                                <div class="col-sm-12 d-flex justify-content-center">
                                    <a href="/more" class="rounded-0 btn btn-primary btn-lg me-auto">Back</a>
                                    <h2 class="justify-content-center me-auto">Books</h2>
                                    <span> </span>
                                </div>
                            </div>
                                <div class="card offset-sm-1 offset-lg-1 col-sm-11 col-lg-5 mx-auto text-center mt-5">
                                    <div class="card-body">
                                        <ul class="list-group">
                                            <li v-for="edge in $page.allContentfulBook.edges" v-bind:key="edge.node.id" class="list-group-item border-0">
                                                <g-link :to="'book/'+edge.node.slug" class="card-text bg-white fs-6 text-dark">{{edge.node.title}} by {{edge.node.author}}</g-link>
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
query Book { 
  allContentfulBook(sortBy: "updatedAt", order: DESC) {
    edges {
      node {
        updatedAt
        id
        title
        author
        slug
        date
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