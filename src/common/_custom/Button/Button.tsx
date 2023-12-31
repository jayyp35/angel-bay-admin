import clsx from 'clsx';
import { MouseEventHandler } from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import styles from './Button.module.scss';

interface ButtonProps {
    text: string;
    onClick: MouseEventHandler<HTMLDivElement>;
    variant?: 'black' | 'white' | 'blue' | 'blueinverted';
    style?: React.CSSProperties;
    disabled?: boolean;
    loading?: boolean;
    loadingText?: string;
    buttonRef?: any;
    fit?: boolean;
    rounded?: boolean;
    small?: boolean;
    tiny?: boolean;
    className?: string;
}
function Button({
    text = 'Button',
    onClick,
    variant,
    style,
    disabled = false,
    loading = false,
    loadingText = '',
    buttonRef,
    fit = false,
    rounded = false,
    small = false,
    tiny = false,
}: ButtonProps) {
    return (
        <div
            className={clsx(styles.Button, {
                [styles.White]: variant === 'white',
                [styles.Blue]: variant === 'blue',
                [styles.BlueInverted]: variant === 'blueinverted',
                [styles.Disabled]: disabled,
                [styles.ClickDisabled]: loading,
                [styles.Fit]: fit,
                [styles.Rounded]: rounded,
                [styles.Small]: small,
                [styles.Tiny]: tiny,
            })}
            onClick={onClick}
            style={style}
            ref={buttonRef}>
            {loading ? (
                <>
                    {loadingText || text}
                    <LoadingSpinner />
                </>
            ) : (
                text
            )}
        </div>
    );
}

export default Button;
