import React, { Component } from "react";
import { Switch } from "react-native"
import { Container, Button, Text, Header, Left, Right, Icon, Body, Title, View, Content, Form, Item, Label, Input, List, ListItem} from 'native-base';

export default class InputScreen extends React.Component {
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
              <Title>Expense</Title>
            </Body>
            <Right/>
          </Header>

          <Content>
            <Form>
              <Item floatingLabel>
                <Label>Amount</Label>
                <Input keyboardType="numeric" />
              </Item>
              <List>
       <ListItem icon>
         <Left>
           <Icon name="plane" />
         </Left>
         <Body>
           <Text>Airplane Mode</Text>
         </Body>
         <Right>
           <Switch value={false} />
         </Right>
       </ListItem></List>
            </Form>
            <Button block><Text>Submit</Text></Button>
            </Content>

      </Container>
    )
  }
}
