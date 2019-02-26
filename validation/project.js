const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProjectInput(data) {
  let errors = {};


  data.email = !isEmpty(data.text) ? data.text : '';
  data.projectName= !isEmpty(data.projectName) ? data.projectName : '';
  data.phone = !isEmpty(data.phone) ? data.phone : '';
  data.Address = !isEmpty(data.Address) ? data.Address : '';
  data.Duration = !isEmpty(data.Duration) ? data.Duration : '';
  data.Budget = !isEmpty(data.Budget) ? data.Budget : '';
  data.Description = !isEmpty(data.Description) ? data.Description : '';
  data.email = !isEmpty(data.text) ? data.text : '';

  if(Validator.isEmpty(data.email)){
    errors.email = 'email field is required';
  }

  if(!Validator.isEmail(data.email)){
    errors.email = 'Email is invalid';
  }

  if(!Validator.isLength(data.projectName, { min:2 , max : 30})){
    errors.projectName = 'Project Name must be bewteen 2 and 30 characters';
  }

  if(!isEmpty(data.phone)){
    const regExp = /^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/
    if(!data.phone.match(regExp)){
      errors.phone = 'Invalid phone format'
    }
  }

  if(Validator.isEmpty(data.Address)){
    errors.email = 'Address field is required';
  }

  if(Validator.isEmpty(data.Budget)){
    errors.Budget = 'Budget field is required, if no budget, type in none';
  }

  if(Validator.isEmpty(data.Description)){
    errors.Description = 'Description field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
