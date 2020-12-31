<template>
    <div class="row card-header text-light bg-dark">
        <div class="col-sm-12 d-flex justify-content-between">
            <a :href="'/'+back" class="rounded-0 btn btn-primary btn-lg">Back</a>
            <h2 class="pe-5">{{title}}</h2>
            <h2 class="ps-4"></h2>
        </div>
    </div>
</template>

<script>
export default {
    props: ['title', 'back']
}
</script>