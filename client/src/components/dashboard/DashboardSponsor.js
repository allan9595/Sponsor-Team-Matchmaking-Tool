import React, { Component } from 'react'

 class DashboardSponsor extends Component {

  render() {
    let dashboardContent;
    dashboardContent = (
        <div>
            <p className="lead text-muted">Welcome</p>
           
            
          </div>
    );
    return (
      <div>
        <div className="dashboard">
        <div className = "container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DashboardSponsor;