<template>
    <div id="work" class="bg-blue py-5 border-top border-bottom border-dark border-2">
        <div class="row">
            <div class="col-sm-12 col-xl-6 offset-xl-3">
                <div class="card-body">
                    <h1 class="card-title pb-5 text-decoration-underline text-center">Work History</h1>

                    <!-- Accordion Start -->
                    <div class="accordion accordion-flush" id="WorkAccordion">

                        <!-- Work Item -->
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="HeadingOne">
                            <button class="accordion-button collapsed fs-2 fs-bold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                <div class="col text-start">
                                    <h3>RCM Industries, Inc.</h3>
                                </div>
                                <div class="col">
                                    <span class="fs-5 fst-italic text-end align-top">May 2014 - Present</span>
                                </div>
                            </button>
                            </h2>
                            <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="HeadingOne" data-bs-parent="#WorkAccordion">
                            <div class="accordion-body">
                                <RCM />
                            </div>
                            </div>
                        </div>

                        <!-- Work Item -->
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="HeadingTwo">
                            <button class="accordion-button collapsed fs-2 fs-bold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                <div class="col text-start">
                                    <h3>ScanSource, Inc.</h3>
                                </div>
                                <div class="col">
                                    <span class="fs-5 fst-italic text-end align-top">May 2011 - May 2014</span>
                                </div>
                            </button>
                            </h2>
                            <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="HeadingTwo" data-bs-parent="#WorkAccordion">
                            <div class="accordion-body">
                                <SS />
                            </div>
                            </div>
                        </div>

                        <!-- Work Item -->
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="HeadingThree">
                            <button class="accordion-button collapsed fs-2 fs-bold" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                <div class="col text-start">
                                    <h3>Bi-Lo</h3>
                                </div>
                                <div class="col">
                                    <span class="fs-5 fst-italic text-end align-top">June 2007 - May 2011</span>
                                </div>
                            </button>
                            </h2>
                            <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="HeadingThree" data-bs-parent="#WorkAccordion">
                            <div class="accordion-body">
                                <BiLo />
                            </div>
                            </div>
                        </div>

                    </div>


                </div>
            </div>
        </div>
    </div>
</template>

<script>
import RCM from './Work/RCM.vue'
import ScanSource from './Work/ScanSource.vue'
import BiLo from './Work/BiLo.vue'

export default {
    components: {
        RCM: RCM,
        SS: ScanSource,
        BiLo: BiLo
    }
}
</script>

<style scoped>
.bg-blue {
    background-color: rgba(212,212,212,1);
}
</style>