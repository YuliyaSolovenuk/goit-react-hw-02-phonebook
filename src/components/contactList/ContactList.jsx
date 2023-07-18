import PropTypes from 'prop-types'

export const ContactList = ({filteredContacts, deleteContact}) => {
  return (
    <ul>
      {filteredContacts.map(contact => {
        return (
          <li key={contact.id} className={contact.name}>
            {contact.name}:&nbsp;<span>{contact.number}</span>
            <button className="delete-button" type="button" onClick={()=>deleteContact(contact.id)}>Delete</button>
          </li>
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
    filteredContacts: PropTypes.arrayOf(
        PropTypes.exact({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          number: PropTypes.string.isRequired,
        }).isRequired
)}
