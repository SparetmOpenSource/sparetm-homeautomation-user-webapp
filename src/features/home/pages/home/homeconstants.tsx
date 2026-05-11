import { FaCode, FaCogs, FaLightbulb, FaUsers } from 'react-icons/fa';
import { MdCloudSync, MdWeb } from 'react-icons/md';
import { card_pastels } from '../../../../data/ColorConstant';

export const HOME_HERO_TITLE = "Take control of your smart home";
export const HOME_HERO_TITLE_HIGHLIGHT = "your way";
export const HOME_HERO_SUBTITLE = "Empowering DIYers with open tools, smart tech, and the freedom to create from anywhere";

export const HOME_STORY_CONTENT_LIST = [
    {
        title: "Driven by Passion",
        text: "From the beginning, we’ve been driven by a passion for electronics and coding. Our vision has always been to build something useful for many people. And yes — we’ve also experienced those everyday inconveniences, like being too tired to get up and turn off the lights at night.",
        highlight: "That’s when it clicked.",
        icon: <FaCogs />,
        reverse: false
    },
    {
        title: "Community First",
        text: "With the support of the open source and DIY community — whom we deeply admire — we set out to build a platform that empowers makers and dreamers alike. A home automation system that’s not just smart and helpful, but also open source and fully customizable.",
        icon: <FaUsers />,
        reverse: true
    },
    {
        title: "Space to Create",
        text: "It’s built for people who want to learn, create, and even gain recognition for their contributions. If that sounds like you, welcome aboard.",
        icon: <FaLightbulb />,
        reverse: false
    }
];

export const HOME_FEATURE_STATS = [
    {
        label: "Interface",
        icon: <MdWeb />,
        rows: ["React Web App", "Deployed on Netlify", "UI Enhancements Regularly"]
    },
    {
        label: "DIY",
        icon: <FaCode />,
        rows: ["Setup Documentation", "Custom Code Snippets", "Regular Idea Updates"]
    },
    {
        label: "Real-Time",
        icon: <MdCloudSync />,
        rows: ["Appliance State Sync", "Real-time Updates", "Unified Control System"]
    }
];

export const HOME_SYSTEM_STEPS = [
    {
        tags: ['Users', 'Permissions', 'Access'],
        titlePrimary: 'Profile',
        titleHighlight: 'Settings',
        description: 'Manage users and permissions. Configure your home location for precise weather and sunrise/sunset data.',
        extraInfo: 'Keep your home secure with granular access control. create guest profiles and manage family access.',
        pastelColor: card_pastels.bluePastel,
        pillColor: card_pastels.bluePill,
    },
    {
        tags: ['Widgets', 'Layouts', 'Control'],
        titlePrimary: 'Smart',
        titleHighlight: 'Dashboard',
        description: 'Customize your interface to match your workflow. Organize devices, tweak settings, and control effortlessly.',
        extraInfo: 'Choose from hundreds of widgets and layouts. Our drag-and-drop interface lets you build your perfect control center.',
        pastelColor: card_pastels.peachPastel,
        pillColor: card_pastels.peachPill,
    },
    {
        tags: ['Rules', 'Schedules', 'Scripts'],
        titlePrimary: 'Automation',
        titleHighlight: 'Engine',
        description: 'Create powerful automation rules. Set schedules, triggers, and conditions to make your home truly smart.',
        extraInfo: 'From simple timers to complex multi-device scenarios, our automation engine handles it all with ease.',
        pastelColor: card_pastels.purplePastel,
        pillColor: card_pastels.purplePill,
    },
    {
        tags: ['ESP32', 'Raspberry Pi', 'Sensors'],
        titlePrimary: 'Custom',
        titleHighlight: 'Hardware',
        description: 'Seamlessly integrate your own hardware. Access step-by-step guides for ESP32 and Raspberry Pi.',
        extraInfo: 'Secure, local-first control without cloud reliance. Download pre-configured firmware for instant connectivity.',
        pastelColor: card_pastels.mintPastel,
        pillColor: card_pastels.mintPill,
    },
];

export const FOOTER_LINKS = ['PRIVACY POLICY', 'COOKIE POLICY', 'ABOUT', 'FAQ'];
