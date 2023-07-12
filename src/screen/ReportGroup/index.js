import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { API_URL } from '../../service';

const InputWithButton = ({ route, navigation }) => {
    const [text, setText] = useState('');
    const [other_id, setOther_id] = useState('');
    const [user_id, setUser_id] = useState('');
    const [room_id, setRoom_id] = useState('');
    useEffect(() => {
        const group = route.params;
        console.log("group", group.room_id)
        setUser_id(group.admin_id[0])
        setRoom_id(group.room_id)
    }, []);

    const handlePressOK = () => {
        console.log(text);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "user_id": user_id,
            "message": text,
            "room_id": room_id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(API_URL + "groupreport", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.message = 'Group Reported successfully!!') {
                    console.log(result)
                    Alert.alert(
                        'Alert Title',
                        'Group reported',
                        [
                            { text: 'OK', onPress: () => navigation.navigate('Home') }
                        ]
                    );
                }
            })
            .catch(error => console.log('error', error));
    };

    return (
        <View style={styles.container}>
            <TextInput
                value={text}
                onChangeText={text => setText(text)}
                placeholder="Enter text"
                style={styles.input}
            />
            <View style={styles.buttonContainer}>
                <Button
                    title="Report Group"
                    onPress={handlePressOK}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    input: {
        marginTop: "30%",
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
        width: "80%",
        alignSelf: 'center'
    },
    buttonContainer: {
        // alignItems: 'flex-end',
        marginTop: "30%",
        width: "80%",
        alignSelf: 'center'
    },
});

export default InputWithButton;
