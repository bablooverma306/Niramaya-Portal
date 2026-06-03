import React, { useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../../redux/actions/userAction'
import { useParams } from 'react-router-dom'

const UserDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getUserDetails(id));
    }
  }, [dispatch, id]);

  const { user, image, appointments } = useSelector(state => state.user);

  return (
    <Layout>
      <div className='container'>
        
        {/* 🔥 USER DETAILS */}
        <div className='row d-flex align-items-center bg-light mt-3 p-3'>
          <h2 className='text-center mb-4'>User Details</h2>

          <div className='col-md-4 text-center'>
            {image ? (
              <img
                src={`data:image/jpeg;base64,${image}`}
                alt="user"
                height={200}
                width={300}
              />
            ) : (
              <p>No Image</p>
            )}
          </div>

          <div className='col-md-8'>
            <h5>NAME: {user?.name}</h5>
            <p>EMAIL: {user?.email}</p>
            <p>PHONE_NO: {user?.phone}</p>
            <p>ADDRESS: {user?.address}</p>
            <p>GENDER: {user?.gender}</p>
          </div>
        </div>

        {/* 🔥 APPOINTMENTS */}
        <div className='mt-4'>
          <h4 className='text-center'>All Appointments</h4>

          {appointments?.length === 0 && (
            <p className='text-center'>No Appointments Found</p>
          )}

          <table className='table mt-3'>
            <thead>
              <tr>
                <th>SN</th>
                <th>DOCTOR ID</th>
                <th>DATE</th>
                <th>TIME</th>
                <th>FEES</th>
                <th>PAYMENT</th>
                <th>STATUS</th>
              </tr>
            </thead>

            <tbody>
              {appointments?.map((a, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{a?.doctorId}</td>
                  <td>{a?.slotDate}</td>
                  <td>{a?.slotTime}</td>
                  <td>{a?.amount}</td>
              
               <td>{i === 0 ? 'Online' : 'Cash'}</td>
           <td>
                {a?.status === 'cencel' ? 'Cancelled' : a?.status}
            </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </Layout>
  )
}

export default UserDetails;