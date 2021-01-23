<template>
    <div id="education" class="bg-white py-5 border-top border-bottom border-dark border-2">
        <div class="row">
            <div class="col-sm-12 col-xl-6 offset-xl-3">
                <div class="card-body">
                    <h1 class="card-title pb-2 text-decoration-underline text-center">Education / Certifications</h1>
                </div>
            </div>

            <div class="card text-center col-sm-12 col-xl-6 offset-xl-3 text-white bg-grey border border-dark border-2 pb-2 rounded-0">
                <div class="card-header text-white bg-grey pb-1">
                    <ul class="nav nav-tabs nav-fill card-header-tabs">
                        <li class="nav-item border border-dark" data-bs-toggle="collapse" href="#CMA" role="button" aria-expanded="false" aria-controls="CMA" @click="ifClicked">
                            <a class="nav-link text-dark" :class="CMAa" aria-current="true" href="#">CMA</a>
                        </li>
                        <li class="nav-item border border-dark" data-bs-toggle="collapse" href="#MACC" role="button" aria-expanded="false" aria-controls="MACC" @click="ifClicked">
                            <a class="nav-link text-dark" :class="MACCa" aria-current="true" href="#">MAcc</a>
                        </li>
                        <li class="nav-item border border-dark" data-bs-toggle="collapse" href="#BSBA" role="button" aria-expanded="false" aria-controls="BSBA" @click="ifClicked">
                            <a class="nav-link text-dark" :class="BSBAa" aria-current="true" href="#">BS B.A.</a>
                        </li>
                        <li class="nav-item border border-dark" data-bs-toggle="collapse" href="#MBA" role="button" aria-expanded="false" aria-controls="MBA" @click="ifClicked">
                            <a class="nav-link text-dark" :class="MBAa" aria-current="true" href="#">Continuing Education</a>
                        </li>
                    </ul>
                </div>

                <div class="collapse card bg-dark text-white rounded-0 border border-dark border-2" :class="CMA" id="CMA">
                    <g-image src="https://i.imgur.com/eHiK7X6.jpg" alt="IMA Logo" class="card-img" />
                    <div class="card-img-overlay">
                        <h4 class="card-title pt-5 fw-bolder">Institute of Management Accountants</h4>
                        <p class="card-text fw-bolder">Certified Management Accountant (CMA)</p>
                        <a href="https://www.imanet.org/cma-certification?ssopc=1" target="_blank" class="btn bg-blue border border-dark border-2 rounded-0 fw-bolder text-white">Certification Details</a>
                    </div>
                </div>

                <div class="collapse card bg-dark text-white rounded-0 border border-dark border-2" :class="MACC" id="MACC">
                    <g-image src="https://i.imgur.com/wcyqzaF.jpg" alt="Stetson Campus" class="card-img" />
                    <div class="card-img-overlay">
                        <h4 class="card-title pt-5 fw-bolder">Stetson University</h4>
                        <p class="card-text fw-bolder">Masters of Accountancy</p>
                        <a href="https://catalog.stetson.edu/graduate/business-administration/master-accountancy/" target="_blank" class="btn bg-blue border border-dark border-2 rounded-0 fw-bolder text-white">Degree Details</a>
                    </div>
                </div>

                <div class="collapse card bg-dark text-white rounded-0 border border-dark border-2" :class="BSBA" id="BSBA">
                    <g-image src="https://i.imgur.com/Piql21l.jpg" alt="USCU Campus" class="card-img" />
                    <div class="card-img-overlay">
                        <h4 class="card-title pt-5 fw-bolder">University of South Carolina - Upstate</h4>
                        <p class="card-text fw-bolder">Bachelor of Science in Business Administration with a Concentration in Accounting</p>
                        <a href="https://www.uscupstate.edu/academics/majors-programs/undergraduate-programs/business-administration-and-economics/" target="_blank" class="btn bg-blue border border-dark border-2 rounded-0 fw-bolder text-white">Degree Details</a>
                    </div>
                </div>

                <div class="collapse card rounded-0 border border-dark border-2" :class="MBA" id="MBA">
                    <table class="table table-striped table-hover">
                        <thead class="card-title">
                            <tr>
                                <th scope="col">Course Title</th>
                                <th scope="col">Date Completed</th>
                                <th scope="col">View Certificate</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="edge in $page.certs.edges" v-bind:key="edge.node.id" >
                                <th>{{edge.node.title}}</th>
                                <th>{{edge.node.completedOn}}</th>
                                <th>
                                    <g-link :to="'certification/' + edge.node.slug" class="text-dark">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-binoculars-fill" viewBox="0 0 16 16">
                                            <path d="M4.5 1A1.5 1.5 0 0 0 3 2.5V3h4v-.5A1.5 1.5 0 0 0 5.5 1h-1zM7 4v1h2V4h4v.882a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V13H9v-1.5a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5V13H1V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882V4h4zM1 14v.5A1.5 1.5 0 0 0 2.5 16h3A1.5 1.5 0 0 0 7 14.5V14H1zm8 0v.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5V14H9zm4-11H9v-.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5V3z"/>
                                        </svg>
                                    </g-link>
                                </th>
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
            console.log(ele)

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

            if (ele == "Continuing Education") {
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
img {
   object-fit: cover;
   opacity: 0.3;
   height: 30vh;
   width: 100%;
   background: #000;
}

.bg-grey {
    background-color: rgba(212,212,212,1);
}

.bg-blue {
    background-color: rgba(0, 148, 181, .9);
}
</style>