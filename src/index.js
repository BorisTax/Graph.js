import React from 'react';
import ReactDOM from 'react-dom';
import GeomEditor from './GeomEditor';
import 'normalize.css';
import './Graph.css';
import './Buttons.css';
import './icons.css';
import './Shapes.css';
ReactDOM.render(
    <GeomEditor/>
    ,
    document.getElementById('root'));

function copy(){
        function clone(obj){
            const newObj={}
            for(const prop in obj){
                if(prop==='copy') continue;
                let cloneProp;
                if(typeof obj[prop] === 'object') cloneProp=clone(obj[prop]); else cloneProp=obj[prop];
                newObj[prop]=cloneProp;
                }
            return newObj;
        }
    return clone(this);
    }
// eslint-disable-next-line
Object.defineProperty(Object.prototype,'copy',{value:copy,enumerable:false});
// eslint-disable-next-line
Number.prototype.round4=function(){return Math.round(this*10000)/10000}