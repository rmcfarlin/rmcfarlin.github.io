<template>
  <Layout>
    <BNav />
        <div class="cover">
            <div class="more-body">
                <div class="mt-5 pt-5 row mx-auto bg-light">
                    <div class="col-sm-12 col-lg-4">
                        <div class="mt-5 card mx-auto" style="width: 18rem;">
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>

                    <div class="mt-5 col-sm-12 col-lg-4">
                        <div class="card mx-auto" style="width: 18rem;">
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>

                    <div class="mt-5 col-sm-12 col-lg-4">
                        <div class="card mx-auto" style="width: 18rem;">
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>

                </div>



            </div>
        </div>
    <Footer />
  </Layout>
</template>

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
.more-body {
    background-image: url("https://starsinphotos.files.wordpress.com/2013/04/southern-cross-region-1s.jpg");
    background-repeat: no-repeat;
    height: 100vh;
    width: 100vw;
    background-color:#000;
    background-position: center;
    background-size: cover;
    opacity: 0.1;
}

.cover {
    height: 100vh;
    width: 100vw;
    background: black;
    overflow: hidden;
}
</style>