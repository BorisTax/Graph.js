import React from 'react';
import "../Graph.css";
import LangToggleBar from './LangToggleBar';
import HelpButton from './HelpButton';
import MySelf from './MySelf';

export default class Header extends React.Component{
    render(){
        return <div className={"header"}>
            <LangToggleBar/> 
            <HelpButton/>
            <MySelf/>
            
        </div>
    }
}