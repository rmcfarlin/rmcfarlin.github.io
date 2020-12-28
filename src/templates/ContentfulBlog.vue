<template>
  <Layout>
    <BNav />

    <div class="container mt-5" style="height: 100vh">
      <div class="row">
        <div class="pt-3 col-sm-12 col-lg-8">
          <h1 class="pt-5">{{$page.contentfulBlog.title}}</h1>
          <hr>

          <div class="pt-4" v-html="$page.contentfulBlog.content" />
        </div>

<!-- SIDEBAR -->
        <div class="pt-3 col-sm-12 col-lg-4">
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
        </div>
      </div>
    </div>

    <Footer />
  </Layout>
</template>

<page-query>
query Blog($id: ID) {
  contentfulBlog(id: $id) {
    title
    content(html: true)
    id
  }

  allContentfulBlog {
    edges {
      node {
        id
        title
        slug
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
