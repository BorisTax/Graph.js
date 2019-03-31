import React from 'react';
import "../App.css";
import LangToggleBar from './LangToggleBar';

export default class Header extends React.Component{
    render(){
        return <div className={"header"}>
            <LangToggleBar/>           
        </div>
    }
}