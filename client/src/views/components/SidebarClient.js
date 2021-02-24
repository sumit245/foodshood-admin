import React, { Component } from "react";
import "../../assets/css/dashforge.contacts.css";
import "../../assets/css/dashforge.css";
import {
  addClient,
  getClients,
  deleteClient,
} from "../../controllers/ClientController";
import AddUserForm from "./AddUserForm";
import $ from "jquery";
import { renderToString } from "react-dom/server";
import { arrayFindObjectByProp } from "../../helper/arrayFindObjectByProp";
import DisplayContent from "./DisplayContent";
import { UserPlus } from "react-feather";
let Clt = getClients();

export default class SidebarClient extends Component {
  constructor(props) {
    super(props);
    this.populateAddForm = this.populateAddForm.bind(this);
    this.state = {
      isLoaded: false,
      ClientData: [],
      client: [],
      err: null,
      addState: false,
    };
  }

  deleteClients = (mobile) => {
    const { ClientData } = this.state;
    var client = arrayFindObjectByProp(ClientData, "mobile_number", mobile);
    let idx = client._id;
    deleteClient(idx);
    window.location.href = "/";
  };
  populateAddForm() {
    this.setState({ addState: true });
    var form2 = renderToString(
      <AddUserForm addState clientData={this.state.ClientData} />
    );
    $("div#contactInformation").replaceWith(form2);
    var btn = document.getElementById("submitBtn");
    btn.addEventListener("click", function () {
      var client_name = document.getElementById("clnt_name").value;
      var mobile_number = document.getElementById("mob").value;
      var phone_number = document.getElementById("ph_num").value;
      var email_id = document.getElementById("eid").value;
      var company = document.getElementById("comp").value;
      var gst_num = document.getElementById("gstn").value;
      var sector = document.getElementById("sect").value;
      var block = document.getElementById("blk").value;
      var address = document.getElementById("addr").value;
      const newClient = {
        client_name: client_name,
        mobile_number: mobile_number,
        phone_number: phone_number,
        email_id: email_id,
        company: company,
        gst_num: gst_num,
        sector: sector,
        block: block,
        address: address,
      };
      // console.log(newClient);
      addClient(newClient);
      window.location.href = "/clientdetails?data=" + mobile_number;
    });
    // console.log(btn);
    // console.log(form2);
  }
  componentDidMount() {
    var user = this.props.client;
    this.setState({ client: user });
    Clt.then((data) => data)
      .then(
        (json) => {
          this.setState({ isLoaded: true, ClientData: json });
        },
        (err) => {
          this.setState({ isLoaded: true, err });
        }
      )
      .catch((error) => {
        console.log("The error is", error);
      });
  }
  showNewData = (mobile) => {
    let new_url = "/clientdetail?data=" + mobile;
    window.location.href = new_url;
  };
  appendNodes = (filteredOffice) => {
    var container = document.getElementById("contactlistcontainer");
    var rows = container.getElementsByClassName("media");
    if (filteredOffice != "no results") {
      container.innerHTML = "";
      filteredOffice.map((name) => {
        var filteredContainer = document.createElement("div");
        filteredContainer.className = "media-body mg-l-10";
        var filteredHead = document.createElement("h6");
        filteredHead.className = "tx-13 mg-b-3";
        filteredHead.innerText = name;
        filteredContainer.appendChild(filteredHead);
        container.appendChild(filteredContainer);
      });
    } else {
      container.innerText = "no results";
    }
  };
  sidebarSearch = (e) => {
    let { ClientData } = this.state;
    let clients = [];
    for (let i = 0; i < ClientData.length; i++) {
      clients.push(ClientData[i].client_name);
    }
    let checkName = (name, str) => {
      var pattern = str
        .split("")
        .map((x) => {
          return `(?=.*${x})`;
        })
        .join("");
      var regex = new RegExp(`${pattern}`, "g");
      return name.match(regex);
    };
    // console.log(clients,ClientData.clien);
    var str = e.target.value.toLowerCase();
    var filteredArr = clients.filter((x) => {
      var xSub = x.substring(0, 3).toLowerCase();
      return x.toLowerCase().includes(str) || checkName(xSub, str);
    });
    if (filteredArr.length > 0) {
      // console.log(filteredArr);
      this.appendNodes(filteredArr);
    } else {
      console.log("No result");
    }
  };
  render() {
    const { isLoaded, ClientData, err } = this.state;
    if (err) {
      return <div className="contact-sidebar">Error:{err.message}</div>;
    } else if (!isLoaded) {
      return <div className="contact-sidebar"></div>;
    } else {
      return (
        <>
          <div className="contact-sidebar">
            <div className="contact-sidebar-header">
              <i data-feather="search" />
              <div className="search-form">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search clients"
                  onKeyUp={this.sidebarSearch}
                />
              </div>
              <button
                onClick={
                  this.state.addState
                    ? console.log("Already")
                    : this.populateAddForm
                }
                className="btn btn-sm  btn-icon btn-primary"
                style={{ zIndex: 1000 }}
              >
                <span data-toggle="tooltip" title="Add New Contact">
                  <UserPlus />
                </span>
              </button>
              {/* contact-add */}
            </div>
            {/* contact-sidebar-header */}
            <div className="contact-sidebar-body">
              <div className="tab-content">
                <div id="tabClients">
                  <div
                    className="pd-y-20 pd-x-10 contact-list"
                    id="contactlistcontainer"
                  >
                    {ClientData.map((data, key) => {
                      return (
                        <a onClick={() => this.showNewData(data.mobile_number)}>
                          <div className="media" key={key} id="mediaid">
                            <div className="media-body mg-l-10">
                              <h6 className="tx-13 mg-b-3">
                                {data.client_name}
                              </h6>
                              <span className="tx-12">
                                {data.mobile_number + ", " + data.company}
                              </span>
                            </div>

                            {/* media-body */}
                            <nav>
                              <a
                                onClick={() => {
                                  this.deleteClients(data.mobile_number);
                                }}
                              >
                                <i data-feather="trash" />
                              </a>
                              <a
                                onClick={() => {
                                  console.log("editing code here");
                                }}
                              >
                                <i data-feather="edit-2" />
                              </a>
                            </nav>
                          </div>
                        </a>
                      );
                    })}

                    {/* media */}
                  </div>
                  {/* contact-list */}
                </div>
              </div>
            </div>

            {/* contact-sidebar-body */}
          </div>
          {/* contact-sidebar */}
        </>
      );
    }
  }
}
