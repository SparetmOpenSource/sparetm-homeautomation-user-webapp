import React from 'react';
import { TbMicrowave, TbAirConditioning, TbDeviceTvOld, TbFreezeRow } from 'react-icons/tb';
import { BsMusicPlayerFill, BsSunFill, BsCloudSunFill, BsCloudFill, BsCloudsFill, BsCloudRainFill, BsCloudRainHeavyFill, BsFillCloudLightningRainFill, BsSnow2 } from 'react-icons/bs';
import { GiCeilingLight, GiBoatPropeller, GiWashingMachine } from 'react-icons/gi';
import { LuRefrigerator } from 'react-icons/lu';
import { SiSocketdotio, SiNano } from 'react-icons/si';
import { RiMistLine, RiMoonClearLine } from 'react-icons/ri';
import { BiSolidWasher } from 'react-icons/bi';

export const changeWeatherIcon = (iconCode: string) => {
    let icon: any;
    switch (iconCode) {
        case '01n': icon = <RiMoonClearLine />; break;
        case '01d': icon = <BsSunFill />; break;
        case '02d': case '02n': icon = <BsCloudSunFill />; break;
        case '03d': case '03n': icon = <BsCloudFill />; break;
        case '04d': case '04n': icon = <BsCloudsFill />; break;
        case '09d': case '09n': icon = <BsCloudRainFill />; break;
        case '10d': case '10n': icon = <BsCloudRainHeavyFill />; break;
        case '11d': case '11n': icon = <BsFillCloudLightningRainFill />; break;
        case '13d': case '13n': icon = <BsSnow2 />; break;
        case '50d': case '50n': icon = <RiMistLine />; break;
        default: icon = ''; break;
    }
    return icon;
};

export const appliance = [
    { id: 1, label: 'RGB', value: 'gadget/rgb', remote: false },
    { id: 2, label: 'Light', value: 'appliance/light', remote: false },
    { id: 3, label: 'Fan', value: 'appliance/fan', remote: true },
    { id: 4, label: 'Switch', value: 'appliance/switch', remote: false },
    { id: 5, label: 'Television', value: 'appliance/television', remote: true },
    { id: 6, label: 'Air Conditioner', value: 'appliance/airConditioner', remote: true },
    { id: 7, label: 'Music', value: 'appliance/music', remote: false },
    { id: 8, label: 'Freezer', value: 'appliance/freezer', remote: false },
    { id: 9, label: 'Dishwasher', value: 'appliance/dishwasher', remote: false },
    { id: 10, label: 'Refrigerator', value: 'appliance/refrigerator', remote: false },
    { id: 11, label: 'Microwave', value: 'appliance/microwave', remote: false },
    { id: 12, label: 'Washing Machine', value: 'appliance/washingMachine', remote: false }
];

export const gadget = [
    { label: 'RGB', value: 'gadget/rgb', remote: false },
];

export const changeDeviceIcon = (device: string) => {
    let icon: any;
    switch (device) {
        case 'RGB': icon = <SiNano />; break;
        case 'LIGHT': icon = <GiCeilingLight />; break;
        case 'FAN': icon = <GiBoatPropeller />; break;
        case 'SWITCH': icon = <SiSocketdotio />; break;
        case 'AIRCONDITIONER': icon = <TbAirConditioning />; break;
        case 'TELEVISION': icon = <TbDeviceTvOld />; break;
        case 'MUSIC': icon = <BsMusicPlayerFill />; break;
        case 'FREEZER': icon = <TbFreezeRow />; break;
        case 'REFRIGERATOR': icon = <LuRefrigerator />; break;
        case 'MICROWAVE': icon = <TbMicrowave />; break;
        case 'WASHINGMACHINE': icon = <GiWashingMachine />; break;
        case 'DISHWASHER': icon = <BiSolidWasher />; break;
        default: icon = ''; break;
    }
    return icon;
};

export const RgbDeviceAnimation = [
    { id: 1, name: 'Regular', value: 'regular', color: 'red' },
    { id: 2, name: 'Spiral', value: 'spiral', color: 'blue' },
    { id: 3, name: 'Dim', value: 'dim', color: 'green' },
    { id: 4, name: 'Blur', value: 'blur', color: 'pink' },
];

export const findAnimationBasedColor = (animationType: any) => {
    return RgbDeviceAnimation.filter((el: any) => el.value === animationType)[0].color;
};
