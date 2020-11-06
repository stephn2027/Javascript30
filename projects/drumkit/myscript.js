window.addEventListener('keydown', function(keyDownFunc){
const audio = document.querySelector(`audio[data-key="${keyDownFunc.keyCode}"]`);
const key = document.querySelector(`.key[data-key="${keyDownFunc.keyCode}"]`);
if(!audio) alert("Key not registered")
	text = console.log("Key not registered"); // stops the function from running

audio.currentTime = 0;//rewinds the key to start
audio.play();
key.classList.add('playing');
});