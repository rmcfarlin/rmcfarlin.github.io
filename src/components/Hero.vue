<template>
    <div id="item" class="item">
        <div id="hero" class="item carousel carousel-dark slide" data-bs-ride="carousel">
            <ol class="carousel-indicators">
                <li data-bs-target="#hero" data-bs-slide-to="0" class="active"></li>
                <li data-bs-target="#hero" data-bs-slide-to="1"></li>
                <li data-bs-target="#hero" data-bs-slide-to="2"></li>
            </ol>
            <div class="carousel-inner" style="height: 85vh">
                <div class="carousel-item active" style="height: 85vh" data-bs-interval="3000">
                    <g-image src="https://i.imgur.com/2xIvCzj.jpg" class="d-block w-100" alt="Accounting Image" />
                    <div class="carousel-caption d-none d-md-block">
                        <h5 class="text-white fs-1 text-center">Accountant</h5>
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
    </div>
</template>

<style scoped>
#item {
    background: linear-gradient(rgba(20,20,20, .5),rgba(20,20,20, 1));
    height: 85vh;
}
#hero {
    opacity: .5;
}
</style>