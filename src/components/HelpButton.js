import React from 'react';
import '../Graph.css';
import {connect} from 'react-redux';
import {showHelp} from '../actions/AppActions';

class HelpButton extends React.Component{
    onClick(){
        this.props.showHelp(true);
    }
    render(){
        return <button 
                className={"helpButton noselect"}
                onClick={this.onClick.bind(this)}
                >
            ?
        </button>
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        showHelp:show=>{dispatch(showHelp(show))}
    }
}
export default connect(null,mapDispatchToProps)(HelpButton);