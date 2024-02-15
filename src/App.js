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

function List({list}) {
  const startEditing = (e) => e.target.setAttribute('contentEditable', 'true');
  const stopEditing = (e) => e.target.setAttribute('contentEditable', 'false');
    
  if (list[0].value !== null) {
    const listItems = list.map(item =>
        <li key={item.id}  className='input__item'>
          <input type='checkbox'/>
          <span className='item__text'
            onClick={startEditing}
            onBlur={stopEditing}
            onKeyDown={
              (e) => {
                if (e.key === 'Enter') {
                  stopEditing(e);
                }
              }
            }
          >{item.value}</span>
          <button type='button'>x</button>
        </li>
        
    );
    return (
      <ul>
        {listItems}
      </ul>
        
    );
  }
}

function Input() {
  const [list, setList] = useState([{id: null, value: null}]);
  // const [filter, setFilter] = useState('all');
  const { register, resetField, handleSubmit } = useForm();

  function handleInputClick(item) {
    if (list[0].value === null) {
      setList(
        [
          {id: Date.now(), value: item.input}
        ]
      );
    } else {
      setList(
      [
        {id: Date.now(), value: item.input},
        ...list
      ]
    );
    }
    
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


