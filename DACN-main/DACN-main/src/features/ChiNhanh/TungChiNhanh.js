import React,  { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap'
import axios from "axios";
import styles from "./TungChiNhanh.module.css"
import DieuHuong from "../../components/DieuHuong/Dieuhuong"
import { useNavigate } from "react-router-dom";


// import {isToggled} from'../../features/ChiNhanh/ChiNhanh'
const TungChiNhanh = () => {


    const navigate = useNavigate();
  const [isToggledd, setisToggledd] =useState(false);
  
//   const [Chitiethoadon, setChitiethoadon]= useState([]);
  
  const [Data, setData] = useState([]);
  const [RowData, SetRowData] = useState([])

  const [ViewShow, SetViewShow] = useState(false)

 


  const hanldeViewClose = () => { SetViewShow(false) }
  //FOr Edit Model
  const [ViewEdit, SetEditShow] = useState(false)
  const handleEditShow = () => { SetEditShow(true) }
  const hanldeEditClose = () => { SetEditShow(false) }
  //FOr Move Model
  const [ViewMove, SetMoveShow] = useState(false)
  const handleMoveShow = () => { SetMoveShow(true) }
  const hanldeMoveClose = () => { SetMoveShow(false) }
  //FOr Delete Model
  const [ViewDelete, SetDeleteShow] = useState(false)
  const handleDeleteShow = () => { SetDeleteShow(true) }
  const hanldeDeleteClose = () => { SetDeleteShow(false) }
  //FOr Add New Data Model
  const [ViewPost, SetPostShow] = useState(false)
  const handlePostShow = () => { SetPostShow(true) }
  const hanldePostClose = () => { SetPostShow(false) }

  //Define here local state that store the form Data
  const [hoten, sethoten] = useState("")
  const [sdt, setsdt] = useState("")
  const [cn, setcn] = useState("")
  const [hoadoncua, sethoadoncua] = useState("")


//   let hoadoncua;
//   const sethoadoncua = (item)=> {
//      hoadoncua=item;
//   }

  //Id for update record and Delete
  const [id,setId] = useState("");
  const [idtb,setidtb] = useState("");
  const [Delete,setDelete] = useState(false)
// const [Manggop, setManggop]= useState([])
const [Manghoadon, setManghoadon]= useState([])


var Chitiethoadon=[];
const setChitiethoadon = (item)=> {
    Chitiethoadon.push(item);
}



var Manggop=[]

  var Tenchinhanh= localStorage.getItem("TenChiNhanh");
  console.log("chinhanh",Tenchinhanh)
  var ChiNhanh=Tenchinhanh;


  const Getallhoadon = async () => {

    const url = `http://localhost:5001/HoaDon`
    axios.get(url)
              .then(response => {
                  const result = response.data;
                  const { status, message, data } = result;
                  if (status !== 'SUCCESS') {
                      alert(message, status)
                  }
                  else {
                    setManghoadon(data)
                      console.log(data)
                  }
              })
              .catch(err => {
                  console.log(err)
              })
            }





            const Getallchitiethoadon = async () => {
              
                const url = `http://localhost:5001/HoaDon/h/${hoadoncua}`
                axios.get(url)
                          .then(response => {
                              const result = response.data;
                              const { status, message, data } = result;
                              if (status !== 'SUCCESS') {
                                  alert(message, status)
                              }
                              else {
                                setChitiethoadon(data)
                                  console.log("choa em a dugn day tu chiu 55555",Chitiethoadon)
                                  Chitiethoadon.map(x =>x.map(y=> console.log("y la sdfd", y)))
                              }
                          })
                          .catch(err => {
                              console.log(err)
                          })

                        
                        }


  const Getnhanvien = async () => {

  const url = `http://localhost:5001/Nhanvien/c/${Tenchinhanh}`
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
          let IDnguoibanhang;
          let soluonghoadon = 0;
          const hamgopmang = () => {
            // bandau.push(itemm)
            //
            
            for(let i=0; i<Data.length; i++) {
               

                // if (Manggop.indexOf(Data) !== -1) return;
                // setManggop({
                //     // ChiNhanh: item.ChiNhanh,
                //     // Gia: item.Gia,
                //     // NgayHetHan: item.NgayHetHan,
                //     // NgaySanXuat: item.NgaySanXuat,
                //     // SoLuong: item.SoLuong,
                //     // TenVatTu: item.TenVatTu,
                //     // _id: Data[i]._id,
                //     // hoten: Data[i].hoten, 
                //     // sdt: Data[i].sdt,
                //     ChiNhanh: Data[i].ChiNhanh,
                //     SoLuongHD: 0
                
                // })
                let itemm={
                    _id: Data[i]._id,
                    hoten: Data[i].hoten, 
                    sdt: Data[i].sdt,
                    ChiNhanh: Data[i].ChiNhanh,
                        SoLuongHD: soluonghoadon,
                        IDnguoibanhang: IDnguoibanhang
                }
                Manggop.push(itemm)

                
        
                }


                for(let i=0; i<Data.length; i++) {
                for(let j=0; j< Manghoadon.length;j++){
                    let bienid=Data[i]._id;
                    let bienbienid= bienid.toString();
                    console.log("kiem tra gia tri id", bienid);
                    console.log("kiem tra gia tri id mang hoa don",Manghoadon[j].NguoiBan
                    );
                    if(Data[i]._id===Manghoadon[j].NguoiBan                        ){
                        console.log("xinchao mn");
                        soluonghoadon+=1;
                        Manggop[i].SoLuongHD= soluonghoadon;
                        Manggop[i].IDnguoibanhang =Manghoadon[j].NguoiBan;
                       
                    }
                              
                }
                
            }
            // setManggop([...Manggop,{
            //   ChiNhanh: item.ChiNhanh,
            //   Gia: item.Gia,
            //   NgayHetHan: item.NgayHetHan,
            //   NgaySanXuat: item.NgaySanXuat,
            //   SoLuong: item.SoLuong,
            //   TenVatTu: item.TenVatTu,
            //   _id: item._id,}])
            //   //
            // console.log("itemm", item)
            // console.log("bandaubennav", bandau)
            // console.log("2");
            console.log("mang da gop ", Manggop)
            // Getallchitiethoadon();
          }
          hamgopmang();


          const handleSubmite = () => {
            const url = 'http://localhost:5001/Nhanvien'
            if(hoten=="" && sdt==""&& ChiNhanh==""){
                alert("Vui lòng nhập đầy đủ thông tin");
            }
            else if(hoten=="" || sdt=="" || ChiNhanh==""){
                alert("Vui lòng nhập đầy đủ thông tin");
            }else{
                
                const Credentials = { hoten, sdt, ChiNhanh }
                axios.post(url, Credentials)
                    .then(response => {
                        const result = response.data;
                        const { status, message, data } = result;
                        localStorage.setItem("Chutk",  result.data._id)
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
                    navigate(`/DangKy`);
            }
        }

        const handleEdit = () =>{
            const url = `http://localhost:5001/Nhanvien/${id}`
            console.log('ten sdt', RowData.sdt)
            if(sdt===""){
                setsdt(RowData.sdt)
                console.log('dohuyykhanh')
                console.log('ten sdt', sdt)
            }
            if(hoten===""){
                sethoten(RowData.hoten)
            }
            const Credentials = { hoten, sdt, ChiNhanh }
            axios.put(url, Credentials)
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

        const handleViewShow = () => { 
            // console.log("choa em a dugn day tu chiu 0000", hoadoncua)
            // Getallchitiethoadon(hoadoncua);
            // if(Chitiethoadon!=null){
                SetViewShow(true);
            //     console.log("choa em a dugn day tu chiu 99",Chitiethoadon)
            // }
            // console.log("choa em a dugn day tu chiu 666",Chitiethoadon)
            
            
        
        
        }

      //handle Delete Function 
      const handleDeletetk = () =>{
    
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

       
         //handle Delete Function 
         const handleDelete = () =>{
            const url = `http://localhost:5001/Nhanvien/${id}`
            axios.delete(url)
                .then(response => {
                    const result = response.data;
                    const { status, message } = result;
                    handleDeletetk();
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








    // const handleMove = () =>{
    //     const url = `http://localhost:5001/Nhanvien/${id}`
    //     ChiNhanh = cn
    //     const Credentials = {ChiNhanh }
    //     axios.put(url, Credentials)
    //         .then(response => {
    //             const result = response.data;
    //             const { status, message } = result;
    //             if (status !== 'SUCCESS') {
    //                 alert(message, status)
    //             }
    //             else {
    //                 alert(message)
    //                 window.location.reload()
    //             }
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }
    const YeuCau="Chuyển Nhân Viên";
    const handleMove = () =>{
        ChiNhanh = cn
        const url = 'http://localhost:5001/ThongBao'
        const Credentials = { YeuCau,hoten, sdt, ChiNhanh, idtb}
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
    }


    useEffect(() => {
            Getnhanvien();
            Getallhoadon();
            hamgopmang();
            // Getallchitiethoadon();
        }, [])
  
  const Hovernut = ()=>{
    setisToggledd(true);
  }
  const TatHovernut = ()=>{
    setisToggledd(false);
  }
  
  var Xep=true;
  return (
    <div>
      
      <nav>
      <div className="nav_box">
      
      {Xep &&<button style={{position:'relative',right:"120px"}}  onClick={() => TatHovernut()}><i style={{color:"Azure"}} class="fa fa-arrow-circle-left"></i></button>}
      {Xep &&<button style={{position:'relative',right:"240px"}}  onClick={() => Hovernut()}><i style={{color:"Azure"}} class="fa fa-arrow-circle-right"></i></button>}
      <h1 style={{color:"Azure"}} > <b><i>Chào Mừng Đến Chi Nhánh: {Tenchinhanh}</i></b> </h1>
      <div className={styles.fixDieuHuong}>
      {Xep &&
      <section>
      {isToggledd && <DieuHuong/>}
      </section>}
      </div>
      </div>
     
    </nav>

      <div>
            <div className='row'>
                <div className='mt-5 mb-4'>
                    <Button variant='primary' onClick={() => { handlePostShow() }}><i className='fa fa-plu'></i>
                        Thêm Nhân Viên
                    </Button>
                </div>
            </div>
            <div className='row'>
                <div className='table-responsive'>
                    <table className='table table-striped table-hover table-bordered'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>SDT</th>
                                <th>So luong hd</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Manggop.map((item) =>
                                <tr key={item._id}>
                                    <td>{item.hoten}</td>
                                    <td>{item.sdt}</td>
                                    <td>{item.SoLuongHD}</td>
                                    <td>{item.IDnguoibanhang}</td>
                                    <td style={{ minWidth: 190 }}>
                                        <Button size='sm' variant='primary' onClick={() => { handleViewShow(SetRowData(item),sethoadoncua(item.IDnguoibanhang)) }}>View</Button>|
                                        <Button size='sm' variant='warning' onClick={()=> {handleEditShow(SetRowData(item),setsdt(item.sdt),sethoten(item.hoten),setId(item._id))}}>Edit</Button>|
                                        <Button size='sm' variant='danger' onClick={() => {handleViewShow(SetRowData(item),setId(item._id), setDelete(true))}}>Delete</Button>|
                                        <Button size='sm' variant='warning' onClick={()=> {handleMoveShow(SetRowData(item),setId(item._id),setsdt(item.sdt),sethoten(item.hoten),setidtb(item._id))}}>Move-To</Button>|
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>



                    
                </div>
            </div>

             {/* View Modal */}
             <div className='model-box-view'>
                <Modal
                    show={ViewShow}
                    onHide={hanldeViewClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>View Employee Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                        <Button size='sm' variant='primary' onClick={Getallchitiethoadon}>Xem</Button>|
                        <div className='row'>
                                <div className='table-responsive'>
                                    <table className='table table-striped table-hover table-bordered'>
                                        {/* <thead>
                                        <tr>
                                <th>Tên vật tư</th>
                                <th>số lượng</th>
                               
                                <th>Giá</th>
                            </tr>
                                        </thead> */}
                                        <tbody>
                                        {Chitiethoadon.map((item) => item.map((it)=> it.map((itt)=>itt.map((khanh)=>
                            <tr key={khanh._id}>
                            {/* <td>{i.TenVatTu}</td>
                             <td>{i.SoLuong}</td> */}
                           
                             <td>{khanh.Gia}</td>
                            
                            
                         </tr>
                         
                            
                            
                            ))))}


                                        </tbody>
                                    </table>
                                 </div>
                            </div>









                            {/* <div className='form-group'>
                                <input type="text" className='form-control' value={RowData.hoten} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="email" className='form-control' value={RowData.sdt} readOnly />
                            </div> */}
                            {
                                Delete && (
                                    <Button type='submit' className='btn btn-danger mt-4' onClick={handleDelete}>Delete Employee</Button>
                                )
                            }



{/* {Chitiethoadon.map((it) => 
                       
                            
                            
                      <div>sdfds</div>
                         
                            )
                            
                            } */}

                        </div>


                        {/* <div className='row'>
                                <div className='table-responsive'>
                        <table className='table table-striped table-hover table-bordered'>
                        <thead>
                            <tr>
                                <th>Tên vật tư</th>
                                <th>số lượng</th>
                               
                                <th>Giá</th>
                            </tr>
                        </thead>
                        <tbody>
{Chitiethoadon.map((item) => item.map((it)=>
                            <tr key={it._id}>
                            <td>{it.TenVatTu}</td>
                             <td>{it.SoLuong}</td>
                           
                             <td>{it.Gia}</td>
                            
                            
                         </tr>
                         
                            )
                            
                            )}
                            </tbody>
                            </table>
                            </div>
                            </div> */}






                            



{/* {Chitiethoadon.map((item) => item.map((it)=>
                            <tr key={it._id}>
                            <td>{it.TenVatTu}</td>
                             <td>{it.SoLuong}</td>
                           
                             <td>{it.Gia}</td>
                            
                            
                         </tr>
                         
                            )
                            
                            )} */}
                           
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={() => {hanldeViewClose(setDelete(false))}}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>

             {/* Modal for submit data to database */}
             <div className='model-box-view'>
                <Modal
                    show={ViewPost}
                    onHide={hanldePostClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add new Employee</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <input type="text" className='form-control' onChange={(e) => sethoten(e.target.value)} placeholder="Please enter Name" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="email" className='form-control' onChange={(e) => setsdt(e.target.value)} placeholder="Please enter phone number" />
                            </div>
                            <Button type='submit' className='btn btn-success mt-4' onClick={handleSubmite}>Bước tiếp theo</Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldePostClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>

            
                    {/* Modal for Edit employee record */}
                    <div className='model-box-view'>
                <Modal
                    show={ViewEdit}
                    onHide={hanldeEditClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Employee</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <label>Name</label>
                                <input type="text" className='form-control' onChange={(e) => sethoten(e.target.value)} placeholder="Please enter Name" defaultValue={hoten}/>
                            </div>
                            <div className='form-group mt-3'>
                                <label>SDT</label>
                                <input type="email" className='form-control' onChange={(e) => setsdt(e.target.value)} placeholder="Please enter phone number" defaultValue={sdt} />
                                
                            </div>
                            <Button type='submit' className='btn btn-warning mt-4' onClick={handleEdit}>Edit Employee</Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldeEditClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>



             {/* Modal for Move employee record */}
             <div className='model-box-view'>
                <Modal
                    show={ViewMove}
                    onHide={hanldeMoveClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Move Employee To</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                        <div className='form-group'>
                                <label>Name</label>
                                <input type="text" className='form-control' onChange={(e) => sethoten(e.target.value)} placeholder="Please enter Name" defaultValue={hoten}/>
                            </div>
                            <div className='form-group mt-3'>
                                <label>SDT</label>
                                <input type="email" className='form-control' onChange={(e) => setsdt(e.target.value)} placeholder="Please enter phone number" defaultValue={sdt} />
                                
                            </div>
                            <div className='form-group'>
                                <label>Chi Nhánh</label>
                                <input type="text" className='form-control' onChange={(e) => setcn(e.target.value)} placeholder="Please enter"/>
                            </div>
                            <Button type='submit' className='btn btn-warning mt-4' onClick={handleMove}>Move Employee</Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldeEditClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>



            </div>
      
      {/* <a>Code Chuc nang</a> */}
    </div>
  );
}

export default TungChiNhanh;
