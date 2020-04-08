import React from 'react';
import {connect} from 'react-redux';
import PropertyField from './PropertyField';
import PropertyMultField from './PropertyMultField';
import { ScreenActions} from '../actions/ScreenActions';
import {PropertyTypes} from "./shapes/PropertyData";
class PropertyEditorBar extends React.Component{
    pickProperty(index,picker){
        this.props.pickProperty(this.props.model.mouseHandler.getProperties(),index,picker);
    }
    render(){
        let propElements=[]; 
        const captionsKey=this.props.model.mouseHandler.getCaptionsKey();
        const captions=this.props.captions[captionsKey]; 
        const currentProps=this.props.model.mouseHandler.getProperties();
            for(let key in currentProps){
                if(key==="0") continue;
                if(currentProps[key].type===PropertyTypes.VERTEX)propElements.push(<PropertyMultField
                                                     key={key}
                                                     propKey={key}
                                                     id={key}
                                                     label={captions[currentProps[0].value][key]} 
                                                     value={currentProps[key].value}
                                                     type={currentProps[key].type}
                                                     regexp={currentProps[key].regexp}
                                                     selected={currentProps[key].selected}
                                                     picker={currentProps[key].picker}
                                                     pickProperty={this.pickProperty.bind(this)}
                                                     setProperty={currentProps[key].setValue.bind(currentProps[key])}
                                                     setActivePoint={currentProps[key].setActive.bind(currentProps[key])}/>);
                                        else propElements.push(<PropertyField 
                                                     key={key}
                                                     propKey={key}
                                                     id={key}
                                                     label={currentProps[key].label} 
                                                     value={currentProps[key].value}
                                                     type={currentProps[key].type}
                                                     regexp={currentProps[key].regexp}
                                                     picker={currentProps[key].picker}
                                                     pickProperty={this.pickProperty.bind(this)}
                                                     setProperty={currentProps[key].setValue.bind(currentProps[key])}/>);
            }
        return <div className={"toolBar propertiesBar noselect"}>
            <div className='toolBarHeader noselect'>{this.props.captions.propBar}</div>
            <hr/>
            <div className='propertyGroup'>
            {propElements}
            </div>
        </div>
    }
}

const mapStateToProps = store => {

    return {
            model: store.model,
            captions:store.options.captions,
            pickEditId:store.model.pickedEditId,
            status:store.model.status,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        repaint:()=>dispatch(ScreenActions.repaint()),
        pickProperty:(properties,index,picker)=>dispatch(ScreenActions.pickProperty(properties,index,picker)),
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(PropertyEditorBar)