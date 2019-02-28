const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProjectInput(data) {
  let errors = {};


  data.email = !isEmpty(data.email) ? data.email : '';
  data.projectName= !isEmpty(data.projectName) ? data.projectName : '';
  data.phone = !isEmpty(data.phone) ? data.phone : '';
  data.address = !isEmpty(data.address) ? data.address : '';
  data.duration = !isEmpty(data.duration) ? data.duration : '';
  data.budget = !isEmpty(data.budget) ? data.budget : '';
  data.description = !isEmpty(data.description) ? data.description : '';
  data.size = !isEmpty(data.size) ? data.size : '';

  if(Validator.isEmpty(data.email)){
    errors.email = 'email field is required';
  }

  if(!Validator.isEmail(data.email)){
    errors.email = 'Email is invalid';
  }

  if(!Validator.isLength(data.projectName, { min:2 })){
    errors.projectName = 'Project Name must be bewteen 2 and 30 characters';
  }

  if(Validator.isEmpty(data.phone)){
    errors.phone = 'Phone field is requried';
  }

  if(!isEmpty(data.phone)){
    const regExp = /^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/
    if(!data.phone.match(regExp)){
      errors.phone = 'Invalid phone format'
    }
  }

  if(Validator.isEmpty(data.address)){
    errors.address = 'Address field is required';
  }

  if(Validator.isEmpty(data.duration)){
    errors.duration = 'Duartion field is requried';
  }
  if(Validator.isEmpty(data.size)){
    errors.size = 'Size field is requried';
  }

  if(Validator.isEmpty(data.budget)){
    errors.budget = 'Budget field is required, if no budget, type in none';
  }

  if(Validator.isEmpty(data.description)){
    errors.description = 'Description field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
