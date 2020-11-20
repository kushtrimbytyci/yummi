import React, { useRef, useEffect, useState } from 'react'
import CartItem from './CartItem'
import BagItems from './BagItems'
import { connect } from 'react-redux'
import { subTotal, addOrder } from '../actions/orderAction'


const Cart = ({ orders, addOrder }) => {
    const cartItemDiv = useRef(null)
    const [disabled, setDisabled] = useState(false)
    const [disabled1, setDisabled1] = useState(false)
    const [disabled2, setDisabled2] = useState(false)
    const [disabled3, setDisabled3] = useState(false)
    useEffect(() => {
        if (cartItemDiv.current) {
            cartItemDiv.current.scrollTop = cartItemDiv.current?.scrollHeight
        }
    })
    return (<>
        {orders.orders.length === 0 ? <h1 className='text-white text-center mt-5'>Your cart is empty</h1> : <div>
            <div className="row mt-5 ml-2">
                <div className="col-md-8 col-sm-12">
                    <div className='d-flex w-100 p-1 mb-3' style={{ borderTop: '1px solid grey', borderBottom: '1px solid grey' }}>
                        <div className='w-50'><h6 className='text-white' style={{ lineHeight: 'normal' }}>Item</h6></div>
                        <div className='w-25'> <h6 className='text-white' style={{ lineHeight: 'normal' }}>Price</h6></div>
                        <div className='w-25'><h6 className='text-white' style={{ lineHeight: 'normal' }}>Quantity</h6></div>
                        <div className='w-25'><h6 className='text-white' style={{ lineHeight: 'normal' }}>Remove</h6></div>
                    </div>
                    <div style={{ height: '200px', overflowY: 'scroll' }} ref={cartItemDiv}>
                        {orders.orders.map((e, index) => {
                            return <CartItem key={e.product_name} name={e.product_name} price={e.price} quantity2={e.quantity} index={index} />
                        })}
                    </div>
                    <div className="my-2 px-3">
                        <h4 className='text-white mb-3'>7.99$ STUDENT VALUE MENU!!</h4>
                        <div className="row">
                            <div className="col-8">
                                <h6 className="text-white mb-1 lead extras">Large 1- Topping Pizza 1$ </h6>
                            </div>
                            <div className="col-4">
                                <button className="btn btn-primary btn-block mb-1" disabled={disabled} onClick={() => {
                                    addOrder({ product_name: "Large 1- Topping Pizza", price: 1, quantity: 1 }, 1)
                                    setDisabled(true)
                                }}>Add</button>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-8"> <h6 className="text-white mb-1 lead extras">Medium 1- Topping & 20oz coke 2$</h6></div>
                            <div className="col-4 ">
                                <button className="btn btn-primary btn-block mb-1" disabled={disabled1} onClick={() => {
                                    addOrder({ product_name: "Medium 1- Topping & 20oz coke", price: 2, quantity: 1 }, 1)
                                    setDisabled1(true)
                                }}>Add</button>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-8"><h6 className="text-white mb-1 lead extras">Small 1- Topping & Cheesy Bread 3$</h6></div>
                            <div className="col-4"> <button className="btn btn-primary btn-block mb-1" disabled={disabled2} onClick={() => {
                                addOrder({ product_name: "Small 1- Topping & Cheesy Bread", price: 3, quantity: 1 }, 1)
                                setDisabled2(true)
                            }}>Add</button>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-8"> <h6 className="text-white mb-1 lead extras">10 Buffalo Wings & 20oz coke 4$  </h6></div>
                            <div className="col-4">
                                <button className="btn btn-primary btn-block mb-1" disabled={disabled3} onClick={() => {
                                    addOrder({ product_name: "10 Buffalo Wings or Kickers & 20oz coke", price: 4, quantity: 1 }, 1)
                                    setDisabled3(true)
                                }}>Add</button>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-md-4 col-sm-12 mt-md-5 mt-sm-3 d-flex justify-content-end">
                    <BagItems subTotal={orders.subTotal} nrOfOrders={orders.nrOfOrders} /></div>
            </div>
        </div>}
    </>

    )
}

const mapStateToProps = state => {
    return {
        orders: state.orders
    }
}
export default connect(mapStateToProps, { subTotal, addOrder })(Cart);
