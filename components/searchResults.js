'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    ActivityIndicator,
    Alert,
    Dimensions
} from 'react-native';
//import { ListItem, Avatar } from 'react-native-elements'
import { Container, Header, Content, Card, CardItem, List, ListItem, Thumbnail, Text, Left, Body, Right, Button} from 'native-base';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import * as Actions from '../actions'; //Import your actions

var screen = Dimensions.get('window');

class SearchResults extends Component {
    constructor(props) {
        super(props);

        this.state = {
            seconds: 10
        };
         this.renderItem = this.renderItem.bind(this);
    }

    configureSearchURL(props){
        const { navigation } = props;
        let selectedTitles = navigation.getParam('selectedTitles');
        let searchKeyword = navigation.getParam('searchKeyword');
        let searchCardCode = navigation.getParam('searchCardCode');
        console.log("selectTitles => "+selectedTitles);
        console.log("searchKeyword => "+searchKeyword);
        let searchURL = 'https://yuyu-tei.jp/manager_api/test/test_item_search.php?';
        let titleParameter = "";
        let cardCodeParameter = "";

        if(selectedTitles != null || selectedTitles != ""){
         for (let i=0;i<selectedTitles.length;i++){
            if(i==0){
              titleParameter+="vers[]="+selectedTitles[i];
          } else {
              titleParameter+="&vers[]="+selectedTitles[i];
          }
        }
        searchURL+=titleParameter;
        }      

  if(searchCardCode.trim().length > 0){
      if(searchKeyword.trim().length < 0 || selectedTitles != null || selectedTitles != "" ){
            searchURL+="sno="+searchCardCode;
      } else {
          searchURL+="&sno="+searchCardCode;
      }
  }

  if(searchKeyword.trim().length > 0){
         if(searchCardCode.trim().length < 0 || selectedTitles != null || selectedTitles != "" ){
            searchURL+="name="+searchKeyword;
         } else {
            searchURL+="&name="+searchKeyword;
         } 
  }
  console.log("test state search => "+this.state.searchText);
  console.log("final search url => "+searchURL);
  this.props.searchCard(searchURL);
}


componentDidMount() {
        this.configureSearchURL(this.props); //call our action
    }

    onAddToCart = (item) => {
        Alert.alert(item.name+" has been added to cart");
        this.props.addToCart(item);
    }

    render() {
       if (this.props.loading) {
        return (
            <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator animating={true}/>
            </View>
            );
    } else if(this.props.resultCount == 0){
        return(
              <View style={{flex: 1, padding:20}}>
            <Text>no results found from yuyutei</Text>
            </View>
          );
    }
    
    else {
        return (
          <View style={{flex: 1}}>

          <FlatList
          ref='listRef'
          data={this.props.currData}
          renderItem={this.renderItem}
          extraData={this.props}
          keyExtractor={(item, index) => item.sno+item.name+item.cid}
          onEndReached={this.handleMore}
          onEndReachedThreshold={0.6}
          removeClippedSubviews={true}
          windowSize={screen.height}
          onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }} 
          />
          </View>

          );
    }

}
handleMore = () => {
    this.props.loadMore(this.props.currData);
};

renderItem({item, index}) {
    let addToCartBtn;
    if(item.stock > 0){
      addToCartBtn =  <Button transparent onPress={() => {this.onAddToCart(item)}}>
      <Text>Add to Cart</Text>
      </Button>;
    } else {
      addToCartBtn =  <Button transparent>
      <Text>Out of Stock</Text>
      </Button>;
    }
    return (      
      <View>
      <ListItem thumbnail  onPress={() => {
        this.props.navigation.navigate('Details', {
          ver: item.ver,
          cid: item.cid,
      });
    }} >
      <Left>
      <Thumbnail rounded large source={{ uri: `https://yuyu-tei.jp/card_image/ws/front/${item.ver}/${item.cid}.jpg` }} />
      </Left>
      <Body>
      <Text style={styles.title}>{item.name}</Text>
      <Text>Ver: {item.ver}</Text>
      <Text>Code: {item.sno}</Text>
      <Text>Price: {item.price} 円</Text>
      <Text>Stock: {item.stock}</Text>
      </Body>
      <Right>
      {addToCartBtn}
      </Right>
      </ListItem>
      </View>
      )
}
};

function mapStateToProps(state, props) {
    return {
        loading: state.dataReducer.loading,
        data: state.dataReducer.data,
        currData: state.dataReducer.currViewData,
        resultCount: state.dataReducer.resultCount
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);

const styles = StyleSheet.create({
    activityIndicatorContainer:{
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },

    row:{
        borderBottomWidth: 1,
        borderColor: "#ccc",
        padding: 10
    },

    title:{
        fontSize: 15,
        fontWeight: "600"
    },

    description:{
        marginTop: 5,
        left: 10,
        fontSize: 14,
    },
});