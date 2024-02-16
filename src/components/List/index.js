import styles from './List.module.css';

export default function List({ list, deleteItem }) {
  const startEditing = (e) => e.target.setAttribute('contentEditable', 'true');
  const stopEditing = (e) => e.target.setAttribute('contentEditable', 'false');
  if (list.length > 0) {
    const listItems = list.map((item) => (
      <li key={item.id} className={styles.listItem}>
        <input type="checkbox" />
        <span
          className={styles.text}
          onClick={startEditing}
          onBlur={stopEditing}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              stopEditing(e);
            }
          }}
        >
          {item.value}
        </span>
        <button
          type="button"
          className={styles.deleteButton}
          onClick={() => deleteItem(item)}
        >
          ×
        </button>
      </li>
    ));
    return <ul className={styles.list}>{listItems}</ul>;
  }
}
