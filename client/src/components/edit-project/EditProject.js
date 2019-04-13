import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProject, getCurrentProject, updateProject } from '../../actions/projectActions';
import isEmpty from '../../validation/is-empty';

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
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    
  }

  componentDidMount(){
    this.props.getCurrentProject(this.props.match.params.id);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }


    if (nextProps.project.project) {
      const project = nextProps.project.project;

       // Bring skills array back to CSV
      const techCSV = project.technologies.join(',');
      project.email = !isEmpty(project.email) ? project.email : '';
      project.projectName = !isEmpty(project.projectName) ? project.projectName : '';
      project.address = !isEmpty(project.address) ? project.address : '';
      project.duration = !isEmpty(project.duration) ? project.duration : '';
      project.budget = !isEmpty(project.budget) ? project.budget : '';
      project.size = !isEmpty(project.size) ? project.size : '';
      project.description = !isEmpty(project.description) ? project.description : '';
      project.status = !isEmpty(project.status) ? project.status : 'available';
      project.technologies = !isEmpty(project.technologies) ? project.technologies : '';
      //project.file= !isEmpty(project.file) ? project.file : '';
    

     // Set component fields state
     this.setState({
      email: project.email,
      projectName: project.projectName,
      phone: project.phone,
      address: project.address,
      duration: project.duration,
      budget: project.budget,
      size: project.size,
      description: project.description,
      status: project.status,
      technologies: techCSV 
      //file: project.file
    });
  
  }}

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
    console.log(file);
    /*
    const projectData = {
      email: this.state.email,
      projectName: this.state.projectName,
      phone: this.state.phone,
      address: this.state.address,
      duration: this.state.duration,
      budget: this.state.budget,
      size: this.state.size,
      description: this.state.description,
      status: this.state.status,
      technologies: this.state.technologies,
      file: this.state.file
    };*/
    //console.log(projectData);
    this.props.updateProject(data, this.props.history, this.props.match.params.id);
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
      { label: '* Select how long you estimate this project would take', value: 0 },
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

    // Select options for status
    const optionsStatus = [
      { label: '* Select status', value: 0 },
      { label: 'available', value: 'available' },
      { label: 'unavailable', value: 'unavailable' },
      
  ];


    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
            <div class="pageForm">
            <div class="jumbotron">
              <h1 className="display-4 text-center">Edit Project</h1>
              <p className="lead text-center">
               Edit your previously created project
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
                  placeholder="* budget"
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
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={optionsStatus}
                  error={errors.status}
                  info="The status of the project"
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
                    <input type="file" name = "file" id="file" onChange={this.onChangeFile}   className="input-default-js" />
                    <label className="label-for-default-js rounded-right mb-3" htmlFor="file">
                    </label>
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
  project: state.project,
  errors: state.errors
});

export default connect(mapStateToProps, {updateProject, createProject, getCurrentProject })(
  withRouter(CreateProject)
);

