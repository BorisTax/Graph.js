import React from 'react';
import ReactDOM from 'react-dom';
import Graph from './GeomEditor/GeomEditor'
import {BrowserRouter, Route} from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <Route path={'/'} />
        <Route path={'/graph'} component={Graph}/>
    </BrowserRouter>
    ,
    document.getElementById('root'));
