import { useEffect, useState } from 'react';
import LoginForm from '../Components/Home/Form/LoginForm';
import CanvasAnimation from '../Components/Others/CanvasAnimation/CanvasAnimation';
import './GlobalStyling.css';
import RegistrationForm from '../Components/Home/Form/RegistrationForm';
import TextBlinkAnimation from '../Components/Others/TextBlinkAnimation/TextBlinkAnimation';
import { motion } from 'framer-motion';
import Switch from '../Components/Others/Switch/Switch';
import { setAppProfile } from '../Utils/HelperFn';
import { MdOutlineOnlinePrediction } from "react-icons/md";
import { HiOutlineStatusOffline } from "react-icons/hi";

const SignInSignUp = () => {
  const [openLoginForm, setOpenLoginForm]: any = useState(true);
  const sentence = openLoginForm ? 'Welcome Back!'.split('') : 'Hello, Friend!'.split('');
  const [profileStatus, setProfileStatus]: any = useState(false);
  
  // Should execute only once
  useEffect(() => {
    setAppProfile(profileStatus);
  }, [profileStatus]); // eslint-disable-line react-hooks/exhaustive-deps

//useMountEffect(displayToastify('working on both offline and online', TOASTIFYCOLOR.DARK, TOASTIFYSTATE.INFO));
  
  return (
    <div className='home_auth'>
      <section><CanvasAnimation>
        <div className='canvasAnimation_container'>
          <section></section>
          <section>
            <div>
              {sentence.map((letter, index) => {
                    return (
                        <TextBlinkAnimation
                            key={index}
                            color="#3a3a3a"
                            size="calc(40px + (60 - 40) * ((100vw - 1280px) / (1600 - 1280)))"
                            height="27px"
                            weight="700"
                            opacity="0.5"
                            mode="color-burn"
                        >
                            {letter === ' ' ? '\u00A0' : letter}
                        </TextBlinkAnimation>
                    );
              })}
            </div>
            <div>
              <p>{openLoginForm ? 'To Keep connected with us please':'Enter your personal details'}</p>
              <p>{openLoginForm ? 'login with your personal info':'and start journey with us'}</p>
            </div>
            <div>
              <span>
              <span style={{color:"green"}}>{ profileStatus?<HiOutlineStatusOffline color="red" size={35}/>:<MdOutlineOnlinePrediction size={35}/>}</span>
                <Switch
                isOn={profileStatus}
                onColor="#EF476F"
                handleToggle={() => setProfileStatus(!profileStatus)}
             /></span>
                <motion.span
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="form_toggleBtn"
                >
                    <p onClick={() => setOpenLoginForm(!openLoginForm)}>
                        {openLoginForm ? ' New here! Register':'Have an account? Log in'}
                    </p>
                </motion.span>
            </div>
          </section>
        </div>
      </CanvasAnimation></section>
        <section>{openLoginForm && <LoginForm/>}
            {!openLoginForm && (
                <RegistrationForm/>
            )}</section>
    </div>
  )
}

export default SignInSignUp