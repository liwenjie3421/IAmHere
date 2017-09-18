import React, {Component} from 'react';
import {Text, View} from 'react-native';

import App from './pages/App/app';

export default class Root extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    render() {

        return (
            <App />
        )
    }
};