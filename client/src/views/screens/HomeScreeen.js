import React, { Component } from "react";
import SideNav from "../components/SideNav";
import TopNav from "../components/TopNav";
import DummyTable from "../components/DummyTable";
import { getClients } from "../../controllers/ClientController";
import ErrorBoundary from "../components/ErrorBoundary";
import { Dropdown } from "react-bootstrap";
import AddUserForm from "../components/AddUserForm";
import $ from "jquery";

const Clt = getClients();
export default class HomeScreeen extends Component {
  constructor(props) {
    super(props);
    this.populateAddForm = this.populateAddForm.bind(this);
    this.state = {
      err: null,
      isLoaded: false,
      ClientData: [],
      addState: false,
      name: "",
    };
  }
  populateAddForm() {
    this.setState({ addState: true });
  }
  componentDidMount() {
    $('#drpmoreadd').hover(function () {
      $('#drpmoreadd').css('color','white')
        // over
        
      }, function () {
        $('#drpmoreadd').css('color','#777')
        // out
      }
    );
    
    Clt.then((data) => data)
      .then(
        (json) => {
          this.setState({ isLoaded: true, ClientData: json });
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
    const { err, ClientData, addState } = this.state;
    if (err) {
      return <div className="contact-wrapper">Error:{err.message}</div>;
    } else {
      return (
        <>
          <TopNav />
          <div className="contact-wrapper">
            <SideNav />
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
                  flex: 1,
                  display: "flex",
                  zIndex: 1000,
                  visibility: addState ? "hidden" : "visible",
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
                  <Dropdown.Toggle id="drpmoreadd" className="btn btn-sm btn-icon btn-white px-4">
                    <span data-toggle="tooltip" title="More">
                      More
                    </span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Import</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Export</Dropdown.Item>
                    <Dropdown.Item id="deleteBtnGlobal">Delete</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <ErrorBoundary>
                {addState ? (
                  <AddUserForm />
                ) : (
                  <DummyTable userdata={ClientData} isLoaded />
                )}
              </ErrorBoundary>
            </div>
          </div>
        </>
      );
    }
  }
}
