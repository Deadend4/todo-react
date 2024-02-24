import styles from './List.module.css';
import { useRef } from 'react';

export default function List({
  list,
  onItemCrossClick,
  onItemCheckboxClick,
  onItemTextChange,
  onUpdateCounter,
  countLeft,
  listItems
}) {
  const startTextEditing = (e, item) => {
    e.target.removeAttribute('readonly');
    if (item.completed) {
      e.target.style.textDecorationLine = 'none';
    }
  }

  const stopTextEditing = (e, item) => {
    onItemTextChange({ ...item, value: e.target.value});
    if (!e.target.value) {
      e.target.value = item.value;
    }
    if (item.completed) {
      e.target.style.textDecorationLine = 'line-through';
    }
    e.target.setAttribute('readonly', true);
  }

  if (list.length > 0) {
    listItems = list.map((item) => (
      <li key={item.id} className={styles.listItem}>
        <input
          id={`checkbox${item.id}`}
          type="checkbox"
          className={styles.checkbox}
          checked={item.completed}
          onChange={() => {
            onItemCheckboxClick({ ...item, completed: !item.completed });
            onUpdateCounter(() => item.completed ? countLeft++ : countLeft--);
          }}
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
          readOnly={true}
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
