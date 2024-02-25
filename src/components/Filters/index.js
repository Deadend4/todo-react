import styles from './Filters.module.css';

export default function Filters({ countLeft, onChangeFilter, onClearClick }) {
  return (
    <div className={styles.filters}>
      <span>{`Задач: ${countLeft}`}</span>
      <input
        type="radio"
        id="all"
        name="filters"
        value={'all'}
        className={styles.radioButton}
        defaultChecked
        onChange={() => onChangeFilter('all')}
      />
      <label htmlFor="all" className={styles.radioLabel}>
        Все
      </label>
      <input
        type="radio"
        id="active"
        name="filters"
        value={'active'}
        className={styles.radioButton}
        onChange={() => onChangeFilter('active')}
      />
      <label htmlFor="active" className={styles.radioLabel}>
        Активно
      </label>
      <input
        type="radio"
        id="completed"
        name="filters"
        value={'completed'}
        className={styles.radioButton}
        onChange={() => onChangeFilter('completed')}
      />
      <label htmlFor="completed" className={styles.radioLabel}>
        Сделано
      </label>
      <button type="button" onClick={onClearClick}>
        Очистить
      </button>
    </div>
  );
}
