export const RoutePath = {
    home: '/',
    profileConfig: '/profileconfig',
    // mainApplication: '/app',
    // room: 'room/:type',
    // premium: 'app/premium',
    // setting: 'app/setting',
    // dashboard: 'dashboard',
    // connection: 'app/connection',
};

export const SpringSuspense = {
    hidden: {
        y: '-100vh',
        opacity: 0,
        transform: 'scale(0) rotateX(-360deg)',
    },
    visible: {
        y: '0vh',
        opacity: 1,
        transition: {
            duration: 0.2,
            type: 'spring',
            damping: 15,
            stiffness: 500,
        },
    },
    exit: {
        y: '-100vh',
        opacity: 0,
    },
};

export const PolicyStatement = [
    {
        type: 'Privacy Policy',
        date: 'Last Updated : 26 Jan, 2022',
        statement:
            "This policy will be render from server Lorem Ipsum is simply  dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum This policy will be render from server Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum This policy will be render from server Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum This policy will be render from server Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    },
    {
        type: 'Cookie Policy',
        date: 'Last Updated : 26 Jan, 2022',
        statement:
            "This policy will be render from server Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    },
];
