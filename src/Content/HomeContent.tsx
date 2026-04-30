import { FaCogs, FaUsers, FaLightbulb } from 'react-icons/fa';
import { card_pastels } from '../Data/ColorConstant';
import { MdWeb } from 'react-icons/md';
import { FaCode } from 'react-icons/fa';
import { MdCloudSync } from 'react-icons/md';

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

export const FOOTER_LINKS = [
    { label: 'PRIVACY POLICY', key: 'privacy' },
    { label: 'COOKIE POLICY', key: 'cookie' },
    { label: 'ABOUT', key: 'about' },
    { label: 'FAQ', key: 'faq' }
];
// Menu Mapping Items
export const MENU_ITEMS = [
    { id: 1, name: 'Home' },
    { id: 2, name: 'Story' },
    { id: 3, name: 'Features' },
    { id: 4, name: 'Steps' },
    { id: 5, name: 'Contact' }
];

// Buttons & Actions
export const ACTION_EXPLORE_TEXT = 'Explore';
export const ACTION_CLOSE_TEXT = 'Close';
export const ACTION_LOGIN_TEXT = 'Login';
export const ACTION_DEMO_TEXT = 'See Demo';
export const ACTION_DEMO_TOAST = 'Demo coming soon!';
export const ACTION_IMPLEMENT_TOAST = 'Implementation in progress';

// Story Header Text Elements
export const HOME_STORY_HEADER_P1 = "The story of";
export const HOME_STORY_HEADER_P2 = "begins";
export const HOME_STORY_HEADER_P3 = "with curiosity.";

// System Features Headers & Text
export const HOME_SYSTEM_TITLE = "THE SYSTEM";

export const HOME_FEATURES_DESCRIPTIONS = [
    {
        title: "Modern Web Interface: ",
        content: (
            <span className="text-secondary">
                {' '} Our system comes with a <strong><i>visually appealing</i></strong>,
                an intuitive <strong><i>web-based</i></strong>{' '}interface designed for
                <strong><i> Seamless appliance control</i></strong>. Whether you're turning on the lights,
                adjusting the fan speed, or checking the status of your devices, the user interface
                ensures a smooth and responsive experience. With just a few taps or clicks,
                you can manage your entire home environment in <strong><i>real-time</i></strong>,
                right from your browser.
            </span>
        )
    },
    {
        title: "DIY-Friendly Code: ",
        content: (
            <span className="text-secondary">
                {' '} For those who love to tinker and build, We’ve got you covered. All our code is
                <strong><i> thoroughly documented, </i></strong> making it easy for
                <strong><i> DIY enthusiasts and developers</i></strong> to explore, modify or expand the system.
                Whether you're integrating new sensors, customizing controls, or simply learning how
                everything works, the clear and <strong><i>structured codebase </i></strong>
                empowers you to create your own <strong><i>tailored solutions.</i></strong>
            </span>
        )
    },
    {
        title: "Real-Time Sync: ",
        content: (
            <span className="text-secondary">
                {' '} One of the core features of our system is <strong><i> full appliance synchronization</i></strong>.
                Any change made to the state of an appliance, be it through the UI, physical
                switches, or voice commands, is <strong><i>instantly reflected{' '}</i></strong>
                across all connected devices and dashboards. This <strong><i>Real-time sync</i></strong>
                {' '}ensures accuracy, consistency, and convenience, no matter where or how you
                interact with your home.
            </span>
        )
    }
];

// Footer Text
export const HOME_BRAND_NAME = "Sparetm";
export const HOME_BRAND_TAGLINE = "Make this app better by connecting with us 😀";
export const FOOTER_COPYRIGHT_TEXT = `COPYRIGHT © ${new Date().getFullYear()} OPENBRIDGE INC.`;
export const FOOTER_COPYRIGHT_RIGHTS = "ALL RIGHTS RESERVED.";

