<template>
    <div id="skills" class="bg-grey py-5 border-top border-bottom border-dark border-2">
        <div class="row">
            <div class="col-sm-12 col-xl-4 offset-xl-4">
                <div class="card-body">
                    <h1 class="card-title pb-2 text-decoration-underline text-center">Skills</h1>
                </div>
            </div>

            <!-- Start of Skill Card Layout -->
            <div class="card text-center col-sm-12 col-xl-6 offset-xl-3 text-white bg-white border border-dark border-2 pb-2 rounded-0">
                <div class="card-header text-dark bg-white pb-1">
                    <ul class="nav nav-tabs nav-fill card-header-tabs">
                        <li class="nav-item border border-dark bg-dark" data-bs-toggle="collapse" href="#Accounting" role="button" aria-expanded="false" aria-controls="Accounting" @click="ifClicked">
                            <a class="nav-link text-white fw-bolder" :class="Accountinga" aria-current="true" href="#">Accounting / Reporting</a>
                        </li>
                        <li class="nav-item border border-dark" data-bs-toggle="collapse" href="#Software" role="button" aria-expanded="false" aria-controls="Software" @click="ifClicked">
                            <a class="nav-link text-dark" :class="MACCa" aria-current="true" href="#">Software / Systems</a>
                        </li>
                        <li class="nav-item border border-dark" data-bs-toggle="collapse" href="#Programming" role="button" aria-expanded="false" aria-controls="Programming" @click="ifClicked">
                            <a class="nav-link text-dark" :class="MACCa" aria-current="true" href="#">Programming Lanugages</a>
                        </li>
                    </ul>
                </div>

                <!-- ACCOUNTING SKILLS SECTION -->
                <div class="collapse card bg-dark text-white rounded-0 border-none" :class="Accounting" id="Accounting">                    

                    <table class="table table-dark mb-0 mt-1">
                        <tbody>
                            <tr v-for="item in skills" v-bind:key="item.name">
                                <td class="fs-3 w-40 ps-3 text-start">{{item.name}}</td>
                                <td colspan="2" class="w-60 pe-3">
                                    <div class="progress rounded-0 pb">
                                        <div class="progress-bar pb progress-bar-striped progress-bar-animated rounded-0 text-center" role="progressbar" :style="item.width" :aria-valuenow="item.score" aria-valuemin="0" aria-valuemax="100">
                                            <h3 class="align-middle">{{item.score}}%</h3>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>


                <!-- Software SKILLS SECTION -->
                <div class="collapse card bg-dark text-white rounded-0 border-none" :class="Software" id="Software">                    

                    <table class="table table-dark mb-0 mt-1">
                        <tbody>
                            <tr v-for="item in software" v-bind:key="item.name">
                                <td class="fs-3 w-40 ps-3 text-start">{{item.name}}</td>
                                <td colspan="2" class="w-60 pe-3">
                                    <div class="progress rounded-0 pb">
                                        <div class="progress-bar pb progress-bar-striped progress-bar-animated rounded-0 text-center" role="progressbar" :style="item.width" :aria-valuenow="item.score" aria-valuemin="0" aria-valuemax="100">
                                            <h3 class="align-middle">{{item.score}}%</h3>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>

                <!-- Programming SKILLS SECTION -->
                <div class="collapse card bg-dark text-white rounded-0 border-none" :class="Programming" id="Programming">                    

                    <table class="table table-dark mb-0 mt-1">
                        <tbody>
                            <tr v-for="item in programming" v-bind:key="item.name">
                                <td class="fs-3 w-40 ps-3 text-start">{{item.name}}</td>
                                <td colspan="2" class="w-60 pe-3">
                                    <div class="progress rounded-0 pb">
                                        <div class="progress-bar pb progress-bar-striped progress-bar-animated rounded-0 text-center" role="progressbar" :style="item.width" :aria-valuenow="item.score" aria-valuemin="0" aria-valuemax="100">
                                            <h3 class="align-middle">{{item.score}}%</h3>
                                        </div>
                                    </div>
                                </td>
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
            skills: [
                {
                    name: "Financial Statements",
                    score: 99,
                    width: "width: 99%"
                },
                {
                    name: "Data Modeling",
                    score: 95,
                    width: "width: 95%"
                },
                {
                    name: "Data Analysis",
                    score: 95,
                    width: "width: 95%"
                },
                {
                    name: "Budgeting",
                    score: 95,
                    width: "width: 95%"
                },
                {
                    name: "Cash Flow Management",
                    score: 90,
                    width: "width: 90%"
                },
                {
                    name: "Inventory Management",
                    score: 80,
                    width: "width: 80%"
                }
            ],
            software: [
                {
                    name: "Excel (VBA, Vlookup, etc)",
                    score: 95,
                    width: "width: 95%"
                },
                {
                    name: "Power BI",
                    score: 90,
                    width: "width: 90%"
                },
                {
                    name: "Microsoft Office",
                    score: 90,
                    width: "width: 90%"
                },
                {
                    name: "SAP",
                    score: 90,
                    width: "width: 90%"
                },
                {
                    name: "ADP Payroll",
                    score: 90,
                    width: "width: 90%"
                }
            ],
            programming: [
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

            CMA: "show",
            MBA: "",
            MACC: "",
            BSBA: "",
            CMAa: "active",
            MBAa: "",
            MACCa: "",
            BSBAa: ""
        }
    },
    methods: {
        ifClicked(e) {
            var ele = e.target.innerHTML

            if (ele == "CMA") {
                if (this.CMA == "show") {
                    this.CMA = ""
                    this.CMAa = ""

                } else {
                    this.CMA = "show"
                    this.CMAa = "active"
                }

                this.MBA = ""
                this.MACC = ""
                this.BSBA = ""
                this.MBAa = ""
                this.MACCa = ""
                this.BSBAa = ""
            }

            if (ele == "MBA") {
                if (this.MBA == "show") {
                    this.MBA = ""
                    this.MBAa = ""
                } else {
                    this.MBA = "show"
                    this.MBAa = "active"
                }

                this.CMA = ""
                this.MACC = ""
                this.BSBA = ""
                this.CMAa = ""
                this.MACCa = ""
                this.BSBAa = ""
            }

            if (ele == "MAcc") {
                if (this.MACC == "show") {
                    this.MACC = ""
                    this.MACCa = ""
                } else {
                    this.MACC = "show"
                    this.MACCa = "active"
                }

                this.CMA = ""
                this.MBA = ""
                this.BSBA = ""
                this.CMAa = ""
                this.MBAa = ""
                this.BSBAa = ""
            }

            if (ele == "BS B.A.") {
                if (this.BSBA == "show") {
                    this.BSBA = ""
                    this.BSBAa = ""
                } else {
                    this.BSBA = "show"
                    this.BSBAa = "active"
                }

                this.CMA = ""
                this.MACC = ""
                this.MBA = ""
                this.CMAa = ""
                this.MACCa = ""
                this.MBAa = ""
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