import Image from "next/image";
import BG from '../../public/bg.png';

import { AccordionsBlock } from "./ui/accordions-block";
import { CommunityBlock } from "./ui/community-block";
import { EventsBlock } from "./ui/events-block";
import { Footer } from "./ui/footer";
import { Header } from "./ui/header"
import { InfinityBanner } from "./ui/infinity-banner";
import { MainBanner } from "./ui/main-banner";
import { SimpleBlock } from "./ui/simple-block";

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
          <CommunityBlock />
          <EventsBlock />
          <InfinityBanner />
      </main>

      <Footer />
    </div>
  );
}
