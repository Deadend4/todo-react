import { useState } from 'react';
import { useForm } from 'react-hook-form';
import List from '../List';
import styles from './Form.module.css';

export default function Form() {
  const [list, setList] = useState([]);
  // const [filter, setFilter] = useState('all');
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
  }
  function handleInputClick(item) {
    const newItem = { id: Date.now(), value: item.input };
    setList([newItem, ...list]);
    resetField('input');
    clearErrors();
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Список дел</h1>
      {errors.input?.type === 'required' ? (
        <span>Пожалуйста, введите что-нибудь!</span>
      ) : (
        false
      )}
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
      <List list={list} deleteItem={deleteCurrentItem} />
    </div>
  );
}
