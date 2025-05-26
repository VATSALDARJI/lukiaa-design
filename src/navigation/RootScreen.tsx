import {StatusBar, StyleSheet, View} from 'react-native';
import React from 'react';
import {AuthStack} from './AuthStack';
import {colors} from '../constants/colors';
import AppLoader, {LoaderType} from '../common/AppLoader';

export const AppLoaderRef = React.createRef<LoaderType>();
const RootScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.accent} barStyle="dark-content" />
      <AppLoader ref={AppLoaderRef} />
      <AuthStack />
    </View>
  );
};

export default RootScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
