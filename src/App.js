import React from 'react';
import {connect} from 'react-redux';
import './style.css';
import Header from './Header';
import {engCaptions} from './locale/eng';
import MainContainer from './components/MainContainer';
import {setLanguage} from './actions/AppActions';

class App extends React.Component {
    constructor(props){
        super(props);
        props.setLanguage(engCaptions);
    }
    render() {
        return <div className={"body"}>
        <Header/>
        <MainContainer/>
        </div>

    }
}

const mapStateToProps = store => {

    return {
            
    }
};
const mapDispatchToProps = dispatch => {
    return {
        setLanguage: captions=>dispatch(setLanguage(captions)),
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(App)