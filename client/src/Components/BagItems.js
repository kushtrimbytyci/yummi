import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'

const BagItems = ({ subTotal, nrOfOrders, history }) => {
  const [deliveryMethodPrice, setDeliveryMethodPrice] = useState('FREE')
  const [price, setPrice] = useState(1)
  const [sign, setSign] = useState('$')
  const [checked, setChecked] = useState(true)
  const handleChange = e => {
    setDeliveryMethodPrice(e.target.value)
  }

  let deliveryMethodPrice2;
  if (deliveryMethodPrice === 'FREE') {
    deliveryMethodPrice2 = 'FREE'
  } else if (deliveryMethodPrice === '') {
    deliveryMethodPrice2 = ''
  } else {
    deliveryMethodPrice2 = `+${deliveryMethodPrice}$`
  }
  let total = (deliveryMethodPrice === '' || deliveryMethodPrice === 'FREE' ? subTotal : parseInt(deliveryMethodPrice) + subTotal) * price
  return (
    <div className='w-100 mr-2 p-2 mb-3' style={{ backgroundColor: 'rgb(238,238,238)', maxHeight: '450px', border: '3px solid black', position: 'relative' }}>
      <div className='w-100'>
        <h6 className='text-black lead text-center' style={{ lineHeight: 'normal' }}>{nrOfOrders} item(s) in your bag</h6>
        <hr />
        <div className="d-flex justify-content-between w-100">
          <span className="font-weight-light">Subtotal</span>
          <span className='font-weight-light'>{subTotal.toFixed(2)}$</span>
        </div>
        <div className="dropdown mt-4">
          <label>Select Collection or Delivery</label>
          <select className="custom-select" id="inputGroupSelect03" aria-label="Example select with button addon" onChange={(e) => handleChange(e)}>
            <option value='FREE'>Collection</option>
            <option value='2'>Royal Mail 1st Class</option>
            <option value='4'>Royal Mail 2nd Class</option>
            <option value='8'>Royal Mail Special Delivery</option>
          </select>
        </div>
        <div className='w-100 mt-3'>
          <h6 className='text-right'>{deliveryMethodPrice2}</h6>
        </div>
      </div>

      <div className="form-check">
        <label className="form-check-label">
          <input type="radio" className="form-check-input" checked={checked} onChange={() => {
            setPrice(1)
            setSign('$')
            setChecked(true)
          }} name="optradio" />Price is $
  </label>
      </div>
      <div className="form-check">
        <label className="form-check-label">
          <input type="radio" className="form-check-input" onChange={() => {
            setPrice(0.85)
            setSign('€')
            setChecked(false)
          }} name="optradio" />Price in €
  </label>
      </div>

      <div className="mt-5 w-100 p-2 d-flex justify-content-between" style={{ borderTop: "1px solid grey" }}>
        <span>TOTAL</span>
        <span>{sign}{total.toFixed(2)}</span>
      </div>
      <button disabled={subTotal === 0 ? true : false} className={subTotal === 0 ? "btn btn-block text-white disabled" : "btn btn-block text-white"} style={{ backgroundColor: 'rgb(102,102,102)' }} onClick={() => history.push('/checkout')}>Go to secure checkout</button>
    </div>
  )
}

export default withRouter(BagItems)
