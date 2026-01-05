"use client";

import {createContext, use, useEffect, useId, useMemo, useRef, useState} from "react";

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
  const isPlaying = playStatus === "playing";

  return (
    <figure
      className={cn(
        "bg-polaroid-photo relative flex h-80 w-full items-center justify-center overflow-hidden",
        className,
      )}
    >
      <LockIcon aria-hidden="true" className="text-primary h-32 w-32" />

      <button
        aria-pressed={isPlaying}
        className="group absolute inset-0 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        title={isPlaying ? "Detener audio" : "Reproducir audio"}
        type="button"
        onClick={handlePlayPause}
      >
        <span
          aria-hidden="true"
          className="flex h-20 w-20 items-center justify-center rounded-full bg-black/70 transition-colors group-hover:bg-black/90"
        >
          {isPlaying ? <StopIcon /> : <PlayIcon />}
        </span>
        <span className="sr-only">{isPlaying ? "Detener audio" : "Reproducir audio"}</span>
      </button>
    </figure>
  );
}

function Difficulty({className}: {className?: string}) {
  const {track, currentDifficulty, setCurrentDifficulty} = useTrackPlayer();
  const groupId = useId();
  const totalLevels = track.difficulty.length;

  return (
    <fieldset
      aria-describedby={`${groupId}-desc`}
      className={cn("mt-4 flex flex-col items-center justify-center gap-1", className)}
    >
      <legend className="sr-only">Nivel de dificultad</legend>
      <p className="sr-only" id={`${groupId}-desc`}>
        Más estrellas significa más tiempo de audio. Actualmente en nivel {currentDifficulty + 1} de{" "}
        {totalLevels}.
      </p>

      <div aria-label="Selector de dificultad" className="flex gap-2" role="radiogroup">
        {track.difficulty.map((_, index) => {
          return (
            <button
              key={index}
              aria-checked={index === currentDifficulty}
              className="rounded-sm transition-all hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
              role="radio"
              type="button"
              onClick={() => setCurrentDifficulty(index)}
            >
              <StarIcon
                aria-hidden="true"
                className="text-primary h-8 w-8"
                filled={index <= currentDifficulty}
              />
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export const TrackPlayer = {
  Root,
  Player,
  Difficulty,
};
