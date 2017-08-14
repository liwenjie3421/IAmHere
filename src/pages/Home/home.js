import React, {Component, PropTypes} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';

import * as Actions from '../../actions/home.action';
import styles from './styles';

class Home extends Component {
    componentDidMount() {
        alert(this.props.getTags)
    }

    render() {
        // const {tags} = this.props.home;
        return (
            <View style={styles.container}>
                <Text>12345678nb</Text>
            </View>
        );
    }
}

export default connect((state) => ({home: state.home}), Object.assign(Actions))(Home);

Home.propTypes = {
    tags: PropTypes.array,
    getTags: PropTypes.func
};