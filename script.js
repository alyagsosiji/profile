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
// ==========================================================================
// 웹사이트 보안 스크립트 (우클릭, 드래그, F12 차단)
// ==========================================================================

// 1. 마우스 우클릭(컨텍스트 메뉴) 차단
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// 2. 마우스 드래그 및 선택 시도 차단 (혹시 모를 예외 방지)
document.addEventListener('dragstart', (e) => e.preventDefault());
document.addEventListener('selectstart', (e) => e.preventDefault());

// 3. F12 및 소스보기 관련 키보드 단축키 차단
document.addEventListener('keydown', (e) => {
    // F12 차단
    if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        return false;
    }

    // Ctrl + Shift + I (개발자 도구) 차단
    // Ctrl + Shift + J (콘솔 창) 차단
    // Ctrl + Shift + C (요소 검사) 차단
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C' || e.key === 'i' || e.key === 'j' || e.key === 'c')) {
        e.preventDefault();
        return false;
    }

    // Ctrl + U (페이지 소스 보기) 차단
    if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) {
        e.preventDefault();
        return false;
    }
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
