import Image from "next/image";
import BG from '../../public/bg.png';

import { AccordionsBlock } from "./blocks/accordions-block";
import { GrowthPointsBlock } from "./blocks/growth-points-block";
import { Footer } from "./blocks/footer";
import { Header } from "./blocks/header"
import { InfinityBanner } from "./blocks/infinity-banner";
import { MainBanner } from "./blocks/main-banner";
import { SimpleBlock } from "./blocks/simple-block";
import { CommunityInNumbers } from "./blocks/community-in-numbers";
import { AboutUsBlock } from "./blocks/about-us-block";

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

            <AboutUsBlock />
        </main>

        <Footer />
    </div>
  );
}
