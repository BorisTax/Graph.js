import React from 'react';
import {connect} from 'react-redux';
import PropertyField from './PropertyField';
import PropertyMultField from './PropertyMultField';
import { ScreenActions} from '../actions/ScreenActions';
import {PropertyTypes} from "./shapes/PropertyData";
import PropertyBool from './PropertyBool';
class PropertyEditorBar extends React.Component{
    pickProperty(index,picker){
        this.props.pickProperty(this.props.model.mouseHandler.getProperties(),index,picker);
    }
    render(){
        let propElements=[]; 
        const captionsKey=this.props.model.mouseHandler.getCaptionsKey();
        let captions=this.props.captions[captionsKey]; 
        const currentProps=this.props.model.mouseHandler.getProperties();
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
                    regexp:currentProps[key].regexp,
                    selected:currentProps[key].selected,
                    picker:currentProps[key].picker,
                    pickProperty:this.pickProperty.bind(this),
                    setProperty:currentProps[key].setValue?currentProps[key].setValue.bind(currentProps[key]):null,
                    setActivePoint:currentProps[key].setActive?currentProps[key].setActive.bind(currentProps[key]):null
                }
                switch(currentProps[key].type){
                    case PropertyTypes.VERTEX:
                        propElements.push(<PropertyMultField {...props} />);
                        break;
                    case PropertyTypes.NUMBER:
                    case PropertyTypes.POSITIVE_NUMBER:                      
                        propElements.push(<PropertyField {...props} />);
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
        pickProperty:(properties,index,picker)=>dispatch(ScreenActions.pickProperty(properties,index,picker)),
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(PropertyEditorBar)