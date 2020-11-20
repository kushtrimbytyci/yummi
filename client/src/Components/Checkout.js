import React, { useState } from "react";
import creditCards from "../images/creditCards.png";
import axios from "axios";
import { connect } from "react-redux";
import { clearOrders } from "../actions/orderAction";

const Checkout = ( { history,orders,clearOrders,user }) => {
  const [processPayment, setProcessPayment] = useState("Process payment");
  const [info, setInfo] = useState({
    ccNumber: "",
    expiryDate: "",
    cvCode: "",
    cardOwner: "",
  });
  const [show, setShow] = useState(user.isAuthenticated===true?true:false);
  const handleInfo = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  return (
 <>
      {show===false?<h4 className='mt-5 ml-4'>
        <button
          onClick={() => history.push("/register")}
          className='btn btn-sm btn-warning'
        >
          Register and view your orders
        </button>
        <span className='text-white lead'> or </span>
        <button
          onClick={() => setShow(true)}
          className='btn-sm btn btn-primary'
        >
          Continue as a guest
        </button>
      </h4>:null}
      {show && (
        <div className='row my-4'>
          <div className='col-xs-12 col-md-4 offset-md-4'>
            <div className='card '>
              <div className='card-header'>
                <div className='row'>
                  <h3 className='text-xs-center'>Payment Details</h3>
                  <img
                  alt='credit-cards'
                    className='img-fluid'
                    style={{ margin: "0 auto" }}
                    src={creditCards}
                  />
                </div>
              </div>
              <div className='card-body'>
                <form role='form'>
                  <div className='row'>
                    <div className='col-xs-12'>
                      <div className='form-group'>
                        <label>CARD NUMBER</label>
                        <div className='input-group'>
                          <input
                            type='number'
                            maxLength={12}
                            className='form-control'
                            placeholder='Valid Card Number'
                            name='ccNumber'
                            value={info.ccNumber}
                            onChange={handleInfo}
                          />
                          <span className='input-group-addon'>
                            <span className='fa fa-credit-card'></span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-xs-7 col-md-7 p-0'>
                      <div className='form-group'>
                        <label>
                          <span className='hidden-xs'>EXPIRATION</span> DATE
                        </label>
                        <input
                          type='number'
                          maxLength={5}
                          className='form-control'
                          placeholder='MM / YY'
                          name='expiryDate'
                          value={info.expiryDate}
                          onChange={handleInfo}
                        />
                      </div>
                    </div>
                    <div className='col-xs-5 col-md-5 p-0 '>
                      <div className='form-group'>
                        <label>CV CODE</label>
                        <input
                          type='number'
                          maxLength={3}
                          className='form-control'
                          placeholder='CVC'
                          name='cvCode'
                          value={info.cvCode}
                          onChange={handleInfo}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-xs-12'>
                      <div className='form-group'>
                        <label>CARD OWNER</label>
                        <input
                          type='text'
                          className='form-control'
                          placeholder='Card Owner Names'
                          name='cardOwner'
                          value={info.cardOwner}
                          onChange={handleInfo}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className='card-footer'>
                <div className='row'>
                  <div className='col-xs-12'>
                    <button
                      className='btn btn-warning btn-lg btn-block'
                      onClick={async () => {
                        if (
                          info.cardOwner === "" ||
                          info.ccNumber === "" ||
                          info.cvCode === "" ||
                          info.expiryDate === ""
                        ) {
                          //don't do the request
                        } else {
                          try {
                            const data = {
                              UserId:user.user?.id,
                              total: orders.subTotal,
                              quantity: orders.nrOfOrders,
                              address: user.user?.address,
                              items: orders.orders
                            }
                            if(data.UserId===null){
                              delete data['UserId']
                            }
                            await axios.post("/api/orders/createorder", data);
                            setProcessPayment("Payment received. Thank You!!");
                            setTimeout(() => {
                              history.push("/");
                            }, 1400);
                            clearOrders();
                          } catch (e) {
                            //ignore for now
                          }
                        }
                      }}
                    >
                      {processPayment}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
</>
  );
};

const mapStateToProps = (state) => {
  return {
    orders: state.orders,
    user:state.user
  };
};

export default connect(mapStateToProps, { clearOrders })(Checkout);
