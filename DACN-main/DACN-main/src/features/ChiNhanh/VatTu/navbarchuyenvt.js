
import  './navbarchuyenvt.css'


import React, {useEffect, useState} from 'react';
import { Button, Modal} from 'react-bootstrap'
import axios from "axios";
import moment from 'moment';

import DieuHuong from "../../../components/DieuHuong/Dieuhuong"
// import BanHang from './BanHang'
// import Cart from './cart'
import VatTu from './VatTu'
import PhieuChuyen from './PhieuChuyen'
import ThongBaoChuyen from './ThongBaoChuyen'



const Navbarchuyenvt = () => {

  const phanquyen = localStorage.getItem("Vaitro")
  console.log("phanquya", phanquyen);
  var b=JSON.stringify(phanquyen);
  var k ="QuanLy"
  var Xep=true;
  var li=false
  if(phanquyen==="QuanLyKho"){
    Xep=false;
    li=true;
  }



  const [Data, setData] = useState([]);
  const [Dataa, setDataa] = useState([]);
  const [show, setshow]=useState(true);
  const [showw, setshoww]=useState(false);
  const [showww, setshowww]=useState(false);
  const [cart, setCart]=useState([]);
  const [isToggledd, setisToggledd] =useState(false);
  const [bandau, setbandau] = useState([]);
  const [blockham, setblockham] = useState(true);




  const Getvattuu = async () => {

    const url = `http://localhost:5001/VatTu/c/${Tenchinhanh}`
    axios.get(url)
              .then(response => {
                  const result = response.data;
                  const { status, message, data } = result;
                  if (status !== 'SUCCESS') {
                      alert(message, status)
                  }
                  else {
                      setDataa(data)
                      console.log(data)
                  }
              })
              .catch(err => {
                  console.log(err)
              })
            }





  const Getvattu = async () => {
  
    const url = `http://localhost:5001/PhieuChuyen/c/${Tenchinhanh}`
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
                      // setData1(Data[0].SanPham)
                      
                      // console.log("dataaaa1",Data1)
                  }
              })
              .catch(err => {
                  console.log(err)
              })
            }



            // const laybandau = () => {
            //   //   hoadon.push(item);
            //   //   handleEditShow();
            //   // console.log("bien carrt", cart)
            //   for(let i = 0; i < cart.length; i++) {
            //     bandau.push(cart[i]);
                
            //   }
            
              
             
            
            // }



var Tenchinhanh= localStorage.getItem("TenChiNhanh");
console.log("chinhanh",Tenchinhanh);
var ChiNhanh=Tenchinhanh;

var blockboss = true;
if(Tenchinhanh==0){
  blockboss = false
}

const Hovernut = ()=>{
  setisToggledd(true);
}
const TatHovernut = ()=>{
  setisToggledd(false);
}

var nhatt = true;
if(Tenchinhanh==0){
  nhatt= false;
}


const handleclickgiohang = (item ) => {
  
  if (cart.indexOf(item) !== -1) return;
  setCart([...cart, item]);
  

  
 
};

// const handleclickgiohangbd = () => {
//   console.log("vaohambd")
  
//     // bandau.push(itemm)
//     // console.log("itemm", itemm)
//     // console.log("bandaubennav", bandau)
//     setbandau([...cart])
  
//     console.log("ko nhap nua")
//     console.log("bandaubennav", bandau)
  

  
  
// }


const handleChange = (item, d) => {
  const ind = cart.indexOf(item);
  const arr = cart;
  let soluongmax= 0;
 

  for(let i = 0; i < Dataa.length; i++){
    if(Dataa[i]._id===item._id){
      soluongmax=Dataa[i].SoLuong
    }
  }
  console.log("timthayko",soluongmax);
  arr[ind].SoLuong = arr[ind].SoLuong + d;

  if (arr[ind].SoLuong >= soluongmax) arr[ind].SoLuong = soluongmax;
  setCart([...arr]);



  if (arr[ind].SoLuong === 0) arr[ind].SoLuong = 1;
  setCart([...arr]);
};




useEffect(() => {
  Getvattu();
  Getvattuu();
}, [])


  return (
    <div>
    <nav>
      <div className="nav_box">
      {blockboss &&<button style={{position:'relative',right:"120px"}} onClick={() => TatHovernut() }><i style={{color:"Azure"}} class="fa fa-arrow-circle-left"></i></button>}
      {blockboss &&<button style={{position:'relative',right:"160px"}} onClick={() =>Hovernut() }><i style={{color:"Azure"}} class="fa fa-arrow-circle-right"></i></button>}
      {nhatt && <h1 style={{color:"Azure"}}> <b><i>Chào Mừng Đến Chi Nhánh: {Tenchinhanh}</i></b> </h1>}
      {Xep &&
      <section>
      {isToggledd && <DieuHuong/>}
      </section>}
        <span className="my_shop" onClick={() => setshow(true, setshoww(false), setshowww(false))}>
          sanpham
        </span>

        {li &&
        <div className="cart" onClick={() => {setshow(false); setshoww(false); setshowww(true); setblockham(false)}}>
          <span>
            <i className="fa fa-bell"></i>
          </span>
          <span>{cart.length}</span>
        </div>

}

{Xep &&
        <div className="cart" onClick={() => setshoww(true,setshow(false), setshowww(false))}>
          <span>
            <i className="fa fa-bell"></i>
          </span>
          <span>{Data.length}</span>
        </div>
}
      </div>
    </nav>
    {show && <VatTu handleclickgiohang={handleclickgiohang}  />}

      {showww && <PhieuChuyen bandau={bandau} setbandau={setbandau} cart={cart} setCart={setCart} handleChange={handleChange} />}
      {showw && <ThongBaoChuyen Data={Data} setData={setData} />}
    </div>
  );
};

export default Navbarchuyenvt;