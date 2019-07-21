import React from 'react';
import '../Graph.css';
import ToolButton from "./ToolButton";

export default class ToolButtonGroup extends React.Component{
    constructor(props){
        super(props);
        this.state={buttons:props.buttons,firstButton:props.buttons[0].id,expanded:false};
    }
    onMouseEnter(){
        this.setState({expanded:true});
    }
    onMouseLeave(){
        this.setState({expanded:false});
    }
    setButtonFirst(id){
            this.setState({firstButton:id,expanded:false});
    }
    render(){
        let buttons=[];
        const first=this.props.buttons.find((button)=>button.id===this.state.firstButton);
        buttons.push(<ToolButton 
                            title={first.title}
                            id={first.id}
                            params={first.params}
                            key={0}
                            index={0}
                            onClick={this.props.onClick}
                            activeButtonId={this.props.activeButton}
                            setButtonFirst={this.setButtonFirst.bind(this)}
                        />);
        let index=1;
        this.props.buttons.forEach((button)=>{
                        if(button.id!==this.state.firstButton)
                            buttons.push(<ToolButton 
                                    title={button.title}
                                    id={button.id}
                                    params={button.params}
                                    key={index}
                                    index={index++}
                                    onClick={this.props.onClick}
                                    activeButtonId={this.props.activeButton}
                                    setButtonFirst={this.setButtonFirst.bind(this)}
                                />);
                    })
        let cls="toolButtonGroup";
        if(this.state.expanded) cls=cls+" toolButtonGroupExpanded"; 
                else cls=cls+" toolButtonGroupCollapsed";
        return <div className={cls}
                onMouseEnter={this.onMouseEnter.bind(this)}
                onMouseLeave={this.onMouseLeave.bind(this)}
                >
             {buttons}
        </div>
    }
}
