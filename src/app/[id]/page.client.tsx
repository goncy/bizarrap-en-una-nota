"use client";

import {useState} from "react";

import type {Track} from "@/types";
import data from "@/data.json";

import {TrackPlayer} from "@/components/track-player";
import {ShuffleIcon} from "@/components/icons/shuffle";
import {ArrowRightIcon} from "@/components/icons/arrow-right";
import {SkipIcon} from "@/components/icons/skip";
import {showConfetti} from "@/lib/confetti";

import {refreshPage} from "./actions";

export default function IdPageClient({track: serverTrack}: {track: Track}) {
  const [revealState, setRevealState] = useState<"hidden" | "correct" | "gave-up">("hidden");

  const isRevealed = revealState !== "hidden";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const answer = formData.get("answer") as string;

    if (answer.toLowerCase().trim() === serverTrack.label.toLowerCase()) {
      setRevealState("correct");
      showConfetti();
    } else {
      alert("Incorrecto. Intentá de nuevo.");
    }
  }

  function handleGiveUp() {
    setRevealState("gave-up");
  }

  return (
    <main
      aria-label="Juego: Adiviná la session de Bizarrap"
      className="flex min-h-dvh flex-col items-center justify-center gap-6 p-4 md:p-6"
    >
      {/* Background */}
      <div aria-hidden="true" className="fixed inset-0 -z-10">
        <img alt="" className="h-full w-full object-cover" src="/bg-desktop.webp" />
      </div>

      {/* Controles de navegación */}
      <nav
        aria-label="Controles del juego"
        className="order-2 flex items-center gap-3 md:fixed md:top-6 md:left-1/2 md:order-0 md:-translate-x-1/2"
      >
        <form action={refreshPage}>
          <button
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:bg-white active:scale-95"
            title="Cargar session aleatoria"
            type="submit"
          >
            <ShuffleIcon aria-hidden="true" className="text-primary h-5 w-5" />
            <span className="sr-only">Cargar session aleatoria</span>
          </button>
        </form>

        {!isRevealed && (
          <button
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:bg-white active:scale-95"
            title="Rendirse y ver la respuesta"
            type="button"
            onClick={handleGiveUp}
          >
            <SkipIcon aria-hidden="true" className="text-primary h-5 w-5" />
            <span className="sr-only">Rendirse y ver la respuesta</span>
          </button>
        )}
      </nav>

      {/* Polaroid */}
      <article
        aria-label={isRevealed ? `Respuesta: ${serverTrack.label}` : "Adivinar artista"}
        className="order-1 w-full max-w-[300px] bg-white p-4 shadow-2xl md:order-0"
      >
        {isRevealed ? (
          <figure>
            <img
              alt={`Foto de ${serverTrack.label}`}
              className="bg-polaroid-photo animate-in fade-in h-80 w-full object-cover duration-[7s]"
              src={serverTrack.headshot}
            />
            <figcaption className="text-primary text-md mt-4 flex items-center justify-between">
              <span className="font-bold">{serverTrack.label}</span>
              <span className="font-bold">
                <abbr className="no-underline" title="Session número">
                  #
                </abbr>
                {serverTrack.value}
              </span>
            </figcaption>
          </figure>
        ) : (
          <TrackPlayer.Root track={serverTrack}>
            <TrackPlayer.Player />

            <form className="mt-4 flex flex-col gap-2" onSubmit={handleSubmit}>
              <div className="flex gap-2">
                <input
                  aria-label="¿Qué artista está cantando?"
                  className="w-full flex-1 rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-base text-black placeholder:text-gray-500 focus:border-transparent focus:ring-2 focus:outline-none"
                  list="sessions-list"
                  name="answer"
                  placeholder="¿Quién es?"
                  type="search"
                />
                <datalist id="sessions-list">
                  {data.map((track) => (
                    <option key={track.value} value={track.label} />
                  ))}
                </datalist>

                <button
                  className="bg-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition-colors hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
                  title="Enviar respuesta"
                  type="submit"
                >
                  <ArrowRightIcon aria-hidden="true" className="ml-0.5 h-5 w-5 text-white" />
                  <span className="sr-only">Enviar respuesta</span>
                </button>
              </div>
            </form>

            <TrackPlayer.Difficulty />
          </TrackPlayer.Root>
        )}
      </article>
    </main>
  );
}
