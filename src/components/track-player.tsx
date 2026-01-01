"use client";

import {createContext, use, useEffect, useMemo, useRef, useState} from "react";

import type {Track, Difficulty as TrackDifficulty} from "@/types";

import {cn} from "@/lib/utils";
import {LockIcon, PlayIcon, StarIcon, StopIcon} from "@/components/icons";

type PlayStatus = "idle" | "playing";

interface TrackPlayerContextValue {
  track: Track;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  currentDifficulty: number;
  setCurrentDifficulty: (difficulty: number) => void;
  playStatus: PlayStatus;
  difficulty: TrackDifficulty;
  handlePlayPause: () => void;
}

const TrackPlayerContext = createContext<TrackPlayerContextValue | null>(null);

function useTrackPlayer() {
  const context = use(TrackPlayerContext);

  if (!context) {
    throw new Error("TrackPlayer compound components must be used within TrackPlayer.Root");
  }

  return context;
}

function Root({track, children}: {track: Track; children: React.ReactNode}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentDifficulty, setCurrentDifficulty] = useState<number>(
    () => track.difficulty.length - 1,
  );
  const [playStatus, setPlayStatus] = useState<PlayStatus>("idle");
  const difficulty = useMemo(
    () => track.difficulty[currentDifficulty],
    [track.difficulty, currentDifficulty],
  );

  useEffect(() => {
    audioRef.current = new Audio(track.src);

    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      if (audio.currentTime >= difficulty.end) {
        audio.pause();
        setPlayStatus("idle");
      }
    };

    const handleEnded = () => {
      setPlayStatus("idle");
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);

      audio.pause();

      setPlayStatus("idle");
    };
  }, [track.src, difficulty]);

  function handlePlayPause() {
    if (!audioRef.current) return;

    if (playStatus === "idle") {
      audioRef.current.currentTime = difficulty.start;
      void audioRef.current.play();
      setPlayStatus("playing");
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = difficulty.start;
      setPlayStatus("idle");
    }
  }

  const value: TrackPlayerContextValue = {
    track,
    audioRef,
    currentDifficulty,
    setCurrentDifficulty,
    playStatus,
    difficulty,
    handlePlayPause,
  };

  return <TrackPlayerContext value={value}>{children}</TrackPlayerContext>;
}

function Player({className}: {className?: string}) {
  const {playStatus, handlePlayPause} = useTrackPlayer();

  return (
    <div
      className={cn(
        "bg-polaroid-locked relative flex h-80 w-64 items-center justify-center overflow-hidden",
        className,
      )}
    >
      <LockIcon className="text-primary h-32 w-32" />

      {/* Play/Pause button overlay */}
      <button
        aria-label={playStatus === "idle" ? "Reproducir audio" : "Detener audio"}
        className="group absolute inset-0 flex items-center justify-center"
        type="button"
        onClick={handlePlayPause}
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-black/70 transition-colors group-hover:bg-black/90">
          {playStatus === "idle" ? <PlayIcon /> : <StopIcon />}
        </div>
      </button>
    </div>
  );
}

function Difficulty({className}: {className?: string}) {
  const {track, currentDifficulty, setCurrentDifficulty} = useTrackPlayer();

  return (
    <div className={cn("mt-4 flex items-center justify-center gap-2", className)}>
      {track.difficulty.map((_, index) => (
        <button
          key={index}
          aria-label={`Nivel ${String(index + 1)}`}
          className="transition-all hover:scale-110 disabled:cursor-not-allowed disabled:opacity-30"
          disabled={index >= track.difficulty.length}
          type="button"
          onClick={() => setCurrentDifficulty(index)}
        >
          <StarIcon className="text-primary h-8 w-8" filled={index <= currentDifficulty} />
        </button>
      ))}
    </div>
  );
}

export const TrackPlayer = {
  Root,
  Player,
  Difficulty,
};
