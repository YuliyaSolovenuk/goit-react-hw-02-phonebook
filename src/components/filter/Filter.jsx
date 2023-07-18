import PropTypes from 'prop-types'
// import css from './Filter.module.css';

export const Filter = ({ handleChange, filter }) => {
  return (
    <label>
      Find contacts by name
      <input
        type="text"
        name="filter"
        value={filter}
        onChange={handleChange}
        placeholder="Search contacts"
      />
    </label>
  );
};

Filter.propTypes = {
    filter: PropTypes.string,
    handleChange: PropTypes.func.isRequired
}