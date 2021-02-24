import React, { Component } from "react";
import "jquery";
import "../../assets/css/dashforge.css";
import { addProduct, getProducts } from "../../controllers/ProductController";
import $ from "jquery";

export default class AddProductForm extends Component {
  constructor(props) {
    super(props);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      product_num: "",
      product_name: "",
      cost: "",
      quantity: "",
      products: "",
    };
  }
  onChangeHandler(e) {
    const value = e.target.value;
    this.setState({
      [e.target.name]: value,
    });
    const newVal = {
      [e.target.name]: value,
    };
    console.log(newVal);
  }
  onSubmit(e) {
    e.preventDefault();

    // console.log(prods);
    const data = this.state;
    console.log(data);
    addProduct(data);
    window.location.href = "/Products";
  }
  componentDidMount() {
    const self = this;
    let products = getProducts();
    products
      .then((data) => data)
      .then((json) => {
        let count = json.length;
        this.setState({ products: count });
      });
    console.log(this.state.products);
    $(document).ready(function () {
      if (self.props.addState) {
        var client_name = $("#clnt_name");
        $("#sbmtBtn").click(function () {
          $("#myForm").submit();
          // addClient(newClient)
          console.log(client_name);
        });
      }
    });
    // document.querySelector("form").addEventListener("submit", this.onSubmit);
  }
  render() {
    if (this.props.addState) {
      return (
        <div id="contactInformation" className=" pd-20 pd-xl-25">
          <div className="row">
            <div className="col-6 col-sm">
              <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                Product Name
              </label>
              <p className="mg-b-0">
                <input id="prod_name" name="prod_name" value="1" />
              </p>
            </div>
            {/* col */}
            <div className="col-6 col-sm">
              <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                Unit Cost
              </label>
              <p className="mg-b-0">
                <input
                  id="prodcost"
                  name="product_cost"
                  value="1"
                />
              </p>
            </div>
            {/* col */}
            <div className="col-sm mg-t-20 mg-sm-t-0">
              <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                Quantity
              </label>
              <p className="mg-b-0">
                <input id="quantity" name="quantity" value="1" />
              </p>
            </div>
            {/* col */}
          </div>
          {/* row */}
        </div>
      );
    } else {
      return (   
        <div className="contact-content">
          <div className="tab-content">
            <div id="contactInformation" className=" pd-20 pd-xl-25">
              <form action="">
                <div className="d-flex align-items-center justify-content-between mg-b-25"></div>
                <div className="row">
                  <div className="col-6 col-sm">
                    <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                      Product Name
                    </label>
                    <p className="mg-b-0">
                      <input
                        name="product_name"
                        onChange={this.onChangeHandler}
                        value={this.state.product_name}
                      />
                    </p>
                  </div>
                  {/* col */}
                  <div className="col-6 col-sm">
                    <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                      Quantity
                    </label>
                    <p className="mg-b-0">
                      <input
                        name="quantity"
                        onChange={this.onChangeHandler}
                        value={this.state.quantity}
                      />
                    </p>
                  </div>
                  {/* col */}
                 
                  {/* col */}
                </div>
                <div className="row">
                <div className="col-sm mg-t-20 mg-sm-t-0">
                    <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                      Cost
                    </label>
                    <p className="mg-b-0">
                      <input
                        name="quantity"
                        onChange={this.onChangeHandler}
                        value={this.state.quantity}
                      />
                    </p>
                  </div>
                  <div className="col-sm mg-t-20 mg-sm-t-0">
                    <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                      Cost
                    </label>
                    <p className="mg-b-0">
                      <input
                        name="cost"
                        onChange={this.onChangeHandler}
                        value={this.state.cost}
                      />
                    </p>
                  </div>
                  </div>
                {/* row */}

                <div className="row row-sm">
                  <div className="col-sm mg-t-20 mg-sm-t-30">
                    {" "}
                    <div className="d-flex px-5 justify-content-end mr-5">
                      <button
                        type="reset"
                        className="btn btn-sm btn-white mr-2"
                        style={{ zIndex: 1000 }}
                      >
                        Reset
                      </button>
                      <button
                        onClick={this.onSubmit}
                        className="btn btn-sm  btn-icon mr-4 btn-primary"
                        style={{ zIndex: 1000 }}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
}
