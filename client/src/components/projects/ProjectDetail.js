import React, { Component } from 'react'
import { getProjectProfessor, fileDownload} from '../../actions/projectActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';
class ProjectDetail extends Component {
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
        this.onSubmit = this.onSubmit.bind(this);
        
      }
    

    componentDidMount(){
        this.props.getProjectProfessor(this.props.match.params.id);
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
        this.props.fileDownload(this.props.match.params.id);
      }

    render() {
       

        return ( 
                <div className="container">
                    <div className="card-row">
                        <div className="col-md-12">
                                <div className="card">
                                    <h3 className="card-header bg-info">Project Name: {this.state.projectName}</h3>
                                        <div className="card-body ">     
                                            <p className="card-title">Project Status: {this.state.status}</p>
                                            <p className="card-subtitle">Sponsor Email: {this.state.email}</p>
                                            <p className="card-text">Sponsor Phone: {this.state.phone}</p>
                                            <p className="card-text">Address: {this.state.address}</p>
                                            <p className="card-text">Project Size: {this.state.size}</p>  
                                            <p className="card-text">Project Length: {this.state.duration}</p>  
                                            <p className="card-text">Desired Technologies: {this.state.technologies}</p>  
                                            <p className="card-text">Budget: {this.state.budget}</p>  
                                            <p className="card-text">Details: {this.state.description}</p> 
                                            
                                            <button onClick={this.onSubmit}>
                                            <i className="fas fa-cloud-download-alt"></i>
                                            </button>
                                        </div>
                                </div>        
                        </div>
                    </div>
                </div>
                    
             
            )
        }
    }

    ProjectDetail.propTypes = {
        auth: PropTypes.object.isRequired
    };
    
    const mapStateToProps = state => ({
        auth: state.auth,
        project: state.project
    });
    export default connect(mapStateToProps, {
        getProjectProfessor,
        fileDownload
    })(
        ProjectDetail
    );