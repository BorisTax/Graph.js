import React from 'react';
import {connect} from 'react-redux';
import PropertyField from './PropertyField';
import PropertyStringField from './PropertyStringField';
import PropertyMultField from './PropertyMultField';
import { ScreenActions} from '../actions/ScreenActions';
import {PropertyTypes} from "./shapes/PropertyData";
import PropertyBool from './PropertyBool';
import { Status } from '../reducers/model';
class PropertyEditorBar extends React.Component{
    pickProperty(index,picker){
        this.props.pickProperty(this.props.model.mouseHandler.getCurrentObject(),this.props.model.mouseHandler.getProperties(),index,picker);
    }
    render(){
        let propElements=[]; 
        const captionsKey=this.props.model.mouseHandler.getCaptionsKey();
        let captions=this.props.captions[captionsKey]; 
        const currentProps=this.props.model.mouseHandler.getProperties();
        const currentObject=this.props.model.mouseHandler.getCurrentObject();
        const deactivatePoints=currentObject?currentObject.deactivatePoints.bind(currentObject):null;
        if(currentProps[0]&&currentProps[0].parentLabelKeys){
            for(const plk of currentProps[0].parentLabelKeys)
              captions=captions[plk];
        }
            for(let key in currentProps){
                //if(key==="0") continue;
                const props={
                    key,propKey:key,id:key,
                    label:captions[currentProps[key].labelKey],
                    value:currentProps[key].value,
                    type:currentProps[key].type,
                    test:currentProps[key].test,
                    regexp:currentProps[key].regexp,
                    disabled:this.props.status===Status.PICK,
                    active:currentProps[key].active,
                    selected:currentProps[key].selected,
                    picker:currentProps[key].picker,
                    pickProperty:this.pickProperty.bind(this),
                    repaint:this.props.repaint,
                    setProperty:currentProps[key].setValue?currentProps[key].setValue.bind(currentProps[key]):null,
                    setActivePoint:currentProps[key].setActive?currentProps[key].setActive.bind(currentProps[key]):null,
                    deactivatePoints:deactivatePoints?deactivatePoints:null
                }
                switch(currentProps[key].type){
                    case PropertyTypes.VERTEX:
                        propElements.push(<PropertyMultField {...props} />);
                        break;
                    case PropertyTypes.NUMBER:
                    case PropertyTypes.POSITIVE_NUMBER: 
                        propElements.push(<PropertyField {...props} />);
                        break;
                    case PropertyTypes.INPUT:                     
                        propElements.push(<PropertyStringField {...props} />);
                        break;
                    case PropertyTypes.BOOL:
                        propElements.push(<PropertyBool {...props} />); 
                            break;
                    default:                
            }    
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
        pickProperty:(object,properties,index,picker)=>dispatch(ScreenActions.pickProperty(object,properties,index,picker)),
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(PropertyEditorBar)