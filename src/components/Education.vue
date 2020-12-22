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
                        <li class="nav-item border border-dark" data-bs-toggle="collapse" href="#MBA" role="button" aria-expanded="false" aria-controls="MBA" @click="ifClicked">
                            <a class="nav-link text-dark" :class="MBAa" aria-current="true" href="#">MBA <span class="fst-italic">(In Progress)</span></a>
                        </li>
                        <li class="nav-item border border-dark" data-bs-toggle="collapse" href="#MACC" role="button" aria-expanded="false" aria-controls="MACC" @click="ifClicked">
                            <a class="nav-link text-dark" :class="MACCa" aria-current="true" href="#">MAcc</a>
                        </li>
                        <li class="nav-item border border-dark" data-bs-toggle="collapse" href="#BSBA" role="button" aria-expanded="false" aria-controls="BSBA" @click="ifClicked">
                            <a class="nav-link text-dark" :class="BSBAa" aria-current="true" href="#">BS B.A.</a>
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

                <div class="collapse card bg-dark text-white rounded-0 border border-dark border-2" :class="MBA" id="MBA">
                    <g-image src="https://i.imgur.com/YkTKi6m.jpg" alt="LSUS Campus" class="card-img" />
                    <div class="card-img-overlay">
                        <h4 class="card-title pt-5 fw-bolder">Louisiana State University - Shreveport</h4>
                        <p class="card-text fw-bolder">Masters of Business Administration with a Concentration in Data Analytics</p>
                        <a href="https://online.lsus.edu/online/pages/bus/?lsid=bing&lssid=lsus_bus_mba_m_sr_gen&utm_source=bing&utm_medium=cpc&utm_term=mba%20lsu&utm_content=Lsu%20Mba&utm_campaign=lsus_bus_mba_m_sr_gen-B-X-E-N-ALL-LSUBP&campid=73053480&groupid=2720960977&type=be&network=o&device=c&adid=13762561346&fdid=&tgid=kwd-27019475161:loc-4123&lphys=80997&linst=&msclkid=68e4ef603354171ef1eab080b02ff400" target="_blank" class="btn bg-blue border border-dark border-2 rounded-0 fw-bolder text-white">Degree Details</a>
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

            if (ele == 'MBA <span data-v-2a424ba8="" class="fst-italic">(In Progress)</span>') {
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

            if (ele == '(In Progress)') {
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