import React, {Component, PropTypes} from 'react';
import {View, Text, TouchableOpacity, TextInput, DatePickerIOS} from 'react-native';
import RNCalendarEvents from 'react-native-calendar-events';
import DataConfig from '../../components/dataConfig';

const Identificationn = 'this is a note for find me';
export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dateStart: new Date(),
            dateEnd: new Date()
        };
    }

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

    async saveEvent() {
        const month = 8;
        const year = 2017;
        const data = await fetch(`http://localhost:3000/getData?name=${encodeURIComponent(`刘腊梅${year}${month}`)}`);
        const json = await data.json();
        if (json.error) {
            alert('后端出问题了');
            return;
        }
        // 检查是否导入数据当月是否已有数据，如果有就删除
        const events = await this.readEvent(new Date(`${year}-${month}-${json.data[0].date} 00:00:00`), new Date(`${year}-${month}-${json.data[json.data.length - 1].date} 23:59:59`));
        events.map(v => {
            if (v.notes === Identificationn) {
                this.removeEvent(v.id);
            }
        });

        // 新增事件
        json
            .data
            .map(v => {
                const date = `${year}-${month}-${v.date}`;
                RNCalendarEvents.saveEvent(v.work, {
                    // location: 'location',
                    notes: Identificationn,
                    startDate: new Date(date + ' 01:00:00'),
                        endDate: new Date(date + ' 23:00:00')
                    })
                    .then(id => {
                    // alert(id);
                })
                    .catch(error => {
                        // alert(error);
                    });
            });

    }

    async readEvent(start, end) {
        const eventArr = await RNCalendarEvents.fetchAllEvents(start, end);
        return eventArr;
    }

    async removeEvent(id) {
        RNCalendarEvents.removeFutureEvents(id);
    }

    onPress = async() => {
        const authorization = await this.isAuthorization();
        if (!authorization) {
            try {
                await this.getAuthorization()
            } catch (error) {}
        }
        this.saveEvent();
    }

    onDateChange = (date) => {
        this.setState({date});
    }

    componentWillMount() {}

    render() {
        const dataSource = ['开始时间', '结束时间'];
        return (
            <View
                style={{
                flex: 1,
                marginTop: 50
            }}>

                <DataConfig dataSource={dataSource}/> {/* <DatePickerIOS
                    date={this.state.dateStart}
                    mode="date"
                    timeZoneOffsetInMinutes={8 * 60}
                    onDateChange={this.onDateChange}/> */}
            </View>
        );
    }
}

App.propTypes = {};