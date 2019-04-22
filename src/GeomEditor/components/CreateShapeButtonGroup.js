import React from 'react';
import { connect } from 'react-redux';
import '../Graph.css';
import CreateShapeButton from "./CreateShapeButton";
import {setActiveCreateButton} from "../actions/ComponentActions";
import {setScreenStatus} from "../actions/ScreenActions";


class CreateShapeButtonGroup extends React.Component{
    constructor(props){
        super(props);
        this.state={buttons:props.buttons,expanded:false};
    }
    onMouseEnter(){
        this.setState({expanded:true});
    }
    onMouseLeave(){
        this.setState({expanded:false});
    }
    setButtonFirst(index){
            let buttons=Object.assign([],this.state.buttons);
            let elem=buttons.splice(index,1);
            if(elem.length>0)buttons.unshift(elem[0]);
            this.setState({buttons:buttons,expanded:false});
    }

    static getDerivedStateFromProps(props, state){
        return {buttons:props.buttons}
    }
    render(){
        let buttons=this.state.buttons.map((item,index)=>{
            return <CreateShapeButton 
                        title={item.title}
                        id={item.id}
                        creator={item.creator}
                        key={index}
                        index={index}
                        activeButtonId={this.props.activeButton}
                        setButtonId={this.props.setButtonId}
                        setScreenStatus={this.props.setScreenStatus}
                        setButtonFirst={this.setButtonFirst.bind(this)}
                    />
        })
        let cls="createShapeButtonGroup";
        if(this.state.expanded) cls=cls+" createShapeButtonGroupExpanded"; 
                else cls=cls+" createShapeButtonGroupCollapsed";
        return <div className={cls}
                onMouseEnter={this.onMouseEnter.bind(this)}
                onMouseLeave={this.onMouseLeave.bind(this)}
                >
             {buttons}
        </div>
    }
}

const mapStateToProps = store => {

    return {
        captions:store.options.captions,
        activeButton:store.components.activeCreateButton,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        setButtonId:id=>dispatch(setActiveCreateButton(id)),
        setScreenStatus:(status,creator)=>dispatch(setScreenStatus(status,creator)),
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(CreateShapeButtonGroup)