import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProject } from '../../actions/projectActions';
import "../dashboardCSS/dashboard.css";

class CreateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email: '',
        projectName: '',
        phone: '',
        address:'',
        duration:'',
        budget: '',
        size:'',
        description:'',
        technologies:'',
        file: '',
        status:'available',
        errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    const file = this.state.file;
    data.append('file', file);
    data.append('email', this.state.email);
    data.append('phone',this.state.phone);
    data.append('address',this.state.address);
    data.append('duration',this.state.duration);
    data.append('budget', this.state.budget);
    data.append('size',this.state.size);
    data.append('description',this.state.description);
    data.append('technologies',this.state.technologies);
    data.append('projectName',this.state.projectName);
    data.append('status', this.state.status);
    
    this.props.createProject(data, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onChangeFile(e) {
    this.setState({ file: e.target.files[0] });
  }
 
  render() {
    const { errors} = this.state;

    // Select options for duration
    const optionsDuration = [
      { label: ' Select how long you estimate this project would take', value: 0 },
      { label: '3 months', value: '3 months' },
      { label: '6 months', value: '6 months' }
    ];

    // Select options for size
    const optionsSize = [
        { label: '* Select how big the project is', value: 0 },
        { label: 'small', value: 'small' },
        { label: 'medium', value: 'medium' },
        { label: 'large', value: 'large' }
    ];


    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
            <div className="pageForm">
            <div className="jumbotron">
              <h1 className="display-4 text-center">Create Project</h1>
              <p className="lead text-center">
                create a project and sponsor it
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form 
                onSubmit={this.onSubmit} 
                encType="multipart/form-data"
                method="POST"
              >
                
                <TextFieldGroup
                  placeholder="* your company email"
                  name="email"
                  type = "email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                  info="An contact email for universities to contact you"
                />
                <TextFieldGroup
                  placeholder="* project name"
                  name="projectName"
                  value={this.state.projectName}
                  onChange={this.onChange}
                  error={errors.projectName}
                  info="create a name for your project"
                />
                <TextFieldGroup
                  placeholder="* phone"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.onChange}
                  error={errors.phone}
                  info="must be in 000-000-0000"
                />
                <TextFieldGroup
                  placeholder="* address"
                  name="address"
                  value={this.state.address}
                  onChange={this.onChange}
                  error={errors.address}
                />
                <TextFieldGroup
                  placeholder=" budget"
                  name="budget"
                  value={this.state.budget}
                  onChange={this.onChange}
                  error={errors.budget}
                  info="input if this project contain budget, otherwise, type in 'none' "
                />
                <TextFieldGroup
                  placeholder="* technologies"
                  name="technologies"
                  value={this.state.technologies}
                  onChange={this.onChange}
                  error={errors.technologies}
                  info="Some technologies this project might used, please follow ex: 'React, Python'"
                />
                <SelectListGroup
                  placeholder="Duration"
                  name="duration"
                  value={this.state.duration}
                  onChange={this.onChange}
                  options={optionsDuration}
                  error={errors.duration}
                  info="Give an estimate how long this project may take"
                />
                <SelectListGroup
                  placeholder="Size"
                  name="size"
                  value={this.state.size}
                  onChange={this.onChange}
                  options={optionsSize}
                  error={errors.size}
                  info="The size of the project"
                />
                
                
                <TextAreaFieldGroup
                  placeholder="Short Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Short Description About This Project"
                />
                  
                  <div className="input-default-wrapper mt-3">
                    <input type="file" name ="file" id="file" onChange={this.onChangeFile}   className="input-default-js" />
                    <label className="label-for-default-js rounded-right mb-3" htmlFor="file">
                    </label>
                    <div className="alert-danger">You have to choose a file to upload, file size has to be less than 10mb and in PDF, DOC or DOCX</div>
                 </div >
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
                
              </form>
            </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProject.propTypes = {
  
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { createProject })(
  withRouter(CreateProject)
);
