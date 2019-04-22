import React from 'react';
import {Provider} from 'react-redux';
import {store} from './store/configureStore';
import Body from './Body';

export default class GeomEditor extends React.Component {
    render() {
        return <Provider store={store}>
            <Body/>
        </Provider>

    }
}
