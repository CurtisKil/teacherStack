import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addClass } from '../../actions/profile';

const AddClass = ({ addClass, history }) => {
  const [formData, setFormData] = useState({
    name: '',
    period: '',
    description: ''
  });

  const { name, period, description } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 className='large text-primary'>Add A Class Period</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i> Put a little info about your
        class period.
      </p>
      <form
        className='form'
        onSubmit={e => {
          e.preventDefault();
          addClass(formData, history);
        }}
      >
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='number'
            placeholder='Period'
            name='period'
            value={period}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <small>Please only inster a number.</small>
        <div className='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Job Description'
            value={description}
            onChange={e => onChange(e)}
          ></textarea>
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <a className='btn btn-light my-1' href='dashboard.html'>
          Go Back
        </a>
      </form>
    </Fragment>
  );
};

AddClass.propTypes = {
  addClass: PropTypes.func.isRequired
};

export default connect(null, { addClass })(withRouter(AddClass));
