import React from 'react';
import {connect} from 'react-redux';
import '../Graph.css';
import {setProperty} from '../actions/ShapeActions'
import PropertyField from './PropertyField';
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
            shapeTitle=this.prop.get('Title');
            for(let key of this.prop.keys()){
                if(key!=='Title')propElements.push(<PropertyField label={key} 
                                                                  value={this.prop.get(key)}
                                                                  setProperty={this.setProperty.bind(this)}  />)
            }
        }
        if(shapes.length>1){
            propElements=`${shapes.length} shapes selected`;
        }    
        if(shapes.length==0) propElements='No shapes selected';
        return <div className={"toolBar propertiesBar"}>
            <div className='toolBarHeader noselect'>Properties</div>
            {shapeTitle?shapeTitle:""}
            {propElements}
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
        setProperty:(prop)=>{dispatch(setProperty(prop))}
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(PropertyEditorBar)