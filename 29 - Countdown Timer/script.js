const buttons = [...document.getElementsByTagName('button')];
const form = document.getElementsByTagName('form')[0];
const count_down = document.getElementsByClassName('count-down')[0];
const end_time_shows = document.getElementsByClassName('end-time')[0];
let clock_num = null;

function count_down_display(seconds){
    const min = parseInt(seconds/60);
    const sec = seconds%60;
    const display = `${min}:${sec<10?'0':''}${sec}`;
    count_down.textContent = display;
}

function end_time_display(end_time){
    const time = new Date(end_time);
    const hour = time.getHours();
    const min = time.getMinutes();
    const adjustHours = hour > 12 ? hour - 12 : hour;
    end_time_shows.textContent = `倒计时将在 ${adjustHours}:${min<10?'0':''}${min} 停止`;
}

function add_timer(seconds){
    clearInterval(clock_num);
    let new_time = Date.now();
    const end_time = new_time + seconds*1000;
    count_down_display(seconds);
    end_time_display(end_time);
    clock_num = setInterval(()=>{
        new_time = Date.now();
        const sec = parseInt((end_time - new_time)/1000);
        if (sec < 0){
            clearInterval(clock_num);
            end_time_shows.textContent= '选择时间进行倒计时';
            return
        }
        count_down_display(sec);
    },1000);　
}

function startTimer() {
    const seconds = parseInt(this.dataset.time, 10);
    add_timer(seconds);
}

buttons.forEach((button)=>{
    button.addEventListener('click',startTimer);
});

form.addEventListener('submit',function (){
    event.preventDefault();
    const sec = parseInt(this.minutes.value*60);
    add_timer(sec);
    this.reset();
});