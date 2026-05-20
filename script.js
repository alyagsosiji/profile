// 음악 플레이어 기능 제어 구현
document.addEventListener('DOMContentLoaded', () => {
    // 플레이어 기본 설정
    // ※ 중요: 재생하고 싶은 음악 파일 경로를 아래 'track.mp3' 대신 넣어주세요.
    // 같은 폴더에 음악 파일을 두고 이름만 맞춰주면 작동합니다. (예: 'my-bgm.mp3')
    const AUDIO_SRC = 'track.mp3'; 
    const TRACK_DISPLAY_NAME = '🌌 우주 속으로 흐르는 꿈의 선율 (BGM)';

    const audio = new Audio(AUDIO_SRC);
    const playBtn = document.getElementById('play-btn');
    const progressBar = document.getElementById('progress-bar');
    const timeDisplay = document.getElementById('time-display');
    const trackName = document.getElementById('track-name');

    let isPlaying = false;

    // 초기 오디오 세팅 및 이벤트 핸들러
    audio.addEventListener('loadedmetadata', () => {
        updateTimeDisplay();
    });

    audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressBar.value = progress;
        }
        updateTimeDisplay();
    });

    audio.addEventListener('ended', () => {
        isPlaying = false;
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        progressBar.value = 0;
        updateTimeDisplay();
    });

    // 재생/일시정지 버튼 토글
    playBtn.addEventListener('click', () => {
        if (!audio.src || audio.src.includes('undefined')) {
            alert('재생할 음악 파일 주소가 올바르지 않습니다. script.js 코드를 확인해주세요.');
            return;
        }

        if (isPlaying) {
            audio.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            trackName.textContent = '일시 정지됨';
        } else {
            audio.play().then(() => {
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                trackName.textContent = TRACK_DISPLAY_NAME;
            }).catch(error => {
                console.error("재생 실패:", error);
                alert("음악 파일(track.mp3)을 찾을 수 없거나 브라우저 권한 문제로 재생할 수 없습니다. 파일을 같은 폴더에 넣었는지 확인해주세요!");
            });
        }
        isPlaying = !isPlaying;
    });

    // 프로그레스 바 조절 시 이동
    progressBar.addEventListener('input', () => {
        if (audio.duration) {
            const seekTime = (progressBar.value / 100) * audio.duration;
            audio.currentTime = seekTime;
        }
    });

    // 시간 표시 업데이트 유틸리티
    function updateTimeDisplay() {
        const currentMin = Math.floor(audio.currentTime / 60) || 0;
        const currentSec = Math.floor(audio.currentTime % 60) || 0;
        const durationMin = Math.floor(audio.duration / 60) || 0;
        const durationSec = Math.floor(audio.duration % 60) || 0;

        const formattedCurrent = `${String(currentMin).padStart(2, '0')}:${String(currentSec).padStart(2, '0')}`;
        const formattedDuration = isNaN(audio.duration) ? '00:00' : `${String(durationMin).padStart(2, '0')}:${String(durationSec).padStart(2, '0')}`;

        timeDisplay.textContent = `${formattedCurrent} / ${formattedDuration}`;
    }
});
