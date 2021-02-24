import React, { Component } from "react";
import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import LineItem from "./LineItem";
import { MdAddCircle as AddIcon } from "react-icons/md";
import styles from "./LineItems.module.scss";

class LineItems extends Component {
  handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    };

    // perform reorder
    const lineItems = reorder(
      this.props.items,
      result.source.index,
      result.destination.index
    );

    // call parent handler with new state representation
    this.props.reorderHandler(lineItems);
  };

  render = () => {
    const { items, addHandler, reorderHandler, ...functions } = this.props;

    return (
      <form>
        <div className={styles.lineItems}>
          <div className={`${styles.gridTable}`}>
            <div className="row row-sm m-0">
              <div className="ml-1">#</div>
              <div className="col-4 mb-0 px-0 d-flex justify-content-center">
                Item
              </div>
              <div className="col-2 ml-4 px-2">Qty</div>
              <div className="col-1 ml-n5 px-1 ">Price</div>
              <div className="col-2 ml-2 px-4 d-flex justify-content-start ">
                Disc.
              </div>
              <div className="col-2 mx-n5 px-1 ">Total</div>
              <div></div>
            </div>

            <DragDropContext onDragEnd={this.handleDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    className={
                      snapshot.isDraggingOver ? styles.listDraggingOver : ""
                    }
                  >
                    {this.props.items.map((item, i) => (
                      <Draggable key={item.id} draggableId={item.id} index={i}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={provided.draggableProps.style}
                            className={
                              snapshot.isDragging ? styles.listItemDragging : ""
                            }
                          >
                            <LineItem
                              style={{ color: "red" }}
                              key={i + item.id}
                              index={i}
                              name={item.name}
                              description={item.description}
                              quantity={item.quantity}
                              linediscount={item.linediscount}
                              price={item.price}
                              {...functions}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
          <div className="d-flex justify-content-start">
            <div className={styles.addItem}>
              <button type="button" onClick={addHandler}>
                <AddIcon size="1.25em" className={styles.addIcon} /> Add Item
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  };
}

export default LineItems;

LineItems.propTypes = {
  items: PropTypes.array.isRequired,
  currencyFormatter: PropTypes.func.isRequired,
  addHandler: PropTypes.func.isRequired,
  changeHandler: PropTypes.func.isRequired,
  focusHandler: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  reorderHandler: PropTypes.func.isRequired,
};
