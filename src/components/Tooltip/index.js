import { Children } from 'react';
import styles from './Tooltip.module.css';

export default function Tooltip({message, canShow, children}) {
    const tooltipClasses = `${styles.tooltipText} ${canShow ? styles.tooltipTextVisible : styles.tooltipTextHidden}`
    const mappedChildren = Children.map(children, child =>
          child
      );
    return (
            <>
                <span className={tooltipClasses}>{message}</span>
                {mappedChildren}
            </>
            
        
    );
    
}