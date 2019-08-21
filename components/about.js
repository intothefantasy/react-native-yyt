import React, { Component } from 'react';
import { Button, View, StyleSheet, AppRegistry, AppState, Image} from 'react-native';
import { Header, Icon, Input, Item, Left, Right, Text } from 'native-base'
import PushNotification from 'react-native-push-notification';

class About extends Component {
  constructor(){
    super();
    this.state = {
  };
}

render() {
    return (
      <View style={{flex: 1, padding: 10}}>
        <Text>Created by John Lim, intothefantasy@gmail.com
        {"\n"}{"\n"}
        This app build based on:-
        {"\n"}
        - React-Native
        {"\n"}
        - React-Redux 
        {"\n"}
        - React Navigation
        {"\n"}
        - Native Base
         {"\n"} {"\n"}
         Click on the button below for push local notification trigger
          {"\n"} {"\n"}
        </Text>
         <Button
      title='Push Notification'
      titleStyle={{ fontWeight: "700" }}
      buttonStyle={{
          backgroundColor: "rgba(92, 99,216, 1)",
          width: 20,
          height: 45,
          borderColor: "transparent",
          borderWidth: 0,
          borderRadius: 5
      }}
      containerStyle={{ marginTop: 20 }}
     onPress={() => {
       PushNotification.localNotification({
        title: "Yuyutei Push Local Notification", 
        message: "Test message, Summer Sale is On!!!",
       });
    }} 
    />
      </View>
    );
}
}

export default About