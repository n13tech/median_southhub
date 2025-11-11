import Image from "next/image";
import BG from '../../public/bg.png';

import { AccordionsBlock } from "./ui/accordions-block";
import { GrowthPointsBlock } from "./ui/growth-points-block";
import { Footer } from "./ui/footer";
import { Header } from "./ui/header"
import { InfinityBanner } from "./ui/infinity-banner";
import { MainBanner } from "./ui/main-banner";
import { SimpleBlock } from "./ui/simple-block";
import { CommunityInNumbers } from "./ui/community-in-numbers";

export default function Home() {
  return (
    <div>
      <Header />

        <Image
            src={BG}
            alt='bg'
            priority
            className="bg-img"
        />

      <main >
          <MainBanner />
          <SimpleBlock />
          <AccordionsBlock />

          <InfinityBanner />

          <CommunityInNumbers />
          <GrowthPointsBlock />

          <InfinityBanner />
      </main>

      <Footer />
    </div>
  );
}
