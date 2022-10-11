import {React, useState} from "react";
import styles from './DangNhap.module.css'
import images from '../../images/Final_logo.png'
import axios from "axios";
// import images from '../../images/background.jpg'
import { useNavigate } from "react-router-dom";
function DangKyChu() {
  const navigate = useNavigate();
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
     const [VaiTro, setvaitro] = useState("")
     const [ChiNhanh, setchinhanh] = useState("")
     const [Name, setName] = useState("")
   
     
     const [cn, setcn] = useState("")
    //Id for update record and Delete
    const [id,setId] = useState("");
    const [Delete,setDelete] = useState(false)
  const handleSubmite = () => {
    if(Password=="" && VaiTro=="" && Name=="")
    {
      alert("Vui long nhap thong tin")
    }else if(Password=="" || VaiTro=="" || Name==""){
      alert("Vui long nhap thong tin")
    }else{
      const url = 'http://localhost:5001/TaiKhoan'
    
      const Credentials = { Password,VaiTro,Name,ChiNhanh }
      axios.post(url, Credentials)
          .then(response => {
              const result = response.data;
              const { status, message, data } = result;
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
          navigate(`/NhanVien`);
    }
    
}
  return (
    <div className={styles.container} >
      {/* <img src={images} alt='images'/> */}
      <form>
        <div className={styles.formInner}>
          <h2>Tạo Tài Khoản</h2>

          <div className={styles.formGroup}>
            <label htmlFor="name">Tên đăng nhập</label>
            <input type="text" name="name" id="name"  onChange={(e) => setName(e.target.value)}/>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Mật khẩu</label>
            <input type="password" name="password" id="password" onChange={(e) => setpassword(e.target.value)}/>
          </div>
     
          
          <div className={styles.formGroup}>
            <label htmlFor="name">Chi nhánh</label>
            <input type="number" name="name" id="name" onChange={(e) => setchinhanh(e.target.value)} />
          </div>

          <div className={styles.formGroup}>
          <label htmlFor="name">Chức Vụ</label>
                <select id="input-group" onChange={(e) => setvaitro(e.target.value)}>
                <option value=""> -- </option>
                
                  <option value="QuanLy">QuanLy</option>

                </select>
           </div>     
          <input onClick={handleSubmite} type="submit" value="Tạo Tài Khoản" />
        </div>

        <div className={styles.images}>
          <img src={images} alt='images' style={{width:"150px",height:"150px" }}/>
          <h2>KHANH NHAT COMPANY</h2>
        </div>
      </form>

    </div>
  );
}

export default DangKyChu;
