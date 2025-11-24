import { Fade } from 'react-awesome-reveal';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import Img1 from '../../../../public/carousel1.webp';
import Img2 from '../../../../public/carousel2.webp';
import Img3 from '../../../../public/carousel3.webp';
import Img5 from '../../../../public/carousel5.webp';
import Img6 from '../../../../public/carousel6.webp';

import './carousel-block.css';
import Image from 'next/image';

const responsive = {
    768: { items: 1 },
    1280: { items: 3 },
    1920: { items: 3 }
};

export const CarouselBlock = () => {
    return (
        <div className='carousel-block-wrapper' id='carousel-block'>
            <Fade delay={250} triggerOnce>
                <AliceCarousel
                    mouseTracking
                    paddingRight={16}
                    paddingLeft={16}
                    responsive={responsive}
                    autoHeight={true}
                    ssrSilentMode={true}
                    items={[
                        <div data-value="1" key={1}>
                            <Image
                                src={Img1}
                                alt=''
                            />
                        </div>,
                        <div data-value="2" key={2}>
                            <Image
                                src={Img2}
                                alt=''
                            />
                        </div>,
                        <div data-value="3" key={3}>
                            <Image
                                src={Img3}
                                alt=''
                            />
                        </div>,
                        <div data-value="4" key={4}>
                            <Image
                                src={Img5}
                                alt=''
                            />
                        </div>,
                        <div data-value="5" key={5}>
                            <Image
                                src={Img6}
                                alt=''
                            />
                        </div>
                    ]}
                />
            </Fade>
        </div>
    );
}