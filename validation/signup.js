const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateSignupInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';
  data.role = !isEmpty(data.role) ? data.role : '';

  if(!Validator.isLength(data.name, { min:2 , max : 30})){
    errors.name = 'Name must be bewteen 2 and 30 characters';
  }

  if(Validator.isEmpty(data.name)){
    errors.name = 'Name field is required';
  }

  if(Validator.isEmpty(data.email)){
    errors.email = 'email field is required';
  }

  if(!Validator.isEmail(data.email)){
    errors.email = 'Email is invalid';
  }

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

  if(Validator.isEmpty(data.role)){
    errors.role = 'role field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
