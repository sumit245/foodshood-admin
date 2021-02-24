import React, { Component } from "react";
import $ from "jquery";
import { NavLink as Link } from "react-router-dom";
import {
  Home,
  User,
  FileText,
  Tag,
  CreditCard,
  ShoppingBag,
  Briefcase,
  Gift,
  Mail,
} from "react-feather";
import { MdCancel, MdRestaurantMenu, MdSpeakerGroup } from "react-icons/md";

export default class SideNav extends Component {
  render() {
    return (
      <>
        {/* <div className="contact-wrapper"> */}
        <div className="contact-navleft" style={{ width: 150 }}>
          <nav className="nav">
            <Link to="/" id="dash" className="nav-link py-0 mg-t-0 mt-0">
              <span
                data-toggle="tooltip"
                title="Clients"
                data-placement="right"
              >
                <Home />
                Dashboard
              </span>
            </Link>
            <Link
              to="/Home"
              id="homedash"
              className="nav-link py-0 mg-t-0 mt-0"
            >
              <span
                data-toggle="tooltip"
                title="Clients"
                data-placement="right"
              >
                <User />
                User
              </span>
            </Link>
            <Link
              to="/Challans"
              id="dashClient"
              className="nav-link mg-t-0 py-0 mt-0"
            >
              <span
                data-toggle="tooltip"
                title="Challans"
                data-placement="right"
              >
                <MdRestaurantMenu />
                Restaurant
              </span>
            </Link>
            <Link
              to="/Bills"
              id="dashBill"
              className="nav-link mg-t-0 py-0 mt-0"
              data-toggle="tab"
            >
              <span data-toggle="tooltip" title="Bills" data-placement="right">
                <Briefcase />
                Orders
              </span>
            </Link>
            <Link
              to="/Payments"
              id="dashPay"
              className="nav-link mg-t-0 py-0 mt-0"
            >
              <span
                data-toggle="tooltip"
                title="Payments"
                data-placement="right"
              >
                <FileText />
                Documents
              </span>
            </Link>
            <Link
              to="/Products"
              id="dashProd"
              className="nav-link mg-t-0 py-0 mt-0"
            >
              <span
                data-toggle="tooltip"
                title="Product"
                data-placement="right"
              >
                <Gift />
                Coupons
              </span>
            </Link>
            <Link
              to="/Products"
              id="dashCancel"
              className="nav-link mg-t-0 py-0 mt-0"
            >
              <span
                data-toggle="tooltip"
                title="Product"
                data-placement="right"
              >
                <MdCancel />
                Cancellations
              </span>
            </Link>
            <Link
              to="/Products"
              id="dashTicket"
              className="nav-link mg-t-0 py-0 mt-0"
            >
              <span
                data-toggle="tooltip"
                title="Product"
                data-placement="right"
              >
                <MdSpeakerGroup />
                Tickets
              </span>
            </Link>
          
            <Link
              to="/Products"
              id="dashEarn"
              className="nav-link mg-t-0 py-0 mt-0"
            >
              <span
                data-toggle="tooltip"
                title="Product"
                data-placement="right"
              >
                <Mail />
                Site Earnings
              </span>
            </Link>
          
            <Link
              to="/Products"
              id="dashPay"
              className="nav-link mg-t-0 py-0 mt-0"
            >
              <span
                data-toggle="tooltip"
                title="Product"
                data-placement="right"
              >
                <CreditCard />
                Payments
              </span>
            </Link>
          
          </nav>
        </div>
        {/* contact-navleft */}
        {/* </div> */}
      </>
    );
  }
}
