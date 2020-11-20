import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { connect } from 'react-redux'

const Orders = ({ user }) => {
  const [data, setData] = useState([])
  useEffect(() => {
    async function fetchData() {
      const res = await Axios.get(`/api/orders/getorders?id=${user.user?.id}`)
      setData(res.data.data)
    }
    fetchData()
  }, [])

  return (
    <>
      {data.length === 0 ? <h1 className="text-white text-center mt-5">No orders</h1> : <div className="container mt-5">
        <h3 className='text-warning'>Orders</h3>
        <div className="row">
          <div className="col-12">
            <table className="table table-bordered ">
              <thead>
                <tr>
                  <th scope="col" className='text-white'>#</th>
                  <th scope="col" className='text-center'><span className="text-white">Total</span></th>
                  <th scope="col" className='text-center'><span className="text-white">Date ordered</span></th>
                  <th scope="col" className='text-center'><span className="text-white">Status</span></th>
                </tr>
              </thead>
              <tbody>

                {data.map((e) => {
                  return <tr key={e.id}>
                    <th scope="row" className='text-white'>{e.id}</th>
                    <td className='text-white text-center'>${e.total}</td>
                    <td className='text-white text-center'>{e.createdAt}</td>
                    <td className='text-white text-center'>{e.status === false ? 'Not sent yet' : 'Delivered'}</td>
                  </tr>
                })}

              </tbody>
            </table>
          </div>
        </div>
      </div>}
    </>
  )
}
const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(Orders)
