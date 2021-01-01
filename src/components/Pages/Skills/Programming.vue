<template>
    <div class="card rounded-0 border border-dark collapse" :class="P" id="Programming">                    

        <table class="table bg-grey table striped table-hover text-start mb-0 border border-dark">
            <thead>
                <tr>
                    <th scope="col" class="ps-3">Programming Language</th>
                    <th scope="col" class="pe-3">Experience</th>
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
                            description: "File system maniupulation, classes, loops, conditionals, PDF conversion"
                        },
                        {
                            name: "Python",
                            description: "Django, Pandas, tkinter, Selenium, classes, loops, conditionals"
                        },
                        {
                            name: "JavaScript",
                            description: "Vue, node, classes, loops, conditionals"
                        }
                    ]
        }
    }
}
</script>