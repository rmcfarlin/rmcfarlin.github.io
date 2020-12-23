<template>
    <div id="hero" class="carousel slide border-bottom border-dark border-2" data-bs-ride="carousel">
        <ol class="carousel-indicators">
            <li data-bs-target="#hero" data-bs-slide-to="0" class="active"></li>
            <li data-bs-target="#hero" data-bs-slide-to="1"></li>
            <li data-bs-target="#hero" data-bs-slide-to="2"></li>
            <li data-bs-target="#hero" data-bs-slide-to="3"></li>
        </ol>
        <div class="carousel-inner" style="height: 80vh">
            <div class="carousel-item active" style="height: 80vh" data-bs-interval="3000">
                <g-image src="https://i.imgur.com/2xIvCzj.jpg" class="d-block w-100 item-1" style="height: 80vh" alt="Business Image" />
                <div class="carousel-caption">
                    <h5 class="text-white fs-1 text-center pb-5">Accountant</h5>
                </div>
            </div>

            <div class="carousel-item" style="height: 80vh" data-bs-interval="3000">
                <g-image src="https://i.imgur.com/ET6N4ec.jpg" class="d-block w-100 item" style="height: 80vh" alt="Airplane Image" />
                <div class="carousel-caption">
                    <h5 class="text-white fs-1 text-center pb-5">Computer Programmer</h5>
                </div>
            </div>

            <div class="carousel-item" style="height: 80vh" data-bs-interval="3000">
                <g-image src="https://i.imgur.com/aUdNIKM.jpg" class="d-block w-100 item" style="height: 80vh" alt="Airplane Image" />
                <div class="carousel-caption">
                    <h5 class="text-white fs-1 text-center pb-5">Airplane Enthusiast</h5>
                </div>
            </div>

            <div class="carousel-item" style="height: 80vh" data-bs-interval="3000">
                <g-image src="https://i.imgur.com/p2ncO1v.jpg" class="d-block w-100 item" style="height: 80vh" alt="Airplane Image" />
                <div class="carousel-caption">
                    <h5 class="text-white fs-1 text-center pb-5">Nature Lover</h5>
                </div>
            </div>
        </div>
        <a class="carousel-control-prev" href="#hero" role="button" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </a>
        <a class="carousel-control-next" href="#hero" role="button" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </a>
    </div>
</template>

<style scoped>

div #hero {
    height: 80vh;
    width: 100vw;
    background: black;
    overflow: hidden;
}

img {
   object-fit: cover;
   opacity: 0.4;
}

</style>