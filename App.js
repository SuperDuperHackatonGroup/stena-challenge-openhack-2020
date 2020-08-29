import React from "react"

import {createAppContainer} from 'react-navigation'
import {createDrawerNavigator} from 'react-navigation-drawer'
import {Dimensions} from 'react-native'

import {Feather} from '@expo/vector-icons'
import {
  HomeScreen,
  RewardsScreen,
  ShopScreen,
  MyRewardsScreen,
  HotScreen
} from "./screens"

import SideBar from './components/SideBar'

const DrawerNavigator = createDrawerNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      title: "Home"
    }
  },
  RewardsScreen: {
    screen: RewardsScreen,
    navigationOptions: {
      title: "Rewards"
    }
  },
  ShopScreen: {
    screen: ShopScreen,
    navigationOptions: {
      title: "Shop"
    }
  },
  MyRewardsScreen: {
    screen: MyRewardsScreen,
    navigationOptions: {
      title: "My Rewards"
    }
  },
  HotScreen: {
    screen: HotScreen,
    navigationOptions: {
      title: "Hot items"
    }
  }
},
{
  contentComponent: props => <SideBar {...props} />
}
)

export default createAppContainer(DrawerNavigator);
