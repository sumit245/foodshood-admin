import React, { Component } from "react";
import "jquery";
import "../../assets/css/dashforge.css";

export default class DisplayProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productdetails: [],
    };
  }

  componentWillReceiveProps(nextprops) {
    const thisState = nextprops.product;
    this.setState({ productdetails: thisState });
  }
  abortController = new AbortController();
  componentWillUnmount() {
    this.abortController.abort();
  }
  render() {
    const { productdetails } = this.state;
    if (!this.state.productdetails) {
      return <div />;
    }
    {
      return (
        <div id="contactInformation" className="pd-20 pd-xl-25">
          <div className="row">
            <div className="col-6 col-sm">
              <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                product Name
              </label>
              <p className="mg-b-0">{productdetails.product_name}</p>
            </div>
            {/* col */}
            <div className="col-6 col-sm">
              <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                Model Number
              </label>
              <p className="mg-b-0">{productdetails.model_number}</p>
            </div>
            {/* col */}
            <div className="col-sm mg-t-20 mg-sm-t-0">
              <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                quantity available
              </label>
              <p className="mg-b-0">{productdetails.quantity}</p>
            </div>
            <div className="col-sm mg-t-20 mg-sm-t-0">
              <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                rate
              </label>
              <p className="mg-b-0">{productdetails.cost}</p>
            </div>
            {/* col */}
          </div>
          {/* row */}
        </div>
      );
    }
  }
}
