import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeTab from '../screens/tabs/HomeTab';
import DoubleIconHeader from '../components/header/DoubleIconHeader';

export type BottomTabParams = {
  HomeTab: undefined;
};

const BottomTab = createBottomTabNavigator<BottomTabParams>();



const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="HomeTab"
        component={HomeTab}
        options={{
          header: () => <DoubleIconHeader leftIcon title="HomeTab" description="test" />,
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({});
