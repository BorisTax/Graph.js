import React from 'react';
import {connect} from 'react-redux';
import '../Graph.css';
import {setProperty} from '../actions/ShapeActions'
import PropertyField from './PropertyField';
import PropertyEditButtonsBar from './PropertyEditButtonsBar';
import { deleteSelectedShapes } from '../actions/ScreenActions';
class PropertyEditorBar extends React.Component{
    prop;
    shape;
    setProperty(k,v){
        this.props.setProperty({key:k,value:v});
        }
    render(){
        let cap=this.props.captions;
        //let propEditorBar=cap?cap.propEditorBar||"Properties":"Properties";
        const shapes=this.props.screen.selectedShapes;
        //const properties=this.props.screen.selectedShapes.map(shape=>shape.getProperties());
        let propElements=[];
        let shapeTitle;
        if(shapes.length==1){
            this.shape=shapes[0];
            this.prop=shapes[0].getProperties();
            let shapeType=this.prop.get('Title').value;
            shapeTitle=this.props.captions.shapes[shapeType].Title;
            for(let key of this.prop.keys()){
                if(key!=='Title')propElements.push(<PropertyField 
                                                     key={key}
                                                     propKey={key}
                                                     label={this.props.captions.shapes[shapeType][key]} 
                                                     value={this.prop.get(key).value}
                                                     regexp={this.prop.get(key).regexp}
                                                     setProperty={this.setProperty.bind(this)}  />)
            }
        }
        if(shapes.length>1){
            propElements=shapes.length+this.props.captions.NShapesSelected;
        }    
        if(shapes.length==0) propElements=this.props.captions.noShapesSelected;
        return <div className={"toolBar propertiesBar"}>
            <div className='toolBarHeader noselect'>{this.props.captions.propBar}</div>
            {shapeTitle?shapeTitle:""}
            <div className='propertyGroup'>
            {propElements}
            </div>
            {this.props.screen.selectedShapes.length>0?<PropertyEditButtonsBar
                                    delete={this.props.deleteSelectedShapes}
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
        deleteSelectedShapes:()=>dispatch(deleteSelectedShapes())
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(PropertyEditorBar)