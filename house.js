import { Col, RowTop, Table, TableWrapper, } from '@react-native-table-component';
import React, { Component } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { inject, observer, } from 'mobx-react'

@inject('OnApp')
@observer
export default class CompareCar extends Component {
    clickItem = (item) => {
        const { OnApp } = this.props;
        OnApp.setTypeSelected(item)
        this.dismissModal()
    }

    dismissModal = () => {
        const { OnApp } = this.props;
        OnApp.hiddenTypeSelected()
    }

    componentWillUnmount() {
        const { OnApp } = this.props;
        OnApp.clearTypeSelected()
    }

    render() {
        const { OnApp } = this.props;
        return (
            <View style={{ width: '100%', flex: 1 }}>
                <NavbarCompareCar {...this.props}
                    clickLeftButton={this.clickLeftButton}
                    title={OnApp.typeCompare && OnApp.typeSelected.value || ''}
                    changeType={this.changeType} />
                <ScrollView
                    keyboardShouldPersistTaps='handled'
                    style={styles.a1}>
                    {/* Content so sánh xe */}
                    <View style={styles.container}>
                        <ScrollView
                            keyboardShouldPersistTaps='handled'
                            horizontal style={styles.a2}>
                            <View style={styles.a2}>
                                <Table
                                    borderStyle={styles.a3}>
                                    {
                                        <RowTop
                                            data={OnApp.dataTop}
                                            // widthArr={200}
                                            style={[styles.row]}
                                            textStyle={styles.text}
                                            {...this.props}
                                        />
                                    }
                                </Table>
                                <ScrollView
                                    keyboardShouldPersistTaps='handled'
                                    scrollEnabled={false}
                                    // horizontal
                                    style={styles.dataWrapper}>
                                    <TableWrapper

                                        style={styles.a6}
                                        borderStyle={styles.a7}
                                    >
                                        {
                                            OnApp.typeSelected.id === 0
                                                ?
                                                OnApp.dataContent.map((item, i) => {
                                                    // console.log('dt content: ' + JSON.stringify(item))
                                                    return <Col
                                                        key={i}
                                                        data={item}
                                                        isShowTitle={i === 0 ? true : false}
                                                        style={styles.head} heightArr={[60, 60]}
                                                        textStyle={styles.text}
                                                        {...this.props}
                                                    />
                                                })
                                                :
                                                OnApp.dataContent_Different.map((item, i) => {
                                                    // console.log('dt dataContent_Different: ' + JSON.stringify(item))
                                                    return <Col
                                                        key={i}
                                                        data={item}
                                                        isShowTitle={i === 0 ? true : false}
                                                        style={styles.head} heightArr={[60, 60]}
                                                        textStyle={styles.text}
                                                        {...this.props}
                                                    />
                                                })
                                        }
                                    </TableWrapper>
                                </ScrollView>
                            </View>
                        </ScrollView>
                    </View>
                </ScrollView>

                {/* Chọn loại hiển thị của loại so sánh */}
                <ChangeTypeCompare clickItem={this.clickItem} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, width: '100%', flexDirection: 'row', backgroundColor: 'transparent', },
    // header: { height: 30, },
    // textHeader: { textAlign: 'center', color: 'white', fontSize: 11, },
    // textHeaderContent: { textAlign: 'center', color: 'white', fontWeight: '500', },
    text: { textAlign: 'center', color: 'white' },
    dataWrapper: { marginTop: -1, flex: 1, width: '100%' },
    // wrapper: { flexDirection: 'row', }
    row: { backgroundColor: 'transparent' }
});
