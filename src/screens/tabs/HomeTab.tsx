import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PerfectOutfitCard from '../../components/card/PerfectOutfitCard';
import BreezyLinenCard from '../../components/card/BreezyLinenCard';

const HomeTab = () => {
  return (
    <View>
      <PerfectOutfitCard/>
      <BreezyLinenCard/>
    </View>
  );
};

export default HomeTab;

const styles = StyleSheet.create({});
