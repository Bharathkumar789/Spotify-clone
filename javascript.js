document.addEventListener('DOMContentLoaded', () => {
    console.log("Spotify");
let songIndex=0;
let audioElement=new Audio('song/1.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById("myProgressBar");
let masterSongName = document.getElementById('masterSongName');
let gif=document.getElementById("gif");
let songItems=Array.from(document.getElementsByClassName('songItem'))

let songs=[
    {songName:"Dandelions",filepath:"song/1.mp3",coverPath:"covers/1.jpg"},
    {songName:"Harleys in hawai",filepath:"song/2.mp3",coverPath:"covers/2.jpg"},
    {songName:"i wanna be yours",filepath:"song/3.mp3",coverPath:"covers/3.jpg"},
    {songName:"play-date",filepath:"song/4.mp3",coverPath:"covers/4.jpg"},
    {songName:"senorita",filepath:"song/5.mp3",coverPath:"covers/5.jpg"},
    {songName:"The influence",filepath:"song/6.mp3",coverPath:"covers/6.jpg"},
    {songName:"Hope",filepath:"song/7.mp3",coverPath:"covers/7.jpg"},
    {songName:"onepiece",filepath:"song/8.mp3",coverPath:"covers/8.jpg"},


]
songItems.forEach((element,i)=>{
    console.log(element,i);
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;



})
masterPlay.addEventListener('click',()=>{
    if (audioElement.paused||audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;

    }
    else{
        audioElement.pause();
        masterPlay.classList.add('fa-play-circle');
        masterPlay.classList.remove('fa-pause-circle');
        gif.style.opacity=0;

    }
}

)
audioElement.addEventListener('timeupdate',()=>{
    
     let progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    
    myProgressBar.value=progress;
    

})
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
}) 
const makeAllPlays=()=>{
    
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
})
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `song/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

 document.getElementById('previous').addEventListener('click', () => {
        if (songIndex <= 0) {
            songIndex = 0;
        } else {
            songIndex -= 1;
        }
        audioElement.src = `song/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.add('fa-pause-circle');
        masterPlay.classList.remove('fa-play-circle');
    });

    document.getElementById('next').addEventListener('click', () => {
        if (songIndex >= songs.length - 1) {
            songIndex = 0;
        } else {
            songIndex += 1;
        }
        audioElement.src = `song/${songIndex + 1}.mp3`;
        audioElement.currentTime = 0;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.play();
        masterPlay.classList.add('fa-pause-circle');
        masterPlay.classList.remove('fa-play-circle');
    });
});