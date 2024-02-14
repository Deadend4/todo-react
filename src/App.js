import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import './App.css';


export default function App() {
  return (
    <div className="App">
        <Input />
    </div>
  );
}

function List(list) {
  if (Array.isArray(list.list)) {
    const listItems = list.list.map((item, index) =>
        <li key={index}>{item}</li>
    );
    
    return (
      <ul>
        {listItems}
      </ul>
        
    );
  }
      
}

function Input() {
  const [list, setList] = useState([]);
  // const [filter, setFilter] = useState('all');
  const { register, resetField, handleSubmit } = useForm();

  function handleInputClick(item) {
    setList(
      [
        item.input,
        ...list
      ]
    );
    resetField('input');    
  }

  return (
    <div className='input'>
      <h1 className='input__heading'>todos</h1>
      <form className='input__form' onSubmit={handleSubmit(handleInputClick)}>
        <input className='input__input' placeholder='What needs to be done?' {...register('input', {required: true})} />
      </form>
      <List list={list} />
    </div>
    
  )
}


