import { useState } from 'react';
import { useForm } from 'react-hook-form';
import List from '../List';
import Tooltip from '../Tooltip';
import Filters from '../Filters';
import styles from './Form.module.css';

export default function Form() {
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState('all');

  const countLeft = list.filter((item) => !item.completed).length;
  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({ reValidateMode: 'onSubmit' });

  function getFilteredList() {
    switch (filter) {
      case 'all':
        return list;
      case 'active':
        return list.filter((item) => !item.completed);
      case 'completed':
        return list.filter((item) => item.completed);
      default:
        return [];
    }
  }
  const filteredList = getFilteredList();

  function clearCompleted() {
    setList(list.filter((item) => !item.completed));
  }
  function deleteCurrentItem(currentItem) {
    const deletedArray = list.filter((item) => item.id !== currentItem.id);
    setList(deletedArray);
  }

  function handleItemChange(currentItem) {
    const changedArray = list.map((item) => {
      if (item.id === currentItem.id) {
        if (currentItem.value === '') {
          return item;
        } else {
          return currentItem;
        }
      } else {
        return item;
      }
    });
    setList(changedArray);
  }
  function handleInputClick(item) {
    const newItem = { id: Date.now(), value: item.input, completed: false };
    setList([newItem, ...list]);
    resetField('input');
    clearErrors();
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Список дел</h1>
      <Tooltip
        message={'Пожалуйста, введите что-нибудь!'}
        canShow={errors.input?.type === 'required'}
        children
      >
        <form className={styles.form} onSubmit={handleSubmit(handleInputClick)}>
          <input
            className={styles.input}
            placeholder="Что нужно сделать?"
            {...register('input', {
              required: true,
              onChange: () => {
                clearErrors();
              },
            })}
          />
        </form>
      </Tooltip>

      <List
        list={filteredList}
        onItemCrossClick={deleteCurrentItem}
        onItemCheckboxClick={handleItemChange}
        onItemTextChange={handleItemChange}
      />
      {list.length > 0 && (
        <Filters
          countLeft={countLeft}
          onChangeFilter={setFilter}
          onClearClick={clearCompleted}
        />
      )}
    </div>
  );
}
