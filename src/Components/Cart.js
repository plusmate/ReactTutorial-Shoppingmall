import React from "react";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";
import "../Css/Cart.css";

function Cart(props) {
  return (
    <div>
      <div>
        <Table responsive>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경</th>
          </tr>
          {props.state.map((cartData, i) => {
            return (
              <tr key={i} className="table-background">
                <td>{i}</td>
                <td>{cartData.name}</td>
                <td>{cartData.quan}</td>
                <td>
                  <button
                    onClick={() => {
                      props.dispatch({
                        type: "addQuan",
                        goodsId: cartData.id,
                        stock: cartData.stock
                      });
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      props.dispatch({
                        type: "decreaseQuan",
                        goodsId: cartData.id,
                      });
                    }}
                  >
                    -
                  </button>
                </td>
                <button
                  className="delete-cart-goods"
                  onClick={() => {
                    props.dispatch({
                      type: "deleteCart",
                      goodsId: cartData.id,
                    });
                  }}
                >
                  x
                </button>
              </tr>
            );
          })}
        </Table>
        {props.closingAlert === true ? (
          <div className="ad-background">
            <div></div>
            <p className="ad-text">지금 구매하시면 신규할인 20%</p>
            <button
              className="ad-close"
              onClick={() => {
                props.dispatch({ type: "disableAlert" });
              }}
            >
              x
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function StoreCart(state) {
  return {
    state: state.reducer,
    closingAlert: state.reducer2,
    /* 상품명: state.name //state.name -> 상품명 */
  };
}

export default connect(StoreCart)(Cart);
// export default Cart;
