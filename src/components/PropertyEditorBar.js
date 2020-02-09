import React from 'react';
import {connect} from 'react-redux';
import '../Graph.css';
import {setProperty} from '../actions/ShapeActions'
import PropertyField from './PropertyField';
import PropertyMultField from './PropertyMultField';
import PropertyEditButtonsBar from './PropertyEditButtonsBar';
import { ScreenActions } from '../actions/ScreenActions';
class PropertyEditorBar extends React.Component{
    prop;
    shape;
    setProperty(k,v){
        this.props.setProperty({key:k,value:v});
        }
    setActivePoint(key){
        this.shape.setActivePoint(key);
        this.props.repaint();
    }
    render(){
        const shapes=this.props.screen.selectedShapes;
        let propElements=[];
        let shapeTitle;
        if(shapes.length===1){
            this.shape=shapes[0];
            this.prop=shapes[0].getProperties();
            let shapeType=this.prop.get('Title').value;
            shapeTitle=this.props.captions.shapes[shapeType].Title;
            for(let key of this.prop.keys()){
                if(key!=='Title')propElements.push(typeof this.prop.get(key).value==='object'?<PropertyMultField
                                                     key={key}
                                                     propKey={key}
                                                     id={key}
                                                     label={this.props.captions.shapes[shapeType][key]} 
                                                     value={this.prop.get(key).value}
                                                     regexp={this.prop.get(key).regexp}
                                                     picker={this.prop.get(key).picker}
                                                     setProperty={this.setProperty.bind(this)}
                                                     setActivePoint={this.setActivePoint.bind(this)}  />:
                                                     <PropertyField 
                                                     key={key}
                                                     propKey={key}
                                                     id={key}
                                                     label={this.props.captions.shapes[shapeType][key]} 
                                                     value={this.prop.get(key).value}
                                                     regexp={this.prop.get(key).regexp}
                                                     picker={this.prop.get(key).picker}
                                                     setProperty={this.setProperty.bind(this)}  />)
            }
        }
        if(shapes.length>1){
            propElements=shapes.length+this.props.captions.NShapesSelected;
        }    
        if(shapes.length===0) propElements=this.props.captions.noShapesSelected;
        return <div className={"toolBar propertiesBar noselect"}>
            <div className='toolBarHeader noselect'>{this.props.captions.propBar}</div>
            <hr/>
            {shapeTitle?shapeTitle:""}
            <div className='propertyGroup'>
            {propElements}
            </div>
            {this.props.screen.selectedShapes.length>0?<PropertyEditButtonsBar
                                    deleteConfirm={this.props.deleteConfirm.bind(null,true)}
                                    caption={this.props.captions.deleteButton}/>:<></>}
                                    
        
        </div>
    }
}

const mapStateToProps = store => {

    return {
            screen: store.screen,
            captions:store.options.captions,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        setProperty:(prop)=>dispatch(setProperty(prop)),
        deleteConfirm:()=>dispatch(ScreenActions.deleteConfirm()),
        repaint:()=>dispatch(ScreenActions.repaint()),
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(PropertyEditorBar)