import { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
import videoSrc from "../assets/Sustainability2.mp4";

export default function CustomVideoPlayer() {
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    const video = videoRef.current;

    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;

    if (!video) return;

    const percentage = (video.currentTime / video.duration) * 100;
    setProgress(percentage || 0);
  };

  const handleProgressChange = (e) => {
    const video = videoRef.current;

    if (!video) return;

    const newProgress = Number(e.target.value);
    video.currentTime = (newProgress / 100) * video.duration;
    setProgress(newProgress);
  };

  const goFullscreen = () => {
    const video = videoRef.current;

    if (!video) return;

    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-black shadow-lg">
      <video
        ref={videoRef}
        className="aspect-video w-full object-cover"
        poster="/images/video-poster.jpg"
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 m-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/90 text-black shadow-lg transition hover:scale-105"
          aria-label="Play video"
        >
          <Play className="ml-1 h-9 w-9" />
        </button>
      )}

      <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-4">
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleProgressChange}
          className="mb-3 w-full cursor-pointer"
        />

        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <button onClick={togglePlay} aria-label="Play or pause video">
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
            </button>

            <button onClick={toggleMute} aria-label="Mute or unmute video">
              {isMuted ? (
                <VolumeX className="h-6 w-6" />
              ) : (
                <Volume2 className="h-6 w-6" />
              )}
            </button>
          </div>

          <button onClick={goFullscreen} aria-label="Fullscreen video">
            <Maximize className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}