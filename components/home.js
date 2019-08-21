import React, { Component } from 'react';
import { Button, View, StyleSheet, AppRegistry, AppStat } from 'react-native';
import { Header, Icon, Input, Item, Left, Right, Text } from 'native-base'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';


var items = [];

class Home extends Component {
  constructor(){
    super();
    this.state = {
      selectedItems: [],
      searchText: '',
      searchCardCode: '',
  };
}

getTitles(){
    return fetch('https://yuyu-tei.jp/manager_api/test/test_expansion_list.php')
    .then((response) => response.json())
    .then((responseJson) => {
      for(var i=0;i<responseJson.result.length;i++){
          items.push({
              name: responseJson.result[i].name,
              id: responseJson.result[i].ver
          });
      }
    })
    .catch((error) => {
      console.error(error);
  });
}
componentDidMount(){
    this.getTitles();
}

onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
    console.log("selected items id => "+selectedItems);
};


render() {
    return (
      <View style={{flex: 1,padding: 10}}>
      <Text>
      Card Name
      </Text>
      <Header searchBar rounded style={{ backgroundColor: '#E9E9EF'}}> 
      <Item style={{ backgroundColor: 'lightgray', borderRadius: 5 }}>
      <Icon name="ios-search" />
      <Input placeholder="Search" onChangeText={(searchText) => this.setState({searchText})} value={this.state.searchText} />
      </Item>
      </Header>

      <Text>
      Card Code
      </Text>
      <Header searchBar rounded style={{ backgroundColor: '#E9E9EF'}}> 
      <Item style={{ backgroundColor: 'lightgray', borderRadius: 5 }}>
      <Icon name="ios-search" />
      <Input placeholder="Search" onChangeText={(searchCardCode) => this.setState({searchCardCode})} value={this.state.searchCardCode} />
      </Item>
      </Header>

      <SectionedMultiSelect
      items={items} 
      uniqueKey='id'
      selectText='Select Titles'
      showDropDowns={false}
      readOnlyHeadings={false}
      showChips={false}
      onSelectedItemsChange={this.onSelectedItemsChange}
      selectedItems={this.state.selectedItems}
      />
      <Button
      title='Search'
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
        this.props.navigation.navigate('SearchResults', {
          selectedTitles: this.state.selectedItems,
          searchKeyword: this.state.searchText,
          searchCardCode: this.state.searchCardCode
      });
    }} 
    />

    </View>
    );
}
}

export default Home