import React, { Component } from "react";
import TopNav from "../components/TopNav";
import SideNav from "../components/SideNav";
import { Dropdown } from "react-bootstrap";
import ErrorBoundary from "../components/ErrorBoundary";
import Invoice from "../components/Invoice";
import DummyChallanTable from "../components/DummyChallanTable";
import $ from 'jquery'
import {
  deleteChallans,
  getChallansByMobile,
} from "../../controllers/ChallanController";

export default class ChallanScreen extends Component {
  constructor(props) {
    super(props);
    this.populateAddForm = this.populateAddForm.bind(this);
  }

  state = {
    err: null,
    isLoaded: false,
    addState: false,
    rows: [],
  };
  deleteMultipleRows = () => {
    let ids = this.state.rows;
    let falsechallans = [];
    for (var i = 0; i < ids.length; i++) {
      getChallansByMobile(ids[i])
        .then((data) => {
          let reult = data;
          ids.shift();
          falsechallans.push(reult);
          let deletedclient = reult[0]._id;
          deleteChallans(deletedclient);
        })
        .then(console.log(falsechallans.length, "client deleted"))
        .catch((err) => {
          console.log(err);
        });
    }
    if (ids.length < 1) {
    }
  };
  populateAddForm() {
    this.setState({ addState: true });
  }
  handleRowsSelected = (rowValue) => {
    this.setState({ rows: rowValue });
  };
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
  }
  render() {
    const { addState } = this.state;
    return (
      <>
        <TopNav />
        <div className="contact-wrapper">
          <SideNav />
          <div
            className="d-flex mx-5 content content-component"
            id="aboveRow"
            style={{ flexDirection: "column", overflow: "scroll" }}
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
                <span data-toggle="tooltip" title="Add New Contact">
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
                  <Dropdown.Item onClick={this.deleteMultipleRows}>
                    Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <ErrorBoundary>
              {addState ? (
                <Invoice />
              ) : (
                <DummyChallanTable onRowsSelected={this.handleRowsSelected} />
              )}
            </ErrorBoundary>
          </div>
        </div>
      </>
    );
  }
}
