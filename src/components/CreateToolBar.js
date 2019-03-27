import React from 'react';
import { connect } from 'react-redux';
import CreateShapeButton from "./CreateShapeButton";
import StraightLineCreator from "./shapes/StraightLineCreator";
import RayLineCreator from "./shapes/RayLineCreator";

class CreateToolBar extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return <div className={"createToolBar"}>
            <CreateShapeButton title={"Straight Line"}
                               boundedCircle={this.props.boundedCircle}
                               screenContext={this.props.context}
                               creator={StraightLineCreator}/>
            <CreateShapeButton title={"Ray Line"}
                               boundedCircle={this.props.boundedCircle}
                               screenContext={this.props.context}
                               creator={RayLineCreator}/>
            <br/>
            <CreateShapeButton title={"Segment Line"}
                               boundedCircle={this.props.boundedCircle}
                               screenContext={this.props.context}
                               creator={StraightLineCreator}/>

        </div>
    }
}

const mapStateToProps = store => {

    return {
        boundedCircle:store.screen.boundedCircle,
        context:store.screen.context,
    }
};
const mapDispatchToProps = dispatch => {
    return {
    }
};
export default connect(mapStateToProps)(CreateToolBar)