console.log("salman");
let audioElement =new Audio('1.mp3');
//initialize the varibles
let songIndex=0;
let masterPlay=document.getElementById('masterPlay');
let myProgressBar= document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let timestamp = document.getElementsByClassName('timestamp');

let songs = [
    {songName: "chale-jana-fir", filePath: "1.mp3", coverPath: "covers/cover1.jpg"},
    {songName: "tumne jo hai ", filePath: "2.mp3", coverPath: "covers/cover2.jpg"},
    {songName: "aur kya chahiye", filePath: "3.mp3", coverPath: "covers/cover3.jpg"},
    {songName: "saware", filePath: "4.mp3", coverPath: "covers/cover4.jpg"},
    {songName: "tere hawale", filePath: "5.mp3", coverPath: "covers/cover5.jpg"},
    {songName: "shiddat-title ", filePath: "6.mp3", coverPath: "covers/cover6.jpg"},
    {songName: "ye jism hai toh", filePath: "7.mp3", coverPath: "covers/cover7.jpg"},
    {songName: "zero-title track", filePath: "8.mp3", coverPath: "covers/cover8.jpg"},
    {songName: "zihale miskin", filePath: "9.mp3", coverPath: "covers/cover9.jpg"},
    {songName: "fakira", filePath: "10.mp3", coverPath: "covers/cover10.jpg"},
]


const formatTime = (seconds) => {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? `0${sec}` : sec}`;
};

songItem.forEach((element, i) => {
    console.log(element, i);
    // let audio = new Audio(songs[i].filePath);
    audioElement.addEventListener('loadedmetadata', () => {
        element.getElementsByClassName('timestamp')[0].innerText = `${formatTime(audio.duration)} `;
    })

    // element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    // element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

songItem.forEach((element,i)=>{
    // console.log(element,i);
    element.getElementsByTagName("img")[0].src =  songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

//handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
        masterSongName.innerText = songs[songIndex].songName;
        Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
            // console.log(element.target);
            element.target.classList.remove('fa-circle-pause');
            element.target.classList.add('fa-circle-play');
        })
    }else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play')
        gif.style.opacity=0;
    }
})

//listen to event
audioElement.addEventListener('timeupdate',()=>{
    // console.log('timeupdate');
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    // console.log(progress);
    myProgressBar.value=progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = function(){
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.classList.remove('fa-circle-pause');
    element.classList.add('fa-circle-play');

})
}
// document.getElementsByClassName('songItemPlay').addEventListener('click',(e)=>{
    
// })


Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    // console.log(element);
    element.addEventListener('click',(e)=>{
        console.log(e);
        makeAllPlays();
        
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src=`${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.play();
        gif.style.opacity=1;
        audioElement.currentTime=0;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})


document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src=`${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.play();
    gif.style.opacity=1;
    audioElement.currentTime=0;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
document.getElementById('privious').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex-=1;
    }
    audioElement.src=`${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
        audioElement.play();
        gif.style.opacity=1;
        audioElement.currentTime=0;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
})
