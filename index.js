document.addEventListener("DOMContentLoaded", function () {
    const playButton = document.getElementById('playButton');
    const myAudio = document.getElementById('music');

    playButton.addEventListener('click', function () {
        if (myAudio.paused) {
            myAudio.play();
            playButton.textContent = 'Pause Sound';
        } else {
            myAudio.pause();
            playButton.textContent = 'Play Sound';
        }
    });
});
