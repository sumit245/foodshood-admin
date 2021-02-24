import React, { Component } from "react";
import "jquery";
import "../../assets/css/dashforge.css";
import { addChallans, getChallans } from "../../controllers/ChallanController";
import { getClients } from "../../controllers/ClientController";
import {
  getProducts,
  updateProduct,
} from "../../controllers/ProductController";
import $ from "jquery";
import { challanhelper } from "../../helper/challanhelper";
import { searchTable, searchColumn } from "../../helper/search";
import { arrayFindObjectByProp } from "../../helper/arrayFindObjectByProp";

let Clients = getClients();
let Products = getProducts();
let Challans = getChallans();
export default class AddChallan extends Component {
  constructor(props) {
    super(props);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      client_name: "",
      mobile_number: "",
      phone_number: "",
      company: "",
      address: "",
      item_name: "",
      quantity: "",
      item_cost: "",
      item_description: "",
      item_price: "",
      grand_total: "",
      challan_date: "",
      grand_disc: "",
      balance: "",
      gst_num: "",
      clients: [],
      client: {},
      products: [],
      item: {},
      challan_num: "",
    };
  }
  onChangeHandler(e) {
    const value = e.target.value;
    this.setState({
      [e.target.name]: value,
    });
    const newVal = {
      [e.target.name]: value,
    };
    console.log(newVal);
  }
  onSubmit(e) {
    e.preventDefault();
    const data = this.state;
    const address = data.client.address;
    data.challan_date = $("#date").val();
    data.client_name = $("#cn").text();
    data.company = $("#cc").text();
    data.address = address;
    data.item_name = data.item.item_name;
    data.item_cost = data.item.item_cost;
    data.quantity = data.item.item_quantity;
    data.mobile_number = $("#mob").text().replace("Mob: ", "");
    data.gst_num = $("#gst").text().replace("GST No:", "");
    data.item_price = $("#subtotal").html().replace("₹", "");
    data.grand_disc = $("#gDisc").html().replace("₹", "");
    data.grand_total = $("#total").html().replace("₹", "");
    data.balance = $(".due").html().replace("₹", "");
    data.amount_paid = "0.00";
    data.status = "pending";
    if (parseInt(data.quantity) > parseInt(data.item.item_quantity)) {
      alert("Quantity must be less than in stock quantity");
    } else {
      let prod = arrayFindObjectByProp(
        data.products,
        "product_name",
        data.item.item_name
      );
      let newQty = parseInt(prod.quantity) - parseInt(data.quantity);
      const newProd = {
        product_num: prod.product_num,
        product_name: prod.product_name,
        cost: prod.cost,
        quantity: newQty,
      };
      console.log(data);
      updateProduct(prod._id, newProd);
      addChallans(data);
      window.location.href = "/Challans";
    }
  }
  componentDidMount() {
    const self = this;
    challanhelper();
    const previouschallan = this.state;
    const { clients } = this.state;
    Challans.then((data) => data)
      .then((json) => {
        let previouschallan = json;
        let ch_no = previouschallan.length;
        this.setState({ challan_num: ch_no });
      })
      .catch((err) => {
        console.log(err);
      });
    Clients.then((data) => data)
      .then((json) => {
        this.setState({ clients: json });
      })
      .catch((err) => {
        console.log(err);
      });
    const { products } = this.state;
    Products.then((data) => data)
      .then((json) => {
        this.setState({ products: json });
      })
      .catch((err) => {
        console.log(err);
      });
    $(document).ready(function () {
      let due = $(".due").html().replace("₹", "");
      self.setState({ balance: due });
      if (self.props.addState) {
        var client_name = $("#clnt_name");
        $("#sbmtBtn").click(function () {
          $("#myForm").submit();
          // addClient(newClient)
          console.log(client_name);
        });
      }
    });
  }
  showClientTable = () => {
    let modal = document.getElementById("clienttable");
    modal.style.display = "block";
  };

  showProductTable = () => {
    let modal = document.getElementById("producttable");
    modal.style.display = "block";
  };

  fillData = (data) => {
    const client = {
      mobile_number: data.mobile_number,
      client_name: data.client_name,
      company: data.company,
      gst_num: data.gst_num,
      address: data.address,
    };
    this.setState({ client: client });
    let modal = document.getElementById("clienttable");
    modal.style.display = "none";
  };
  fillProduct = (data) => {
    const item = {
      item_name: data.product_name,
      item_cost: data.cost,
      item_quantity: data.quantity,
    };
    this.setState({ item: item });
    let modal = document.getElementById("producttable");
    modal.style.display = "none";
  };
  searchTable = () => {
    searchTable();
  };
  searchColumns = (clientNameSearch, ClientTable) => {
    searchColumn(clientNameSearch, ClientTable);
  };
  render() {
    const { clients, products, item, client } = this.state;
    if (this.props.addState) {
      return (
        <div id="contactInformation" className=" pd-20 pd-xl-25">
          <form action="">
            <div className="row">
              <div className="col-sm-4">
                <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                  challan number
                </label>
                <p className="mg-b-0">
                  <input
                    readOnly
                    name="challan_num"
                    value={this.state.challan_num}
                  />
                </p>
              </div>
              {/* col */}
              <div className="col-sm-4">
                <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                  date
                </label>
                <p className="mg-b-0">
                  <input
                    id="date"
                    onChange={this.onChangeHandler}
                    name="challan_date"
                    defaultValue={this.state.challan_date}
                    required
                  />
                </p>
              </div>
              {/* col */}
              <div className="col-sm-4">
                <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                  due date
                </label>
                <p className="mg-b-0">
                  <input
                    onChange={this.onChangeHandler}
                    name="due_date"
                    value={this.state.due_date}
                  />
                </p>
              </div>
            </div>
            <div className="row mg-t-10">
              <div className="col-4">
                <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                  client Name
                </label>
                <p className="mg-b-0">
                  <input
                    className="col-10"
                    onClick={this.showClientTable}
                    readOnly
                    onChange={this.onChangeHandler}
                    name="client_name"
                    value={this.state.client_name || client.client_name}
                  />
                </p>
              </div>
              <div className="col-sm-6 col-lg-8 mg-t-10 mg-sm-t-0 mg-md-t-5">
                <label className="tx-sans tx-uppercase tx-10 tx-medium tx-spacing-1 tx-color-03">
                  Billed To
                </label>
                <div
                  className="mg-t-n5"
                  style={{ flexDirection: "row", display: "flex" }}
                >
                  <h6 className="tx-15 mg-b-2" id="cn">
                    {client.client_name}
                  </h6>
                  &nbsp;
                  <h6 className="tx-15 mg-b-2" id="cc">
                    {client.company}
                  </h6>
                </div>
                <p className="tx-12 mg-b-0" id="gst">
                  GST No: {client.gst_num}
                </p>
                <p className="tx-12 mg-b-0" id="mob">
                  Mob:{" " + client.mobile_number || ""}{" "}
                </p>
              </div>
            </div>
            {/* col */}
            {/* row */}

            <div className="row row-sm" id="item-row">
              <div className="col-4 mx-0 px-1" id="item-name">
                <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                  item name
                </label>
                <input
                  className="col-sm-12"
                  onChange={this.onChangeHandler}
                  id="item-name"
                  placeholder="Item Name"
                  name="item_name"
                  value={this.state.item_name}
                />
                <input
                  className="col-sm-12"
                  id="descr"
                  placeholder="Description"
                  onChange={this.onChangeHandler}
                  name="item_description"
                  value={this.state.item_description}
                />
                <div id="delete" className="mx-0 px-0 py-0 my-0">
                  <p className="tx-14 tx-danger my-0">X</p>
                </div>
              </div>

              <div className="col-1 mx-0 px-1">
                <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                  Quantity
                </label>
                <input
                  className="col-sm-12"
                  id="qty"
                  onChange={this.onChangeHandler}
                  name="quantity"
                  value={this.state.quantity}
                />
              </div>
              <div className="col-2 mx-0 px-1">
                <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                  item cost
                </label>
                <input
                  className="col-sm-12"
                  onChange={this.onChangeHandler}
                  id="cost"
                  name="item_cost"
                  value={this.state.item_cost}
                />
              </div>
              <div className="col-2 mx-0 px-1">
                <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                  Disc.
                </label>
                <input
                  className="col-sm-12"
                  onChange={this.onChangeHandler}
                  id="disc"
                  name="item_disc"
                  value={this.state.item_disc}
                />
              </div>
              <div className="col-2 mx-0 px-1">
                <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                  SubTotal
                </label>
                <span
                  color="fff"
                  className="col-sm-12"
                  onChange={this.onChangeHandler}
                  id="price"
                  name="item_price"
                  value={this.state.item_price}
                  readOnly
                ></span>
              </div>
            </div>

            <div className="row row-sm" id="addrow">
              <div className="col-sm mg-t-20 mg-sm-t-10">
                <p className="tx-12 tx-medium tx-spacing-1 tx-primary">
                  Add a row
                </p>
              </div>
            </div>

            <div className="row row-sm">
              <div className="col-sm mg-t-20 mg-sm-t-0">
                {" "}
                <div className="d-flex px-5 justify-content-end mr-5">
                  <div style={{ flexDirection: "column" }}>
                    <div
                      style={{
                        flexDirection: "row",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p className="mg-b-0 mr-2">Total</p>
                      <div id="subtotal">₹0.00</div>
                    </div>
                    <div
                      style={{
                        flexDirection: "row",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p className="mg-b-0 mr-2">Disc.:</p>
                      <div id="gDisc">₹0.00</div>
                    </div>
                    <div
                      style={{
                        flexDirection: "row",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p className="mg-b-0 mr-2">Grand Total:</p>
                      <div id="total">₹0.00</div>
                    </div>
                    <div
                      style={{
                        flexDirection: "row",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p className="mg-b-0 mr-2">Paid</p>
                      <div id="paid">₹0.00</div>
                    </div>
                    <div
                      style={{
                        flexDirection: "row",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p className="mg-b-0 mr-2">Balance</p>
                      <div className="due">₹0.00</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* row */}
            <div className="row row-sm">
              <div className="col-sm mg-t-20 mg-sm-t-10">
                {" "}
                <div className="d-flex px-5 justify-content-end mr-5">
                  <button
                    type="submit"
                    className="btn btn-sm btn-white mr-2"
                    style={{ zIndex: 1000 }}
                  >
                    Reset
                  </button>
                  <button
                    onClick={this.onSubmit}
                    className="btn btn-sm  btn-icon px-5 btn-primary"
                    style={{ zIndex: 1000 }}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      );
    } else {
      return (
        <div className="contact-content">
          <div className="tab-content">
            <div id="contactInformation" className=" pd-20 pd-xl-25">
              <form action="">
                <div className="row">
                  <div className="col-sm-4">
                    <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                      challan number
                    </label>
                    <p className="mg-b-0">
                      <input
                        onChange={this.onChangeHandler}
                        name="challan_num"
                        value={this.state.challan_num}
                      />
                    </p>
                  </div>
                  {/* col */}
                  <div className="col-sm-4">
                    <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                      date
                    </label>
                    <p className="mg-b-0">
                      <input
                        id="date"
                        onChange={this.onChangeHandler}
                        name="challan_date"
                        defaultValue={this.state.challan_date}
                        required
                      />
                    </p>
                  </div>
                  {/* col */}
                  <div className="col-sm-4">
                    <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                      due date
                    </label>
                    <p className="mg-b-0">
                      <input
                        onChange={this.onChangeHandler}
                        name="due_date"
                        value={this.state.due_date}
                      />
                    </p>
                  </div>
                </div>
                <div className="row mg-t-10">
                  <div className="col-4">
                    <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                      client Name
                    </label>
                    <p className="mg-b-0">
                      <input
                        className="col-10"
                        onClick={this.showClientTable}
                        onChange={this.onChangeHandler}
                        name="client_name"
                        defaultValue={
                          this.state.client_name || client.client_name
                        }
                      />
                    </p>
                  </div>
                  <div className="col-sm-6 col-lg-8 mg-t-10 mg-sm-t-0 mg-md-t-5">
                    <label className="tx-sans tx-uppercase tx-10 tx-medium tx-spacing-1 tx-color-03">
                      Billed To
                    </label>
                    <div className="row row-sm">
                      <div className="col-sm-6">
                        <div
                          className="mg-t-n5"
                          style={{ flexDirection: "row", display: "flex" }}
                        >
                          <h6 className="tx-15 mg-b-2" id="cn">
                            {client.client_name}
                          </h6>
                          &nbsp;
                          <h6 className="tx-15 mg-b-2" id="cc">
                            {client.company}
                          </h6>
                        </div>
                        <p className="tx-12 mg-b-0" id="gst">
                          GST No: {client.gst_num}
                        </p>
                        <p className="tx-12 mg-b-0" id="mob">
                          Mob: {client.mobile_number}
                        </p>
                      </div>
                      <div className="col-sm-6">
                        <p className="tx-12 mg-b-0" id="addr">
                          {client.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* col */}
                {/* row */}

                {/* <h6 className="mg-t-40 mg-b-20"></h6> */}
                <div className="row row-sm" id="item-row">
                  <div className="col-4 mx-0 px-1" id="item-name">
                    <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                      item name
                    </label>
                    <input
                      className="col-sm-12"
                      onChange={this.onChangeHandler}
                      onClick={this.showProductTable}
                      id="item-name"
                      placeholder="Item Name"
                      name="item_name"
                      defaultValue={this.state.item_name || item.item_name}
                    />
                    <input
                      className="col-sm-12"
                      id="description1"
                      placeholder="Description"
                      onChange={this.onChangeHandler}
                      name="item_description"
                      value={this.state.description}
                    />
                    <div id="delete" className="mx-0 px-0 py-0 my-0">
                      <p className="tx-14 tx-danger my-0">X</p>
                    </div>
                  </div>

                  <div className="col-1 mx-0 px-1">
                    <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                      Qty
                    </label>
                    <input
                      className="col-sm-10"
                      id="qty"
                      onChange={this.onChangeHandler}
                      name="quantity"
                      value={this.state.quantity}
                    />
                  </div>
                  <div className="col-2 mx-0 px-1">
                    <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                      item cost
                    </label>
                    <input
                      className="col-sm-12"
                      onChange={this.onChangeHandler}
                      id="cost"
                      name="item_cost"
                      defaultValue={this.state.item_cost || item.item_cost}
                    />
                  </div>
                  <div className="col-2 mx-0 px-1">
                    <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                      Disc.
                    </label>
                    <input
                      className="col-sm-12"
                      onChange={this.onChangeHandler}
                      id="disc"
                      name="item_disc"
                      value={this.state.item_disc}
                    />
                  </div>
                  <div className="col-2 mx-0 px-1">
                    <label className="tx-10 tx-medium tx-spacing-1 tx-color-03 tx-uppercase tx-sans mg-b-10">
                      SubTotal
                    </label>
                    <span
                      color="fff"
                      className="col-sm-12"
                      onChange={this.onChangeHandler}
                      id="price"
                      name="item_price"
                      value={this.state.item_price}
                      readOnly
                    ></span>
                  </div>
                </div>

                <div className="row row-sm" id="addrow">
                  <div className="col-sm mg-t-20 mg-sm-t-10">
                    <p className="tx-12 tx-medium tx-spacing-1 tx-primary">
                      Add a row
                    </p>
                  </div>
                </div>

                <div className="row row-sm">
                  <div className="col-sm mg-t-20 mg-sm-t-0">
                    {" "}
                    <div className="d-flex px-5 justify-content-end mr-5">
                      <div style={{ flexDirection: "column" }}>
                        <div
                          style={{
                            flexDirection: "row",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p className="mg-b-0 mr-2">Total</p>
                          <div id="subtotal">₹0.00</div>
                        </div>
                        <div
                          style={{
                            flexDirection: "row",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p className="mg-b-0 mr-2">Disc.:</p>
                          <div id="gDisc">₹0.00</div>
                        </div>
                        <div
                          style={{
                            flexDirection: "row",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p className="mg-b-0 mr-2">Grand Total:</p>
                          <div id="total">₹0.00</div>
                        </div>
                        <div
                          style={{
                            flexDirection: "row",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p className="mg-b-0 mr-2">Paid</p>
                          <div id="paid">₹0.00</div>
                        </div>
                        <div
                          style={{
                            flexDirection: "row",
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p className="mg-b-0 mr-2">Balance</p>
                          <div className="due">₹0.00</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* row */}
                <div className="row row-sm">
                  <div className="col-sm mg-t-20 mg-sm-t-10">
                    {" "}
                    <div className="d-flex px-5 justify-content-end mr-5">
                      <button
                        type="submit"
                        className="btn btn-sm btn-white mr-2"
                        style={{ zIndex: 1000 }}
                      >
                        Reset
                      </button>
                      <button
                        onClick={this.onSubmit}
                        className="btn btn-sm  btn-icon px-5 btn-primary"
                        style={{ zIndex: 1000 }}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div
            className="modal"
            id="clienttable"
            tabIndex={-1}
            style={{ width: 750, position: "absolute" }}
            role="dialog"
          >
            <div className="modal-dialog" role="document">
              <div
                className="modal-content"
                style={{
                  position: "relative",
                  width: 650,
                  maxHeight: 400,
                  padding: 0,
                  margin: 0,
                }}
              >
                <div className="modal-body" style={{ margin: 0, padding: 0 }}>
                  <table className="table table-responsive" id="ClientTable">
                    <thead className="table-dark">
                      <tr>
                        <th>Client Name</th>
                        <th>Company</th>
                        <th>Mobile</th>
                        <th>Address</th>
                        <th
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            let modal = document.getElementById("clienttable");
                            modal.style.display = "none";
                          }}
                        >
                          X
                        </th>
                      </tr>
                    </thead>
                    <tr>
                      <th>
                        <input
                          className="form-control"
                          id="clientNameSearch"
                          onKeyUp={() => {
                            this.searchColumns(
                              "clientNameSearch",
                              "ClientTable"
                            );
                          }}
                          placeholder="Search..."
                        />
                      </th>
                      <th>
                        <input
                          className="form-control"
                          id="clientCompanySearch"
                          onKeyUp={() => {
                            this.searchColumns(
                              "clientCompanySearch",
                              "ClientTable"
                            );
                          }}
                          placeholder="Search..."
                        />
                      </th>
                      <th>
                        <input
                          className="form-control"
                          id="clientMobileSearch"
                          onKeyUp={() => {
                            this.searchColumns(
                              "clientMobileSearch",
                              "ClientTable"
                            );
                          }}
                          placeholder="Search..."
                        />
                      </th>
                      <th>
                        <input
                          className="form-control"
                          id="clientAddressSearch"
                          onKeyUp={() => {
                            this.searchColumns(
                              "clientAddressSearch",
                              "ClientTable"
                            );
                          }}
                          placeholder="Search..."
                        />
                      </th>
                    </tr>
                    <tbody>
                      {clients.map((data, key) => {
                        return (
                          <tr
                            key={key}
                            onClick={() => this.fillData(data)}
                            style={{ height: 5, padding: 0, margin: 0 }}
                          >
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
                              {data.address}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal"
            id="producttable"
            style={{ width: 250, position: "absolute" }}
            tabIndex={-1}
            role="dialog"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <table className="table-components" id="myTable">
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Rate</th>
                      <th
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          let modal = document.getElementById("producttable");
                          modal.style.display = "none";
                        }}
                      >
                        X
                      </th>
                    </tr>
                  </thead>
                  <tr>
                    <th colSpan={2}>
                      <input
                        className="search-form"
                        id="myInput"
                        onKeyUp={this.searchTable}
                        placeholder="Search..."
                      />
                    </th>
                  </tr>
                  <tbody>
                    {products.map((data, key) => {
                      return (
                        <tr
                          key={key}
                          onClick={() => this.fillProduct(data)}
                          style={{ height: 5, padding: 0, margin: 0 }}
                        >
                          <td>{data.product_name}</td>
                          <td>{data.cost}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
