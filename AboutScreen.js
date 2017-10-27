import React, { Component } from "react";
import { Container, Button, Text, Header, Left, Right, Icon, Body, Title, View} from 'native-base';

export default class AboutScreen extends React.Component {
  render() {
    return (
      <Container>
          <Header>
            <Left>
              <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                <Icon name='menu' />
              </Button>
            </Left>
            <Body>
              <Title>About</Title>
            </Body>
            <Right/>
          </Header>
          <View style={{ flex: 1 }}>
          <Text>About screen</Text>
        </View>
      </Container>
    )
  }
}
