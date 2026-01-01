import {notFound} from "next/navigation";

import data from "@/data.json";

import IdPageClient from "./page.client";

export function generateStaticParams() {
  return data.map((track) => ({
    id: track.value.toString(),
  }));
}

export default async function SessionPage({params}: PageProps<"/[id]">) {
  const {id} = await params;

  const track = data.find((track) => track.value === parseInt(id));

  if (!track) {
    notFound();
  }

  return <IdPageClient track={track} />;
}
