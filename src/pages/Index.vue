<template>
  <Layout>
    <Navbar />
    <Hero />
    <About />
    <Work />
    <Education :certs="$page.certs.edges"/>
    <Skills />
    <Values />
    <Footer />

    <!-- Learn how to use images here: https://gridsome.org/docs/images -->
    <!-- <g-image alt="Example image" src="~/favicon.png" width="135" /> -->

  </Layout>
</template>

<page-query>
query {
  certs: allContentfulCertification(sortBy: "completedOn", order: DESC) {
        edges {
        node {
            title
            id
            completedOn
            slug
            url
        }
        }
    }
}
</page-query>

<script>
export default {

}
</script>

