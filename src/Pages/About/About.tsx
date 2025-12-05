import './About.css';
import { useEffect, useState, useMemo } from 'react';
import { useTheme, useThemeUpdate } from '../ThemeProvider';
import { dark_colors, light_colors } from '../../Data/ColorConstant';
import { motion } from 'framer-motion';
import { IconContext } from 'react-icons';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { MdLightMode } from 'react-icons/md';
import { CiDark } from 'react-icons/ci';
import { observer } from '../../Utils/HelperFn';
import { MdWeb, MdCloudSync } from 'react-icons/md';
import { FaCode, FaUsers } from 'react-icons/fa';
import Profile from '../../Assets/Profile.png';
import PageTransition from '../../Components/Others/PageTransition/PageTransition';
import { home_contact_social_list } from '../../Data/Constants';

const About = () => {
    const darkTheme: any = useTheme();
    const toggleTheme: any = useThemeUpdate();
    const [color, setColor] = useState<any>(light_colors);

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]);

    useEffect(() => {
        const hiddenElements = document.querySelectorAll('.hidden-el');
        hiddenElements.forEach((element) => {
            observer.observe(element);
        });
    }, []);

    // TODO: Replace with actual co-founder data
    const coFounders = [
        {
            id: 1,
            name: 'Shubham Kumar Singh',
            role: 'Project Lead & Co-Founder',
            quote: 'When starting OpenBridge, I had a crystal clear vision of what a great home automation platform should feel like. Honest, skillful, fun, creative, humble, innovative. These are just some of the words I use to judge if we live up to that vision.',
            image: Profile, // TODO: Add image path
            linkedin: home_contact_social_list[1].href,
            github: 'https://github.com/sparetm',
        },
    ];

    // TODO: Replace with actual team member data
    const teamMembers = [
        {
            id: 1,
            name: 'Team Member 1',
            role: 'Full Stack Developer',
            image: '',
            linkedin: '#',
            github: '#',
        },
        {
            id: 2,
            name: 'Team Member 2',
            role: 'IoT Engineer',
            image: '',
            linkedin: '#',
            github: '#',
        },
        {
            id: 3,
            name: 'Team Member 3',
            role: 'UI/UX Designer',
            image: '',
            linkedin: '#',
            github: '#',
        },
        {
            id: 4,
            name: 'Team Member 4',
            role: 'Backend Developer',
            image: '',
            linkedin: '#',
            github: '#',
        },
        {
            id: 5,
            name: 'Team Member 5',
            role: 'DevOps Engineer',
            image: '',
            linkedin: '#',
            github: '#',
        },
        {
            id: 6,
            name: 'Team Member 6',
            role: 'Community Manager',
            image: '',
            linkedin: '#',
            github: '#',
        },
    ];

    const values = [
        {
            icon: <MdWeb />,
            title: 'Modern Interface',
            description:
                'Beautiful, intuitive web-based interface designed for seamless appliance control',
        },
        {
            icon: <FaCode />,
            title: 'DIY-Friendly',
            description:
                'Thoroughly documented code empowering DIY enthusiasts to create tailored solutions',
        },
        {
            icon: <MdCloudSync />,
            title: 'Real-Time Sync',
            description:
                'Full appliance synchronization ensuring accuracy and consistency across all devices',
        },
        {
            icon: <FaUsers />,
            title: 'Community Driven',
            description:
                'Built by makers, for makers. Join our growing community of home automation enthusiasts',
        },
    ];

    return (
        <PageTransition>
            <div className="about" style={{ backgroundColor: color?.outer }}>
            {/* Theme Toggle Button */}
            <motion.span
                className="about-theme-icon"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
            >
                <IconContext.Provider
                    value={useMemo(() => {
                        return {
                            size: '1.5em',
                            color: color?.button,
                        };
                    }, [color?.button])}
                >
                    {darkTheme ? <MdLightMode /> : <CiDark />}
                </IconContext.Provider>
            </motion.span>

            {/* Hero Section */}
            <section
                className="about-hero"
                style={{
                    padding: '100px 20px 80px',
                    textAlign: 'center',
                    backgroundColor: color?.inner,
                }}
            >
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        color: color?.button,
                        marginBottom: '20px',
                        fontWeight: 'bold',
                    }}
                >
                    About OpenBridge
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    style={{
                        fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                        color: color?.text,
                        maxWidth: '800px',
                        margin: '0 auto',
                        lineHeight: '1.6',
                    }}
                >
                    Empowering makers and dreamers to build smarter, not harder
                </motion.p>
            </section>

            {/* Vision Section - Inspired by IDEO */}
            <section
                className="about-vision hidden-el"
                style={{
                    padding: '80px 20px',
                    backgroundColor: color?.outer,
                }}
            >
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            gap: '40px',
                        }}
                    >
                        <div style={{ padding: '20px 0' }}>
                            <div
                                style={{
                                    borderTop: `3px solid ${color?.button}`,
                                    paddingTop: '20px',
                                    marginBottom: '20px',
                                }}
                            >
                                <h3
                                    style={{
                                        fontSize: '1.8rem',
                                        color: color?.text,
                                        marginBottom: '15px',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Who We Are
                                </h3>
                            </div>
                            <p style={{ color: color?.text, lineHeight: '1.8', fontSize: '1.1rem' }}>
                                We're a multidisciplinary community of makers who leverage
                                discovery, play and experimentation to help organizations get and
                                stay ahead now and in the future.
                            </p>
                        </div>
                        <div style={{ padding: '20px 0' }}>
                            <div
                                style={{
                                    borderTop: `3px solid ${color?.button}`,
                                    paddingTop: '20px',
                                    marginBottom: '20px',
                                }}
                            >
                                <h3
                                    style={{
                                        fontSize: '1.8rem',
                                        color: color?.text,
                                        marginBottom: '15px',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    What We Do
                                </h3>
                            </div>
                            <p style={{ color: color?.text, lineHeight: '1.8', fontSize: '1.1rem' }}>
                                We design breakthrough products, services, and experiences; craft
                                strategies that help DIYers grow; and build critical capabilities
                                that transform home automation.
                            </p>
                        </div>
                        <div style={{ padding: '20px 0' }}>
                            <div
                                style={{
                                    borderTop: `3px solid ${color?.button}`,
                                    paddingTop: '20px',
                                    marginBottom: '20px',
                                }}
                            >
                                <h3
                                    style={{
                                        fontSize: '1.8rem',
                                        color: color?.text,
                                        marginBottom: '15px',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Our Mission
                                </h3>
                            </div>
                            <p style={{ color: color?.text, lineHeight: '1.8', fontSize: '1.1rem' }}>
                                Looking to solve a problem, grow your capabilities, or build new
                                solutions? We're here to help. Get in touch so that we can help
                                chart a path forward.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Founder Spotlight - Inspired by Zoocha */}
            {coFounders.map((founder) => (
                <section
                    key={founder.id}
                    className="about-founder hidden-el"
                    style={{
                        padding: '80px 20px',
                        backgroundColor: color?.button,
                        minHeight: '500px',
                    }}
                >
                    <div
                        style={{
                            maxWidth: '1400px',
                            margin: '0 auto',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            gap: '60px',
                            alignItems: 'center',
                        }}
                    >
                        {/* Founder Photo */}
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <img
                                src={founder.image}
                                alt={founder.name}
                                style={{
                                    width: '350px',
                                    height: '350px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    objectPosition: '20% top',
                                    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                                    border: `5px solid ${color?.outer}`,
                                }}
                            />
                        </div>

                        {/* Founder Quote */}
                        <div>
                            <div
                                style={{
                                    fontSize: '4rem',
                                    color: color?.outer,
                                    opacity: 0.5,
                                    marginBottom: '20px',
                                    lineHeight: '1',
                                }}
                            >
                                "
                            </div>
                            <p
                                style={{
                                    fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
                                    color: color?.outer,
                                    lineHeight: '1.6',
                                    marginBottom: '30px',
                                }}
                            >
                                {founder.quote}
                            </p>
                            <div>
                                <p
                                    style={{
                                        fontSize: '1.3rem',
                                        color: color?.outer,
                                        fontWeight: 'bold',
                                        marginBottom: '5px',
                                    }}
                                >
                                    {founder.name}
                                </p>
                                <p
                                    style={{
                                        fontSize: '1.1rem',
                                        color: color?.outer,
                                        opacity: 0.9,
                                    }}
                                >
                                    {founder.role}
                                </p>
                                <div
                                    style={{
                                        display: 'flex',
                                        gap: '15px',
                                        marginTop: '15px',
                                    }}
                                >
                                    <IconContext.Provider
                                        value={{ size: '1.5em', color: color?.outer }}
                                    >
                                        <a
                                            href={founder.linkedin}
                                            target="_blank"
                                            rel="noreferrer"
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <FaLinkedin />
                                        </a>
                                        <a
                                            href={founder.github}
                                            target="_blank"
                                            rel="noreferrer"
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <FaGithub />
                                        </a>
                                    </IconContext.Provider>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ))}

            {/* Values Section - Inspired by Icon-based designs */}
            <section
                className="about-values hidden-el"
                style={{
                    padding: '80px 20px',
                    backgroundColor: color?.inner,
                }}
            >
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h2
                        style={{
                            fontSize: 'clamp(2rem, 4vw, 3rem)',
                            color: color?.button,
                            marginBottom: '60px',
                            textAlign: 'center',
                        }}
                    >
                        What We Offer
                    </h2>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '40px',
                        }}
                    >
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -10 }}
                                style={{
                                    padding: '40px 30px',
                                    backgroundColor: color?.outer,
                                    borderRadius: '12px',
                                    textAlign: 'center',
                                    boxShadow: `0 5px 20px rgba(0,0,0,0.1)`,
                                }}
                            >
                                <div
                                    style={{
                                        width: '80px',
                                        height: '80px',
                                        borderRadius: '50%',
                                        backgroundColor: color?.button,
                                        margin: '0 auto 25px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <IconContext.Provider
                                        value={{ size: '2.5em', color: color?.outer }}
                                    >
                                        {value.icon}
                                    </IconContext.Provider>
                                </div>
                                <h3
                                    style={{
                                        fontSize: '1.5rem',
                                        color: color?.button,
                                        marginBottom: '15px',
                                    }}
                                >
                                    {value.title}
                                </h3>
                                <p
                                    style={{
                                        color: color?.text,
                                        lineHeight: '1.6',
                                        fontSize: '1.05rem',
                                    }}
                                >
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Members Section - Inspired by GitLab */}
            <section
                className="about-team hidden-el"
                style={{
                    padding: '80px 20px',
                    backgroundColor: color?.outer,
                }}
            >
                <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                    <h2
                        style={{
                            fontSize: 'clamp(2rem, 4vw, 3rem)',
                            color: color?.button,
                            marginBottom: '20px',
                            textAlign: 'center',
                        }}
                    >
                        Meet Our Team
                    </h2>
                    <p
                        style={{
                            fontSize: '1.2rem',
                            color: color?.text,
                            textAlign: 'center',
                            marginBottom: '60px',
                            maxWidth: '800px',
                            margin: '0 auto 60px',
                        }}
                    >
                        More than 50+ people have contributed to OpenBridge. Our team consists of
                        passionate makers, developers, and designers.
                    </p>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                            gap: '30px',
                        }}
                    >
                        {teamMembers.map((member) => (
                            <motion.div
                                key={member.id}
                                whileHover={{ y: -10 }}
                                style={{
                                    backgroundColor: color?.inner,
                                    borderRadius: '12px',
                                    padding: '30px 20px',
                                    textAlign: 'center',
                                    boxShadow: `0 5px 20px rgba(0,0,0,0.08)`,
                                    cursor: 'pointer',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                            >
                                {/* TODO: Add member images */}
                                <div
                                    style={{
                                        width: '120px',
                                        height: '120px',
                                        borderRadius: '50%',
                                        backgroundColor: color?.button,
                                        margin: '0 auto 20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '2.5rem',
                                        color: color?.outer,
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {member.name.charAt(0)}
                                </div>
                                <h3
                                    style={{
                                        fontSize: '1.2rem',
                                        color: color?.button,
                                        marginBottom: '8px',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {member.name}
                                </h3>
                                <p
                                    style={{
                                        fontSize: '1rem',
                                        color: color?.text,
                                        marginBottom: '15px',
                                        opacity: 0.8,
                                    }}
                                >
                                    {member.role}
                                </p>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        gap: '15px',
                                    }}
                                >
                                    <IconContext.Provider
                                        value={{ size: '1.3em', color: color?.button }}
                                    >
                                        <a
                                            href={member.linkedin}
                                            target="_blank"
                                            rel="noreferrer"
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <FaLinkedin />
                                        </a>
                                        <a
                                            href={member.github}
                                            target="_blank"
                                            rel="noreferrer"
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <FaGithub />
                                        </a>
                                    </IconContext.Provider>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Join Us Section */}
            <section
                className="about-join hidden-el"
                style={{
                    padding: '80px 20px',
                    backgroundColor: color?.button,
                    textAlign: 'center',
                }}
            >
                <h2
                    style={{
                        fontSize: 'clamp(2rem, 4vw, 3rem)',
                        color: color?.outer,
                        marginBottom: '20px',
                    }}
                >
                    Want to Join Us?
                </h2>
                <p
                    style={{
                        fontSize: '1.3rem',
                        color: color?.outer,
                        marginBottom: '30px',
                        opacity: 0.9,
                    }}
                >
                    We're always looking for passionate makers and developers to join our
                    community
                </p>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        backgroundColor: color?.outer,
                        color: color?.button,
                        padding: '15px 40px',
                        fontSize: '1.2rem',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                    }}
                    onClick={() => window.open(home_contact_social_list[0].href, '_blank')}
                >
                    Contribute on GitHub
                </motion.button>
            </section>
        </div>
        </PageTransition>
    );
};

export default About;
