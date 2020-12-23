<template>
    <div class="card rounded-0 border border-dark collapse" :class="P" id="Programming">                    

        <table class="table bg-grey table striped table-hover text-start mb-0 border border-dark">
            <thead>
                <tr>
                    <th scope="col" class="ps-3">Programming Language</th>
                    <th scope="col" class="pe-3">Description</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="i in skills" v-bind:key="i.name" class="align-middle">
                    <td class="w-40 ps-3 text-start">{{i.name}}</td>
                    <td colspan="2" class="w-60 pe-3">{{i.description}}</td>
                </tr>

            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: ['P'],
    data(){
        return {
            P: "",
            skills: [
                        {
                            name: "VBA",
                            description: "description: 95%"
                        },
                        {
                            name: "Python",
                            description: "description: 90%"
                        },
                        {
                            name: "JavaScript",
                            description: "description: 70%"
                        },
                        {
                            name: "C++",
                            description: "description: 50%"
                        },
                        {
                            name: "Haskell",
                            description: "description: 50%"
                        }
                    ]
        }
    }
}
</script>