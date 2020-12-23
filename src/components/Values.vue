<template>
    <div id="values" class="bg-white py-5 border-top border-bottom border-dark border-2">
        <div class="row pb-5">
            <div class="col-sm-12 col-xl-6 offset-xl-3">
                <div class="card-body">
                    <h1 class="card-title pb-2 text-decoration-underline text-center">Personal Values</h1>
                </div>
            </div>

            <div class="card text-center col-sm-12 col-xl-6 offset-xl-3 text-white bg-grey border border-dark border-2 py-2 rounded-0">

                <div id="values-caro" class="carousel slide border-bottom border-dark border-2" data-bs-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-bs-target="#values-caro" data-bs-slide-to="0" class="active"></li>
                        <li data-bs-target="#values-caro" data-bs-slide-to="1"></li>
                        <li data-bs-target="#values-caro" data-bs-slide-to="2"></li>
                        <li data-bs-target="#values-caro" data-bs-slide-to="3"></li>
                        <li data-bs-target="#values-caro" data-bs-slide-to="4"></li>
                    </ol>
                    <div class="carousel-inner" style="height: 50vh">
                        <div class="carousel-item active" data-bs-interval="3000">
                            <g-image src="https://i.imgur.com/9r808UD.jpg" class="d-block w-100 item-1" style="height: 50vh" alt="Business Image" />
                            <div class="carousel-caption">
                                <h5 class="text-white fs-1 text-center pb-5">Relentless pursuit of purposeful progress</h5>
                            </div>
                        </div>

                        <div class="carousel-item" data-bs-interval="3000">
                            <g-image src="https://i.imgur.com/u7SChA3.jpg" class="d-block w-100 item-1" style="height: 50vh" alt="Business Image" />
                            <div class="carousel-caption">
                                <h5 class="text-white fs-1 text-center pb-5">Give more in value than you receive in compensation</h5>
                            </div>
                        </div>

                        <div class="carousel-item" data-bs-interval="3000">
                            <g-image src="https://i.imgur.com/8Z7wAU7.jpg" class="d-block w-100 item-1" style="height: 50vh" alt="Business Image" />
                            <div class="carousel-caption">
                                <h5 class="text-white fs-1 text-center pb-5">Everyone sweeps the floor</h5>
                            </div>
                        </div>

                        <div class="carousel-item" data-bs-interval="3000">
                            <g-image src="https://i.imgur.com/TInnayG.jpg" class="d-block w-100 item-1" style="height: 50vh" alt="Business Image" />
                            <div class="carousel-caption">
                                <h5 class="text-white fs-1 text-center pb-5">Share good new quick, and bad news quicker</h5>
                            </div>
                        </div>

                        <div class="carousel-item" data-bs-interval="3000">
                            <g-image src="https://i.imgur.com/QqJGMJq.jpg" class="d-block w-100 item-1" style="height: 50vh" alt="Business Image" />
                            <div class="carousel-caption">
                                <h5 class="text-white fs-1 text-center pb-5">Treat every experience as an opportunity to learn</h5>
                            </div>
                        </div>

                    </div>
                    <a class="carousel-control-prev" href="#values-caro" role="button" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#values-caro" role="button" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </a>
                </div>
                
            </div>


        </div>
    </div>
</template>

<style scoped>

div #values-caro {
    height: 100%;
    width: 100%;
    background: black;
    overflow: hidden;
}

img {
   object-fit: cover;
   opacity: 0.2;
}

.values-body {
    height: 60vh;
}

</style>