<template>
  <Layout>
    <BNav showBack="true" />
        <PB>
            <PH title="What I'm Working On..." />

            <div class="row py-4 px-4">
                <div class="col-sm-12 col-lg-5 mx-auto rounded-0 text-center border-dark">
                    <div class="card rounded-0 border-dark">
                        <div class="card-body">
                            <h4 class="card-header bg-white mb-2 pb-3">Tableau Repository</h4>
                            <ul class="list-group">
                                <li v-for="item in $page.reports.edges" v-bind:key="item.node.id" class="list-group-item border-0">
                                    <g-link :to="item.node.url" class="card-text bg-white fs-6 text-dark text-capitalize">{{item.node.title}}</g-link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="card mt-4 rounded-0 border-dark">
                        <div class="card-body">
                            <h4 class="card-header bg-white mb-2 pb-3">Resources</h4>
                            <ul class="list-group">
                                <li v-for="item in $page.links.edges" v-bind:key="item.node.slug" class="list-group-item border-0">
                                    <g-link :to="'/'+item.node.slug" class="card-text bg-white fs-6 text-dark text-capitalize">{{item.node.name}}</g-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="card col-sm-12 col-lg-5 mx-auto text-center rounded-0 border-dark">
                    <div class="card-body">
                        <h4 class="card-header bg-white mb-2 pb-3">Blog</h4>
                        <!-- <div class="mb-3">
                            <input type="text" class="form-control bg-dark rounded-0 text-white text-center" id="blogSearch" placeholder="Search Blog Posts">
                        </div> -->
                        <ul class="list-group">
                            <li v-for="edge in $page.posts.edges" v-bind:key="edge.node.path" class="list-group-item border-0">
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
query {
    links: allContentfulLink {
        edges {
            node {
                name
                slug
            }
        }
    }

    posts: allContentfulBlog(sortBy: "updatedAt", order: DESC) {
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

    reports: allContentfulTableau(sortBy: "updatedAt", order: DESC) {
        edges {
            node {
                id
                title
                slug
                url
                date
                updatedAt
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