// Mes data
const MusicList = [
  {
      id : 0,
      img : './assets/images/chat image.png',
      name : 'Sleep Classical Piano',
      artist : 'Mubert Music',
      music : './assets/media/music1.mp3'
  },
  {
      id : 1,
      img : '',
      name : 'R&B calm piano',
      artist : 'Mubert Music',
      music : './assets/media/music2.mp3'        
  },
  {
      id : 2,
      img : './assets/images/chat3.png',
      name : 'a three-question form ',
      artist : 'Mubert Music',
      music : './assets/media/music3.mp3'
  },
  {
      id : 3,
      img : './assets/images/chat image.png',
      name : 'vibrations for forever',
      artist : 'Mubert Music',
      music : './assets/media/music4.mp3'
  },
  {
      id : 4,
      img : './assets/images/chat3.png',
      name : 'peaceful treaty',
      artist : 'Mubert Music',
      music : './assets/media/music5.mp3'
  },
  {
      id : 5,
      img : '',
      name : 'big roamers',
      artist : 'Mubert Music',
      music : './assets/media/music6.mp3'
  },
  {
      id : 6,
      img : './assets/images/chat image.png',
      name : 'its cover',
      artist : 'Mubert Music',
      music : './assets/media/music7.mp3'
  },
];



let audio = document.getElementById('audio')
let vinetteImg = document.getElementById('vinetteImg')
let pauseplay = document.getElementById('pauseplay')
let next = document.getElementById('next')
let prev = document.getElementById('prev')
let repeat = document.getElementById('repeat')
let refresh = document.getElementById('refresh')

let musicTitle = document.getElementById('musicTitle')
let musicArtist = document.getElementById('musicArtist')

let playList = document.getElementById('playList')
let wavePlay = document.getElementById('wavePlay')
let totalTime = document.getElementById('totalTime')
let curentTime = document.getElementById('curentTime')
let progressBar = document.querySelector('.progress-bar')
let progressArea = document.querySelector('.progress-area')

let volume = document.getElementById('volume')
let volumeSong = document.getElementById('volumeSong')
let volumeIcon = document.querySelector('#volumeIcon')



MusicList.forEach(music => {

  let listTag = `
  <div class="song">
    <ion-icon name="apps-outline"></ion-icon>
    <h3><k id="PlayListTitle">${music.name} <br><span>${music.artist}</span></h3>
    <audio class='audio${music.id}' src="${music.music}"></audio>
    <div class="playIcon">
    <ion-icon name="play-circle" id="playIconPlaylist${music.id}" class="iconSongList" song-index='${music.id}'> icon</ion-icon><k id='audio${music.id}'>00:00</k>
    </div>
  </div>`
  playList.insertAdjacentHTML('beforeend', listTag)

  let songOnList = document.querySelector(`.audio${music.id}`)
  let songListDuration = document.getElementById(`audio${music.id}`)


  songOnList.addEventListener('loadeddata', () => {

    let audioDuration = songOnList.duration
    let durationMinutes = Math.floor(audioDuration / 60)
    let durationSeconds = Math.floor(audioDuration - durationMinutes * 60)
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes }

    songListDuration.textContent = durationMinutes + ":" + durationSeconds
  })



});

let allSongPlaylist = playList.querySelectorAll('.song')




trackNum = Math.round(Math.random() * MusicList.length)
// trackNum = 9

let traknow = () => {
  track = MusicList[trackNum]
  audio['src'] = track.music
  track.img != '' ? vinetteImg['src'] = track.img : vinetteImg['src'] = './assets/images/preview.jpg'
  musicTitle.innerText = track.name
  musicArtist.innerText = track.artist
  audio.load()
  updateTimerDuration = setTimeout(setUpdate, 1000);
  // updateTimer = setInterval(setUpdate, 1000);
  volumeMusic()
}
traknow()
songListPlaying()


function volumeMusic() {
  audio.volume = volumeSong.value / 100
}





function songListPlaying() {
  for (var i = allSongPlaylist.length - 1; i >= 0; i--) {
    let icon = allSongPlaylist[i].querySelector('.iconSongList')

    allSongPlaylist[i].classList.remove('playing')
    icon.setAttribute('name', 'play-circle')


    if (icon.getAttribute('song-index') == trackNum) {
      allSongPlaylist[i].classList.add('playing')
      icon.setAttribute('name', 'musical-notes-outline')
    }

    icon.setAttribute('onclick', 'playing(this)')

  }
}

function playing(element) {
  if (typeof updateTimer != 'undefined') { clearInterval(updateTimer) }
  let indexSong = element.getAttribute('song-index')
  trackNum = indexSong
  traknow()
  songListPlaying()
  play()
}



let play = () => {
  if (audio.paused) {
    pauseplay['name'] = "pause-outline"
    wavePlay.classList.add('play')
    audio.play()
    updateTimer = setInterval(setUpdate, 1000);
  } else {
    pauseplay['name'] = "play-outline"
    wavePlay.classList.remove('play')
    audio.pause()
    clearInterval(updateTimer)
  }
}
let nextMusic = () => {
  if (repeat['name'] == 'shuffle-outline') {
    trackNum = Math.round(Math.random() * MusicList.length)
    traknow()
    clearInterval(updateTimer)
    songListPlaying()
    play()
  } else {
    trackNum >= MusicList.length - 1 ? trackNum = 0 : trackNum++
    traknow()
    clearInterval(updateTimer)
    songListPlaying()
    play()
  }
}

pauseplay.onclick = () => { play() }
next.onclick = () => { nextMusic() }



prev.onclick = () => {
  trackNum <= 0 ? trackNum = MusicList.length - 1 : trackNum--
  traknow()
  clearInterval(updateTimer)
  songListPlaying()
  play()
}


progressArea.onclick = (e) => {
  let progressWidth = progressArea.clientWidth
  let myClick = e.offsetX

  audio.currentTime = (myClick / progressWidth) * audio.duration
}


repeat.onclick = () => {
  switch (repeat['name']) {
    case 'shuffle-outline':
      repeat['name'] = "repeat-outline"
      break;
    default:
      repeat['name'] = "shuffle-outline"
      break;
  }
}

refresh.onclick = () => {
  if (repeat['name'] == 'shuffle-outline') {
    trackNum = Math.round(Math.random() * MusicList.length)
    traknow()
    clearInterval(updateTimer)
    songListPlaying()
    updateTimer = setInterval(setUpdate, 1000);
    audio.play()
  } else {
    audio.currentTime = 0
    clearInterval(updateTimer)
    songListPlaying()
    updateTimer = setInterval(setUpdate, 1000);
    audio.play()
  }
}

volume.onclick = () => {
  switch (volume['name']) {
    case 'volume-high-outline':
      volumeSong.value = 0
      volumeMusic()
      volume['name'] = "volume-mute-outline"
      volumeIcon['name'] = "volume-mute-outline"
      break;
    case 'volume-medium-outline':
      volumeSong.value = 0
      volumeMusic()
      volume['name'] = "volume-mute-outline"
      volumeIcon['name'] = "volume-mute-outline"
      break;
    case 'volume-mute-outline':
      volumeSong.value = 30
      volumeMusic()
      volume['name'] = "volume-medium-outline"
      volumeIcon['name'] = "volume-medium-outline"
      break;
    default:
      volumeSong.value = 0.0
      volumeMusic()
      volume['name'] = "volume-mute-outline"
      volumeIcon['name'] = "volume-mute-outline"
      break;
  }
}

volumeIcon.onclick = () => {
  if (audio.muted) {
    audio.muted = false
    volumeIcon['name'] = "volume-medium-outline"
  } else {
    audio.muted = true
    volumeIcon['name'] = "volume-mute-outline"
  }
}


function setUpdate() {

  if(audio.volume == 0.0 || audio.muted){
    volume['name'] = "volume-mute-outline"
    volumeIcon['name'] = "volume-mute-outline"
  }else if (audio.volume <=0.2) {
    volume['name'] = "volume-off-outline"
    volumeIcon['name'] = "volume-off-outline"
  }else if (audio.volume <=0.4) {
    volume['name'] = "volume-low-outline"
    volumeIcon['name'] = "volume-low-outline"
  }else if (audio.volume <=0.6) {
    volume['name'] = "volume-medium-outline"
    volumeIcon['name'] = "volume-medium-outline"
  }else{
    volume['name'] = "volume-high-outline"
    volumeIcon['name'] = "volume-high-outline"
  }

  let timePosition = 0
  if (!isNaN(audio.duration) && audio.duration != 'Infinity') {
    timePosition = audio.currentTime * (100 / audio.duration)
    progressBar.style.width = `${timePosition}%`
    // progressBar.value = `${timePosition}%`

    let currentMinutes = Math.floor(audio.currentTime / 60)
    let currentSeconds = Math.floor(audio.currentTime - currentMinutes * 60)
    let durationMinutes = Math.floor(audio.duration / 60)
    let durationSeconds = Math.floor(audio.duration - durationMinutes * 60)

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes }

    curentTime.textContent = currentMinutes + ":" + currentSeconds
    totalTime.textContent = durationMinutes + ":" + durationSeconds
  } else {
    curentTime.textContent = "00:00"
    totalTime.textContent = "00:00"
  }
  audio.addEventListener('ended', nextMusic)
}
