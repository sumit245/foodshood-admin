import React, { Component } from "react";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons-dt";
// import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons-dt/css/buttons.dataTables.css";
import "../../assets/css/dashforge.contacts.css";
// import { arrayFindObjectByProp } from "../../helper/arrayFindObjectByProp";
import * as jzip from "jszip";
import "pdfmake";
import $ from "jquery";
import { deleteClient, getClients } from "../../controllers/ClientController";
import { Edit3, Eye, Trash2 } from "react-feather";
import { Modal, Button } from "react-bootstrap";


window.JSZip = jzip;
const Clt = getClients();
export default class DummyTable extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, tableData: [], showDeleteModal: false, currentindex: '',viewPage:false,editPage:false };
  }

  shouldComponentUpdate() {
    return true;
  }

  componentDidMount() {
    $("#clientResponsive tfoot th").each(function () {
      var title = $(this).text();
      $(this).html('<input type="text" placeholder="Search ' + title + '" />');
    });
    Clt.then((data) => data)
      .then(
        (json) => {
          this.setState({ isLoaded: true, tableData: json });
        })
      .then((json) => {
        $("#clientResponsive").DataTable({
          paging: true,
          dom: "Bfrtip",
          responsive: true,
          buttons: [],
        });
      })
      .catch((err) => {
        console.log(err);
      });

  }
  handleClose = () => {
    this.setState({ showDeleteModal: false })
  }
  handleDelete = () => {
    deleteClient(this.state.currentindex)
    window.location.reload()
  }
  render() {
    const { tableData, showDeleteModal } = this.state;
    if(this.state.viewPage===true){
      window.location.href='/view-user?id='+this.state.currentindex
    }
    else if(this.state.editPage===true){
      window.location.href='/edit-user?id='+this.state.currentindex
    }
    return (
      <>
        <table id="clientResponsive" className=" table">
          <thead>
            <tr>
              <th
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  padding: 4,
                }}
              >
                User Name
              </th>
              <th
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  padding: 4,
                }}
              >
                Mobile Number
              </th>
              <th
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  padding: 4,
                }}
              >
                Email
              </th>
              <th
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  padding: 4,
                }}
              >
                Status
              </th>
              <th
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  padding: 4,
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((data, key) => {
              return (
                <tr key={key}>
                  <td
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      padding: 4,
                    }}
                  >
                    {data.first_name}{" "} {data.last_name}
                  </td>
                  <td
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      padding: 4,
                    }}
                  >
                    {data.phone}
                  </td>
                  <td
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      padding: 4,
                    }}
                  >
                    {data.email_id}
                  </td>

                  <td
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      padding: 4,
                      color: 'green'
                    }}
                  >
                    {data.status || 'Active'}
                  </td>
                  <td
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      padding: 4,
                    }}
                  >

                    <Eye onClick={() => { this.setState({ viewPage:true, currentindex: data._id }) }} size={18} />
                    <Edit3 onClick={() => { this.setState({ editPage:true, currentindex: data._id }) }} size={18} />
                    <Trash2 onClick={() => { this.setState({ showDeleteModal: true, currentindex: data._id }) }} size={18} />

                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </tfoot>
        </table>
        <Modal
          show={showDeleteModal}
          onHide={this.handleClose}
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete? Action is irreversible!!!
        </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
          </Button>
            <Button onClick={this.handleDelete} variant="danger">Delete</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
