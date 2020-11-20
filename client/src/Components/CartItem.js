import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { subTotal, deleteOrder } from '../actions/orderAction'
import deleteIcon from '../images/deleteIcon.png'

const CartItem = ({ name, price, subTotal, quantity2, deleteOrder, index }) => {

    const [quantity, setQuantity] = useState(quantity2)
    useEffect(() => {
        subTotal(index, quantity)
    }, [quantity])

    return (
        <div className='d-flex w-100 p-1 mt-2' style={{ width: '100%', borderBottom: '1px solid grey' }}>
            <div className='w-50'>
                <h6 className='text-white' style={{ lineHeight: 'normal' }}>{quantity} x {name}</h6>
            </div>
            <div className='w-25'>
                <input type="text" value={`${price}$`} style={{ width: '3.2rem', backgroundColor: 'white', borderRadius: '4px' }} disabled className='text-primary' />
            </div>
            <div className='w-25'>
                <input style={{ width: '3.2rem' }} type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} min="1" className="quantity-field text-primary" />
            </div>
            <div className='w-25'>
                <img className='ml-2' src={deleteIcon} width='28px' alt="" onClick={() => deleteOrder(index)} />
            </div>
        </div>
    )
}

export default connect(null, { subTotal, deleteOrder })(CartItem)
