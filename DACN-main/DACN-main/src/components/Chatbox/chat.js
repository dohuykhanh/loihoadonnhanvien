import React, {useEffect, useState} from 'react';
import styles from '../../components/Chatbox/chatbox.module.css'
import { Button, Modal} from 'react-bootstrap'
import axios from "axios";
function chat() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [Data, setData] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [TinhNhan, setTinNhan] = useState([]);
 // eslint-disable-next-line react-hooks/rules-of-hooks

  const Getvattu = async () => {

    const url = `http://localhost:5001/TinNhan`
    axios.get(url)
              .then(response => {
                  const result = response.data;
                  const { status, message, data } = result;
                  if (status !== 'SUCCESS') {
                     
                  }
                  else {
                      setData(data)
                     
                  }
              })
              .catch(err => {
                  console.log(err)
              })
            }
            var NguoiNhan= localStorage.getItem("NguoiNhanTin");

            const handleSubmite = () => {
              const url = 'http://localhost:5001/TinNhan'
              
              const Credentials = { TinhNhan, NguoiNhan }
              axios.post(url, Credentials)
                  .then(response => {
                      const result = response.data;
                      const { status, message, data } = result;
                      if (status !== 'SUCCESS') {
                          
                      }
                      else {
                         
                          window.location.reload()
                      }
                  })
                  .catch(err => {
                      console.log(err)
                  })
          }

 // eslint-disable-next-line react-hooks/rules-of-hooks
          useEffect(() => {
            Getvattu();
        }, [])
         // eslint-disable-next-line react-hooks/rules-of-hooks


  return (
    <div className={styles.chat}>
        {/* <div className={styles.chatbox}>
        <div className='form-group'>
           
        </div>
        
        </div> */}
        
        <div className="messages">
                            {Data.map((item) =>
                                <tr key={item._id}>
                                  <div>Người nhắn là: {item.NguoiNhan}</div>
                                    <div>{item.TinhNhan}</div>
                                    
                                    </tr>
                            )}
                            </div>
                        
        <div className={styles.tinnhan}>
          <form>
        <input type="text" className='form-control'onChange={(e) => setTinNhan(e.target.value)}/>
        <button  onClick={handleSubmite}>🕊️</button>
        </form>
        {/* <input type="text" className='form-control'onChange={(e) => setTinNhan(e.target.value)}/> */}
        </div>


        {/* {kho && <Button size='sm' variant='primary' onClick={() => {handleclickgiohang(item); handleclickgiohangbd(item) }}>Chuyển</Button>}
         */}
    </div>
  );
}

export default chat;
