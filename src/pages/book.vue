<template>
  <Layout>
    <BNav />
        <div class="container py-3 my-3 text-dark">
            <div class="bg-over">
                <div class="mt-3 pt-5 row mx-auto">
                    <div class="card bg-light rounded-0">
                        <div class="card-body">
                            <div class="row card-header text-light bg-dark">
                                <div class="col-sm-12 d-flex justify-content-between">
                                    <a href="/portfolio" class="rounded-0 btn btn-primary btn-lg">Back</a>
                                    <h2 class="pe-5">My Favorite Books</h2>
                                    <h2 class="ps-4"></h2>
                                </div>
                            </div>
                                
                                <div class="card col-sm-12 col-lg-10 mx-auto mt-5">
                                    <div class="card-body table-responsive px-4">
                                        <table class="table table-hover table-striped">
                                            <thead class="table-dark">
                                                <tr>
                                                    <th scope="col">Title</th>
                                                    <th scope="col">Author</th>
                                                    <th scope="col">Summary</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="edge in $page.allContentfulBook.edges" v-bind:key="edge.node.id" >
                                                    <td>{{edge.node.title}}</td>
                                                    <td>{{edge.node.author}}</td>
                                                    <td class="text-center">
                                                        <g-link :to="'book/'+edge.node.slug" class="text-decoration-none text-center text-dark">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-journal-text" viewBox="0 0 16 16" >
                                                                <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                                                                <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                                                                <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
                                                            </svg>
                                                        </g-link>
                                                    </td>
                                                </tr>      
                                            </tbody>
                                        </table>
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