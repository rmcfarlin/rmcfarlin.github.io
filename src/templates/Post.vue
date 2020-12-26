<template>
  <Layout>
    <Navbar />

    <div class="container mt-5" style="height: 100vh">
      <div class="pt-3">
        <h1 class="pt-5">{{$page.post.title}}</h1>

        <div class="pt-4" v-html="$page.post.content" />
      </div>
    </div>

    <Footer />
  </Layout>
</template>

<page-query>
query Post ($path: String!) {
    post: post (path: $path) {
        title
        content
    }
}
</ page-query>
