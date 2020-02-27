import React from 'react';
import { connect } from 'react-redux';

class PickButton extends React.Component{
    render(){
        const style=this.props.active?"pickButtonDown":"pickButtonUp"
        return <div title={this.props.captions.buttons.pick} onClick={this.props.onClick} className={"pickButton "+style}></div>
    }
}
const mapStateToProps=(store)=>({captions:store.options.captions})
export default connect(mapStateToProps)(PickButton)