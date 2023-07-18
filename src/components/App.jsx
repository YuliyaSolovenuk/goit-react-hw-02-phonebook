import Notiflix from 'notiflix';
import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Form } from './form/Form';
import { Filter } from './filter/Filter';
import { ContactList } from './contactList/ContactList';

Notiflix.Notify.init({
  width: '320px',
  position: 'center-top',
  cssAnimationStyle: 'zoom',
  closeButton: true,
});

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  formSubmitHandler = data => {
    if (data.name.trim() === '') {
      return;
    }

    const isIncludeName = this.state.contacts.find(contact =>
      contact.name.toLowerCase().includes(data.name.toLowerCase())
    );

    const isIncludeNumber = this.state.contacts.find(contact =>
      contact.number
        .split('-')
        .join('')
        .includes(data.number.split('-').join(''))
    );

    if (isIncludeName) {
      Notiflix.Notify.warning(`${data.name} is already in contacts`);
      return;
    }

    if (isIncludeNumber) {
      Notiflix.Notify.warning(`${data.number} is already in contacts`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name: data.name.trim(),
      number: data.number.trim(),
    };

    const { contacts } = this.state;

    this.setState({ contacts: [...contacts, newContact] });
    console.log(contacts);
    // this.setState({ name: '' });
    // this.setState({ number: '' });
  };

  onFiltredContacts = () => {
    const { contacts, filter } = this.state;
    const filterEl = contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
    return filterEl;
  };

  deleteContact = id => {
    const updatedContacts = this.state.contacts.filter(
      contact => contact.id !== id
    );
    this.setState({ contacts: updatedContacts });
  };

  render() {
    return (
      <div>
        <h2>Phonebook</h2>
        <Form onFormSubmit={this.formSubmitHandler} />
        <h2>Contacts</h2>
        <Filter filter={this.state.filter} handleChange={this.handleChange} />
        <ContactList
          filteredContacts={this.onFiltredContacts()}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
