import Card from "./_components/translateCard/card";

export default function Home() {
  return (
    <main className="bg-[url('/images/hero_img.jpg')]  w-full h-screen bg-no-repeat bg-cover grid grid-cols-2 gap-x-8 m-auto p-12 items-center">
      <Card/>
      {/* <Card/> */}
    </main>
  )
}
