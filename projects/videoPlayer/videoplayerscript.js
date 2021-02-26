// get our elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progressBar = player.querySelector('.progress__filled');
const progress = player.querySelector('.progress');
const toggle = player.querySelector('.toggle');
const ranges = player.querySelectorAll('.player__slider');
const skipButtons = player.querySelectorAll('[data-skip]');
const fullScreenBtn = player.querySelector('.fullScreenbtn');
let rangePressed = false;
let isDragged = false;
//build out functions
function togglePlay(){
    video.paused?video.play():video.pause();
    
}
function updateToggle(){
    toggle.textContent = this.paused?'►' : '❚ ❚';
}
function skip(){
   video.currentTime+= parseFloat(this.dataset.skip);
   
}
function handleRangeUpdate(e){
    
    
    video[this.name]=this.value;
    

}
function handleProgressbar(){

progressBar.style.flexBasis = (video.currentTime/video.duration)*100 +"%";
};

function scrub(e){
    
video.currentTime = (e.offsetX/progress.offsetWidth)*video.duration; 
};

function fullScreen(){
    if(video.requestFullScreen){
		video.requestFullScreen();
	} else if(video.webkitRequestFullScreen){
		video.webkitRequestFullScreen();
	} else if(video.mozRequestFullScreen){
		video.mozRequestFullScreen();
	}

};

//hook up event liseners
video.addEventListener('click',togglePlay);
video.addEventListener('play',updateToggle);
video.addEventListener('pause',updateToggle);
video.addEventListener('timeupdate',handleProgressbar);
toggle.addEventListener('click',togglePlay);
skipButtons.forEach(button=>button.addEventListener('click',skip))
ranges.forEach(range=>range.addEventListener('click',handleRangeUpdate));
ranges.forEach(range=>range.addEventListener('mousemove',(e)=>rangePressed?handleRangeUpdate(e):false));
ranges.forEach(range=>range.addEventListener('mousedown',(e)=>rangePressed = true));
ranges.forEach(range=>range.addEventListener('mouseup',(e)=>rangePressed = false));
progress.addEventListener('click',scrub);
progress.addEventListener('mousemove',(e)=>isDragged?scrub(e):false);
progress.addEventListener('mousedown',()=>isDragged=true);
progress.addEventListener('mouseup',()=>isDragged=false);
fullScreenBtn.addEventListener('click',fullScreen);

