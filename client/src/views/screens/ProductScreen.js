import React, { Component } from "react";
import TopNav from "../components/TopNav";
import SideNav from "../components/SideNav";
import AddProductForm from "../components/AddProductForm";
import DummyProductTable from "../components/DummyProductTable";
import { Dropdown } from "react-bootstrap";
import ErrorBoundary from "../components/ErrorBoundary";
import { getProducts } from "../../controllers/ProductController";

const Clt = getProducts();
export default class ProductScreen extends Component {
  constructor(props) {
    super(props);
    this.populateAddForm = this.populateAddForm.bind(this);
    this.state = {
      err: null,
      isLoaded: false,
      ClientData: [],
      addState: false,
      name: "",
      deleteManyarr: [],
    };
  }
  populateAddForm() {
    this.setState({ addState: true });
  }
  componentDidMount() {
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
    const { ClientData, addState } = this.state;
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
              className="d-sm-flex align-items-center justify-content-end mg-b-20 mg-lg-b-25 mg-xl-b-30 px-4"
              style={{
                width: "auto",
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
                <Dropdown.Toggle className="btn btn-sm btn-icon btn-white px-4">
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
                <AddProductForm />
              ) : (
                <DummyProductTable userdata={ClientData} isLoaded />
              )}
            </ErrorBoundary>
          </div>
        </div>
      </>
    );
  }
}
