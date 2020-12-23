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
                        <li class="nav-item border border-dark" :class="Aa"  data-bs-toggle="collapse" href="#Accounting" role="button" aria-expanded="false" aria-controls="Accounting" @click="ifIsClicked">
                            <a class="nav-link text-dark fw-bolder" aria-current="true" href="#">Accounting</a>
                        </li>
                        <li class="nav-item border border-dark" :class="Sa"  data-bs-toggle="collapse" href="#Software" role="button" aria-expanded="false" aria-controls="Software" @click="ifIsClicked">
                            <a class="nav-link text-dark fw-bolder" aria-current="true" href="#">Software / Systems</a>
                        </li>
                        <li class="nav-item border border-dark" :class="Pa"  data-bs-toggle="collapse" href="#Programming" role="button" aria-expanded="false" aria-controls="Programming" @click="ifIsClicked">
                            <a class="nav-link text-dark fw-bolder" aria-current="true" href="#">Programming Languages</a>
                        </li>
                    </ul>
                </div>

                <Accounting :A="A" />
                <Software :S="S" />
                <Programming :P="P" />

            </div>

        </div>

        
    </div>
</template>


<script>
import Accounting from './Skills/Accounting.vue'
import Software from './Skills/Software.vue'
import Programming from './Skills/Programming.vue'

export default {
    components: {
        Accounting: Accounting,
        Software: Software,
        Programming: Programming
    },
    data() {
        return {
            
            A: "show",
            S: "",
            P: "",
            Aa: "bg-grey",
            Sa: "",
            Pa: "",

        }
    },
    methods: {
        ifIsClicked(e) {
            var ele = e.target.innerHTML

            if (ele == "Accounting") {
                if (this.A != "show") {
                    this.A = "show"
                    this.Aa = "bg-grey"
                } 

                this.S = "collapse"
                this.P = "collapse"
                this.Sa = "bg-white"
                this.Pa = "bg-white"
            }

            if (ele == "Software / Systems") {
                if (this.S != "show") {
                    this.S = "show"
                    this.Sa = "bg-grey"
                } 

                this.A = "collapse"
                this.P = "collapse"
                this.Aa = "bg-white"
                this.Pa = "bg-white"
            }

            if (ele == "Programming Languages") {
                if (this.P != "show") {
                    this.P = "show"
                    this.Pa = "bg-grey"
                } 

                this.A = "collapse"
                this.S = "collapse"
                this.Aa = "bg-white"
                this.Sa = "bg-white"
            }
        }
    }
}
</script>

<style>
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