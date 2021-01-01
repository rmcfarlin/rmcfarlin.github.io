<template>
    <div class="row card-header rounded-0 text-light bg-dark">
        <div v-if="!noBack" class="col-sm-12 d-flex justify-content-between">
            <a :href="'/'+back" class="rounded-0 btn btn-primary btn-lg">Back</a>
            <h2 class="pe-5">{{title}}</h2>
            <h2 class="ps-4"></h2>
        </div>
        <div v-else class="col-sm-12 text-center">
            <h2 class="pe-5">{{title}}</h2>
        </div>
    </div>
</template>

<script>
export default {
    props: ['title', 'back', 'noBack']
}
</script>