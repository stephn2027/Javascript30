const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
    navigator.mediaDevices.getUserMedia({video:true,audio:false})
    .then(localMediaStream=>{
        
        video.srcObject =new MediaStream(localMediaStream);
        video.play();
        
    })
   .catch(err=>console.error("No ACCESS", err));
};

function paintToCanvas(){
    const height = video.videoHeight;
    const width = video.videoWidth;
    canvas.height = height;
    canvas.width = width;
    
return setInterval(() =>{
 ctx.drawImage(video,0,0,width,height);
 //extracting the imageData
 let pixels =ctx.getImageData(0,0,width,height);
 //manipulate or edit the extracted imageData
 //pixels = redEffect(pixels);
 //pixels = rgbSplit(pixels);
 pixels = greenScreen(pixels);
 ctx.globalAlpha=0.1;
 //putting back the edited imageData
  ctx.putImageData(pixels,0,0);
 //debugger;
},16)
};

function takePhoto(){
    snap.currentTime = 0;
    snap.play();
    //take the data out of the canvas and put into the strip element
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href= data;
    console.log(link);
    link.setAttribute("download","handsome");
    link.innerHTML = `<img src="${data}" alt="Pogi"/>`;
    strip.insertBefore(link,strip.firstChild);
};
//adding filter: get the pixels out of the canvas, edit or manipulate 
//then return the edited value hence a filtered pixel

function redEffect(pixels){
 for(let i=0;i<pixels.data.length;i+=4){
    pixels.data[i+0] = pixels.data[i+0]+50//r
    pixels.data[i+1] = pixels.data[i+1]-90//g
    pixels.data[i+2]= pixels.data[i+2]*.5//b
    
 }
 return pixels;
 
};

function rgbSplit(pixels){
    for(let i=0;i<pixels.data.length;i+=4){
        pixels.data[i+150] = pixels.data[i+0]//red
        pixels.data[i+150] = pixels.data[i+1]//green
        pixels.data[i+100]= pixels.data[i+2]//blue
        
     }
     return pixels;
}

function greenScreen(pixels){
    const levels={};
    document.querySelectorAll('.rgb input').forEach((input)=>{
        levels[input.name]= input.value;
});
for(let i=0;i<pixels.data.length;i+=4){
    red = pixels.data[i+0];//red
    green= pixels.data[i+1];//green
    blue= pixels.data[i+2];//blue
    alpha = pixels.data[i+3];

    if(red>=levels.rmin
        &&green>=levels.gmin
        &&blue>=levels.bmin
        &&red<=levels.rmax
        &&green<=levels.gmax
        &&blue<=levels.bmax){
            pixels.data[i+3]=0;
        }
 }
 return pixels;
    
}
getVideo();
video.addEventListener('canplay', paintToCanvas);
