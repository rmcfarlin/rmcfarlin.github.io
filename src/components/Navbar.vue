<template>
    <nav id="navbar" class="header navbar navbar-expand-lg navbar-dark bg-dark px-5 fixed-top">
      <div class="container-fluid">
        <g-link to="/" class="navbar-brand fs-4">Robert McFarlin</g-link>
        <button class="col-link navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="col-link navbar-toggler-icon"></span>
        </button>
        <div class="px-4 collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto nav mb-2 mb-lg-0">

            <!-- Loop through array data to create menu -->
            <li class="nav-item my-2 mx-1" v-for="item in headerList" v-bind:key="item[0]">
              <a class="nav-link text-white" role="button" :href="item[1]" aria-expanded="false">
                {{item[0]}}
              </a>
            </li>

          </ul>

          <!-- <ul class="navbar-nav nav-pills nav mb-2 mb-lg-0 d-flex">
          </ul> -->
        </div>
      </div> 
    </nav>
</template>

<script>
export default {
  data() {
    return {
      headerList: [
        ['About Me', '#about'],
        ['Work History', '#work'],
        ['Education', '#education'],
        ['Skills', '#skills'],
        ['Values', '#values'],
      ]
    }
  }
}
</script>

<style scoped>
.hide-me {
  visibility: hidden;
}

@media only screen and (min-width: 1000px) {
  .hide-me {
      visibility: visible;
  }
}
</style>
