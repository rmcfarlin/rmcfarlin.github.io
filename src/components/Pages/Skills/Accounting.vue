<template>
    <div class="card rounded-0 border border-dark" :class="A" id="Accounting">                    

        <table class="table bg-grey table striped table-hover text-start mb-0 border border-dark">
            <thead>
                <tr>
                    <th scope="col" class="ps-3">Strategic Skill</th>
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
    props: ['A'],
    data(){
        return {
            skills: [
                    {
                        name: "Financial Statements",
                        description: "Preparation, creation, and analysis of financial statements."
                    },
                    {
                        name: "Data Modeling",
                        description: "Creation, connecting, templating of data to be used in business reporting and decision making."
                    },
                    {
                        name: "Data Analysis",
                        description: "Ability to strategically mold and view data in a way that enhances the ability to make educated business decisions."
                    },
                    {
                        name: "Budgeting",
                        description: "Preparation and maintenance of business planning data to be used while aiding and controlling business operations"
                    },
                    {
                        name: "Cash Flow Management",
                        description: "Ability to prepare and consolidate multiple steams of receivables and payables into a consolidated and accurate forecast of cash."
                    },
                    {
                        name: "Inventory Management",
                        description: "Experience managing monthly inventory counts."
                    }
            ]
        }
    }
}
</script>