import clsx from 'clsx';
import React from 'react';
import searchIcon from './search.svg';
import styles from './Search.module.scss';
interface SearchProps {
  placeholder?: string;
  type?: string;
  pattern?: string;
  isValid?: boolean;
  errorMessage?: string;
  value: string;
  style?: React.CSSProperties;
  onChange: Function;
  onEnter?: Function;
  autoComplete?: boolean
}
function Search({
  type = 'text',
  pattern = '',
  isValid = true,
  errorMessage = '',
  placeholder = '',
  value,
  onChange,
  onEnter,
  style,
  autoComplete = false
}: SearchProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (pattern && !e.target.validity.valid) return;
    onChange(e.target.value);
  };

  return (
    <div
      className={clsx(styles.SearchContainer, {
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
        autoComplete={autoComplete ? '' : 'off'}
        placeholder={placeholder}
      />
      <img src={searchIcon} alt='search' className={styles.SearchIcon} />
      {!!(!isValid && errorMessage) && <div className={styles.Error}>{errorMessage}</div>}
    </div>
  );
}

export default Search;
