import React, {Component, PropTypes} from 'react';
import {View} from 'react-native';

// import * as actions from '../../actions/common.action';
// import {connect} from 'react-redux';

// @connect((state) => {
//     const {tipObj} = state.common;
//     return {tipObj};
// }, actions)

export default class App extends Component {
    render() {
        const {tipObj, hideTip} = this.props;
        return (
            <View style={{
                flex: 1
            }}>
                {this.props.children}
            </View>
        );
    }
}

App.propTypes = {
    children: PropTypes.node.isRequired
};