import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './store/configureStore';
import Body from './Body';
import Login from './components/Login'
import Register from './components/Register';
import Activation from './components/Activation';
export default class GeomEditor extends React.Component {
    render() {
        return <Provider store={store}>
            <BrowserRouter>
                <Route path='/' component={Body}/>
                <Route exact path='/activate' component={Activation}/>
                <Route path='/activate/:id' component={Activation}/>
                <Route path='/login' component={Login}/>
                <Route path='/register' component={Register}/>
            </BrowserRouter>
        </Provider>

    }
}
