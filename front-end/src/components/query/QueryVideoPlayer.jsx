import React, { useEffect, useRef } from "react";

const QueryVideoPlayer = ({ videoId, startTime, endTime, onVideoComplete }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    let timer;

    // YouTube Player API Ready
    const onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player(`youtube-player-${videoId}`, {
        videoId: videoId,
        playerVars: {
          start: startTime,
          autoplay: 1,
          controls: 1,
        },
        events: {
          onReady: (event) => {
            event.target.playVideo();

            // Set a timeout to stop the video after `playDuration`
            if (endTime && endTime > 0) {
              timer = setTimeout(() => {
                console.log(`Timeout reached after ${endTime} seconds`);
                onVideoComplete(); // Call to switch to the next module
              }, endTime * 1000); // Convert seconds to milliseconds
            }
          },
        },
      });
    };

    // Load YouTube's iframe API script if not loaded already
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
      document.body.appendChild(tag);
    } else {
      onYouTubeIframeAPIReady();
    }

    // Cleanup on component unmount or timeout finish
    return () => {
      clearTimeout(timer);
      if (playerRef.current) {
        playerRef.current.destroy(); // Destroy the player if it exists
        playerRef.current = null; // Set to null to avoid memory leaks
      }
    };
  }, [videoId, startTime, endTime, onVideoComplete]);

  return <div id={`youtube-player-${videoId}`}></div>;
};

export default QueryVideoPlayer;
