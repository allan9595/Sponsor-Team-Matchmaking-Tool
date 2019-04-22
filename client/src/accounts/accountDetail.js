import React, { Component } from 'react'
import { getAdminUser, deleteUser } from '../actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEmpty from '../validation/is-empty';
import "../components/dashboardCSS/dashboard.css";
class AccountDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };
      }
    
      onDeleteClick(id) {
        this.props.deleteUser(id, this.props.history);
      }

    componentDidMount(){
        this.props.getAdminUser(this.props.match.params.id);
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({ errors: nextProps.errors });
        }
    
        if (nextProps.auth.userDetail) {
          const userDetail = nextProps.auth.userDetail;
          userDetail.name = !isEmpty(userDetail.name) ? userDetail.name : '';
          userDetail.email = !isEmpty(userDetail.email) ? userDetail.email : '';
          userDetail.data = !isEmpty(userDetail.data) ? new Date(userDetail.data).toLocaleDateString() : '';
          userDetail.role = !isEmpty(userDetail.role) ? userDetail.role : '';
        
         // Set component fields state
          this.setState({
          name: userDetail.name,
          email: userDetail.email,
          data: userDetail.data,
          role: userDetail.role
        });
      }}
    
    render() {
        return ( 
                <div className="container">
                    <div className="card-row">
                        <div className="col-md-6">
                            <div className="card h-100">
                                <h3 className="card-header bg-info">Account Name: {this.state.name}</h3>
                                    <div className="card-body ">     
                                    <p className="card-title">Acoount Email: {this.state.email}</p>
                                    <p className="card-title">Acoount Creating at: {this.state.data}</p>
                                    <p className="card-title">Acoount Role: {this.state.role}</p>
                                    <button 
                                    type="button" 
                                    className="btn btn-danger btn-block"
                                    onClick={this.onDeleteClick.bind(this, this.props.match.params.id)}
                                    >
                                        <i className="far fa-trash-alt" />
                                    </button>
                                    </div>
                            </div>        
                        </div>
                    </div>
                </div>
                    
             
            )
        }
    }
    
    AccountDetail.propTypes = {
        auth: PropTypes.object.isRequired
    };
    
    const mapStateToProps = state => ({
        auth: state.auth,
    });
    export default connect(mapStateToProps, {
        getAdminUser,
        deleteUser
    })(
        AccountDetail 
    );