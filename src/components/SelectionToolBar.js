import React from 'react';
import { connect } from 'react-redux';
import '../Graph.css';
import {ScreenActions} from "../actions/ScreenActions";
import ToolButtonGroup from './ToolButtonGroup';


class SelectionToolBar extends React.Component{
    onClick({params}){
            this.props.setSelectionType(params.id);
    }
    render(){
        const cap=this.props.captions.modify;
        return <div className={"toolBar"} id="selectionToolBar">
                 
                <ToolButtonGroup
                                buttons={[{title:cap.crossSelect,id:"crossSelect"},
                                         {title:cap.fullSelect,id:"fullSelect"},
                                            ]}
                                activeButton={this.props.activeButton}
                                onClick={this.onClick.bind(this)}
                                />
        </div>
    }
}

const mapStateToProps = store => {

    return {
        context:store.screen.context,
        captions:store.options.captions,
        activeButton:store.screen.selectionType,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        setSelectionType:id=>dispatch(ScreenActions.setSelectionType(id)),
        setScreenStatus:(status,param)=>dispatch(ScreenActions.setScreenStatus(status,param)),
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(SelectionToolBar)