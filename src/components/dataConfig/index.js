import React, {Component, PropTypes} from 'react';
import {View, Text, ListView} from 'react-native';

export default class DataConfig extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getDataSource() {
        return new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        }).cloneWithRows(this.props.dataSource)
    }

    renderRow = (rowData) => {
        return <Text>{rowData}</Text>;
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