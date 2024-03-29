import { FC } from 'react';
import { FaTimes } from 'react-icons/fa';
import { AlertProps } from '@/types';
import styles from './alert.module.scss';

const Alert: FC<AlertProps> = ({
    heading,
    message,
    onClose,
}) => {
    return (
        <div className={styles.alertContainer}>
            <button className={styles.alertButton} onClick={onClose}>
                <FaTimes />
            </button>
            <h2>{heading}</h2>
            <p>{message}</p>
        </div>
    );
};

export default Alert;
