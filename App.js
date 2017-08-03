import React from 'react';
import { StyleSheet, ListView, AlertIOS } from 'react-native';
//import { StyleSheet, Text, View, ListView, AlertIOS} from 'react-native';
import { Container, Button, Text, Header, Left, Right, Icon, Body, Title, Fab, View} from 'native-base';
import * as firebase from "firebase";
//const firebase = require('firebase');
const StatusBar = require('./components/StatusBar');
const ActionButton = require('./components/ActionButton');
const ListItem = require('./components/ListItem');
const Roboto = require('native-base/Fonts/Roboto.ttf');
const Roboto_medium = require('native-base/Fonts/Roboto_medium.ttf');
//const styles = require('./styles.js')

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAb41XTdtm2Xd4rNk-6CHCA-2swUNT2bNw",
  authDomain: "exptrack-1ff33.firebaseapp.com",
  databaseURL: "https://exptrack-1ff33.firebaseio.com",
  projectId: "exptrack-1ff33",
  storageBucket: "exptrack-1ff33.appspot.com",
  messagingSenderId: "536001063264"
};
const firebaseAPP = firebase.initializeApp(config);

var styles = StyleSheet.create()

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.itemsRef = this.getRef().child('items');

    this.state = {
      active: 'true'
    };
  }

  getRef() {
    return firebaseAPP.database().ref();
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          _key: child.key
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });

    });
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  render() {
    return (
      /*<View style={styles.container}>

      <StatusBar title="Grocery List" />

      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderItem.bind(this)}
        enableEmptySections={true}
        style={styles.listview}/>

      <ActionButton onPress={this._addItem.bind(this)} title="Add" />

      </View>*/
      <Container>
          <Header>
            <Left>
              <Button transparent>
                <Icon name='arrow-back' />
              </Button>
            </Left>
            <Body>
              <Title>Balance</Title>
            </Body>
            <Right>
              <Button transparent>
                <Icon name='menu' />
              </Button>
            </Right>
          </Header>
          <View style={{ flex: 1 }}>
          <Button>
            <Text>
              Maki
            </Text>
          </Button>
          <Fab active={this.state.active}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active })}>
            <Icon name="share" />
            <Button style={ { backgroundColor: '#34A34F' } }>
              <Icon name="logo-whatsapp" />
            </Button>
            <Button style={ { backgroundColor: '#3B5998' } }>
              <Icon name="logo-facebook" />
            </Button>
            <Button disabled style={ { backgroundColor: '#DD5144' } }>
              <Icon name="mail" />
            </Button>
          </Fab>
        </View>
      </Container>
    )
  }

  _addItem() {
    AlertIOS.prompt(
      'Add New Item',
      null,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: 'Add',
          onPress: (text) => {
            this.itemsRef.push({
              title: text
            })
          }
        },
      ],
      'plain-text'
    );
  }

  _renderItem(item) {

    const onPress = () => {
      AlertIOS.alert(
        'Complete',
        null,
        [
          {
            text: 'Complete',
            onPress: (text) => this.itemsRef.child(item._key).remove()
          },
          {
            text: 'Cancel',
            onPress: (text) => console.log('Cancelled')
          }
        ]
      );
    };

    return (
      <ListItem item={ item } onPress={ onPress } />
      );
  }
}
