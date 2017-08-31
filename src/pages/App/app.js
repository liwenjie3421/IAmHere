import React, {Component, PropTypes} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import RNCalendarEvents from 'react-native-calendar-events';

export default class App extends Component {
    /**
     * 是否已经授权
     *
     * @returns
     * @memberof App
     */
    async isAuthorization() {
        const authorizationStatus = await RNCalendarEvents.authorizationStatus();
        return authorizationStatus === 'authorized';
    }

    async getAuthorization() {
        await RNCalendarEvents.authorizeEventStore();
    }

    onPress = async() => {
        const authorization = await this.isAuthorization();
        let authorizationResult = true;
        if (!authorization) {
            try {
                await this.getAuthorization()
            } catch (error) {
                authorizationResult = false;
            }
        }

        RNCalendarEvents.saveEvent('title', {
            location: 'location',
            notes: 'notes',
            startDate: new Date(),
            endDate: new Date()
        }).then(id => {
            alert(id);
        }).catch(error => {
            alert(error);
        });

    }

    render() {
        const {tipObj, hideTip} = this.props;
        return (
            <View
                style={{
                flex: 1,
                marginTop: 50
            }}>
                <TouchableOpacity onPress={this.onPress}>
                    <Text>234</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

App.propTypes = {};