import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
//import { useNavigate } from 'react-router-dom';
import CustomButton from '../../Others/Button/CustomButton';
import './Form.css';

const LoginForm = (props: any) => {
    //  const navigate = useNavigate();

    const {
        register: login,
        formState: { errors: logErrors },
        handleSubmit: handleLogSubmit,
        reset,
    } = useForm({
        mode: 'onBlur',
    });

    const onLogSubmit = (data: any) => {
        console.log(data);
        reset();
        // LoginUser(data, navigate);
    };
    return (
        <div className="form" style={{ background: '#25292D' }}>
            <form
                onSubmit={handleLogSubmit(onLogSubmit)}
                className="form_wrapper"
                style={{ background: '#2E3438' }}
            >
                <h1>Hello!</h1>
                <p>We are really happy to see you again!</p>

                {/* ***********************UserName field************************* */}

                <input
                    type="text"
                    className="form_field"
                    placeholder="User Name"
                    style={{
                        background: '#1f2123',
                        color: 'lavender',
                    }}
                    {...login('userName', {
                        required: 'user name is required',
                        minLength: {
                            value: 2,
                            message: 'user name is too short',
                        },
                        maxLength: {
                            value: 16,
                            message: 'user name is too long',
                        },
                    })}
                />
                {logErrors.userName && (
                    <p className="form_error">
                        {(logErrors.userName as any)?.message}
                    </p>
                )}

                {/* ***************************Password field************************* */}

                <input
                    type="password"
                    className="form_field"
                    placeholder="Password"
                    style={{
                        background: '#1f2123',
                        color: 'lavender',
                    }}
                    {...login('password', {
                        required: 'password is required',
                        minLength: {
                            value: 8,
                            message: 'password is too short',
                        },
                        maxLength: {
                            value: 16,
                            message: 'password is too long',
                        },
                    })}
                />
                {logErrors.password && (
                    <p className="form_error">
                        {(logErrors.password as any)?.message}
                    </p>
                )}

                {/* ***************************Submit btn************************** */}

                {!logErrors.password && !logErrors.userName && (
                    <CustomButton
                        label="Sign in"
                        textCol="black"
                        backCol="#e2ff00"
                        width="150px"
                    />
                )}
                <motion.span
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="form_toggleBtn"
                >
                    <p onClick={() => props.toggleLoginForm(false)}>
                        New here! Register
                    </p>
                </motion.span>
            </form>
        </div>
    );
};

export default LoginForm;
