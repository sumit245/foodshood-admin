import React, { Component } from "react";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons-dt";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons-dt/css/buttons.dataTables.css";
import "datatables.net-select-dt";
import { getChallans } from "../../controllers/ChallanController";
import "../../assets/css/dashforge.contacts.css";
import * as jzip from "jszip";
import "pdfmake";
import $ from "jquery";
import "jquery";

window.JSZip = jzip;
const Challan = getChallans();
export default class DummyChallanTable extends Component {
  state = {
    loading: false,
    ChallanData: [],
    challantable: "",
    rowData: [],
  };

  handleRowsSelectionChanged=()=>{
    let rows=this.state.rowData
    this.props.onRowsSelected(rows)
  }
  componentDidMount() {
    const self = this;
    $("#challanstab").DataTable().destroy();
    $("#challanstab tfoot th").each(function () {
      var title = $(this).text();
      $(this).html('<input type="text" placeholder="Search ' + title + '" />');
    });
    Challan.then((data) => data)
      .then((json) => {
        this.setState({ isLoaded: true, ChallanData: json });
      })
      .then((json) => {
        var selected = [];
        var tableRow = [];
        var table = $("#challanstab").DataTable({
          paging: true,
          dom: "Bfrtip",
          responsive: true,
          buttons: [],
          processing: true,
          initComplete: function () {
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
        table.on("click", "tr", function () {
          var id = this.id;
          var index = $.inArray(id, selected);
          if (index === -1) {
            selected.push(id);
          } else {
            selected.splice(index, 1);
          }
          $(this).toggleClass("selected");
          if ($(this).hasClass("selected")) {
            var val = $(this).closest("tr").find("td:eq(3)").text();
            tableRow.push(val);
          } else {
            var val = $(this).closest("tr").find("td:eq(3)").text();
            if (tableRow.indexOf(val) >= 0) {
              tableRow.splice(tableRow.indexOf(val), 1);
            }
          }
          self.setState({ rowData: tableRow });
          self.handleRowsSelectionChanged()
        });
        table.on("dblclick", "tr", function () {
          $(this).addClass("selected");
          var val = $(this).closest("tr").find("td:eq(0)").text();
          console.log(val);
          var new_url = "/challandetail?data=" + val;

          $("#challanstab").hide();
          $("#challanstab_wrapper").hide();
          window.location.href = new_url;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  componentWillUnmount() {
    $("#challanstab").DataTable().destroy();
  }

  render() {
    const tableData = this.state.ChallanData;
    return (
      <div>
        <table id="challanstab" className=" table" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>#</th>
              <th
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                Client Name
              </th>
              <th
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                Company
              </th>
              <th
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                Mobile
              </th>
              <th
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                Total
              </th>
              <th
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                Paid
              </th>
              <th
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                Balance
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((data, key) => {
              return (
                <tr key={key}>
                  <td>{data.challan_num}</td>
                  <td
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {data.client_name}
                  </td>
                  <td
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {data.company}
                  </td>
                  <td
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {data.mobile_number}
                  </td>
                  <td
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {data.grand_total}
                  </td>
                  <td
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {data.paid}
                  </td>
                  <td>{data.balance}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}
