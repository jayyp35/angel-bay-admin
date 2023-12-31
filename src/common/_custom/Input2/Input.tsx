import clsx from 'clsx';
import React from 'react';
import styles from './Input.module.scss';
interface InputProps {
    placeholder?: string;
    type?: string;
    pattern?: string;
    label?: string;
    isValid?: boolean;
    errorMessage?: string;
    value: string;
    style?: React.CSSProperties;
    onChange: Function;
    onEnter?: Function;
    autoComplete?: boolean;
    prefill?: string;
    disabled?: boolean;
    maxLength?: number;
    size?: 'normal' | 'small' | 'tiny';
    borderlessDisabled?: boolean;
}
function Input({
    type = 'text',
    placeholder = '',
    label = '',
    pattern = '',
    isValid = true,
    errorMessage = '',
    value,
    onChange,
    onEnter,
    style,
    autoComplete = false,
    prefill = '',
    disabled = false,
    maxLength,
    size = 'normal',
    borderlessDisabled = false,
}: InputProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (pattern && !e.target.validity.valid) return;
        onChange(e.target.value);
    };

    return (
        <div
            className={clsx(styles.InputContainer, {
                [styles.ContainerWithErrorMsg]: !!errorMessage,
            })}
            style={style}>
            {!!prefill && <div className={styles.Prefill}>{prefill}</div>}
            <input
                disabled={disabled}
                className={clsx(styles.FormInput, {
                    [styles.Invalid]: !isValid,
                    [styles.PrefillInput]: !!prefill,
                    [styles.SmallInput]: size === 'small',
                    [styles.TinyInput]: size === 'tiny',
                    [styles.BorderlessDisbaled]: borderlessDisabled,
                })}
                type={type}
                pattern={pattern}
                value={value}
                onChange={handleChange}
                onKeyUp={(e) => {
                    if (onEnter && e.key === 'Enter') onEnter();
                }}
                autoComplete={autoComplete ? '' : 'off'}
                placeholder={placeholder}
                maxLength={maxLength}
            />
            <label className={styles.FormLabel}>{label}</label>
            {!!(!isValid && errorMessage) && <div className={styles.Error}>{errorMessage}</div>}
        </div>
    );
}

export default Input;
