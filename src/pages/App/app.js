import React, {Component, PropTypes} from 'react';
import {View, Text, TouchableOpacity, TextInput, Button, Picker} from 'react-native';
import RNCalendarEvents from 'react-native-calendar-events';
import styles from './styles';

const Identificationn = 'this is a note for find me';
export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dateModalVisible: true,
            year: new Date().getFullYear(),
            month: 1
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

    async saveEvent () {
        const {year, month, data} = this.state;

        let endday = 31;

        if([1, 2 ,3, 5, 7, 8, 10, 12].indexOf(month) === -1) {
            endday = 30;   
        } else if(month === 2) {
            // 闰年
            if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
                endday = 29;
            } else {
                endday = 28;
            }
        }
        const dataArr = data.replace(/\s/g, ' ').split(' ');
        if(dataArr.length !== endday) {
            alert(`出问题了：本月有${endday}天，数据有${dataArr.length}条`);
            return;
        }
        // 检查是否导入数据当月是否已有数据，如果有就删除
        const events = await this.readEvent(new Date(`${year}-${month}-1 00:00:00`), new Date(`${year}-${month}-${endday} 23:59:59`));
        events.map(v => {
            if (v.notes === Identificationn) {
                this.removeEvent(v.id);
            }
        });

        // 新增事件
        const r = [];
        dataArr
            .map((v, k) => {
                const date = `${year}-${month}-${k + 1}`;
                RNCalendarEvents.saveEvent(v, {
                    // location: 'location',
                    notes: Identificationn,
                    startDate: new Date(date + ' 01:00:00'),
                        endDate: new Date(date + ' 23:00:00')
                    })
                    .then(id => {
                        console.log('日历事件导入成功');
                        r.push(true);
                    })
                    .catch(error => {
                        r.push(false);
                        console.log(`日历事件导入失败，错误为：${JSON.stringify(error)}`);
                    });
            });
        if (r.indexOf(false) > -1) {
            alert('有错误');
        } else {
            alert('导入成功');
        }

    }

    async readEvent(start, end) {
        const eventArr = await RNCalendarEvents.fetchAllEvents(start, end);
        return eventArr;
    }

    async removeEvent(id) {
        RNCalendarEvents.removeFutureEvents(id);
    }

    onDateChange = (date) => {
        this.setState({date});
    }

    async componentWillMount() {
        const authorization = await this.isAuthorization();
        if (!authorization) {
            try {
                await this.getAuthorization()
            } catch (error) {
                alert('获取授权失败');
            }
        }
    }

    startTimeOnPress = () => {
        alert('startTimeOnPress');
    }

    endTimeOnPress = () => {
        alert('endTimeOnPress');
    }

    handelSubmit = () => {
        this.saveEvent();
    }

    render() {
        const dataSource = [
            {
                label: '开始时间',
                type: 'startTime',
                onPress: this.startTimeOnPress
            }, {
                label: '结束时间',
                type: 'endTime',
                onPress: this.endTimeOnPress
            }
        ];
        const customStyles = {
            dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
                display: 'none'
            },
            dateInput: {
                marginLeft: 36,
                height: 30
            }
        };
        const datePickerStyle = {
            width: 200
        };
        const fullYear = new Date().getFullYear();
        return (
            <View style={{
                flex: 1,
                marginTop: 50
            }}>
                <Text>
                    {this.state.year}

                    {this.state.month}

                    {this.state.data}
                </Text>
                <View style={{
                    flex: 1,
                    flexDirection: 'row'
                }}>
                    <Picker
                        style={{
                            width: '50%'
                        }}
                        selectedValue={this.state.year}
                        onValueChange={(year) => {
                            this.setState({year})
                        }}>
                        {
                            [fullYear, fullYear + 1].map(v => <Picker.Item key={v} label={`${v}`} value={`${v}`} />)
                        }
                    </Picker>

                    <Picker
                        style={{
                            width: '50%'
                        }}
                        selectedValue={this.state.month}
                        onValueChange={(month) => {
                            this.setState({month})
                        }}>
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(v => <Picker.Item key={v} label={`${v}`} value={`${v}`} />)
                        }
                    </Picker>
                </View>
                <TextInput
                    style={{
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 1
                }}
                    onChangeText={(data) => this.setState({data})}/>
                <Button onPress={this.handelSubmit} title="SUBMIT" color="#841584"/>
            </View>
        );
    }
}

App.propTypes = {};