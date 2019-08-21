'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    FlatList,
    View,
    ActivityIndicator
} from 'react-native';
import { Container, Header, Content, Card, CardItem, List, ListItem, Thumbnail, Text, Left, Body, Right, Button} from 'native-base';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import ModalDropdown from 'react-native-modal-dropdown';

import * as Actions from '../actions'; //Import your actions

const QUANTITY = ['0','1', '2', '3', '4'];

class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };

        this.renderItem = this.renderItem.bind(this);
    }

    adjustQuantity(idx, value, item) {
      this.props.adjustQuantity(value, item);
      console.debug(`idx=${idx}, value='${value}'`);
    }

   render() {
       if (this.props.cart == null || this.props.cart == "") {
        return (
            <View style={{flex: 1,  alignItems: 'center', justifyContent: 'center'}}>
              <Text>Shopping Cart is empty</Text>
            </View>
            );
    } else {
        return (

          <Container style={{flex: 1}}>
          <Content style={{flex: 1}}>
              <FlatList
              ref='listRef'
              data={this.props.cart}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => item.sno+item.name+item.cid}/>
         
          </Content>
           <View style={{padding: 10}}>
             <Text style={{textAlign: 'right'}}>Total Amount: {this.props.totalPrice} 円</Text>
          </View>
          </Container>

          );
    }
}
    
    
  renderItem({item, index}) {
    return (

      <List>
      <ListItem thumbnail>
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
      <Text>Quantity</Text>
      <ModalDropdown
                          defaultValue={item.quantity.toString()}
                          options={QUANTITY}
                          textStyle={styles.quantityText}
                          dropdownStyle={styles.quantityDropDown}
                          onSelect={(idx, value) => this.adjustQuantity(idx, value, item)}
                           />
  
      </Right>
      </ListItem>
      </List>

      )
}
};

function mapStateToProps(state, props) {
    return {
        cart: state.cartReducer.data,
        totalPrice: state.cartReducer.totalPrice
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

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
        fontSize: 14,
    },
    quantityText:{
        fontSize: 18.
    },
    quantityDropDown:{
        width: 50,
    height: 190,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 3,
    }
});