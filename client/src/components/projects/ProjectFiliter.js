import React, { Component } from 'react'
import {connect} from 'react-redux';
import { setTextFilter } from '../../actions/filterAction';
class ProjectFiliter extends Component {

  onTextChange = (e) => {
    this.props.setTextFilter(e.target.value);
  };

  render() {


    return (
      <div>
      <div className="input-group md-form form-sm form-1 pl-0">
        <div className="input-group-prepend">
          <span className="input-group-text purple lighten-3" id="basic-text1">
          <i className="fas fa-search text-white"
              aria-hidden="true"></i></span>
        </div>
        <input 
          className="form-control my-0 py-1" 
          type="text" 
          placeholder="Project Name" 
          aria-label="Search" 
          value={this.props.filters.text}
          onChange={this.onTextChange}
        />
      </div>
</div>

    )
  }
}
const mapStateToProps = (state) => ({
  filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text))

});


export default connect(mapStateToProps, mapDispatchToProps)(ProjectFiliter);