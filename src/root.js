import React, {Component} from 'react';
import {Text} from 'react-native';
import { Provider } from 'react-redux';

import store from './store';
import App from './pages/App/app';
import Home from './pages/Home/home';

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <App>
                    <Home />
                </App>
            </Provider>
        )
    }
};