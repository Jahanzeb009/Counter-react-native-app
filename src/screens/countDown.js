import React from 'react';
import { View, Text, Button } from 'react-native';


const CountDown = (props) => {

    const name = props?.route?.params?.name
    // const { name } = props?.route?.params.name
    return (
        <View style={{ marginTop: 50 }}>
            <Text>This is a navigated value <Text style={{ fontWeight: 'bold' }}>"{name}"</Text></Text>
            <Button title='show props value' onPress={() => { alert(name) }} />
        </View>
    );
};



export default CountDown