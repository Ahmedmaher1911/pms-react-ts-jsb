import './UserList.css'
import { useEffect, useState } from 'react'
import { axiosInstance, USER_URL } from '../../../../services/EndPoints'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { OrbitProgress } from 'react-loading-indicators';

interface userData {
  id: number,
  userName: string,
  isActivated: boolean,
  email: string,
  country: string,
  phoneNumber: string
}

export default function UserList() {
  const [usersList, setUsersList] = useState([])
  const [pageNumber, setPageNumber] = useState([])
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [load, setLoad] = useState(true)

  const getUsers = async (pageSize?: number, pageNumber?: number) => {
    try {
      const res = await axiosInstance.get(USER_URL.GET_USERS, 
        {params: {pageSize: pageSize, pageNumber: pageNumber  }})
      console.log(res);
      setUsersList(res?.data?.data)
      setLoad(false)
      setPageNumber(Array(res?.data?.totalNumberOfPages).fill().map((_, i) => i+1))  
    } catch (error) {
      console.log(error);
    }
  }

  const toggleUser = async (id: number) => {
    try {
      const res = await axiosInstance.put(USER_URL.TOGGEL_USER(id))
      console.log(res);
      getUsers()
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(() => {
    getUsers(20, 1)
  }, [])

  return (
    <div className="users-container" onClick={() => {
      if (activeMenuId) setActiveMenuId(null)
    }}>
      <div className="users-title">
        <h1>Users</h1>
      </div>
      <div className='users-list p-5'>
        <table>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Status</th>
              <th>Email</th>
              <th>Country</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>

          {load && <td className='py-5 text-center' colSpan={6}><OrbitProgress color="#32cd32" size="medium" text="" textColor="" /></td>}

          {load ? '' : usersList.length > 0 ? <tbody>
            {usersList.map((user: userData, index) => {
              return  <tr key={index}>
                        <td>{user?.userName}</td>
                        <td>{user?.isActivated ? <span className='bg-success text-white rounded-5' style={{padding: '10px 25px'}}>active</span> : <span className='bg-danger text-white rounded-5' style={{padding: '10px 25px'}}>not active</span>}</td>
                        <td>{user?.email}</td>
                        <td>{user?.country}</td>
                        <td>{user?.phoneNumber}</td>
                        <td className='action'>
                            <button onClick={() => setActiveMenuId(prevId => (prevId === user?.id ? null : user?.id))}>
                              <i style={{cursor:"pointer"}} className="fa-solid fa-ellipsis"></i>
                            </button>
                            <ul className={`menu ${activeMenuId === user?.id ? 'show' : ''}`}>
                              <li>
                                <button onClick={() => toggleUser(user?.id)}>
                                  Block
                                </button>
                              </li>
                              <li>
                                <button onClick={() => toggleUser(user?.id)}>
                                   non Block
                                </button>
                              </li>
                              <li>
                                <button>
                                  <i title='View' className="fa-solid fa-eye text-success"></i> View
                                </button>
                              </li>
                            </ul>
                          </td>
                      </tr>
            })}
          </tbody> : <tbody>
                            <tr>
                              <td colSpan={6}><h1 className='my-5 text-center'>No Data ....</h1></td>
                            </tr>
                          </tbody>}
          
        </table>
        <div className='d-flex justify-content-end mt-5'>
          <Stack spacing={4}>
            <Pagination count={pageNumber.length} variant="outlined" shape="rounded" />
          </Stack>
        </div>
      </div>
    </div>
  )
}
