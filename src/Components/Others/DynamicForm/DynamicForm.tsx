import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { motion } from 'framer-motion';
import { IconContext } from 'react-icons';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import { useTheme } from '../../../Pages/ThemeProvider';
import { dark_colors, light_colors } from '../../../Data/ColorConstant';
import TextBlinkAnimation from '../TextBlinkAnimation/TextBlinkAnimation';
import Button from '../CustomButton/Button';
import './DynamicForm.css';

export interface FieldConfig {
    id: string | number;
    name: string;
    type: 'text' | 'password' | 'mobile number' | 'select';
    label?: string; // Placeholder or Label
    
    // Select specific
    options?: { label: string; value: string; name?: string }[];
    isMulti?: boolean;
    isLoading?: boolean;
    
    // Validation
    validation?: any;
    
    // Logic specific (optional)
    onChangeFn?: (val: any) => void;
}

export interface SecondaryButtonConfig {
    id: string | number;
    label: string;
    onClick: () => void;
}

interface DynamicFormProps {
    heading?: string;
    subHeading?: string;
    fields: FieldConfig[];
    onSubmit: (data: any) => void;
    defaultValues?: any;
    submitLabel?: string;
    secondaryButtons?: SecondaryButtonConfig[];
    children?: React.ReactNode;
}

const DynamicForm = ({ heading, subHeading, fields, onSubmit, defaultValues = {}, submitLabel = 'Submit', secondaryButtons = [], children }: DynamicFormProps) => {
    const darkTheme: any = useTheme();
    const color = darkTheme ? dark_colors : light_colors;
    
    const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onBlur',
        defaultValues
    });

    const togglePassword = (fieldName: string) => {
        setShowPassword(prev => ({
            ...prev,
            [fieldName]: !prev[fieldName]
        }));
    };

    // Custom styles for react-select (Copied from Selector.tsx)
    const customStyles = {
        control: (base: any, state: any) => ({
            ...base,
            background: color?.element,
            color: color?.text,
            border: state.isFocused ? '3px solid orange' : '3px solid grey',
            borderRadius: '0.5rem',
            padding: '0.6em', 
            fontSize: '1rem',
            lineHeight: '24px',
            outlineOffset: '5px',
            boxShadow: 'none', 
            transition: '0.5s all ease',
            '&:hover': {
                border: '3px solid orange', 
            },
        }),
        menu: (base: any) => ({
            ...base,
            background: color?.element,
            color: color?.text,
            zIndex: 9999,
        }),
        option: (base: any, state: any) => ({
            ...base,
            backgroundColor: state.isFocused ? color?.hover : color?.element,
            color: color?.text,
            ':active': {
                backgroundColor: color?.button,
            },
        }),
        valueContainer: (base: any) => ({
            ...base,
            padding: '0',
            margin: '0',
        }),
        singleValue: (base: any) => ({
            ...base,
            color: color?.text,
            margin: '0',
            padding: '0',
        }),
        input: (base: any) => ({
            ...base,
            color: color?.text,
            margin: '0',
            padding: '0',
        }),
        placeholder: (base: any) => ({
            ...base,
            color: color?.icon,
            margin: '0',
            padding: '0',
        }),
        multiValue: (base: any) => ({
            ...base,
            backgroundColor: color?.inner,
        }),
        multiValueLabel: (base: any) => ({
            ...base,
            color: color?.text,
        }),
        multiValueRemove: (base: any) => ({
            ...base,
            color: color?.text,
            ':hover': {
                backgroundColor: color?.error,
                color: 'white',
            },
        }),
    };

    return (
        <div className="dynamicForm">
            <form onSubmit={handleSubmit(onSubmit)} className="dynamicForm-wrapper" style={{ backgroundColor: color?.outer }}>
                
                {/* Heading */}
                {heading && <div className="dynamicForm-heading">
                    <h1>
                        {heading?.split('')?.map((letter: any, index: any) => (
                            <TextBlinkAnimation
                                key={index}
                                color={color?.text}
                                size="32px"
                                height="27px"
                                weight="700"
                                opacity="1"
                            >
                                {letter === ' ' ? '\u00A0' : letter}
                            </TextBlinkAnimation>
                        ))}
                    </h1>
                </div>}

                {/* SubHeading */}
                {subHeading && (
                    <p className="dynamicForm-subHeading" style={{ color: color?.text }}>
                        {subHeading}
                    </p>
                )}

                {/* Fields */}
                {fields.map((field) => (
                    <div key={field.id} className="dynamicForm-field-wrapper">
                        
                        {/* SELECT FIELD */}
                        {field.type === 'select' ? (
                            <Controller
                                name={field.name}
                                control={control}
                                rules={field.validation}
                                render={({ field: { onChange, value, ref } }) => (
                                    <Select
                                        ref={ref}
                                        value={value}
                                        onChange={(val: any) => {
                                             onChange(val);
                                             if(field.onChangeFn) field.onChangeFn(val);
                                        }}
                                        options={field.options}
                                        isMulti={field.isMulti}
                                        isLoading={field.isLoading}
                                        styles={customStyles}
                                        placeholder={field.label}
                                        className="dynamicForm-select"
                                        classNamePrefix="select"
                                        closeMenuOnSelect={!field.isMulti}
                                        isDisabled={false}
                                        isClearable={true}
                                        isSearchable={true}
                                        getOptionLabel={(e: any) => e.label || e.name}
                                        getOptionValue={(e: any) => e.value || e.name}
                                    />
                                )}
                            />
                        ) : (
                        
                        /* INPUT FIELD (text, password, mobile) */
                        <div className={field.type === 'password' ? 'dynamicForm-password-wrapper' : 'dynamicForm-input-wrapper'} style={{ width: '100%' }}>
                            <input
                                id={field.name}
                                type={
                                    field.type === 'password' 
                                        ? (showPassword[field.name] ? 'text' : 'password') 
                                        : (field.type === 'mobile number' ? 'text' : field.type) // Handle mobile as text for regex
                                }
                                placeholder={field.label}
                                className="dynamicForm-field"
                                style={{
                                    background: color?.element,
                                    color: color?.text,
                                }}
                                {...register(field.name, {
                                    ...field.validation,
                                    pattern: field.type === "mobile number" ? {
                                        value: /^[0-9]{10,12}$/, // Basic mobile regex default
                                        message: 'Please enter a valid 10/12-digit mobile number',
                                    } : field.validation?.pattern
                                })}
                            />
                            
                            {/* Password Eye Toggle */}
                            {field.type === 'password' && (
                                <motion.div
                                    whileHover={{ scale: 1.0 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="dynamicForm-eyeIcon-button"
                                    onClick={() => togglePassword(field.name)}
                                    style={{ backgroundColor: color?.element }}
                                >
                                    <IconContext.Provider value={{ size: '2em', color: color?.button }}>
                                        {showPassword[field.name] ? <VscEyeClosed /> : <VscEye />}
                                    </IconContext.Provider>
                                </motion.div>
                            )}
                        </div>
                        )}

                        {/* Error Message */}
                        {errors[field.name] && (
                            <p className="dynamicForm-error">
                                {(errors[field.name] as any)?.message}
                            </p>
                        )}
                    </div>
                ))}

                {children}

                {/* Submit Button */}
                <div className="dynamicForm-button-wrapper">
                    <Button
                        label={submitLabel}
                        textCol={color?.button}
                        backCol={color?.inner}
                        backColOnDis={color?.element}
                        width="150px"
                        status={false} // Loading state can be passed as prop later
                        border={color?.button}
                    />
                    
                    {/* Secondary Buttons */}
                    {secondaryButtons.map((btn) => (
                         <div key={btn.id} style={{ marginLeft: '1rem' }}>
                            <Button
                                label={btn.label}
                                textCol={color?.button}
                                backCol={color?.inner}
                                backColOnDis={color?.element}
                                width="150px"
                                status={false}
                                border={color?.button}
                                fn={(e: any) => {
                                    e.preventDefault(); // Prevent form submission
                                    btn.onClick();
                                }}
                            />
                        </div>
                    ))}
                </div>
            </form>
        </div>
    );
};

export default DynamicForm;
