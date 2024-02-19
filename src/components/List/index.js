import styles from './List.module.css';

export default function List({
  list,
  onItemCrossClick,
  onItemCheckboxClick,
  onItemTextChange,
}) {
  if (list.length > 0) {
    const listItems = list.map((item) => (
      <li key={item.id} className={styles.listItem}>
        <input
          id={`checkbox${item.id}`}
          type="checkbox"
          className={styles.checkbox}
          checked={item.completed}
          onChange={() =>
            onItemCheckboxClick({ ...item, completed: !item.completed })
          }
        />
        <label
          htmlFor={`checkbox${item.id}`}
          className={styles.checkboxLabel}
        ></label>
        <input
          className={styles.text}
          onBlur={(e) => {
            onItemTextChange({ ...item, value: e.target.value });
            if (!e.target.value) {
              e.target.value = item.value;
            }
          }}
          onTransitionEnd={(e) => {
            e.target.style.textDecorationLine = item.completed ? 'line-through' : 'none';
          }}
          defaultValue={item.value}
        />
        <button
          type="button"
          className={styles.deleteButton}
          onClick={() => onItemCrossClick(item)}
        >
          ×
        </button>
      </li>
    ));
    return <ul className={styles.list}>{listItems}</ul>;
  }
}
