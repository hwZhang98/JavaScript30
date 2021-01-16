const video = document.querySelector('video');
const progress = document.querySelector('.progress');
const player = document.querySelector('.play');
const volume = document.querySelector('.volume');
const speed = document.querySelector('.speed');
const skip_front = document.querySelector('.skipFront');
const skip_rear = document.querySelector('.skipRear');


function playVideo(){
    if (this === skip_rear){
        video.currentTime -= 10;
    }
    if (this === skip_front){
        video.currentTime += 10;
    }
    if (this === progress){
        video.currentTime = this.clientWidth/this.parentNode.clientWidth * video.duration;
    }
    if (video.currentTime <0 || video.currentTime > video.duration){
        video.currentTime = 0;
    }
    video.play();
}

function changeProgress(){
    //得到当前进度条最左端的位置，获取鼠标的位置
    const start = this.offsetLeft;
    //进而改变进度条长度，再调用playvideo去改变视频播放位置
    progress.style.width  = event.clientX - start + "px"
    console.log(progress.style.width)
    playVideo.apply(progress);
}

function addClikeAndMoveEvent(object,method){
    object.addEventListener('mousedown',function(){
        //按下的同时添加移动监听
        object.addEventListener('mousemove',method);
        method.apply(object);
    })
    object.addEventListener('mouseup',function(){
        //鼠标抬起删除移动监听
        object.removeEventListener('mousemove',method);
    })
}

player.addEventListener('click',()=>{
    if(video.paused) {
        video.play();
        player.innerHTML= '&#xe60e'
    }else{
        video.pause();
        player.innerHTML= '&#xe618'
    }
});

volume.addEventListener('change',function(){
    video.volume = this.value/this.max;
});
speed.addEventListener('change',function(){
    console.log(this.value)
    video.playbackRate = this.value;
})
skip_front.addEventListener('click',playVideo);
skip_rear.addEventListener('click',playVideo);

video.addEventListener('timeupdate',function(){
    progress.style.width  = video.currentTime/video.duration * progress.parentNode.clientWidth + "px";
    if (!video.paused) {
        player.innerHTML= '&#xe60e';
    }
    if (video.currentTime === video.duration){
        video.currentTime = 0;
        video.play();
    }
})

addClikeAndMoveEvent(progress.parentNode,changeProgress);

console.log(1);