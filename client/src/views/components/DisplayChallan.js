import React, { Component } from "react";
import "jquery";
import "../../assets/css/dashforge.css";
import {
  getChallans,
  updateChallans,
} from "../../controllers/ChallanController";
import $ from "jquery";
import { addPayments } from "../../controllers/PaymentController";
let Challans = getChallans();
export default class DisplayChallan extends Component {
  onChangeHandler;
  constructor(props) {
    super(props);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.state = {
      challandetails: [],
      allChallans: [],
    };
  }

  onAcceptPay = () => {
    let modal = document.getElementById("acceptPayForm");
    modal.style.display = "block";
  };
  acceptPayment = () => {
    const challanupdater = {};
    const newPayment = this.state;
    newPayment.collected_by = "Admin";
    newPayment.challan_num = newPayment.challandetails.challan_num;
    newPayment.client_name = newPayment.challandetails.client_name;
    newPayment.collection_date = "12 jan 2012";
    let x = parseInt(newPayment.collection_amount);
    let y = parseInt(newPayment.challandetails.balance);
    console.log(x, y);
    if (x > y) {
      $("#amountHelper").text("invalid amount").fadeOut(3000);
    } else {
      console.log("no");
      newPayment.balance =
        newPayment.challandetails.balance - newPayment.collection_amount;
      if (newPayment.balance > 0) {
        newPayment.status = "Pending";
      } else {
        newPayment.status = "Settled";
      }
      challanupdater.balance = newPayment.balance;
      challanupdater.status = newPayment.status;
      challanupdater.challan_num = newPayment.challandetails.challan_num
      challanupdater.challan_date = newPayment.challandetails.challan_date
      challanupdater.client_name =  newPayment.challandetails.client_name 
      challanupdater.mobile_number = newPayment.challandetails.mobile_number
      challanupdater.company = newPayment.challandetails.company
      challanupdater.address=newPayment.challandetails.address
      challanupdater.item_name =  newPayment.challandetails.item_name 
      challanupdater.item_cost = newPayment.challandetails.item_cost
      challanupdater.quantity =  newPayment.challandetails.quantity
      challanupdater.item_disc =  newPayment.challandetails.item_disc
      challanupdater.item_description =  newPayment.challandetails.item_description
      challanupdater.gst_num =  newPayment.challandetails.gst_num 
      challanupdater.item_price =  newPayment.challandetails.item_price 
      challanupdater.grand_disc =  newPayment.challandetails.grand_disc 
      challanupdater.grand_total =  newPayment.challandetails.grand_total
      challanupdater.amount_paid =  newPayment.collection_amount
      
      updateChallans(newPayment.challandetails._id, challanupdater);
      addPayments(newPayment);
      window.location.href =
        "/challandetail?data=" + newPayment.challandetails.challan_num;
    }
    console.log(newPayment);
  };

  componentDidMount = () => {
    Challans.then((data) => data)
      .then((json) => {
        this.setState({ allChallans: json });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentWillReceiveProps(nextprops) {
    const thisState = nextprops.challan;
    this.setState({ challandetails: thisState });
  }
  abortController = new AbortController();
  componentWillUnmount() {
    this.abortController.abort();
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
  render() {
    const { challandetails } = this.state;
    if (!this.state.challandetails) {
      return <div />;
    }
    {
      return (
        <div id="contactInformation" className="pd-20 pd-xl-25">
          <div class="container">
            <div class="card">
              <div class="card-header my-0 py-0">
                Challan&nbsp;
                <strong>{challandetails.challan_num}</strong>
                <span class="float-right">
                  {" "}
                  <strong>Status:</strong> Pending
                </span>
              </div>
              <div class="card-body">
                <div class="row mb-1">
                  <div class="col-sm-6">
                    <h6 class="mb-0">From:</h6>
                    <div>
                      <strong>KhataBook</strong>
                    </div>
                    <div>56/8,B, Noida</div>
                    <div>Phone: .987210</div>
                  </div>

                  <div class="col-sm-6">
                    <h6 class="mb-0">To:</h6>
                    <div>
                      <strong>{challandetails.client_name}</strong>
                    </div>
                    <div>{challandetails.company}</div>
                    {/* <div>43-190 Mikolow, Poland</div> */}
                    <div>{challandetails.gst_num}</div>
                    <div>Mob: {challandetails.mobile_number}</div>
                  </div>
                </div>

                <div class="table-responsive-sm">
                  <table class="table table-striped">
                    <thead className="tx-14 my-0 py-0">
                      <tr>
                        <th class="center">#</th>
                        <th>Item</th>
                        <th>Description</th>

                        <th class="right">Unit Cost</th>
                        <th class="center">Qty</th>
                        <th class="center">Disc</th>
                        <th class="right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="tx-12 my-0 py-0">
                      <tr>
                        <td class="center">1</td>
                        <td class="left strong">{challandetails.item_name}</td>
                        <td class="left">{challandetails.item_desc}</td>

                        <td class="right">{challandetails.item_cost}</td>
                        <td class="center">{challandetails.item_quantity}</td>
                        <td class="right">{challandetails.item_disc}</td>
                        <td class="right">{challandetails.item_price}</td>
                        {/* <td class="right"></td> */}
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="row">
                  <div class="col-lg-4 col-sm-5"></div>

                  <div class="col-lg-4 col-sm-5 ml-auto">
                    <table class="table table-clear">
                      <tbody className="tx-12 my-0 py-0">
                        <tr>
                          <td class="left">
                            <strong>Subtotal</strong>
                          </td>
                          <td class="right">{challandetails.grand_total}</td>
                        </tr>
                        <tr>
                          <td class="left">
                            <strong>Discount</strong>
                          </td>
                          <td class="right">{challandetails.grand_disc}</td>
                        </tr>
                        <tr>
                          <td class="left">
                            <strong>Total</strong>
                          </td>
                          <td class="right">
                            <strong>{challandetails.grand_total}</strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="card-footer py-0">
                {/* row */}
                <div className="row row-sm">
                  <div className="col-sm mg-t-20 mg-sm-t-10">
                    {" "}
                    <div className="d-flex px-5 justify-content-end mr-n5">
                      <button
                        type="submit"
                        className="btn btn-sm btn-white mr-2"
                        style={{ zIndex: 1000 }}
                        onClick={() => {
                          window.location.href = "/Challans";
                        }}
                      >
                        close
                      </button>
                      <button
                        onClick={this.onAcceptPay}
                        className="btn btn-sm  btn-icon px-5 btn-primary"
                        style={{ zIndex: 1000 }}
                      >
                        pay
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal"
            id="acceptPayForm"
            tabIndex={-1}
            role="dialog"
            aria-hidden="true"
          >
            <div
              className="modal-dialog modal-dialog-centered modal-sm"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h6 className="modal-title">Accept Payment</h6>
                  <button
                    type="button"
                    className="close"
                    id="closearr"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="row row-sm">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label
                            htmlFor="amountpaid"
                            className="col-form-label"
                          >
                            Amount
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="amountpaid"
                            name="collection_amount"
                            value={this.state.collection_amount}
                            onChange={this.onChangeHandler}
                          />
                          <small
                            id="amountHelper"
                            class="form-text text-danger"
                          ></small>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label
                            htmlFor="modeofpayment"
                            className="col-form-label"
                          >
                            Mode
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="payment_mode"
                            onChange={this.onChangeHandler}
                            value={this.state.payment_mode}
                            id="moddeofpayment"
                          />
                        </div>
                      </div>
                    </div>

                    {/* <div className="row row-sm"> */}
                    <div className="form-group">
                      <label htmlFor="txnId">Transaction Id</label>
                      <input
                        type="text"
                        name="transaction_id"
                        onChange={this.onChangeHandler}
                        value={this.state.transaction_id}
                        className="form-control col-sm-12"
                        id="txnId"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="message-text" className="col-form-label">
                        Comment
                      </label>
                      <textarea
                        className="form-control"
                        maxLength={5}
                        id="message-text"
                        name="comments"
                        onChange={this.onChangeHandler}
                        value={this.state.comments}
                      />
                    </div>
                    {/* </div> */}
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    id="closebtn"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={this.acceptPayment}
                    className="btn btn-primary"
                  >
                    Accept Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
