import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import closeIcon from './close.svg';
import styles from './Modal.module.scss';

interface ModalProps {
    open: boolean;
    size?: 'tiny' | 'small' | 'long' | 'large' | 'full' | 'flexible';
    onClose?: () => void;
    children?: React.ReactNode;
    withoutCloseButton?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

const Modal: React.FC<ModalProps> = (props) => {
    const [show, setShow] = useState(true);
    const modalSize = props.size || 'small';

    useEffect(() => {
        setShow(props.open);
        if (props.open) document.body.classList.add('modal-open');

        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [props.open]);

    const handleClose = () => {
        props.onClose && props.onClose();
        setShow(false);
    };

    return (
        <div
            className={`${props.className} ${styles.ModalContainer}`}
            style={{ display: show ? '' : 'none' }}
            onClick={handleClose}>
            <div
                className={clsx({
                    [styles.Modal]: true,
                    [styles.Tiny]: modalSize === 'tiny',
                    [styles.Small]: modalSize === 'small',
                    [styles.Long]: modalSize === 'long',
                    [styles.Large]: modalSize === 'large',
                    [styles.Full]: modalSize === 'full',
                    [styles.Flexible]: modalSize === 'flexible',
                })}
                onClick={(e) => e.stopPropagation()}
                style={{ ...props?.style }}>
                {!props.withoutCloseButton && (
                    <img
                        className={styles.CloseIcon}
                        src={closeIcon}
                        alt='close'
                        height='10px'
                        width='10px'
                        onClick={handleClose}
                    />
                )}

                <div className={styles.Body}>{props.children}</div>
            </div>
        </div>
    );
};

export default Modal;
