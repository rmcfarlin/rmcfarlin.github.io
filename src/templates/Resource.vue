<template>
  <Layout>
    <BNav />

    <div class="container mt-5" style="height: 100vh">
      <div class="pt-3">
         
        <div class="row">
          <div class="col-sm-6 col-lg-6">
            <h1 class="pt-5">{{$page.resource.title}}</h1>
          </div>
          <div class="col-sm-6 col-lg-6 mr-auto">
            <g-link to="/more" class="btn btn-primary">Back</g-link>
          </div>
        </div>

        <div class="pt-4" v-html="$page.resource.content" />
      </div>
    </div>

    <Footer />
  </Layout>
</template>

<page-query>
query Resource ($path: String!) {
    resource: resource (path: $path) {
        title
        content
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
