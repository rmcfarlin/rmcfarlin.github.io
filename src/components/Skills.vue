<template>
    <div id="skills" class="bg-grey py-5 border-top border-bottom border-dark border-2">
        <div class="row">
            <div class="col-sm-12 col-xl-4 offset-xl-4">
                <div class="card-body">
                    <h1 class="card-title pb-2 text-decoration-underline text-center">Skills</h1>
                </div>
            </div>

            <!-- Start of Skill Card Layout -->
            <div class="card text-center col-sm-12 col-xl-6 offset-xl-3 text-white border border-dark border-2 pb-2 rounded-0">
                <div class="card-header text-dark pb-1">
                    <ul class="nav nav-tabs nav-fill card-header-tabs border border-dark">
                        <li v-for="item in items" v-bind:key="item" class="nav-item border border-dark bg-grey" data-bs-toggle="collapse" :href="item.href" role="button" aria-expanded="false" :aria-controls="item.name" @click="ifClicked">
                            <a class="nav-link text-dark fw-bolder" :class="item.class" aria-current="true" href="#">{{item.name}}</a>
                        </li>
                    </ul>
                </div>

                <!-- ACCOUNTING SKILLS SECTION -->
                <div v-for="item in items" v-bind:key="item"  class="collapse card bg-grey rounded-0 border border-dark" :class="item.name" :id="item.id">                    

                    <table class="table bg-grey table striped table-hover text-start mb-0 border border-dark">
                        <thead>
                            <tr>
                                <th scope="col" class="ps-3">Strategic Skill</th>
                                <th scope="col" class="pe-3">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in item.skills" v-bind:key="item.name" class="align-middle">
                                <td class="w-40 ps-3 text-start">{{item.name}}</td>
                                <td colspan="2" class="w-60 pe-3">{{item.description}}</td>
                            </tr>

                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            items: {
                skills: {
                    name: "Accounting",
                    id: "Accounting",
                    href: "#Accounting",
                    class: "Aa",
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
                    ],
                },
                software: {
                    name: "Software / Systems",
                    id: "Software",
                    href: "#Software",
                    class: "Sa",
                    skills: [
                        {
                            name: "Excel",
                            description: "Highly proficient writing VBA code from scratch to automate processes. Ability to perform and use v-lookups, sum-ifs, pivot tables, etc."
                        },
                        {
                            name: "Power BI",
                            description: "Experience managing monthly inventory counts."
                        },
                        {
                            name: "Microsoft Office",
                            description: "Experience managing monthly inventory counts."
                        },
                        {
                            name: "SAP",
                            description: "Experience managing monthly inventory counts."
                        },
                        {
                            name: "ADP Payroll",
                            description: "Experience managing monthly inventory counts."
                        }
                    ],
                },
                programming: {
                    name: "Programming Languages",
                    id: "Programming",
                    href: "#Programming",
                    class: "Pa",
                    skills: [
                        {
                            name: "VBA",
                            score: 95,
                            width: "width: 95%"
                        },
                        {
                            name: "Python",
                            score: 90,
                            width: "width: 90%"
                        },
                        {
                            name: "JavaScript",
                            score: 70,
                            width: "width: 70%"
                        },
                        {
                            name: "C++",
                            score: 50,
                            width: "width: 50%"
                        },
                        {
                            name: "Haskell",
                            score: 50,
                            width: "width: 50%"
                        }
                    ],
                },
            },

            A: "show",
            S: "",
            P: "",
            Aa: "active",
            Sa: "",
            Pa: "",
        }
    },
    methods: {
        ifClicked(e) {
            var ele = e.target.innerHTML

            if (ele == "Accounting") {
                if (this.A == "show") {
                    this.A = ""
                    this.Aa = ""

                } else {
                    this.A = "show"
                    this.Aa = "active"
                }

                this.S = ""
                this.P = ""
                this.Sa = ""
                this.Pa = ""
            }

            if (ele == "Software / Systems") {
                if (this.S == "show") {
                    this.S = ""
                    this.Sa = ""
                } else {
                    this.S = "show"
                    this.Sa = "active"
                }

                this.A = ""
                this.P = ""
                this.Aa = ""
                this.Pa = ""
            }

            if (ele == "Programming Languages") {
                if (this.P == "show") {
                    this.P = ""
                    this.Pa = ""
                } else {
                    this.P = "show"
                    this.Pa = "active"
                }

                this.A = ""
                this.S = ""
                this.Aa = ""
                this.Sa = ""
            }
        }
    }
}
</script>

<style scoped>
.bg-grey {
    background-color: rgba(212,212,212,1);
}

.bg-white {
    background-color: rgba(255,255,255,1);
}

.activated {
    background-color: rgba(212,212,212,1) !important;
}

.pb {
    height: 40px;
}

.w-40 {
    width: 40%;
}
.w-60 {
    width: 60%;
}
</style>