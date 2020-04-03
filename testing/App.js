import React, { Component } from "react";
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Alert,
    TouchableHighlight,
    TouchableOpacity,
    Modal
} from "react-native";
import ContactList from './components/Contactlist';

//import RemoteContactList from 'https://kartik.bitbucket..io/components/Contactlist';

import Geolocation from '@react-native-community/geolocation';

export default class App extends Component {
    state = {
        location: null,
        coords: {},
        show: false,

    };



    rendercontacts(coords) {

        return (
            <ContactList coords={coords} />
        );
    }

    statechange = () => {

        this.setState({
            show: true
        })
    }



    findCoordinates = () => {
        Geolocation.getCurrentPosition(
            position => {
                const location = JSON.stringify(position, null, 1);

                this.setState({ coords: position.coords, location: location });
                Alert.alert("Location is Ready! Select contact to send your location.")
            },
            error => Alert.alert(error.message + "To continue,Turn on Device Location"),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    };

    renderSub = (location) => {
        return location.map((value, index) => {
            return (
                <Text style={{ textAlign: "center" }}>{sub}</Text>
            )
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{
                    textAlign: "left", fontSize: 22, margin: 10
                }}>HybridSecure Location Testing</Text>
                <Text style={{ textAlign: "left", fontSize: 18, margin: 20 }}>getCurrentPosition allows us to request a user’s location at any time.</Text>
                <TouchableOpacity onPress={this.findCoordinates}>
                    <Text style={styles.welcome}>Find My Coords?</Text>

                </TouchableOpacity>
                <Text>{this.state.location}</Text>
                <TouchableOpacity onPress={this.statechange}>
                    <Text style={styles.contactsms}>Select Contact</Text>
                </TouchableOpacity>
                {this.state.show ? this.rendercontacts(this.state.coords) : <Text> </Text>}

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    welcome: {
        elevation: 5,
        fontSize: 20,
        padding: 10,
        shadowColor: '#999999',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        backgroundColor: "#ffffff",
        borderRadius: 12,
    },

    contactsms: {
        elevation: 5,
        fontSize: 14,
        padding: 10,
        margin: 10,
        shadowColor: '#999999',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        backgroundColor: "#ffffff",
        borderRadius: 12,
    },
    instructions: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 5
    }
    ,
    cardLayout: {
        height: 400,
        width: 400,
        backgroundColor: "#ffffff",
        borderRadius: 12,
        margin: 10,
        elevation: 5,
        shadowColor: '#999999',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.3,
        shadowRadius: 3
    }
});