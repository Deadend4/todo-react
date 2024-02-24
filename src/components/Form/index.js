import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import List from '../List';
import Tooltip from '../Tooltip';
import Filters from '../Filters';
import styles from './Form.module.css';

export default function Form() {
  const [list, setList] = useState([]);
  const [countLeft, setCountLeft] = useState(0);
  const [filter, setFilter] = useState('All');
  const listItems = useRef([]);
  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({ reValidateMode: 'onSubmit' });

  function deleteCurrentItem(currentItem) {
    const deletedArray = list.filter((item) => item.id !== currentItem.id);
    setList(deletedArray);
    if (!currentItem.completed) {
      setCountLeft(countLeft => countLeft - 1);
    }
    
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
    const newItem = { id: Date.now(), value: item.input, completed: false};
    setList([newItem, ...list]);
    setCountLeft(countLeft => countLeft + 1);
    resetField('input');
    clearErrors();
  }
  function handleFilterChange(filter, isCompleted, listFiltered) {
    List({list: listFiltered});
    setFilter(filter);
  }
  function updateItemCounter(currentCount) {
    setCountLeft(currentCount);
  }
 
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Список дел</h1>
      <Tooltip message={'Пожалуйста, введите что-нибудь!'}
                canShow={errors.input?.type === 'required'}
                children>
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
        list={list}
        onItemCrossClick={deleteCurrentItem}
        onItemCheckboxClick={handleItemChange}
        onItemTextChange={handleItemChange}
        onUpdateCounter={updateItemCounter}
        countLeft={countLeft}
        listItems={listItems.current}
      />
      <Filters 
        list={list} 
        countLeft={countLeft} 
        onChangeFilter={handleFilterChange}
        listItems={listItems.current}
      />
    </div>
  );
}
