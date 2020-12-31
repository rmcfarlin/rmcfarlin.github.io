<template>
  <Layout>
    <BNav />
        <PB>
            <PH noBack=true title="What I'm Working On..." />
            <div class="row py-4 px-4">
                <div class="card col-sm-12 col-lg-5 mx-auto text-center">
                    <div class="card-body">
                        <h4 class="card-header bg-white mb-2 pb-3">Resources</h4>
                        <ul class="list-group">
                            <li v-for="item in $page.allContentfulLink.edges" v-bind:key="item.node.slug" class="list-group-item border-0">
                                <g-link :to="'/'+item.node.slug" class="card-text bg-white fs-6 text-dark text-capitalize">{{item.node.name}}</g-link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="card col-sm-12 col-lg-5 mx-auto text-center">
                    <div class="card-body">
                        <h4 class="card-header bg-white mb-2 pb-3">Blog</h4>
                        <ul class="list-group">
                            <li v-for="edge in $page.allContentfulBlog.edges" v-bind:key="edge.node.path" class="list-group-item border-0">
                                <g-link :to="'blog/'+edge.node.slug" class="card-text bg-white fs-6 text-dark">{{edge.node.title}}</g-link>
                            </li>
                        </ul>                                        
                    </div>
                </div>
            </div>
        </PB>
    <Footer />
  </Layout>
</template>

<page-query>
query Home {
    allContentfulLink {
        edges {
            node {
                name
                slug
            }
        }
    }

    allContentfulBlog(sortBy: "updatedAt", order: DESC) {
        edges {
            node {
                id
                title
                slug
                date
                updatedAt
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

<style scoped>
.bg-over {
    height: 100vh !important;
}
</style>