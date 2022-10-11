import React, { useState,useEffect } from 'react';
import { Button, Modal} from 'react-bootstrap'
import axios from "axios";
import styles from "./TaiKhoan.module.css"

import {useNavigate} from 'react-router-dom';
function NhanVien() {
  const navigate = useNavigate();
  const Tao = ()=>{
    navigate("/DangNhap")
  }

  const [isToggledd, setisToggledd] =useState(false);
  const [Data, setData] = useState([]);
  const [RowData, SetRowData] = useState([])

  const [ViewShow, SetViewShow] = useState(false)
  const handleViewShow = () => { SetViewShow(true) }
  const hanldeViewClose = () => { SetViewShow(false) }

    //FOr Delete Model
  const [ViewDelete, SetDeleteShow] = useState(false)
  const handleDeleteShow = () => { SetDeleteShow(true) }
  const hanldeDeleteClose = () => { SetDeleteShow(false) }
   //FOr Add New Data Model
   const [ViewPost, SetPostShow] = useState(false)
   const handlePostShow = () => { SetPostShow(true) }
   const hanldePostClose = () => { SetPostShow(false) }
  
  
     //Define here local state that store the form Data
     const [Password, setpassword] = useState("")
     const [Vaitro, setvaitro] = useState("")
     const [ChiNhanh, setchinhanh] = useState("")
     const [Name, setName] = useState("")
     
     const [cn, setcn] = useState("")
    //Id for update record and Delete
    const [id,setId] = useState("");
    const [Delete,setDelete] = useState(false)


  const Gettaikhoan = async () => {

    const url = `http://localhost:5001/TaiKhoan/`
    axios.get(url)
              .then(response => {
                  const result = response.data;
                  const { status, message, data } = result;
                  if (status !== 'SUCCESS') {
                      alert(message, status)
                  }
                  else {
                      setData(data)
                      console.log(data)
                  }
              })
              .catch(err => {
                  console.log(err)
              })
            }

            const handleDelete = () =>{
              const url = `http://localhost:5001/TaiKhoan/${id}`
              axios.delete(url)
                  .then(response => {
                      const result = response.data;
                      const { status, message } = result;
                      if (status !== 'SUCCESS') {
                          alert(message, status)
                      }
                      else {
                          alert(message)
                          window.location.reload()
                      }
                  })
                  .catch(err => {
                      console.log(err)
                  })
          }

          useEffect(() => {
            Gettaikhoan();
        }, [])   

      
            

  return (
    
    <div>
      
      <div className='row'>
                <div className='mt-5 mb-4'>
                    <Button variant='primary' onClick={() => {navigate("/DangKyChu")}}><i className='fa fa-plu'></i>
                        Tạo tài khoản
                    </Button>
                </div>
            </div>
            <div className='row'>
                <div className='table-responsive'>
                    <table className='table table-striped table-hover table-bordered'>
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Password</th>
                                <th>Vai trò</th>
                                <th> Chi nhánh </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Data.map((item) =>
                                <tr key={item._id}>
                                    <td>{item.Name}</td>
                                    <td>{item.Password}</td>
                                    <td>{item.VaiTro}</td>
                                    <td>{item.ChiNhanh}</td>
                                    <td style={{ minWidth: 190 }}>
                                        <Button size='sm' variant='danger' onClick={()=>{handleDelete(setId(item._id))}}>Delete</Button>|
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>      
      
    </div>
  );
}

export default NhanVien;