import styles from './Filters.module.css';
import { useRef } from 'react';

export default function Filters({
    list,
    countLeft,
    onChangeFilter,
    listItems
}) {

    function showAll() {

    }
    function showActive() {
        
    }

    function showCompleted() {
        onChangeFilter('completed', false, ['none']);
    }

    if (list.length === 0) return false;
    return (
        <div className={styles.filters}>
            <span>{`Задач: ${countLeft}`}</span>
            <input type='radio' id='all' name='filters' value={'all'} className={styles.radioButton} defaultChecked onChange={() => showAll()}/>
            <label htmlFor='all' className={styles.radioLabel}>Все</label>
            <input type='radio' id='active' name='filters' value={'active'} className={styles.radioButton} onChange={() => showActive()}/>
            <label htmlFor='active' className={styles.radioLabel}>Активно</label>
            <input type='radio' id='completed' name='filters' value={'completed'} className={styles.radioButton} onChange={() => showCompleted()}/>
            <label htmlFor='completed' className={styles.radioLabel}>Сделано</label>
            <button type='button'>Очистить </button>
        </div>
    );
    
}