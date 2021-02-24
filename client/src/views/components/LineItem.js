import React, { Component } from "react";
import PropTypes from "prop-types";
import { MdCancel as DeleteIcon } from "react-icons/md";
import styles from "./lineitem.css";
import { searchTable, searchColumn } from "../../helper/search";
import {
  getProducts,
  updateProduct,
} from "../../controllers/ProductController";
import $ from "jquery";

let Products = getProducts();
class LineItem extends Component {
  state = {
    products: [],
    item: {},
  };
  componentDidMount() {
    const { products } = this.state;
    Products.then((data) => data)
      .then((json) => {
        this.setState({ products: json });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  showProductTable = () => {
    let modal = document.getElementById("producttable");
    modal.style.display = "block";
  };
  fillProduct = (data) => {
    const item = {
      name: data.product_name,
      cost: data.cost,
      quantity: data.quantity,
    };
    this.setState({item:item})
    let modal = document.getElementById("producttable");
    modal.style.display = "none";
  };
  searchTable = () => {
    searchTable();
  };
  render = () => {
    const {
      index,
      name,
      description,
      quantity,
      price,
      linediscount,
    } = this.props;
    const { products, item } = this.state;

    return (
      <>
        <div className="row row-sm my-1">
          <div className="ml-1">{index + 1}</div>
          <div className="col-4 mx-0 px-1">
            <input
              className="col-sm-12 my-1"
              name="name"
              type="text"
              readOnly
              value={name}
              placeholder="Item name"
              onClick={this.showProductTable}
              onChange={this.props.changeHandler(index)}
            />
            <input
              className="col-sm-12"
              name="description"
              type="text"
              placeholder="Description"
              value={description}
              onChange={this.props.changeHandler(index)}
            />
          </div>
          <div className="col-1 mx-3 px-1">
            <input
              className="col-sm-12"
              name="quantity"
              type="number"
              step="1"
              value={quantity}
              onChange={this.props.changeHandler(index)}
              onFocus={this.props.focusHandler}
            />
          </div>
          <div className="col-1 mx-3 px-1">
            <input
              className="col-sm-12"
              name="price"
              type="number"
              step="0.01"
              min="0.00"
              max="9999999.99"
              value={price}
              onChange={this.props.changeHandler(index)}
              onFocus={this.props.focusHandler}
            />
          </div>
          <div className="col-1 mx-3 px-1">
            <input
              className="col-sm-12"
              name="linediscount"
              type="number"
              step="0.01"
              value={linediscount}
              onFocus={this.props.focusHandler}
              onChange={this.props.changeHandler(index)}
            />
          </div>
          <div className="col-1 mx-3 px-1">
            {this.props.currencyFormatter(quantity * price - linediscount)}
          </div>

          <div>
            <button
              type="button"
              className="tx-14 tx-danger my-0"
              style={{ border: "none", padding: 0 }}
              onClick={this.props.deleteHandler(index)}
            >
              <DeleteIcon size="1.25em" />
            </button>
          </div>
        </div>
        <div
          className="modal"
          id="producttable"
          style={{ width: 250, position: "relative" }}
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
      </>
    );
  };
}

export default LineItem;

LineItem.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string,
  description: PropTypes.string,
  quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  linediscount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
