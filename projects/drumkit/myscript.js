window.addEventListener('keydown', function(keyDownFunc){
const audio = document.querySelector(`audio[data-key="${keyDownFunc.keyCode}"]`);
const key = document.querySelector(`.key[data-key="${keyDownFunc.keyCode}"]`);
if(!audio) return; // stops the function from running

audio.currentTime = 0;//rewinds the key to start
audio.play();
key.classList.add('playing');
});

function removeTransition(keyDownFunc){
if(keyDownFunc.propertyName !== 'transform') return; //skip if not a transform
this.classList.remove('playing');

}

const keys = document.querySelectorAll('.key');
keys.forEach(key=>key.addEventListener('transitionend',removeTransition));