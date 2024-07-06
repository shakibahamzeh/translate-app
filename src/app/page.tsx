"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Card from "./_components/translateCard/card";
import AnswerCard from "./_components/answerCard/answerCard";

const queryClient = new QueryClient();

export default function Home() {

  return (
    <QueryClientProvider client={queryClient}>
    <main className="bg-[url('/images/hero_img.jpg')]  w-full h-screen bg-no-repeat bg-cover grid grid-cols-2 gap-x-8 m-auto p-12 items-center">
      <Card/>
      <AnswerCard/>
    </main>
    </QueryClientProvider>
  )
}
