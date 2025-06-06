import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {OutfitDataType} from '../../types/outfitDataType';
import {colors} from '../../constants/colors';
import CustomButton from '../../common/CustumButton';

type Props = {
  item: OutfitDataType['CompleteLookData'][number];
};

const CompleteLookCard = ({item}: Props) => {
  return (
    <View style={styles.card}>
      <Image source={{uri: item.image}} style={styles.image} />
      <View style={styles.storeContainer}>
        <Text style={styles.store}>{item.store}</Text>
      </View>
      <View style={styles.lower}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>{item.price}</Text>
        <CustomButton
          title="Add"
          onPress={() => {}}
          btnStyle={styles.btnStyle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginRight: 10,
    width: 130,
    backgroundColor: colors.white,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#00000090',
    padding: 5,
  },
  image: {height: 100, width: '100%', borderRadius: 10, marginBottom: 5},
  storeContainer: {
    backgroundColor: '#f4f4f4',
    position: 'absolute',
    top: 10,
    right: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
    paddingVertical: 2,
  },
  store: {
    fontSize: 12,
    color: colors.gradientstartColor,
    fontWeight: '500',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 2,
  },
  price: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.gradientstartColor,
    marginBottom: 10,
  },
  lower: {paddingHorizontal: 5, paddingBottom: 5},
  btnStyle: {
    height: 30,
    borderRadius: 5,
    padding: 0,
  },
});

export default CompleteLookCard;
