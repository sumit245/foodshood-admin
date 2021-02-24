import React, { Component } from "react";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons-dt";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons-dt/css/buttons.dataTables.css";
import "datatables.net-select-dt";
import "../../assets/css/dashforge.contacts.css";
import * as jzip from "jszip";
import "pdfmake";
import $ from "jquery";
import { getBills } from "../../controllers/BillController";

const Bill = getBills();
window.JSZip = jzip;
export default class DummyBillTable extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false,tableData:[] };
  }

  componentDidMount() {
    $("#billsTable tfoot th").each(function () {
      var title = $(this).text();
      $(this).html('<input type="text" placeholder="Search ' + title + '" />');
    });
    Bill.then((data) => data)
      .then(
        (json) => {
          this.setState({ isLoaded: true, tableData: json });
        },
        (err) => {
          this.setState({ isLoaded: true, err });
        }
      ).then((json)=>{
        var selected = [];
        var table = $("#billsTable").DataTable({
          paging: true,
          dom: "Bfrtip",
          responsive: true,
          buttons: [],
          processing: true,
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
    
        table.on("click", "tbody tr", function () {
          var id = this.id;
          var index = $.inArray(id, selected);
    
          if (index === -1) {
            selected.push(id);
          } else {
            selected.splice(index, 1);
          }
    
          $(this).toggleClass("selected");
        });
        table.on("dblclick", "tr", function () {
          $(this).addClass("selected");
          var val = $(this).closest("tr").find("td:eq(0)").text();
          console.log(val);
          var new_url = "/billdetail?data=" + val;
    
          $("#billsTable").hide();
          $("#billsTable_wrapper").hide();
          window.location.href = new_url;
        });
      })
      .catch((err) => {
        console.log(err);
      });

   
 
  }
  render() {
    const {tableData} = this.state
    return (
      <div>
        <table id="billsTable" className=" table" style={{ width: "100%" }}>
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
                Supplier
              </th>
              <th
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                Address
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
                Due
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((data, key) => {
              return (
                <tr key={key}>
                  <td>{data.bill_num}</td>
                  <td
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {data.supplier}
                  </td>
                  <td
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {data.address}
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
                    {data.grand_disc}
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
