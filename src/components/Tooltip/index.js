import styles from './Tooltip.module.css';

export default function Tooltip({message, canShow}) {
    if (canShow) {
        return (
            <span className={styles.tooltipText}>{message}</span>
        );
    } else {
        return (
            <span className={styles.tooltipTextHidden}>{message}</span>
        );
    }
    
}