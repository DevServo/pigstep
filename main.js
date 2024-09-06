var player;
var secondsOnPage = 0;

// Load YouTube IFrame API
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0', // Hide the video
        width: '0',  // Only audio
        videoId: 'R9eC3WBRKeY', // YouTube video ID for Pigstep
        playerVars: {
            'loop': 1,     // Loop the video
            'playlist': 'R9eC3WBRKeY', // Required for loop
            'autoplay': isIOS() ? 0 : 1  // Auto-play unless on iOS
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// Detect if the device is iOS
function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

// Function to play the video/audio
function playAudio() {
    if (player && player.playVideo) {
        player.playVideo();
        startCounter(); // Start the counter when audio starts
    } else {
        alert("Your browser doesn't support YouTube API. Please update your browser.");
    }
}

// Function to run when the YouTube player is ready
function onPlayerReady(event) {
    if (!isIOS()) {
        event.target.playVideo(); // Auto-play for non-iOS devices
        startCounter(); // Start the counter automatically for non-iOS devices
    }
}

// YouTube state change handler to ensure the video keeps looping
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        player.playVideo(); // Replay the video when it ends
    }
}

// Start the counter to track time on the page
function startCounter() {
    setInterval(function() {
        secondsOnPage++;
        document.getElementById('counter').innerText = secondsOnPage + "s";
    }, 1000);
}

// Function to close outdated message and allow the page to load
function closeMessage() {
    document.getElementById('outdatedMessage').style.display = 'none';
}

// Load the YouTube IFrame Player API script
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Show the play button only on iOS devices
function showPlayButtonIfNeeded() {
    if (isIOS()) {
        document.getElementById('playButton').style.display = 'block';
    }
}

// Run the play button display check on page load
showPlayButtonIfNeeded();

// Function to detect outdated browsers
function detectOutdatedBrowser() {
    var ua = navigator.userAgent;

    // Check for old versions of Internet Explorer
    var isOldIE = ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;

    // Check if the browser lacks support for essential modern features
    var isOutdated = !('fetch' in window) || !('Promise' in window) || !('serviceWorker' in navigator);

    if (isOldIE || isOutdated) {
        document.getElementById('outdatedMessage').style.display = 'flex';
    }
}


// Run outdated browser detection on page load
detectOutdatedBrowser();