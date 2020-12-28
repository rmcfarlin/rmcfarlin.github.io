<template>
  <Layout>
    <BNav />
        <div class="container py-3 my-3 text-dark">
            <div class="bg-over">
                <div class="mt-3 pt-5 row mx-auto">
                    <!-- <div class="col-sm-12 col-lg-4">
                        <div class="mt-5 card mx-auto" style="width: 18rem;">
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div> -->
                    <div class="card bg-light rounded-0">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-12">
                                    <h2 class="card-header bg-light text-center">About Me</h2>
                                </div>
                            </div>
                            <div class="row py-4 px-4">
                                <div class="card col-sm-12 col-lg-5 mx-auto text-center">
                                    <div class="card-body">
                                        <h4 class="card-header bg-white mb-3">Resources</h4>
                                        <ul class="list-group">
                                            <li v-for="item in $page.allResource.edges" v-bind:key="item.node.path" class="list-group-item border-0">
                                                <g-link v-if="item.node.tag == 'resources' || 'books'" :to="item.node.path" class="card-text bg-white fs-6 text-dark">{{item.node.title}}</g-link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="card col-sm-12 col-lg-5 mx-auto text-center">
                                    <div class="card-body">
                                        <h4 class="card-header bg-white mb-3">Blog</h4>
                                        <ul class="list-group">
                                            <li v-for="edge in $page.allContentfulBlog.edges" v-bind:key="edge.node.path" class="list-group-item border-0">
                                                <g-link :to="'blog/'+edge.node.slug" class="card-text bg-white fs-6 text-dark">{{edge.node.title}}</g-link>
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
query Home {
    allPost {
        edges {
            node {
                path
                title
                tag
                date
            }
        }
    }

    allContentfulBlog {
        edges {
            node {
                id
                title
                slug
                date
            }
        }
    }

    allResource {
        edges {
            node {
                path
                title
                tag
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