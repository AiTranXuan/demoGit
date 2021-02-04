import { Alert, StyleSheet, Text } from 'react-native'
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import FastImage from 'react-native-fast-image';
import { Icons } from '@constant';
import TouchablePreventDouble from '@component/touchable-prevent-double';
import { config } from '@config';
import { findIndex } from 'lodash'
import { size } from 'lodash'
import { toJS } from 'mobx';

@inject('OnApp', 'Search', "Love", 'User')
@observer
export default class BottomView extends Component {

    clickCloseCompare = () => {
        const { Search, OnApp, Love, User } = this.props;
        Alert.alert('Xoá so sánh', 'Xoá tất cả xe đã chọn ra khỏi danh sách?',
            [
                {
                    text: 'Huỷ', onPress: () => {
                        console.log('huỷ đăng xuất')
                    }, style: 'cancel'
                },
                {
                    text: 'Đồng ý', onPress: () => {

                        //Cap nhat trang thai  danh sach man hinh Search
                        switch (Search.tabScreen) {
                            case config.postType.all:
                                OnApp.dataTop.map((item) => {
                                    console.log('item: ' + JSON.stringify(item))
                                    let indexCompare = findIndex(Search.dataAll, function (o) {
                                        return o.id === item.id;
                                    })
                                    console.log('indexCompare: ' + indexCompare)
                                    if (indexCompare !== undefined && indexCompare !== '-1') {
                                        if (Search.dataAll && Search.dataAll[indexCompare]) {
                                            Search.dataAll[indexCompare].isCompare = false;
                                        }
                                    }
                                    //yeu thich
                                    let indexLove = findIndex(Love.listLove, function (o) {
                                        return o.id === item.id;
                                    })
                                    console.log('indexLove: ' + indexLove)

                                    if (indexLove !== undefined && indexLove !== '-1') {
                                        if (Love.listLove && Love.listLove[indexLove]) {
                                            Love.listLove[indexLove].isCompare = false;
                                        }
                                    }
                                })
                                break;

                            case config.postType.new:
                                OnApp.dataTop.map((item) => {
                                    let indexCompare = findIndex(Search.dataNew, function (o) {
                                        return o.id === item.id;
                                    })
                                    if (indexCompare !== undefined && indexCompare !== '-1') {
                                        if (Search.dataNew && Search.dataNew[indexCompare]) {
                                            Search.dataNew[indexCompare].isCompare = false;
                                        }
                                    }
                                    //yeu thich
                                    let indexLove = findIndex(Love.listLove, function (o) {
                                        return o.id === item.id;
                                    })

                                    if (indexLove !== undefined && indexLove !== '-1') {
                                        if (Love.listLove && Love.listLove[indexLove]) {
                                            Love.listLove[indexLove].isCompare = false;
                                        }
                                    }
                                })
                                break;

                            case config.postType.old:
                                OnApp.dataTop.map((item) => {

                                    //Tim kiem
                                    let indexCompare = findIndex(Search.dataOld, function (o) {
                                        return o.id === item.id;
                                    })
                                    if (indexCompare !== undefined && indexCompare !== '-1') {
                                        if (Search.dataOld && Search.dataOld[indexCompare]) {
                                            Search.dataOld[indexCompare].isCompare = false;
                                        }
                                    }

                                    //yeu thich
                                    let indexLove = findIndex(Love.listLove, function (o) {
                                        return o.id === item.id;
                                    })

                                    if (indexLove !== undefined && indexLove !== '-1') {
                                        if (Love.listLove && Love.listLove[indexLove]) {
                                            Love.listLove[indexLove].isCompare = false;
                                        }
                                    }

                                })
                                break;

                            default:
                                break;
                        }

                        //xoa tat ca 
                        OnApp.clearListCarCompare()
                        OnApp.removeCompare(User.userInfo.id || '', '', 1, () => {//0: xoa 1 xe, 1: xoa tat ca xe khoi danh sach so sanh
                        })

                        //tim kiem cac item trong tat ca danh sach ròi xoá
                    }, style: 'destructive'
                },
            ],
        )

    }

    render() {
        const { OnApp, clickCompareCar } = this.props
        const dataCheck = toJS(OnApp.dataTop)
        return (
            dataCheck && size(dataCheck) > 0
                ?
                <TouchablePreventDouble
                    onPress={clickCompareCar}
                    activeOpacity={1}
                    style={styles.v1}>
                    <FastImage
                        style={styles.v2}
                        resizeMode='contain'
                        tintColor='#fff'
                        source={Icons.ic_compare} />
                    <Text style={styles.v3}>
                        {'So sánh ' + size(dataCheck) + ' xe ô tô'}
                    </Text>
                    <TouchablePreventDouble
                        onPress={this.clickCloseCompare}
                        activeOpacity={1}
                        style={styles.v4}>
                    </TouchablePreventDouble>
                </TouchablePreventDouble>
                :
                null
        )
    }
}

const styles = StyleSheet.create({
    v5: { width: 20, height: 20 },
    v4: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
    v3: { color: '#fff', flex: 1, fontSize: 13, },
    v2: { width: 20, height: 20, marginHorizontal: 10, },
    v1: {
        position: 'absolute', flex: 1, width: '100%', flexDirection: 'row', justifyContent: 'space-between',
        bottom: 0, backgroundColor: '#3C4146', height: 40, alignItems: 'center'
    },
})