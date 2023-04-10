import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/Slice';
import { nanoid } from 'nanoid';

export const Form = () => {
  const contact = useSelector(state => state.contacts);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const changeSubmit = e => {
    const nameInput = e.currentTarget.name;
    const valueInput = e.currentTarget.value;
    switch (nameInput) {
      case 'name':
        setName(valueInput);
        break;
      case 'number':
        setNumber(valueInput);
        break;
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const alertFind = contact.find(contact => contact.name === name);
    if (alertFind) {
      return alert(`${name} is already in contacs.`);
    }
    let id = nanoid();
    dispatch(addContact({ name, number, id }));
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <span>Name</span>
        <input
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          type="text"
          value={name}
          name="name"
          onChange={changeSubmit}
        />
        <span>Number</span>
        <input
          required
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          type="tel"
          value={number}
          name="number"
          onChange={changeSubmit}
        />
        <button type="submit">Add Contact</button>
      </form>
    </div>
  );
};
