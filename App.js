import React, { Component } from "react";
import HomeScreen from "./HomeScreen.js";
//import MainScreenNavigator from "../ChatScreen/index.js";
//import Profile from "../ProfileScreen/index.js";
import SideBar from "./SideBar.js";
import AboutScreen from "./AboutScreen.js"
import InputScreen from "./InputScreen.js"
import { DrawerNavigator } from "react-navigation";
const HomeScreenRouter = DrawerNavigator(
  {
    Home: { screen: HomeScreen },
//    Chat: { screen: MainScreenNavigator },
    Input: { screen: InputScreen },
    About: { screen: AboutScreen }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);
export default HomeScreenRouter;
