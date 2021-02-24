import React, { Component } from "react";
import "jquery";
import "../../assets/css/dashforge.css";
import {
  getChallans,
} from "../../controllers/ChallanController";

export default class DisplayContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientdetails: [],
      
    };
  }

 

  componentWillReceiveProps(nextprops) {
    const thisState = nextprops.client
    this.setState({ clientdetails: thisState });
  }
  abortController = new AbortController()
  componentWillUnmount() {
    this.abortController.abort()
  }
  render() {
    const { clientdetails } = this.state;
    if (!this.state.clientdetails) {
      return (<div />)
    }
    {
      return (
        <>
          <div id="contactInformation" className="pd-20 pd-xl-25">
            <div className="d-flex align-items-center justify-content-between mg-b-25">
              <h6 className="mg-b-0">Company Details</h6>
            </div>
            <hr style={{ height: 1 }} />
            <div className="row row-sm">
              <div className="col-6 col-sm-4">
                <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                  Company
          </label>
                <p className="mg-b-0">{clientdetails.company}</p>
              </div>
              <div className="col-6 col-sm-4">
                <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                  GST Number
          </label>
                <p className="mg-b-0">{clientdetails.gst_num}</p>
              </div>
              <div className="col-6 col-sm-4">
                <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                  Email Address
          </label>
                <p className="mg-b-0">{clientdetails.email_id}</p>
              </div>
              <div className="col-6 col-sm-4 mg-t-20 ">
                <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                  Client Name
          </label>
                <p className="mg-b-0">
                  {clientdetails.client_name}
                </p>
              </div>
              {/* col */}
              <div className="col-6 col-sm-4 mg-t-20 ">
                <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                  Mobile Number
          </label>
                <p className="mg-b-0">
                  {clientdetails.mobile_number}
                </p>
              </div>
              {/* col */}
              <div className="col-sm-4 mg-t-20">
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

            <div className="d-flex align-items-center justify-content-between mg-t-25">
              <h6 className="mg-b-0">Billing Address</h6>
            </div>
            <hr style={{ height: 1 }} />
            <div className="row row-sm">

              <div className="col-sm-4 mg-t-20">
                <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                  Sector
          </label>
                <p className="mg-b-0">
                  {clientdetails.sector}
                </p>
              </div>
              <div className="col-sm-4 mg-t-20">
                <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                  Block
          </label>
                <p className="mg-b-0">
                  {clientdetails.block}
                </p>
              </div>

              <div className="col-sm-4 mg-t-20 mg-sm-t-30">
                <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                  Address
          </label>
                <p className="mg-b-0">
                  {clientdetails.address}
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between mg-t-25 mg-b-10">
              <h6 className="mg-b-0">Communication Action</h6>
            </div>
            <hr style={{ height: 1 }} />
            <div className="row row-sm">

              <div className="col col-3 mg-t-10">
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="check1" />
                  <label className="custom-control-label tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10" htmlFor="check1">SMS Opt-Out</label>
                </div>
              </div>
              <div className="col col-3 mg-t-10">
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="check2" />
                  <label className="custom-control-label tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10" htmlFor="check2">Email Opt-Out</label>
                </div>

              </div>

            </div>


            {/* row */}
          </div>
         
        </>
      );
    }
  }
}
