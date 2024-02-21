import styles from './Tooltip.module.css';

export default function Tooltip({ message, canShow, children }) {
    const tooltipClasses = `${styles.tooltipText} ${canShow ? styles.tooltipTextVisible : styles.tooltipTextHidden}`
    return (
        <>
            <span className={tooltipClasses}>{message}</span>
            {children}
        </>


    );

}