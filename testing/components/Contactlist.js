import React, { Component } from "react";
import { NativeModules } from 'react-native';
var DirectSms = NativeModules.DirectSms;

import {
    StyleSheet,
    FlatList,
    View,
    Text,
    Platform,
    PermissionsAndroid,
    TouchableNativeFeedback,
    TouchableOpacity,
    Alert,

} from 'react-native';
import { WebView } from 'react-native-webview';


import Contacts from 'react-native-contacts';


const styles = StyleSheet.create({
    itemContainer: {
        margin: 10,
        padding: 10,

        backgroundColor: "#eee"
    },
    contactName: {

        color: "#505050",
        fontSize: 14,
        margin: 5,
        fontFamily: "OpenSans-Light"
    }
})

export default class ContactList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            contacts: null,
            coords: props.coords
        }
    }

    componentDidMount() {


        if (Platform.OS === 'android') {
            PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                {
                    title: 'Contacts',
                    message: ' This app would like to see your contacts'
                }
            ).then(() => {
                this.getList();
            }).catch((error) => {
                console.log("Error");
                //alert(error.message);
            });
        }
        // Can't this is not web so cant access dom
        //     const script = document.createElement("script");
        //     script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js";
        //     script.async = true;
        //     script.onload = () => this.scriptLoaded();
        //     document.body.appendChild(script);

        // }

        // scriptLoaded() {
        //     Alert.alert(
        //         'its working...')
        // }

    }


    loadRemoteUrl() {

        return (
            <View style={{ flex: 1, backgroundColor: "red" }}>
                <WebView source={{ uri: 'https://reactnative.dev/' }} />;
            </View>
        );
    }

    async sendDirectSms() {

        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.SEND_SMS,
                {
                    title: 'YourProject App Sms Permission',
                    message:
                        'YourProject App needs access to your inbox ' +
                        'so you can send messages in background.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                DirectSms.sendDirectSms('Add your number here for testing!', "Latitude " + this.state.coords.latitude + "   Longitude " + this.state.coords.longitude);
            } else {
                console.log('SMS permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }




    selectItem = (phone) => {
        let t = this.props.lat;
        console.log(t)

        let mobile = (phone.phoneNumbers[0].number);

        Alert.alert(
            'You want send your location to this number...',
            mobile,

            [
                { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'Yes', onPress: () => this.sendDirectSms() },
            ]
        )

    }
    getList = () => {

        Contacts.getAll((err, contacts) => {
            console.log(typeof err + err);
            if (err === 'denied') {
                console.log("cannot access");
            } else {
                this.setState({ contacts });

            }
        })


    }

    renderItem = ({ item }) => (
        <View >
            <TouchableOpacity onPress={() => this.selectItem(item)} style={styles.itemContainer}>
                <Text style={styles.contactName}>
                    Name: {`${item.givenName} `} {item.familyName}
                </Text>
                {item.phoneNumbers.map(phone => (
                    <Text style={styles.phones}>{phone.label} : {phone.number}</Text>
                ))}
                <View style={{ height: 1, backgroundColor: '#fff' }}></View>
            </TouchableOpacity>
        </View>
    )
    render() {
        return (
            <View style={styles.container}>
                <Text> {this.props.location}</Text>
                {/* {this.loadRemoteUrl()} */}
                {<FlatList
                    data={this.state.contacts}
                    renderItem={this.renderItem}
                    //Setting the number of column
                    numColumns={1}
                    keyExtractor={(item, index) => index.toString()}
                />}
            </View>
        )
    }
}



