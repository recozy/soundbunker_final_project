        const musicWrap = document.querySelector(".wrap__music");
        const musicImg = musicWrap.querySelector(".music__img img");
        const musicName = musicWrap.querySelector(".music__song .name");
        const musicArtist = musicWrap.querySelector(".music__song .artist");
        const musicAudio = musicWrap.querySelector("#main-audio");
        const musicPlay = musicWrap.querySelector("#control-play");
        const musicPrevBtn = musicWrap.querySelector("#control-prev");
        const musicNextBtn = musicWrap.querySelector("#control-next");
        const musicProgress = musicWrap.querySelector(".music__progress");
        const musicProgressBar = musicProgress.querySelector(".bar");
        const musicProgressCurrent = musicProgress.querySelector(".current");
        const musicProgressDuration = musicProgress.querySelector(".duration");
        const musicRepeat = musicWrap.querySelector("#control-repeat");
        const musicList = musicWrap.querySelector(".music__list");
        const MusicListBtn = musicWrap.querySelector("#control-list");
        const MusicListClose = musicList.querySelector(".close");
        const musicListUl = musicList.querySelector(".list ul");
    
        let musicIndex = 1;
    
        
        // 음악 재생
        function loadMusic(num) {
            // musicImg.alt = `${allMusic[num - 1].img}`;
            musicName.innerText = allMusic[num - 1].name;
            musicArtist.innerText = allMusic[num - 1].artist;
            musicAudio.src = `/Front/temp copy/songs/${allMusic[num - 1].audio}.mp3`;
        }
    
        // 플레이 버튼
        function playMusic() {
            musicWrap.classList.add("paused");
            musicPlay.innerText = "pause";
            musicPlay.setAttribute("title", "일시정지")
            musicAudio.play();
        }
        // 일시정지 버튼
        function pauseMusic() {
            musicWrap.classList.remove("paused");
            musicPlay.innerText = "play_arrow";
            musicPlay.setAttribute("title", "재생")
            musicAudio.pause();
        }
    
        // 이전 곡 듣기 버튼
        function prevMusic() {
            musicIndex--;
            musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
            loadMusic(musicIndex);
            playMusic();
            playListMusic();
        }
    
        // 다음 곡 듣기 버튼
        function nextMusic() {
            musicIndex++;
            musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
            loadMusic(musicIndex);
            playMusic();
            playListMusic();
        }
    
        // 뮤직 진행바
        musicAudio.addEventListener("timeupdate", (e) => {
            const currentTime = e.target.currentTime;
            const duration = e.target.duration;
            let progressWidth = (currentTime / duration) * 100;
            musicProgressBar.style.width = `${progressWidth}%`
    
            musicAudio.addEventListener("loadeddata", () => {
                let audioDuration = musicAudio.duration;
                let totalMin = Math.floor(audioDuration / 60);
                let totalSec = Math.floor(audioDuration % 60);
                if (totalSec < 10) totalSec = `0${totalSec}`;
    
                musicProgressDuration.innerText = `${totalMin}:${totalSec}`;
            })
    
            let currentMin = Math.floor(currentTime / 60);
            let currentSec = Math.floor(currentTime % 60);
            if (currentSec < 10) currentSec = `0${currentSec}`;
            musicProgressCurrent.innerText = `${currentMin}:${currentSec}`
        })
    
        // 진행 버튼
        musicProgress.addEventListener("click", e => {
            let progressWidth = musicProgress.clientWidth;
            let clickedOffsetX = e.offsetX;
            let songDuration = musicAudio.duration;
    
            musicAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
            playMusic();
        })
    
    
    
    
        // 재생/일시정지
        musicPlay.addEventListener("click", () => {
            const isMusicPaused = musicWrap.classList.contains("paused");
            isMusicPaused ? pauseMusic() : playMusic();
        })
    
        musicPrevBtn.addEventListener("click", () => {
            prevMusic();
        });
        musicNextBtn.addEventListener("click", () => {
            nextMusic();
        });
    
        
    
        // 반복 버튼
        musicRepeat.addEventListener("click", () => {
            let getText = musicRepeat.innerText;
    
            switch (getText) {
                case "repeat":
                    musicRepeat.innerText = "repeat_one";
                    musicRepeat.setAttribute("title", "한곡 반복")
                    break;
    
                case "repeat_one":
                    musicRepeat.innerText = "shuffle";
                    musicRepeat.setAttribute("title", "랜덤 반복")
                    break;
    
                case "shuffle":
                    musicRepeat.innerText = "repeat";
                    musicRepeat.setAttribute("title", "전체 반복")
                    playListMusic();
                    break;
            }
        })
    
        // 오디오가 끝나고 
        musicAudio.addEventListener("ended", () => {
            let getText = musicRepeat.innerText;
    
            switch (getText) {
                case "repeat":
                    nextMusic();
                    break;
    
                case "repeat_one":
                    loadMusic(musicIndex);
                    playMusic();
                    break;
    
                case "shuffle":
                    let randIndex = Math.floor((Math.random() * allMusic.length) + 1);
                    do {
                        randIndex = Math.floor((Math.random() * allMusic.length) + 1);
                    } while (musicIndex == randIndex);
                    musicIndex = randIndex;
                    loadMusic(musicIndex);
                    playMusic();
                    break;
            }
        })
    
        // 뮤직 리스트 버튼
        MusicListBtn.addEventListener("click", () => {
            musicList.classList.add("show");
        })
    
        // 뮤직 리스트 닫기 버튼
        MusicListClose.addEventListener("click", () => {
            musicList.classList.remove("show");
        })
        
        window.addEventListener("load", () => {
            loadMusic(musicIndex);
        });