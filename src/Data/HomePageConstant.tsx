export const LogInCredLength = {
    userName: {
        min: 2,
        max: 240,
    },
    password: {
        min: 8,
        max: 24,
    },
};

export const RegistrationCredLength = {
    name: {
        min: 2,
        max: 16,
    },
    password: {
        min: 8,
        max: 16,
    },
};

export const page_4_socialContact_list = [
    {
        id: 1,
        name: 'GitHub',
        href: process.env.REACT_APP_GITHUB_URL || 'https://github.com/SparetmOpenSource',
    },
    {
        id: 2,
        name: 'Instagram',
        href: process.env.REACT_APP_INSTAGRAM_URL || 'https://www.instagram.com/_sparetm/',
    },
    {
        id: 3,
        name: 'Contact us',
        href: process.env.REACT_APP_LINKEDIN_URL || 'https://www.linkedin.com/in/shubham2601',
    },
];
