import React, {useState, useEffect, useRef} from 'react';
import logo from './logo.svg';
import './App.css';
import {sockSendMessage, sockRecieveMessage, sockJoinGroup} from './index.js';

function UserNameInput({setUserName, setStep}){
  const userInput = useRef(null);

  const doLogin = (e) => {
    if(e.key=="Enter"){
      e.preventDefault();
      if(!e.target.value) return;
      setStep(1);
    }
  }

  useEffect(() => {
    userInput.current.focus();
  }, []);

  return(
    <div>
      <input
        ref={userInput}
        type="text"
        id="userNameInput"
        placeholder="New User"
        onChange={e => setUserName(e.target.value)}
        onKeyDown={doLogin}
      >
      </input>
    </div>    
  )
}

function JoinGroupInput({user, setGroup, setStep}){
  const groupInput = useRef(null);

  const doSetGroup = (e) => {
    if(e.key=="Enter"){
      e.preventDefault();
      if(!e.target.value) return;
      setStep(2);
    }
  }

  useEffect(() => {
    groupInput.current.focus();
  }, []);

  return(
    <div>
      <input
        ref={groupInput}
        type="text"
        id="groupNameInput"
        placeholder="Group Name"
        onChange={e => setGroup(e.target.value)}
        onKeyDown={doSetGroup}
      >
      </input>
    </div>    
  )
}

function MessageInput({sendMessage}){
  const messageInput = useRef(null);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    if(e.key=="Enter"){
      e.preventDefault();
      if(!message) return;
      sendMessage(message);
      setMessage("");
    }
  }


  useEffect(() => {
    messageInput.current.focus();
  }, []);

  return(
    <div>
      <input
        ref={messageInput}
        type="text"
        id="messageInput"
        value={message}
        onKeyDown={handleSubmit}
        onChange={e => setMessage(e.target.value)}
      >
      </input>
    </div>
  )
}

function MessageLog({messageLog}){
  return(
    <div>
      {messageLog.map((m,i) => (
        <div className="message" key={i}>{m}</div>
      ))}
    </div>
  )
}

function App() {

  const [messageLog, setMessageLog] = useState([]);
  const [userName, setUserName] = useState('');
  const [step, setStep] = useState(0);
  const [group, setGroup] = useState('');

  const sendMessage = msg => {
    sockSendMessage(userName,group,msg);
  }

  useEffect(() => {
    sockRecieveMessage({setMessageLog});
  }, []);

  useEffect(() => {
    console.log(messageLog);
  }, [messageLog]);

  switch(step){
    case 0:
        return (
          <div className="App">
            LOGIN
            <UserNameInput setUserName={setUserName} setStep={setStep}/>
          </div>
        );
    case 1:
      return (
        <div className="App">
          JOIN GROUP
          <JoinGroupInput setGroup={setGroup} setStep={setStep}/>
        </div>        
      );
    case 2:
        sockJoinGroup(userName, group);
        return (
          <div className="App">
            CHAT
            <MessageInput sendMessage={sendMessage}/>
            <MessageLog messageLog={messageLog}/>
          </div>
        );      
  }
}

export default App;
