import React from 'react';
import {connect} from 'react-redux';
import '../Graph.css';
import PropertyField from './PropertyField';
class PropertyEditorBar extends React.Component{
    prop;
    render(){
        let cap=this.props.captions;
        let propEditorBar=cap?cap.propEditorBar||"Properties":"Properties";
        const shapes=this.props.screen.selectedShapes;
        const properties=this.props.screen.selectedShapes.map(shape=>shape.getProperties());
        let propElements=[];
        let shapeTitle;
        if(shapes.length==1){
            this.prop=shapes[0].getProperties();
            shapeTitle=this.prop.get('Title');
            for(let key of this.prop.keys()){
                if(key!=='Title')propElements.push(<PropertyField label={key} value={this.prop.get(key)}/>)
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
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(PropertyEditorBar)