const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateResetInput(data) {
  let errors = {};


  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';


  if(Validator.isEmpty(data.password)){
    errors.password = 'password field is required';
  }

  if(!Validator.isLength(data.password, {min: 10, max: 50})){
    errors.password = 'password has to be at least 10 characters';
  }

  if(Validator.isEmpty(data.password2)){
    errors.password2 = 'confirm password field is required';
  }

  if(!Validator.equals(data.password2, data.password)){
    errors.password2 = 'passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
