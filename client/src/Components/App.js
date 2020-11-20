import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux'
import { addOrder } from '../actions/orderAction'
import Axios from 'axios';

const App = ({ addOrder }) => {
  const [quantity, setQuantity] = useState(1)
  const [size, setSize] = useState(1)
  const [data, setData] = useState([])
  const [addToCart, setAddToCart] = useState('btn btn-primary btn-sm ml-1')

  useEffect(() => {
    async function fetchdata() {
      try {
        const res = await Axios.get('/api/products/allproducts')
        setData(res.data.data)
      } catch (error) {
        //ignore for now
      }
    }
    fetchdata()
  }, [])


  return (<>

    <div className="row mt-5">
      <div className="col-12 mt-3"  >
        <div id="carouselExampleControls" className="carousel slide mt-4" data-ride="carousel">
          <div className="carousel-inner">
            {data.map((e, index) => {
              return <div key={e.id} className={index === 0 ? 'carousel-item active' : 'carousel-item'}>
                <div className="d-flex justify-content-center img-fluid2">
                  <img src={`/${e.path}`} className="d-block" width='450px' height='250px' alt={e.path} />
                  <div className='d-flex ml-3 flex-column align-items-start justify-content-center'>
                    <h1 className='text-white product_name_font' style={{ fontSize: '2rem' }}>{e.product_name}</h1>
                    <ul className='p-0 ' style={{ listStyle: 'none' }}>
                      <h6 className="lead text-white" style={{ lineHeight: 'normal' }}>Traditional toppings:</h6>
                      {e.topping.slice(1, e.topping.length - 1).split(',').map((a, index) => {
                        return <li key={index}><span className='text-white' >{a}</span></li>
                      })}
                      <div className="d-flex mt-3">
                        <li className='mr-1'>
                          <select className="custom-select-sm custom-select" id="inputGroupSelect03" aria-label="Example select with button addon" onChange={(e) => setSize(e.target.value)}>
                            <option value={1}>Small</option>
                            <option value={0.2}>Medium</option>
                            <option value={0.4}>Big</option>
                          </select>
                        </li>
                        <li><input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} min="1" className="quantity-field text-primary btn btn-sm " /></li>
                        <li><button disabled={quantity === '0' ? true : false} className={addToCart} style={{ width: '90px!important' }} onClick={() => {
                          if (quantity > 0) {
                            addOrder(
                              {
                                product_name: e.product_name,
                                price: e.price,
                                quantity,
                                id: e.id
                              }, size)
                            setAddToCart('btn btn-success btn-sm ml-1')
                            setTimeout(() => {
                              setAddToCart('btn btn-primary btn-sm ml-1')
                            }, 500)
                          }
                        }}>Add to cart</button></li>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
            })}

          </div>
          <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev" onClick={() => {
            setQuantity(1)
            setAddToCart('btn btn-primary btn-sm ml-1')
          }}>
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next" onClick={() => {
            setQuantity(1)
            setAddToCart('btn btn-primary btn-sm ml-1')
          }}>
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only" >Next</span>
          </a>
        </div>
      </div>
    </div>
  </>

  );
}

export default connect(null, { addOrder })(App);
