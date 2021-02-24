import React, { Component } from "react";
import "jquery";
import "../../assets/css/dashforge.css";
import $ from "jquery";
import DisplayBills from "./DisplayBills";
import EditBills from "./EditBills";
import SidebarClient from "./SidebarClient";
import TopNav from "./TopNav";
import SideNav from "./SideNav";
import{deleteBills,getBills}from '../../controllers/BillController'
import { arrayFindObjectByProp } from "../../helper/arrayFindObjectByProp";
import { Dropdown} from "react-bootstrap";


const Bills = getBills();
export default class ClientBills extends Component {
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
    this.state = {
      editState: false,
      isLoaded: true,
      BillData: [],
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
    console.log(data);
    this.setState({ mobile: data });
    Bills.then((data) => data)
      .then(
        (json) => {
          this.setState({ isLoaded: true, BillData: json });
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
    $("#continfo").text("client");
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
  deleteClients=()=>{
    const {BillData, mobile } = this.state;
    var client = arrayFindObjectByProp(BillData, "mobile_number", mobile);
    let idx=client._id
    deleteBills(idx)
    window.location.href='/'

  }
  render() {
    const { isLoaded, BillData, mobile } = this.state;
    if (isLoaded) {
      var client = arrayFindObjectByProp(BillData, "mobile_number", mobile);
      console.log(client)
      return (
        <>
          <TopNav />
          <div className="contact-wrapper">
            <SideNav />
            <SidebarClient client={client} />

            <div className="contact-content">
              <div className="contact-content-header">
                <nav className="nav">
                  <a
                    href="#contactInformation"
                    id="continfo"
                    className="nav-link"
                  >
                    Client
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
                <div className="d-flex d-md mr-0">
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
                    <EditBills client={client} />
                  ) : (
                    <DisplayBills client={client} key={mobile} />
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
                    onClick={this.deleteClients}
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
