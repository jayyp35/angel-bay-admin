import clsx from 'clsx';
import React from 'react';
import styles from './Input.module.scss';
interface InputProps {
  placeholder?: string;
  type?: string;
  pattern?: string;
  isValid?: boolean;
  errorMessage?: string;
  value: string;
  style?: React.CSSProperties;
  onChange: Function;
  onEnter?: Function;
}
function Input({
  type = 'text',
  placeholder = '',
  pattern = '',
  isValid = true,
  errorMessage = '',
  value,
  onChange,
  onEnter,
  style,
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
      style={style}
    >
      <input
        className={clsx(styles.FormInput, { [styles.Invalid]: !isValid })}
        type={type}
        pattern={pattern}
        value={value}
        onChange={handleChange}
        onKeyUp={(e) => {
          if (onEnter && e.key === 'Enter') onEnter();
        }}
      />
      <label className={styles.FormLabel}>{placeholder}</label>
      {!!(!isValid && errorMessage) && <div className={styles.Error}>{errorMessage}</div>}
    </div>
  );
}

export default Input;
