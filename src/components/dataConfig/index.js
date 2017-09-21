import React, {Component, PropTypes} from 'react';
import {View, Text, ListView, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-datepicker';

import styles from './styles.js';

export default class DataConfig extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startTime: '',
            endTime: ''
        };
    }

    getDataSource() {
        return new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        }).cloneWithRows(this.props.dataSource)
    }

    renderRow = (rowData) => {
        const {label, type, onPress} = rowData;
        return (
            <View style={styles.item}>
                <Text>{label} </Text>
                
            </View>
        );
    }

    render() {
        return <ListView
            dataSource={this.getDataSource()}
            renderRow={this.renderRow}/>;
    }
}

DataConfig.propTypes = {
    dataSource: PropTypes.array
};