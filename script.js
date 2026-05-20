document.addEventListener('DOMContentLoaded', () => {
    // 💡 연결하려는 로컬 mp3 음원 파일명을 매칭하세요.
    const AUDIO_SRC = 'Night_Sky_City_2026_Plum.mp3'; 
    const TRACK_DISPLAY_NAME = 'Night Sky City 2026 - Plum';

    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    
    const playBtn = document.getElementById('play-btn');
    const progressBar = document.getElementById('progress-bar');
    const timeDisplay = document.getElementById('time-display');
    const trackName = document.getElementById('track-name');

    let isPlaying = false;

    audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
            progressBar.value = (audio.currentTime / audio.duration) * 100;
        }
        updateTimeDisplay();
    });

    audio.addEventListener('loadedmetadata', updateTimeDisplay);

    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            trackName.textContent = '일시 정지됨';
        } else {
            audio.play().then(() => {
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                trackName.textContent = TRACK_DISPLAY_NAME;
            }).catch(() => {
                console.log("Audio play blocked or file not found.");
            });
        }
        isPlaying = !isPlaying;
    });

    progressBar.addEventListener('input', () => {
        if (audio.duration) {
            audio.currentTime = (progressBar.value / 100) * audio.duration;
        }
    });

    function updateTimeDisplay() {
        const currentMin = Math.floor(audio.currentTime / 60) || 0;
        const currentSec = Math.floor(audio.currentTime % 60) || 0;
        const durationMin = Math.floor(audio.duration / 60) || 0;
        const durationSec = Math.floor(audio.duration % 60) || 0;

        const pad = (num) => String(num).padStart(2, '0');
        timeDisplay.textContent = `${pad(currentMin)}:${pad(currentSec)} / ${isNaN(audio.duration) ? '00:00' : pad(durationMin)}:${pad(durationSec)}`;
    }
});
