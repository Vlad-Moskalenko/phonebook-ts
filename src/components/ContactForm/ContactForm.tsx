import css from './ContactForm.module.css';

import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { useState } from 'react';

import { addContact } from '../../redux/contactsSlice';

interface IContact {
  name: string;
  number: string;
}

const INITIAL_STATE = {
  name: '',
  number: '',
};

export const ContactForm: React.FC = () => {
  const [contact, setContact] = useState<IContact>(INITIAL_STATE);
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(state => state.contacts.contacts);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { name, value }} = e
    setContact(prevState => ({ ...prevState, [name]: value }));
  };

  const reset = () => {
    setContact(INITIAL_STATE);
  };

  const isUniqueContact = (name: string, contacts: IContact[]) =>
    contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase());

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isUniqueContact(contact.name, contacts)) {
      return alert(`${contact.name} is already exist`);
    }

    dispatch(addContact(contact));

    reset();
  };

  return (
    <form onSubmit={onSubmitForm}>
      <label className={css.inputWrapper}>
        Name
        <input
          onChange={onChangeInput}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          value={contact.name}
          required
        />
      </label>
      <label className={css.inputWrapper}>
        Number
        <input
          onChange={onChangeInput}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          value={contact.number}
          required
        />
      </label>
      <button type="submit">Add contact</button>
    </form>
  );
};
