import React from 'react';
import { connect } from 'react-redux';
import {ScreenActions} from "../actions/ScreenActions";
import ToolButtonGroup from './ToolButtonGroup';


class SelectionToolBar extends React.Component{
    onClick({params}){
            this.props.setSelectionType(params.id);
    }
    render(){
        const cap=this.props.captions.selection;
        return <div className={"toolBar"} id="selectionToolBar">
                 
                <ToolButtonGroup
                                buttons={[{title:cap.crossSelect,id:"crossSelect"},
                                         {title:cap.fullSelect,id:"fullSelect"},
                                            ]}
                                activeButton={this.props.activeButton}
                                onClick={this.onClick.bind(this)}
                                size={"largeSizeButton"}
                                enabled={true}
                                />
        </div>
    }
}

const mapStateToProps = store => {

    return {
        context:store.model.context,
        captions:store.options.captions,
        activeButton:store.model.selectionType,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        setSelectionType:id=>dispatch(ScreenActions.setSelectionType(id)),
        setScreenStatus:(status,param)=>dispatch(ScreenActions.setScreenStatus(status,param)),
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(SelectionToolBar)