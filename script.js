console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
// let songItemPlay = document.getElementsByClassName("songItemPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let currTime = document.querySelector(".current-time");
let totalDuration = document.querySelector(".total-duration");

let songs = [
  {
    songName: "Apna Time Nhi Dorr Aayega",
    filePath: "songs/1.mp3",
    coverPath: "covers/1.jpg",
  },
  {
    songName: "Pushpa Jhukega Nhi",
    filePath: "songs/2.mp3",
    coverPath: "covers/2.jpg",
  },
  {
    songName: "KGF Ringtone",
    filePath: "songs/3.mp3",
    coverPath: "covers/3.jpg",
  },
  {
    songName: "Bahubali Sehnai",
    filePath: "songs/4.mp3",
    coverPath: "covers/4.jpg",
  },
  {
    songName: "KGF Amma Ringtone",
    filePath: "songs/5.mp3",
    coverPath: "covers/5.jpg",
  },
  {
    songName: "Falana Dikhana",
    filePath: "songs/6.mp3",
    coverPath: "covers/6.jpg",
  },
  {
    songName: "Cielo Huma Huma",
    filePath: "songs/7.mp3",
    coverPath: "covers/7.jpg",
  },
  {
    songName: "Janji - Heroes Tonight",
    filePath: "songs/8.mp3",
    coverPath: "covers/8.jpg",
  },
  {
    songName: "Faaltu ka gaana",
    filePath: "songs/9.mp3",
    coverPath: "covers/9.jpg",
  },
  {
    songName: "Bakbaas Gaana",
    filePath: "songs/10.mp3",
    coverPath: "covers/10.jpg",
  },
  {
    songName: "Tsunami",
    filePath: "songs/11.mp3",
    coverPath: "covers/11.jpg",
  },
  {
    songName: "Nero-Promises",
    filePath:"songs/12.mp3",
    coverPath:"covers/12.jpeg"
    
  },
  {
    songName: "Tera Yaar Hoon Main",
    filePath: "songs/13.mp3",
    coverPath: "covers/13.jpg",
  },
  {
    songName: "Low",
    filePath: "songs/14.mp3",
    coverPath: "covers/14.jpg",
  },
];
//Making a map to store songName and there index value
const songIndexValPair = new Map();
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerHTML = songs[i].songName;
  songIndexValPair.set(songs[i].songName,i);
});

//audioElement.play();

// Pause all song icon
function pauseall() {
  songItems.forEach((elements, i) => {
    var element1 = document.getElementById(i);
      element1.classList.remove("fa-circle-pause");
      element1.classList.add("fa-circle-play");
  });
}

// Start playing song icon
function startplay() {
  newsong = document.getElementById(songIndex);
  newsong.classList.remove("fa-circle-play");
  newsong.classList.add("fa-circle-pause");
}

// Stop playing song icon
function stopplay() {
  newsong = document.getElementById(songIndex);
  newsong.classList.remove("fa-circle-pause");
  newsong.classList.add("fa-circle-play");
}

// Handle Play/Pause Click
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    startplay();
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    gif.style.opacity = 0;
    stopplay();
  }
});

// Listen to Events
audioElement.addEventListener("timeupdate", () => {
  //   console.log("timeUpdate");
  //Update Seekbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  //console.log(progress);
  myProgressBar.value = progress;

  // Calculate current time left and total duration
  let currentMinutes = Math.floor(audioElement.currentTime / 60);
  let currentSeconds = Math.floor(
    audioElement.currentTime - currentMinutes * 60
  );
  let durationMinutes = Math.floor(audioElement.duration / 60);
  let durationSeconds = Math.floor(
    audioElement.duration - durationMinutes * 60
  );

  if (currentSeconds < 10) {
    currentSeconds = "0" + currentSeconds;
  }
  if (durationSeconds < 10) {
    durationSeconds = "0" + durationSeconds;
  }
  if (currentMinutes < 10) {
    currentMinutes = "0" + currentMinutes;
  }
  if (durationMinutes < 10) {
    durationMinutes = "0" + durationMinutes;
  }

  // Updated duration
  currTime.textContent = currentMinutes + ":" + currentSeconds;
  totalDuration.textContent = durationMinutes + ":" + durationSeconds;

});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      //   console.log(e.target);
      songIndex = parseInt(e.target.id);
      pauseall();
      //e.target.classList.remove("fa-circle-play");
      e.target.classList.add("fa-circle-pause");
      audioElement.src = `songs/${songIndex + 1}.mp3`;
      masterSongName.innerText = songs[songIndex].songName;
      audioElement.currentTime = 0;
      audioElement.play();
      gif.style.opacity = 1;
      masterPlay.classList.remove("fa-circle-play");
      masterPlay.classList.add("fa-circle-pause");
    });
  }
);

document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 14) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  //Adding removePlaying function to remove highlight from previous song
  removingPlaying();
  //Adding addPlaying to add highlight to the currently playing song.
  addPlaying(songIndex);
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  pauseall();
  startplay();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  //Adding removePlaying function to remove highlight from previous song
  removingPlaying();
  //Adding addPlaying to add highlight to the currently playing song.
  addPlaying(songIndex);
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  pauseall();
  startplay();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
});

audioElement.onended = function() {
  // change the song index to the index of next song, if the song is the last one in the playlist then the next should be the first one
  if (songIndex >= 14) 
    songIndex = 0;
  else 
    songIndex += 1;
  //Adding removePlaying function to remove highlight from previous song
  removingPlaying();
  //Adding addPlaying to add highlight to the currently playing song.
  addPlaying(songIndex);
  this.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  this.currentTime = 0;
  // the audio player stops after playing each song, so after changing the src just launch the player
  this.play();
  pauseall();
  startplay();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
}

//Implementing responsive behaviour of songs container.
//Selecting tags with songItem class.
const songItem = document.querySelectorAll('.songItem');

//Creating a function to add playing class which will highlight the playing song.
const addPlaying = function (i) {
  // console.log(songItem[0]);
  songItem.forEach(function (val) {
    // console.log(val.id)
    if(val.id === `songItem${i}`)
    {
      val.classList.add('playing')
    }
  })
}

//Creating a function to remove playing class whenever other music starts playing.
const removingPlaying = function(){
  songItem.forEach(function(val){
  // console.log(val.classList.value);
  if(val.classList.value==='songItem playing'){
    val.classList.remove('playing');
  }

})
}

//Code for implemenntation of clicking on the song in songs container and then playing it from there. 
songItem.forEach(function(val){
  val.addEventListener('click',function(e){
    removingPlaying();
    pauseall();
    currentSong = e.path[0].innerHTML;
    if(e.path[1].classList.value==='songItem'){
      e.path[1].classList.add('playing');
      songs.forEach(function(e){
        if(currentSong===e.songName){
          songIndex = songIndexValPair.get(currentSong);
          songFilePath = songs[songIndex].filePath;
          audioElement.src = songFilePath;
          audioElement.play();
          masterSongName.innerText = songs[songIndex].songName;
          startplay();
          masterPlay.classList.remove("fa-circle-play");
          masterPlay.classList.add("fa-circle-pause");
          gif.style.opacity = 1;
        }
      })
    }

  })
})

