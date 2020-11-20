import React, { useState, useEffect } from 'react'
import Axios from 'axios'

const Admindashboard = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    async function fetchData() {
      const res = await Axios.get('/api/orders/getorders')
      setData(res.data.data)
    }
    fetchData()
  }, [])

  return (<>

    {data?.length === 0 ? <h1 className='text-white text-center mt-5'>No Orders</h1> : <div className="container mt-5">
      <h3 className='text-warning'>Orders</h3>
      <div className="row">
        <div className="col-12">
          <table className="table table-bordered ">
            <thead>
              <tr>
                <th scope="col" className='text-white'>#</th>
                <th scope="col" className='text-center'><span className="text-white">Total</span></th>
                <th scope="col" className='text-center'><span className="text-white">Address</span></th>
                <th scope="col" className='text-center'><span className="text-white">Date</span></th>
                <th scope="col" className='text-center'><span className="text-white">Delivered</span></th>
              </tr>
            </thead>
            <tbody>
              {data.map((e) => {
                return <tr key={e.id}>
                  <th scope="row" className='text-white'>{e.id}</th>
                  <td className='text-white text-center'>${e.total}</td>
                  <td className='text-white text-center'>{e.address}</td>
                  <td className='text-white text-center'>{e.createdAt}</td>
                  <td className='text-white text-center'><button className={e.status === true ? 'btn btn-sm btn-success disabled' : 'btn btn-sm btn-danger'} onClick={async () => {
                    try {
                      await Axios.put(`/api/orders/updateorder?id=${e.id}`)
                      const res = await Axios.get('/api/orders/getorders')
                      setData(res.data.data)
                    } catch (e) {
                      //do nothing for now
                    }
                  }}>{e.status === true ? 'Yes' : 'No'}</button></td>
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


export default Admindashboard
