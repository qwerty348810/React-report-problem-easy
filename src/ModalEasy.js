import React from 'react';
import { useState } from 'react';




export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const ulStyle = {display: 'flex', flexWrap: 'wrap'};

  let refValue = React.createRef();
  let contentSend = React.createRef();
  let nameSend = React.createRef();

  const [activeIndex, setactiveIndex] = useState(true);
  const [activeButton, setactiveButton] = useState(0);
  const itemList2 = {
    'buttonArray': [
      { 'button_id': '111', 'button_label': 'Website' },
    ] 
  };
  const renderList = itemList2.buttonArray.map(
  (buttonArray, index) => 
  <button className="red-button" value={buttonArray.button_id} dataid={buttonArray.button_id} key={index} 
  onClick={() => {
    problemSend();
    setactiveButton(buttonArray.button_id); 
    handleOpen();
  }} 
  ref={refValue}>{buttonArray.button_label}
  </button>
  ).slice(0, 4);





  function commentSend(){
    var data = new FormData(); 
    data.append("token", "token");
    data.append("content", contentSend.current.value);
    data.append("name", nameSend.current.value);
    data.append("button_id", activeButton);
    fetch("dUrl+comUrl+com_serviceId", {
      method: "POST",
      body: data
    })
  }
  function problemSend(){
    var data = new FormData(); 
    data.append("token", "token");
      fetch("dUrl+pUrl+serviceId" + refValue.current.value, {
      method: "POST",
      body: data
    })
  }

  function ModalContent() {
    if(activeIndex){
    return (
      <>        
        <p>Thank You For Feedback!</p>
        <p>Want to leave a comment?</p>
        <textarea rows="7" className="modul-intup" placeholder="Write your comment here..." ref={contentSend}/>
        <input className="modul__form-control" type="text" placeholder="Your Name" ref={nameSend}></input>
        <button className="send-button" type="submit" onClick={() => {
          commentSend(); 
          setactiveIndex(false);
          }}>Send</button>
        <p className="comment-status__error"></p>
      </>
      );
    }  
  }
  function Thank() {
    if(activeIndex === false){
      return (
        <p>Thank You For Comment!</p>
      )
    }
  }
  
  return (
    <div style={ulStyle}>
        {renderList}
        <div className={`presentation-back ${open ? 'show' : 'close'}`} onClick={handleClose}></div>
        <section className={`modal-block ${open ? 'show' : 'hidden'}`}>
          <div className='modal-content'>
            <div className='modal-header'>
              <h2 className="modal-title">Report an issue</h2><button className='close-letter' onClick={handleClose}>+</button>
            </div> 
            <div className='modal-body'>

              <ModalContent /> 
              <Thank />

            </div>
            <div className='modal-footer'>
              <button className='close-button' onClick={handleClose}>Close</button>
            </div>  
          </div>
        </section>
    </div>
  );
  

}