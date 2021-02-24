import React, { Component } from "react";
import "jquery";
import "../../assets/css/dashforge.css";

export default class DisplayBills extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientdetails: [],
    };
  }

componentWillReceiveProps(nextprops){
  const thisState=nextprops.client
  this.setState({ clientdetails: thisState});
}
abortController=new AbortController()
componentWillUnmount(){
  this.abortController.abort()
}
  render() {
    const {clientdetails} = this.state;
    if(!this.state.clientdetails){
      return(<div/>)
    }
    {
      return (
        <div id="contactInformation" className="pd-20 pd-xl-25">
           <div className="d-flex align-items-center justify-content-between mg-b-25">
        <h6 className="mg-b-0">Personal Details</h6>
      </div>
      <div className="row">
        <div className="col-6 col-sm">
          <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
            Client Name
          </label>
          <p className="mg-b-0">
            {clientdetails.client_name}
          </p>
        </div>
        {/* col */}
        <div className="col-6 col-sm">
          <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
            Mobile Number
          </label>
          <p className="mg-b-0">
           {clientdetails.mobile_number}
          </p>
        </div>
        {/* col */}
        <div className="col-sm mg-t-20 mg-sm-t-0">
          <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
            Phone Number
          </label>
          <p className="mg-b-0">
            {clientdetails.phone_number}
          </p>
        </div>
        {/* col */}
      </div>
      {/* row */}
      <h6 className="mg-t-40 mg-b-20">Billing Details</h6>
      <div className="row row-sm">
        <div className="col-6 col-sm-4">
          <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
            Email Address
          </label>
          <p className="tx-rubik mg-b-0">{clientdetails.email_id}</p>
        </div>
        <div className="col-6 col-sm-4">
          <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
            Company
          </label>
          <p className="tx-rubik mg-b-0">{clientdetails.company}</p>
        </div>
        <div className="col-6 col-sm-4 mg-t-20 mg-sm-t-0">
          <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
            GST Number
          </label>
          <p className="tx-rubik mg-b-0">{clientdetails.sector}</p>
        </div>
        <div className="col-sm-4 mg-t-20 mg-sm-t-30">
          <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
            Home Address
          </label>
          <p className="mg-b-0">
            {" "}
            {clientdetails.sector}
            <br />
            {clientdetails.block}{clientdetails.address}
          </p>
        </div>
      </div>
      {/* row */}
        </div>
      );
    }
  }
}
