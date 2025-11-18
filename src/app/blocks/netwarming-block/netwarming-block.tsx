import { Fade } from 'react-awesome-reveal';
import Netwarming from '../../../../public/netwarming.svg';

import './netwarming-block.css';
import Image from 'next/image';

export const NetwarmingBlock = () => {
    return (
        <div className='netwarming-block-wrapper' id='netwarming-block'>
            <Fade direction='up' triggerOnce>
                <Image
                    src={Netwarming}
                    alt='netwarming'
                />
            </Fade>
        </div>
    );
}