
import { Baner } from "@/components/Baner/Baner";
import { Header } from "@/components/Header/Header";
import { SnowAnimation } from "@/components/SnowAnimation/SnowAnimation";

export default function Home() {
  return (
    <div>
       <SnowAnimation />
      <Header />
      <Baner />
    </div>
  );
}
