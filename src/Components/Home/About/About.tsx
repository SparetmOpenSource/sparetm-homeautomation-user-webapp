import { motion } from 'framer-motion';
import HomeAbout from './../../../Assets/HomeAbout.svg';
import './About.css';

const About = () => {
    return (
        <div className="about">
            <section>
                <p>Our mission</p>
                <h1>Improve Your Creative Thinking as a Software Developer</h1>
            </section>
            <section className="about_content">
                <div>
                    <h1>Our Story</h1>
                    <p>
                        If you are going to use a passage of Lorem Ipsum, you
                        need to be sure there isn't anything embarrassing hidden
                        in the middle of text. All the Lorem Ipsum generators on
                        the Internet tend to repeat predefined chunks as
                        necessary, making this the first true generator on the
                        Internet. It uses a dictionary of over 200 Latin words,
                        combined with etc.
                    </p>
                </div>
                <div>
                    <img
                        src={HomeAbout}
                        loading="lazy"
                        height="90%"
                        width="80%"
                        alt="About"
                    />
                </div>
            </section>
            <section className="about_contribution">
                <div className="about_contribution_heading">
                    <p>The team</p>
                    <h1>Balancing technical, academic and</h1>
                    <h1 className="about_contribution_heading_last">
                        entrepreneurial excellence
                    </h1>
                </div>
                <div className="about_contribution_content">
                    <motion.span
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1601696221767-a85d5374f15b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                            loading="lazy"
                            height="80%"
                            width="100%"
                            alt="About"
                        />
                        <h3>
                            Hi, I'm Shubham, Full Stack Engineer at Infosys Pvt
                            Ltd.
                        </h3>
                    </motion.span>
                </div>
            </section>
        </div>
    );
};

export default About;
