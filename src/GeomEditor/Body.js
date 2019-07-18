import React from 'react';
import {connect} from 'react-redux';
import Header from './components/Header';
import {captions} from './locale/eng';
import MainContainer from './components/MainContainer';
import HelpSection from './components/HelpSection';
import {setLanguage} from './actions/AppActions';

class Body extends React.Component {
    constructor(props){
        super(props);
        props.setLanguage(captions["ENG"]);
    }
    render() {
        return <div className={"body"}>
            <Header/>
            <MainContainer/>
            {this.props.showHelp?<HelpSection/>:<></>}
            </div>
    }
}

const mapStateToProps = store => {
    return {
            showHelp:store.components.showHelp,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        setLanguage: captions=>dispatch(setLanguage(captions)),
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Body)