// Аудио-плеер с плейлистом
        const audioPlayer = document.getElementById('audioPlayer');
        const audioResult = document.getElementById('audioResult');
        const playlist = [
            { src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', title: 'Трек 1' },
            { src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', title: 'Трек 2' }
        ];
        let currentTrack = 0;

        document.addEventListener('DOMContentLoaded', () => {
            const savedVolume = localStorage.getItem('audioVolume') || 1;
            audioPlayer.volume = savedVolume;
            document.getElementById('volumeControl').value = savedVolume;
            loadTrack();
        });

        function loadTrack() {
            audioPlayer.src = playlist[currentTrack].src;
            audioResult.textContent = `Текущий трек: ${playlist[currentTrack].title}`;
        }

        function nextTrack() {
            currentTrack = (currentTrack + 1) % playlist.length;
            loadTrack();
            audioPlayer.play();
        }

        function prevTrack() {
            currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
            loadTrack();
            audioPlayer.play();
        }

        document.getElementById('volumeControl').addEventListener('input', (e) => {
            audioPlayer.volume = e.target.value;
            localStorage.setItem('audioVolume', e.target.value);
        });

        // Видео-редактор
        const videoEditor = document.getElementById('videoEditor');
        const videoResult = document.getElementById('videoResult');

        videoEditor.src = 'https://www.w3schools.com/html/mov_bbb.mp4';

        function speedUp() {
            videoEditor.playbackRate = Math.min(videoEditor.playbackRate * 2, 4);
            videoResult.textContent = `Скорость: ${videoEditor.playbackRate}x`;
        }

        function slowDown() {
            videoEditor.playbackRate = Math.max(videoEditor.playbackRate / 2, 0.25);
            videoResult.textContent = `Скорость: ${videoEditor.playbackRate}x`;
        }

        function takeScreenshot() {
            const canvas = document.createElement('canvas');
            canvas.width = videoEditor.videoWidth;
            canvas.height = videoEditor.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(videoEditor, 0, 0);
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'screenshot.png';
            link.click();
            videoResult.textContent = 'Скриншот сохранён';
        }

        document.getElementById('videoVolume').addEventListener('input', (e) => {
            videoEditor.volume = e.target.value;
        });

        document.getElementById('videoBrightness').addEventListener('input', (e) => {
            videoEditor.style.filter = `brightness(${e.target.value})`;
        });

        // Видео-чат (эмуляция)
        const localVideo = document.getElementById('localVideo');
        const remoteVideo = document.getElementById('remoteVideo');
        const chatBox = document.getElementById('chatBox');
        let isMicOn = true;
        let isCameraOn = true;

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                localVideo.srcObject = stream;
                remoteVideo.srcObject = stream; // Эмуляция второго пользователя
            })
            .catch(err => console.error('Ошибка доступа к камере/микрофону:', err));

        function toggleMic() {
            const stream = localVideo.srcObject;
            if (stream) {
                const audioTracks = stream.getAudioTracks();
                isMicOn = !isMicOn;
                audioTracks.forEach(track => track.enabled = isMicOn);
                chatResult.textContent = `Микрофон: ${isMicOn ? 'Вкл' : 'Откл'}`;
            }
        }

        function toggleCamera() {
            const stream = localVideo.srcObject;
            if (stream) {
                const videoTracks = stream.getVideoTracks();
                isCameraOn = !isCameraOn;
                videoTracks.forEach(track => track.enabled = isCameraOn);
                chatResult.textContent = `Камера: ${isCameraOn ? 'Вкл' : 'Откл'}`;
            }
        }

        function sendMessage() {
            const input = document.getElementById('chatInput');
            const message = input.value;
            if (message) {
                chatBox.innerHTML += `<p>${new Date().toLocaleTimeString('ru-RU', { timeZone: 'Europe/London' })}: ${message}</p>`;
                input.value = '';
                chatBox.scrollTop = chatBox.scrollHeight;
            }
        }

        // Интерактивное видео
        const interactiveVideo = document.getElementById('interactiveVideo');
        const choiceContainer = document.getElementById('choiceContainer');
        const progressResult = document.getElementById('progressResult');
        interactiveVideo.src = 'https://www.w3schools.com/html/mov_bbb.mp4';
        let progress = localStorage.getItem('videoProgress') || 0;

        const choices = [
            { time: 5, options: ['Вправо', 'Влево'], next: [10, 15] },
            { time: 20, options: ['Вверх', 'Вниз'], next: [25, 30] }
        ];

        interactiveVideo.addEventListener('timeupdate', () => {
            if (interactiveVideo.currentTime >= progress) {
                const currentChoice = choices.find(c => Math.abs(interactiveVideo.currentTime - c.time) < 1);
                if (currentChoice && !choiceContainer.hasChildNodes()) {
                    currentChoice.options.forEach((option, i) => {
                        const button = document.createElement('button');
                        button.textContent = option;
                        button.onclick = () => {
                            progress = currentChoice.next[i];
                            interactiveVideo.currentTime = progress;
                            localStorage.setItem('videoProgress', progress);
                            choiceContainer.innerHTML = '';
                            progressResult.textContent = `Прогресс: ${progress} сек`;
                        };
                        choiceContainer.appendChild(button);
                    });
                }
            }
        });

        interactiveVideo.addEventListener('ended', () => {
            localStorage.removeItem('videoProgress');
            progressResult.textContent = 'Видео завершено, прогресс сброшен';
        });

        document.addEventListener('DOMContentLoaded', () => {
            interactiveVideo.currentTime = progress;
        });