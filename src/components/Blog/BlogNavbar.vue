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
              <a class="nav-link text-white" role="button" :href="item[1]" aria-expanded="false" target="__blank">
                {{item[0]}}
              </a>
            </li>

          </ul>

          <ul class="navbar-nav nav mb-2 mb-lg-0 d-flex">
            <a v-show="!showBack" :href="'/'+back" class="rounded-0 btn btn-primary text-white btn-lg border-white">Back</a>
          </ul>
        </div>
      </div> 
    </nav>
</template>

<script>
export default {
  data() {
    return {
      headerList: [
        ['Home', '/'],
        ['My Work', '/portfolio'],        
        ['LinkedIn', 'https://www.linkedin.com/in/rdmcfarlin/'],
        ['GitHub', 'https://github.com/rmcfarlin']
      ]
    }
  },
  props: ['back', 'showBack']
}
</script>
