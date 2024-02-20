import styles from './List.module.css';

export default function List({
  list,
  onItemCrossClick,
  onItemCheckboxClick,
  onItemTextChange,
  onTextClick,
}) {
  const startTextEditing = (e, item) => {
    if (item.completed) {
      e.target.style.textDecorationLine = 'none';
    }
    onTextClick({...item, readOnly: false});
  }

  const stopTextEditing = (e, item) => {
    onItemTextChange({ ...item, value: e.target.value, readOnly: true });
    if (!e.target.value) {
      e.target.value = item.value;
    }
    if (item.completed) {
      e.target.style.textDecorationLine = 'line-through';
    }
  }

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
          onKeyDown={(e) =>{
            if (e.key === 'Enter') {
              stopTextEditing(e, item);
            }
          }}
          onBlur={(e) => stopTextEditing(e, item)}
          onTouchStart={(e) => startTextEditing(e, item)}
          onDoubleClick={(e) => startTextEditing(e, item)}
          onTransitionEnd={(e) => e.target.style.textDecorationLine = item.completed ? 'line-through' : 'none'}
          defaultValue={item.value}
          readOnly={item.readOnly}
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
