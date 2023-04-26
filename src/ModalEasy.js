import React from 'react';
import { useState } from 'react';




export default function BasicModal() {
  let phraseClose = "phraseClose";
  let phraseIssue = "phraseIssue";
  let phraseThankFeed = "phraseThankFeed";
  let phraseThankCom = "phraseThankCom";
  let phraseWrite = "phraseWrite";
  let phraseName = "phraseName";
  let phraseWantCom = "phraseWantCom";
  let phraseSend = "phraseSend";
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
        <p>{phraseThankFeed}</p>
        <p>{phraseWantCom}</p>
        <textarea rows="7" className="modul-intup" placeholder={phraseWrite} ref={contentSend}/>
        <input className="modul__form-control" type="text" placeholder={phraseName} ref={nameSend}></input>
        <button className="send-button" type="submit" onClick={() => {
          commentSend(); 
          setactiveIndex(false);
          }}>{phraseSend}</button>
        <p className="comment-status__error"></p>
      </>
      );
    }  
  }
  function Thank() {
    if(activeIndex === false){
      return (
        <p>{phraseThankCom}</p>
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
              <h2 className="modal-title">{phraseIssue}</h2><button className='close-letter' onClick={handleClose}>+</button>
            </div> 
            <div className='modal-body'>

              <ModalContent /> 
              <Thank />

            </div>
            <div className='modal-footer'>
              <button className='close-button' onClick={handleClose}>{phraseClose}</button>
            </div>  
          </div>
        </section>
    </div>
  );
  

}