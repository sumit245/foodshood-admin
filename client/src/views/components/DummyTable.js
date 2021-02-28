import React, { Component } from "react";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons-dt";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons-dt/css/buttons.dataTables.css";
import "datatables.net-select-dt";
import "../../assets/css/dashforge.contacts.css";
import { arrayFindObjectByProp } from "../../helper/arrayFindObjectByProp";
import * as jzip from "jszip";
import "pdfmake";
import $ from "jquery";
import { deleteClient, getClients } from "../../controllers/ClientController";
import { Edit3, Trash2 } from "react-feather";
import { MdFolderOpen, MdViewColumn } from "react-icons/md";

window.JSZip = jzip;
const Clt = getClients();
export default class DummyTable extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, tableData: [] };
  }

  shouldComponentUpdate() {
    return true;
  }

  componentDidMount() {
    const self = this;
    var indices = [];

    $("#deleteBtnGlobal").on("click", function () {
      deleteClient(indices[0]);
      window.location.href = "/";
    });
    $("#clientResponsive tfoot th").each(function () {
      var title = $(this).text();
      $(this).html('<input type="text" placeholder="Search ' + title + '" />');
    });
    Clt.then((data) => data)
      .then(
        (json) => {
          this.setState({ isLoaded: true, tableData: json });
        },
        (err) => {
          this.setState({ isLoaded: true, err });
        }
      )
      .then((json) => {
        var selected = [];
        var table = $("#clientResponsive").DataTable({
          paging: true,
          dom: "Bfrtip",
          responsive: true,
          buttons: [],
          initComplete: function () {
            // Apply the search
            this.api()
              .columns()
              .every(function () {
                var that = this;
                return $("input", this.footer()).on(
                  "keyup change clear",
                  function () {
                    if (that.search() !== this.value) {
                      that.search(this.value).draw();
                    }
                  }
                );
              });
          },
        });
        table.on("click", " tbody tr", function () {
          var id = this.id;
          var index = $.inArray(id, selected);
          var clients = self.props.userdata;
          var rowdata = [];
          let client = {};
          if (index === -1) {
            selected.push(id);
            $(this)
              .closest("tr")
              .find("td")
              .each(function () {
                var textval = $(this).text();
                rowdata.push(textval);
              });
            client = arrayFindObjectByProp(
              clients,
              "mobile_number",
              rowdata[3]
            );
            indices.push(client._id);
          } else {
            selected.splice(index, 1);
          }
          $(this).toggleClass("selected");
        });
        table.on("dblclick", "tbody tr", function () {
          $(this).addClass("selected");
          var val = $(this).closest("tr").find("td:eq(3)").text();
          console.log(val);
          var new_url = "/clientdetail?data=" + val;

          $("#clientResponsive").hide();
          $("#clientResponsive_wrapper").hide();
          window.location.href = new_url;
        });
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(indices);
  }
  render() {
    const { tableData } = this.state;
    const isLoaded = this.props.isLoaded;
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
              {/* <th
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  padding: 4,
                }}
              >
                Address
              </th> */}
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
                    {data.first_name + " " + data.last_name}
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
                  {/* <td
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      padding: 4,
                    }}
                  >
                    {data.address.flat_num +
                      "," +
                      data.address.locality +
                      "," +
                      data.address.sector +
                      "," +
                      data.address.block}
                  </td> */}
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
                      color:'green'
                    }}
                  >
                    {data.status || 'Active' }
                  </td>
                  <td
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      padding: 4,
                    }}
                  >
                    
                    <MdViewColumn size={18} />
                    <Edit3 size={18} />
                    <Trash2 size={18} />

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
      </>
    );
  }
}
