import React from 'react';
import {connect} from 'react-redux';
import {setProperty} from '../actions/ShapeActions'
import PropertyField from './PropertyField';
import PropertyMultField from './PropertyMultField';
import PropertyEditButtonsBar from './PropertyEditButtonsBar';
import { ScreenActions } from '../actions/ScreenActions';
import Shape from './shapes/Shape';
class PropertyEditorBar extends React.Component{
    prop;
    shape;
    pickProperty(id,propKey,picker){
        this.props.pickProperty(id,this.shape,propKey,picker);
    }
    setProperty(key,value,type){
        this.props.setProperty({key,value,type});
        }
    setActivePoint(key){
        this.shape.setActivePoint(key);
        this.props.repaint();
    }
    render(){
        const shapes=this.props.screen.selectedShapes;
        let propElements=[];
        let shapeTitle;
        let selectedPoints='';
        if(shapes.length===1){
            this.shape=shapes[0];
            const vertexNumber=this.shape.getProperties().reduce((a,prop)=>prop.type===Shape.PropertyTypes.VERTEX?a+1:a,0);
            selectedPoints=`${this.props.captions.selection.selectedVertexes.selected} ${this.shape.getState().selectedPoints} ${this.props.captions.selection.selectedVertexes.of} ${vertexNumber}`;
            this.shapeProps=this.shape.getProperties();
            let shapeType=this.shapeProps[0].value;
            shapeTitle=this.props.captions.shapes[shapeType][0];
            for(let key in this.shapeProps){
                if(key==="0") continue;
                if(this.shapeProps[key].type===Shape.PropertyTypes.VERTEX)propElements.push(<PropertyMultField
                                                     key={key}
                                                     propKey={key}
                                                     id={key}
                                                     label={this.props.captions.shapes[shapeType][key]} 
                                                     value={this.shapeProps[key].value}
                                                     type={this.shapeProps[key].type}
                                                     regexp={this.shapeProps[key].regexp}
                                                     selected={this.shapeProps[key].selected}
                                                     picker={this.shapeProps[key].picker}
                                                     pickProperty={this.pickProperty.bind(this)}
                                                     setProperty={this.setProperty.bind(this)}
                                                     setActivePoint={this.setActivePoint.bind(this)}/>);
                                        else propElements.push(<PropertyField 
                                                     key={key}
                                                     propKey={key}
                                                     id={key}
                                                     label={this.props.captions.shapes[shapeType][key]} 
                                                     value={this.shapeProps[key].value}
                                                     type={this.shapeProps[key].type}
                                                     regexp={this.shapeProps[key].regexp}
                                                     picker={this.shapeProps[key].picker}
                                                     pickProperty={this.pickProperty.bind(this)}
                                                     setProperty={this.setProperty.bind(this)}/>);
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
            <div>{selectedPoints}</div>
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
            pickEditId:store.screen.pickedEditId,
            status:store.screen.status
    }
};
const mapDispatchToProps = dispatch => {
    return {
        setProperty:(prop)=>dispatch(setProperty(prop)),
        deleteConfirm:()=>dispatch(ScreenActions.deleteConfirm()),
        repaint:()=>dispatch(ScreenActions.repaint()),
        pickProperty:(id,shape,propKey,picker)=>dispatch(ScreenActions.pickProperty(id,shape,propKey,picker)),
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(PropertyEditorBar)