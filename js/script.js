const videos = document.querySelectorAll(".watch-video");

videos.forEach(video => {
    video.addEventListener("click", () => {

        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    });
});

function goToCategory() {
    window.location.href = "category.html";
}