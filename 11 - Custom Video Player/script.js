const video = document.querySelector('video');
const progress = document.querySelector('.progress');
const player = document.querySelector('.play');
const volume = document.querySelector('.volume');
const speed = document.querySelector('.speed');
const skipButtons = document.querySelectorAll('[data-skip]');

function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton() {
    player.innerHTML = this.paused ?'&#xe618':'&#xe60e';
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function handleProgress() {
    progress.style.width = (video.currentTime / video.duration) * progress.parentNode.offsetWidth +'px';
}

function clickProgress(){
    video.currentTime = (event.offsetX / progress.parentNode.offsetWidth) * video.duration;
    video.play();
}
/* Hook up the event listners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

player.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
volume.addEventListener('change', handleRangeUpdate);
volume.addEventListener('mousemove', handleRangeUpdate);
speed.addEventListener('change', handleRangeUpdate);
speed.addEventListener('mousemove', handleRangeUpdate);

let mousedown = false;
progress.parentNode.addEventListener('click', clickProgress);
progress.parentNode.addEventListener('mousemove', () => mousedown && clickProgress);
progress.parentNode.addEventListener('mousedown', () => mousedown = true);
progress.parentNode.addEventListener('mouseup', () => mousedown = false);
