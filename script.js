document.addEventListener('DOMContentLoaded', () => {
    const audioElement = document.getElementById('audio-player');
    const playBtn = document.querySelector('.play-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const progressBar = document.querySelector('.progress-fill');
    const trackTitle = document.querySelector('.track-title');
    const trackArtist = document.querySelector('.track-artist');

    const profileAvatar = document.getElementById('profile-avatar');
    const friendsModal = document.getElementById('friends-modal');
    const closeModalBtn = document.getElementById('close-modal');

    const playlist = [
        {
            title: 'Laat Me',
            artist: 'Lusho',
            src: 'music/Laat Me.mp3'
        }
    ];

    let currentTrackIndex = 0;
    let isPlaying = false;

    function initPlayer() {
        loadTrack(currentTrackIndex);
        updateTrackInfo();
    }

    function loadTrack(index) {
        if (index >= 0 && index < playlist.length) {
            currentTrackIndex = index;
            audioElement.src = playlist[currentTrackIndex].src;
            updateTrackInfo();
            
            if (isPlaying) {
                audioElement.play();
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            }
        }
    }

    function updateTrackInfo() {
        if (trackTitle && trackArtist) {
            trackTitle.textContent = playlist[currentTrackIndex].title;
            trackArtist.textContent = playlist[currentTrackIndex].artist;
        }
    }

    function togglePlay() {
        if (isPlaying) {
            audioElement.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            audioElement.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    }

    function nextTrack() {
        let nextIndex = currentTrackIndex + 1;
        if (nextIndex >= playlist.length) {
            nextIndex = 0;
        }
        loadTrack(nextIndex);
        
        if (isPlaying) {
            audioElement.play();
        }
    }

    function prevTrack() {
        let prevIndex = currentTrackIndex - 1;
        if (prevIndex < 0) {
            prevIndex = playlist.length - 1;
        }
        loadTrack(prevIndex);
        
        if (isPlaying) {
            audioElement.play();
        }
    }

    function updateProgress() {
        const duration = audioElement.duration;
        const currentTime = audioElement.currentTime;
        
        if (duration) {
            const progressPercent = (currentTime / duration) * 100;
            progressBar.style.width = `${progressPercent}%`;
        }
    }

    function setProgress(e) {
        const progressBarContainer = document.querySelector('.progress-bar');
        const width = progressBarContainer.clientWidth;
        const clickX = e.offsetX;
        const duration = audioElement.duration;
        
        audioElement.currentTime = (clickX / width) * duration;
    }

    function onTrackEnd() {
        nextTrack();
    }

    function openFriendsModal() {
        friendsModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeFriendsModal() {
        friendsModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    playBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', prevTrack);
    nextBtn.addEventListener('click', nextTrack);
    audioElement.addEventListener('timeupdate', updateProgress);
    audioElement.addEventListener('ended', onTrackEnd);
    document.querySelector('.progress-bar').addEventListener('click', setProgress);

    profileAvatar.addEventListener('click', openFriendsModal);
    closeModalBtn.addEventListener('click', closeFriendsModal);
    
    friendsModal.addEventListener('click', (e) => {
        if (e.target === friendsModal) {
            closeFriendsModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && friendsModal.classList.contains('active')) {
            closeFriendsModal();
        }
    });

    initPlayer();
    
    function detectDevTools() {
        function isDevToolsOpen() {
            let devtools = false;

            const threshold = 160;
            const widthThreshold = window.outerWidth - window.innerWidth > threshold;
            const heightThreshold = window.outerHeight - window.innerHeight > threshold;
            
            if (widthThreshold || heightThreshold) {
                devtools = true;
            }
            const dateNow = Date.now();
            debugger;
            const diff = Date.now() - dateNow;
            if (diff > 100) {
                devtools = true;
            }
            
            return devtools;
        }
        function handleDevToolsOpen() {
            if (isDevToolsOpen()) {
                if (!document.getElementById('dev-tools-blocker')) {
                    const blocker = document.createElement('div');
                    blocker.id = 'dev-tools-blocker';
                    blocker.style.position = 'fixed';
                    blocker.style.top = '0';
                    blocker.style.left = '0';
                    blocker.style.width = '100%';
                    blocker.style.height = '100%';
                    blocker.style.backgroundColor = 'black';
                    blocker.style.color = 'white';
                    blocker.style.zIndex = '9999';
                    blocker.style.display = 'flex';
                    blocker.style.justifyContent = 'center';
                    blocker.style.alignItems = 'center';
                    blocker.style.flexDirection = 'column';
                    blocker.style.textAlign = 'center';
                    blocker.style.padding = '20px';
                    blocker.innerHTML = `
                        <h1 style="margin-bottom: 20px;">Access Blocked</h1>
                        <p>Developer tools access is not permitted on this site.</p>
                    `;
                    document.body.appendChild(blocker);
                }
                
                document.addEventListener('contextmenu', e => e.preventDefault());

                document.addEventListener('keydown', e => {
                    if (
                        e.keyCode === 123 || 
                        (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67))
                    ) {
                        e.preventDefault();
                    }
                });
            } else if (document.getElementById('dev-tools-blocker')) {
                document.getElementById('dev-tools-blocker').remove();
            }
        }

        setInterval(handleDevToolsOpen, 1000);

        handleDevToolsOpen();
    }
    detectDevTools();
}); 
