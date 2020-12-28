<template>
    <div class="card rounded-0 border border-dark collapse" :class="S" id="Software">                    

        <table class="table bg-grey table striped table-hover text-start mb-0 border border-dark">
            <thead>
                <tr>
                    <th scope="col" class="ps-3">Software</th>
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
    props: ['S'],
    data(){
        return {
            S: "",
            skills: [
                        {
                            name: "Excel",
                            description: "Highly proficient writing VBA code from scratch to automate processes. Ability to perform and use v-lookups, sum-ifs, pivot tables, etc."
                        },
                        {
                            name: "Power BI",
                            description: "Years of experience building powerful custom dashboards to enhance data visibility and aid in decision making."
                        },
                        {
                            name: "Microsoft Office",
                            description: "Experienced with all office products."
                        },
                        {
                            name: "ADP Payroll",
                            description: "Experience running/approving payroll and creating custom reports."
                        },
                        {
                            name: "SAP",
                            description: "Subject Matter Expert during SAP implementation. Years of experience in ERP systems that operate in a similar manner."
                        }
                    ]
        }
    }
}
</script>