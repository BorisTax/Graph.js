import React from 'react';
import "../Graph.css";
import LangToggleBar from './LangToggleBar';
import HelpButton from './HelpButton';
import User from './User';

export default class Header extends React.Component{
    render(){
        return <div className={"header"}>
            <LangToggleBar/> 
            <HelpButton/>
            <User/>
        </div>
    }
}