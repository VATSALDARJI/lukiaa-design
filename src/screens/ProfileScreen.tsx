import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text>Height</Text>
        <Text>Slide to select your height</Text>
        <View>
          <Text>5'10" (178 cm)</Text>
        </View>
      </View>
      <View>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
