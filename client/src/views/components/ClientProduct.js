import React, { Component } from "react";
import "jquery";
import "../../assets/css/dashforge.css";
import $ from "jquery";
import DisplayProduct from "./DisplayProduct";
import EditProduct from "./EditProduct";
import SidebarClient from "./SidebarClient";
import TopNav from "./TopNav";
import SideNav from "./SideNav";
import { deleteProduct, getProducts } from "../../controllers/ProductController";
import { arrayFindObjectByProp } from "../../helper/arrayFindObjectByProp";
import { Dropdown} from "react-bootstrap";


const Clt = getProducts();
export default class ClientProduct extends Component {
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
    this.state = {
      editState: false,
      isLoaded: true,
      ProductData: [],
      err: null,
      mobile: "",
    };
  }
  handler() {
    this.setState((prevstate) => ({ editState: !prevstate.editState }));
    console.log(`${this.state.editState}`);
  }

  componentDidMount() {
    var url = window.location.href;
    var data = url.split("data=").pop();
    this.setState({ mobile: data });
    Clt.then((data) => data)
      .then(
        (json) => {
          this.setState({ isLoaded: true, ProductData: json });
        },
        (err) => {
          this.setState({ isLoaded: true, err });
          console.log(err);
        }
      )
      .catch((err) => {
        console.log(err);
      });
    $("#tabClients").addClass("active show");
    $("#contactInformation").addClass("active show");
    $("#continfo").addClass("active");
    $("#continfo").text("product");
    $("#deleteclient").on("click", function () {
      let dltmdl = document.getElementById("modalDeleteContact");
      dltmdl.style.display = "block";
    });
    $("#closearr").on("click", function () {
      let dltmdl = document.getElementById("modalDeleteContact");
      dltmdl.style.display = "none";
    });
    $("#closebtn").on("click", function () {
      let dltmdl = document.getElementById("modalDeleteContact");
      dltmdl.style.display = "none";
    });
  }
  abortController = new AbortController();
  componentWillUnmount() {
    this.abortController.abort();
  }
  deleteProducts=()=>{
    const {ProductData, mobile } = this.state;
    var product = arrayFindObjectByProp(ProductData, "mobile_number", mobile);
    let idx=product._id
    deleteProduct(idx)
    window.location.href='/'

  }
  render() {
    const { isLoaded, ProductData, mobile } = this.state;
    var product = arrayFindObjectByProp(ProductData, "product_name", mobile);
    if (isLoaded) {
      console.log(product)
      return (
        <>
          <TopNav />
          <div className="contact-wrapper">
            <SideNav />
            <SidebarClient product={product} />

            <div className="contact-content">
              <div className="contact-content-header">
                <nav className="nav">
                  <a
                    href="#contactInformation"
                    id="continfo"
                    className="nav-link"
                  >
                    Product
                  </a>
                  <Dropdown className="nav-link mg-r-5" >
                    <Dropdown.Toggle
                      
                      className="btn btn-sm btn-white"
                      
                    >
                      More <i data-feather="more-vertical"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                    <Dropdown.Item href="/Challans">Challan</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      Export
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                      Print
                    </Dropdown.Item>
                  </Dropdown.Menu>
                  </Dropdown>
                </nav>
                {/* <div className=''> */}
                <div className="d-flex align-items-end justify-content-end">
                  <button
                    id="edtclnt"
                    onClick={this.handler}
                    className="btn btn-sm btn-white d-flex align-items-center mg-r-5"
                  >
                    <i
                      data-feather={this.state.editState ? "save" : "edit-2"}
                    />
                    <span id="edttxt" className="d-none d-sm-inline mg-l-5">
                      {this.state.editState ? "Save" : "Edit"}
                    </span>
                  </button>
                  <button
                    id="deleteclient"
                    data-toggle="modal"
                    className="btn btn-sm btn-white d-flex align-items-center"
                  >
                    <i data-feather="trash" />
                    <span className="d-none d-sm-inline mg-l-5"> Delete</span>
                  </button>
                </div>
                {/* </div>   */}
              </div>
              {/* contact-content-header */}
              <div className="contact-content-body">
                <div className="tab-content">
                  {this.state.editState ? (
                    <EditProduct product={product} status={'productstate'} />
                  ) : (
                    <DisplayProduct product={product} key={mobile} />
                  )}
                  {/* tab-pane */}
                </div>
                {/* tab-content */}
              </div>
              {/* contact-content-body */}
              <div className="contact-content-sidebar"></div>
              {/* contact-content-sidebar */}
            </div>
            {/* contact-content */}

            <div
              className="modal"
              id="modalDeleteContact"
              tabIndex={-1}
              role="dialog"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered modal-sm"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h6 className="modal-title">Delete Contact</h6>
                    <button
                      type="button"
                      className="close"
                      id="closearr"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <p className="mg-b-0">
                      Do you really want to delete this contact?
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      id="closebtn"
                      data-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button type="button"
                    onClick={this.deleteProducts}
                     className="btn btn-primary">
                      Continue Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  }
}
