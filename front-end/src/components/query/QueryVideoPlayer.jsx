import React from "react";

const QueryVideoPlayer = ({ videoId, startTime }) => {
  const videoSrc = `https://www.youtube.com/embed/${videoId}?start=${startTime}&autoplay=1`;

  return (
    <div>
      <iframe
        width="560"
        height="315"
        src={videoSrc}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default QueryVideoPlayer;
