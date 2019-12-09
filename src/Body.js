import React from 'react';
import {connect} from 'react-redux';
import Header from './components/Header';
import {captions} from './locale/eng';
import MainContainer from './components/MainContainer';
import HelpSection from './components/HelpSection';
import {setLanguage} from './actions/AppActions';
import Confirm from './components/Confirm';
import Alert from './components/Alert';

class Body extends React.Component {
    constructor(props){
        super(props);
        props.setLanguage(captions);
    }
    render() {
        return <div className={"body"}>
            {this.props.showConfirm.show?<Confirm messageKey={this.props.showConfirm.messageKey} onOk={this.props.showConfirm.okAction}/>:<></>}
            {this.props.showAlert.show?<Alert messageKey={this.props.showAlert.messageKey}/>:<></>}
            <Header/>
            {this.props.showHelp?<HelpSection/>:<></>}
            <hr/>
            <MainContainer/>
            
           </div>
    }
}

const mapStateToProps = store => {
    return {
            showHelp:store.components.showHelp,
            showConfirm:store.components.showConfirm,
            showAlert:store.components.showAlert,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        setLanguage: captions=>dispatch(setLanguage(captions)),
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Body)