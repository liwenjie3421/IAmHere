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
    componentWillMount() {
        (async() => {
            const res = await fetch(`http://localhost:3000/getData?name=${encodeURIComponent('李文杰')}`);
            const json = await res.json();
            this.setState({data: json.data})
            console.log(json.data);
        })();
    }

    render() {

        return (
            <App>
                {this
                    .state
                    .data
                    .map(v => {
                        return (
                            <View>
                                <Text>{v.work}</Text>
                                <Text>{v.day}</Text>
                                <Text>{v.date}</Text>
                            </View>
                        );
                    })}
            </App>
        )
    }
};