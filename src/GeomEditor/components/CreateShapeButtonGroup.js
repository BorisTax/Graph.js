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
            let but=Object.assign([],this.state.buttons);
            let elem=but.splice(index,1);
            if(elem.length>0) but.unshift(elem[0]);
            this.setState({buttons:but,expanded:false});
    }

    static getDerivedStateFromProps(props,state){
        let buttons=state.buttons.map(stateButton=>props.buttons.find(propButton=>propButton.id===stateButton.id));
        return {buttons:buttons,expanded:state.expanded};
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