<template>
  <Layout>
    <BNav back="book" />

    <PB>

      <div class="row">
        <div class="card col-sm-12 col-lg-8 bg-light border-0">            
          <div class="card-body">
            <div class="card-header text-light bg-dark mb-3 rounded-0">
              <div class="col-sm-12 text-center py-1">
                  <h1 class="px-5 fs-3">{{$page.book.title}}</h1>
              </div>
            </div>
            <div>
              <img :v-show="$page.book.image.file.url != null" :src="$page.book.image.file.url" :alt="$page.book.title+' Book Cover'" class="float-sm-start pe-3" height="300px" width="200px">
              <div class="card-text mx-3" v-html="$page.book.summary" />
            </div>
              
          </div>
        </div>

<!-- SIDEBAR -->
        <div class="ms-2 card col-sm-12 offset-lg-1 col-lg-3 bg-light border-0">
          <div class="card-body">
            <h2 class="card-header text-light bg-dark rounded-0 text-center py-3 mb-3 fs-3">Other Books</h2>
            <ul class="list-group list-group-flush">
              <g-link v-for="edge in $page.books.edges" :key="edge.node.id" :to="'book/'+edge.node.slug" class="text-dark text-decoration-none">
                <li class="list-group-item list-group-item-action bg-light">
                  {{edge.node.title}}
                </li>
              </g-link>
            </ul>
          </div>
        </div>
      </div>
    </PB>

    <Footer />
  </Layout>
</template>

<page-query>
query Book($id: ID) {
  book: contentfulBook(id: $id) {
    title
    author
    id
    summary(html: true)
    updatedAt
    image {
      file {
        url
      }
    }
  }

  books: allContentfulBook {
    edges {
      node {
        id
        title
        author
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
