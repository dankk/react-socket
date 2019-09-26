import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");
//const socket = io.connect("ec2-35-183-121-221.ca-central-1.compute.amazonaws.com:5000");

const sockJoinGroup = (userName, group) => {
    socket.emit("joinGroup", {user:userName, group:group});
}

const sockSendMessage = (userName, group, message) => {
    socket.emit("chatSend", {user:userName, group:group, message:message});
}

const sockRecieveMessage = ({setMessageLog}) => {
    socket.on("chatRecieve", (msg) => {
        setMessageLog(state => [...state, msg]);
    });
};

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export {sockSendMessage, sockRecieveMessage, sockJoinGroup}