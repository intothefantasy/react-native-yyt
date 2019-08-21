import React, { Component } from 'react';
import { Button, View, StyleSheet, AppRegistry, AppState, Image} from 'react-native';
import { Header, Icon, Input, Item, Left, Right, Text } from 'native-base'



class Details extends Component {
  constructor(){
    super();
    this.state = {
      ver:'',
      cid:''
  };
}

componentDidMount(){
  const { navigation } = this.props;
  this.setState({ver: navigation.getParam('ver'), cid: navigation.getParam('cid')});
}

render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image style={{
        flex:1,
    alignSelf: 'center',
    aspectRatio: 1.5,
    resizeMode: 'contain'
  }} source={{ uri: `https://yuyu-tei.jp/card_image/ws/front/${this.state.ver}/${this.state.cid}.jpg` }}/>
      </View>
    );
}
}

export default Details