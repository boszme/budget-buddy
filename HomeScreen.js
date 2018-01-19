import React from 'react';
import { StyleSheet, ListView, AlertIOS, ListViewDataSource, Navigator } from 'react-native';
import { Container, Button, Text, Header, Left, Right, Icon, Body, Title, Fab, View} from 'native-base';
import { firebaseAPP } from "./App.js";
const StatusBar = require('./components/StatusBar');
const ActionButton = require('./components/ActionButton');
const ListItem = require('./components/ListItem');
const Roboto = require('native-base/Fonts/Roboto.ttf');
const Roboto_medium = require('native-base/Fonts/Roboto_medium.ttf');


var styles = StyleSheet.create()

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      active: false
    };
    this.itemsRef = this.getRef().child('items');
    console.log("hello")
    console.log(this.state.active)
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
      <Container>
          <Header iosBarStyle="dark-content">
            <Left>
              <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                <Icon name='menu' />
              </Button>
            </Left>
            <Body>
              <Title>Balance</Title>
            </Body>
            <Right/>
          </Header>
          <View style={{ flex: 1 }}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderItem.bind(this)}
            enableEmptySections={true}
            style={styles.listview}/>
          <Fab active={this.state.active}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active })}>
            <Icon name="md-add" />
            <Button style={ { backgroundColor: '#34A34F' } } onPress={this._addItem.bind(this)}>
              <Icon name="md-add-circle" />
            </Button>
            <Button style={ { backgroundColor: 'red' } } onPress={this._goToInput.bind(this)}>
              <Icon name="md-remove-circle" />
            </Button>
          </Fab>
        </View>
      </Container>
    )
  }

  _addItem() {
    console.log('add')
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
              title: text,
              bla: "bla"
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
  // Go to the input page
_goToInput() {
  this.props.navigation.navigate("Input")
}
}
