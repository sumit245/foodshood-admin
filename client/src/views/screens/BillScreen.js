import React, { Component } from "react";
import TopNav from "../components/TopNav";
import SideNav from "../components/SideNav";
import { getBills } from "../../controllers/BillController";
import ErrorBoundary from "../components/ErrorBoundary";
import { Dropdown } from "react-bootstrap";
import AddBills from "../components/AddBills";
import DummyBillTable from "../components/DummyBillTable";
import $ from 'jquery'

const Clt = getBills();
export default class BillScreen extends Component {
  constructor(props) {
    super(props);
    this.populateAddForm = this.populateAddForm.bind(this);
    this.state = {
      err: null,
      isLoaded: false,
      BillData: [],
      addState: false,
      name: "",
    };
  }
  populateAddForm() {
    this.setState({ addState: true });
  }
  componentDidMount() {
    $("#drpmoreadd").hover(
      function () {
        $("#drpmoreadd").css("color", "white");
        // over
      },
      function () {
        $("#drpmoreadd").css("color", "#777");
        // out
      }
    );
    Clt.then((data) => data)
      .then(
        (json) => {
          this.setState({ isLoaded: true, BillData: json });
        },
        (err) => {
          this.setState({ isLoaded: true, err });
        }
      )
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const { BillData, addState } = this.state;
    return (
      <>
        <TopNav />
        <div className="contact-wrapper">
          <SideNav data={BillData} />
          <div
            className="d-flex mx-5 content content-component"
            style={{ flexDirection: "column" }}
          >
            <div
              className={
                addState
                  ? ""
                  : "d-sm-flex align-items-center justify-content-end mg-b-20 mg-lg-b-25 mg-xl-b-30 px-4"
              }
              style={{
                width: "auto",
                visibility: addState ? "hidden" : "visible",
                flex: 1,
                display: "flex",
                zIndex: 1000,
                flexDirection: "row",
              }}
            >
              <button
                onClick={this.populateAddForm}
                className="btn btn-sm  btn-icon btn-primary px-4 mx-1"
              >
                <span data-toggle="tooltip" title="Add New Bill">
                  Add
                </span>
              </button>

              <Dropdown>
                <Dropdown.Toggle
                  id="drpmoreadd"
                  className="btn btn-sm btn-icon btn-white px-4"
                >
                  <span data-toggle="tooltip" title="More">
                    More
                  </span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Import</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Export</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Delete</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <ErrorBoundary>
              {addState ? (
                <AddBills />
              ) : (
                <DummyBillTable userdata={BillData} isLoaded />
              )}
            </ErrorBoundary>
          </div>
        </div>
      </>
    );
  }
}
