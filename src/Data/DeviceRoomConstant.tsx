import { TbCircleDashed } from 'react-icons/tb';
import { BsMusicPlayerFill } from 'react-icons/bs';
import { FiMonitor } from 'react-icons/fi';
import { RiSwitchFill } from 'react-icons/ri';
import { SiConcourse } from 'react-icons/si';
import { GiCeilingLight } from 'react-icons/gi';
import { CgViewSplit } from 'react-icons/cg';
import {
    MdBrightness4,
    MdBrightness7,
    MdBrightnessLow,
    MdBrightnessMedium,
} from 'react-icons/md';

export const DeviceTypeConfig = [
    {
        value: 'gadget/rgb',
        label: 'Gadget/RGB',
        remote: null,
    },
    {
        value: 'appliance/light',
        label: 'Appliance/Light',
        remote: false,
    },
    {
        value: 'appliance/fan',
        label: 'Appliance/Fan',
        remote: true,
    },
    {
        value: 'appliance/switch',
        label: 'Appliance/Switch',
        remote: false,
    },
    {
        value: 'appliance/ac',
        label: 'Appliance/Ac',
        remote: true,
    },
    {
        value: 'appliance/tv',
        label: 'Appliance/Tv',
        remote: false,
    },
    {
        value: 'appliance/music',
        label: 'Appliance/Music',
        remote: false,
    },
];

export const changeDeviceIcon = (device: string) => {
    let icon: any;
    switch (device) {
        case 'RGB':
            icon = <TbCircleDashed />;
            break;
        case 'LIGHT':
            icon = <GiCeilingLight />;
            break;
        case 'FAN':
            icon = <SiConcourse />;
            break;
        case 'SWITCH':
            icon = <RiSwitchFill />;
            break;
        case 'AC':
            icon = <CgViewSplit />;
            break;
        case 'TV':
            icon = <FiMonitor />;
            break;
        case 'MUSIC':
            icon = <BsMusicPlayerFill />;
            break;
        default:
            icon = '';
            break;
    }
    return icon;
};

export const ChangeBrightnessIcon = (brightness: any) => {
    let icon: any;
    if (brightness >= 0 && brightness < 20) {
        icon = <MdBrightnessLow />;
    } else if (brightness >= 20 && brightness < 40) {
        icon = <MdBrightness4 />;
    } else if (brightness >= 40 && brightness < 70) {
        icon = <MdBrightnessMedium />;
    } else if (brightness >= 70 && brightness <= 100) {
        icon = <MdBrightness7 />;
    }
    return icon;
};

export const Spring = {
    type: 'spring',
    stiffness: 700,
    damping: 30,
};

export const RgbDeviceAnimation = [
    {
        id: 1,
        name: 'Regular',
        value: 'regular',
        color: 'red',
    },
    {
        id: 2,
        name: 'Spiral',
        value: 'spiral',
        color: 'blue',
    },
    {
        id: 3,
        name: 'Dim',
        value: 'dim',
        color: 'green',
    },
    {
        id: 4,
        name: 'Blur',
        value: 'blur',
        color: 'pink',
    },
];

// export const findAnimationBasedColor = (animationType: any) => {
//     return RgbDeviceAnimation.filter((el: any) => el.value === animationType)[0]
//         .color;
// };

export const atomBergRemoteCode =
    '0xCF8976,0xCFD12E,0xCF09F6,0xCF51AE,0xCFC936,0xCF11EE,0xCFF10E';

export const lgAcRemoteCode =
    '0xCF8976,0x8808F90,0x8808192,0xCF51AE,0xCFC936,0xCF11EE';

export const GadgetRgbDefaultColor = [177, 216, 213, 0.5];

export const GadgetRgbDefaultPattern = `Linear`;
export const GadgetRgbRainbowPattern = `Rainbow`;

export const deviceTypeArr = ['gadget', 'appliance'];
