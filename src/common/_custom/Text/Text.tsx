import clsx from 'clsx';
import React from 'react';
import styles from './Text.module.scss';
interface TextProps {
  placeholder?: string;
  type?: string;
  label?: string;
  isValid?: boolean;
  errorMessage?: string;
  value: string;
  style?: React.CSSProperties;
  onChange: Function;
  onEnter?: Function;
  autoComplete?: boolean;
  disabled?: boolean;
}
function Text({
  placeholder = '',
  label = '',
  isValid = true,
  errorMessage = '',
  value,
  onChange,
  onEnter,
  style,
  autoComplete = false,
  disabled = false,
}: TextProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // if (pattern && !e.target.validity.valid) return;
    onChange(e.target.value);
  };

  return (
    <div
      className={clsx(styles.InputContainer, {
        [styles.ContainerWithErrorMsg]: !!errorMessage,
      })}
      style={style}
    >
      <textarea
        className={clsx(styles.FormInput, { [styles.Invalid]: !isValid })}
        // type={type}
        // pattern={pattern}
        value={value}
        onChange={handleChange}
        onKeyUp={(e) => {
          if (onEnter && e.key === 'Enter') onEnter();
        }}
        autoComplete={autoComplete ? '' : 'off'}
        placeholder={placeholder}
        disabled={disabled}
      />
      <label className={styles.FormLabel}>{label}</label>
      {!!(!isValid && errorMessage) && <div className={styles.Error}>{errorMessage}</div>}
    </div>
  );
}

export default Text;
