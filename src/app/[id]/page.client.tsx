"use client";

import {useState} from "react";

import type {Track} from "@/types";
import data from "@/data.json";

import {TrackPlayer} from "@/components/track-player";
import {ArrowRightIcon, ShuffleIcon} from "@/components/icons";
import {showConfetti} from "@/lib/confetti";

import {refreshPage} from "./actions";

export default function IdPageClient({track: serverTrack}: {track: Track}) {
  const [answer, setAnswer] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (answer.toLowerCase().trim() === serverTrack.label.toLowerCase()) {
      setIsCorrect(true);

      showConfetti();
    } else {
      alert("Incorrecto. Intenta de nuevo.");
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center">
      <div className="absolute inset-0 -z-10">
        <img alt="Background" className="h-full w-full object-cover" src="/bg-desktop.webp" />
      </div>

      {/* Shuffle button */}
      <form action={refreshPage}>
        <button
          aria-label="Aleatorio"
          className="bg-primary absolute top-4 left-4 flex h-12 w-12 items-center justify-center rounded-full text-white backdrop-blur-sm transition-colors hover:opacity-80"
        >
          <ShuffleIcon />
        </button>
      </form>

      <div className="flex flex-col items-center gap-8">
        <div className="relative bg-white p-4 shadow-2xl">
          {isCorrect ? (
            <>
              {/* Artist headshot when correct */}
              <div className="bg-polaroid-locked relative flex h-80 w-64 items-center justify-center overflow-hidden">
                <img
                  alt={serverTrack.label}
                  className="animate-in fade-in absolute h-full w-full object-cover duration-[7s]"
                  src={serverTrack.headshot}
                />
              </div>
              <div className="text-primary text-md mt-4 flex items-center justify-between">
                <span className="font-bold">{serverTrack.label}</span>
                <span className="font-bold">#{serverTrack.value}</span>
              </div>
            </>
          ) : (
            <>
              {/* TrackPlayer, form and difficulty selector */}
              <TrackPlayer.Root track={serverTrack}>
                <TrackPlayer.Player />

                <form className="mt-4 flex items-center gap-2" onSubmit={handleSubmit}>
                  <input
                    className="flex-1 rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-xs text-black placeholder:text-gray-500 focus:border-transparent focus:ring-2 focus:outline-none"
                    list="sessions-list"
                    name="answer"
                    placeholder="¿Quién es?"
                    type="search"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                  />
                  <datalist id="sessions-list">
                    {data.map((track) => (
                      <option key={track.value} value={track.label} />
                    ))}
                  </datalist>

                  <button
                    aria-label="Enviar"
                    className="bg-primary flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={!answer}
                    type="submit"
                  >
                    <ArrowRightIcon className="ml-0.5 h-5 w-5 text-white" />
                  </button>
                </form>

                <TrackPlayer.Difficulty />
              </TrackPlayer.Root>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
