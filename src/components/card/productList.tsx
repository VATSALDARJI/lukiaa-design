import React from 'react';
import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import {CustomImages} from '../../assets/images';

// Dummy data array
const dealsData = [
  {
    id: '1',
    discount: '-50%',
    title: 'Classic White Shirt',
    price: 999,
    originalPrice: 1999,
    image: CustomImages.clothIcon,
    rating: 4.5,
  },
  {
    id: '2',
    discount: '-40%',
    title: 'Slim Fit Jeans',
    price: 1499,
    originalPrice: 2499,
    image: CustomImages.clothes,
    rating: 4.2,
  },
  {
    id: '3',
    discount: '-60%',
    title: 'Summer Dress',
    price: 799,
    originalPrice: 1999,
    image: CustomImages.shoes,
    rating: 4.7,
  },
  {
    id: '4',
    discount: '-30%',
    title: 'Casual Sneakers',
    price: 2099,
    originalPrice: 2999,
    image: CustomImages.sneakers,
    rating: 4.3,
  },
];

// Star rating component
const StarRating = ({rating}: {rating: number}) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.25 && rating % 1 < 0.75; // Show half star for .25 to .74
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      {[...Array(fullStars)].map((_, i) => (
        <Image
          key={`star-full-${i}`}
          source={CustomImages.star}
          style={styles.starIcon}
        />
      ))}
      {halfStar && (
        <Image
          key="star-half"
          source={CustomImages.halfStar}
          style={styles.starIcon}
        />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Image
          key={`star-empty-${i}`}
          source={CustomImages.star}
          style={[styles.starIcon, {tintColor: '#EEE'}]}
        />
      ))}
      <Text style={{marginLeft: 4, color: '#444', fontSize: 14}}>
        ({rating.toFixed(1)})
      </Text>
    </View>
  );
};

const DealsCard = () => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.heading}>Today's Deals</Text>
      <FlatList
        data={dealsData}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.dealsList}
        renderItem={({item}) => (
          <View style={styles.card}>
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{item.discount}</Text>
            </View>
            <Image
              source={item.image}
              style={styles.productImg}
              resizeMode="contain"
            />
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.priceRow}>
              <Text style={styles.price}>₹{item.price}</Text>
              <Text style={styles.originalPrice}>₹{item.originalPrice}</Text>
            </View>
            <StarRating rating={item.rating} />
          </View>
        )}
      />
    </View>
  );
};

export default DealsCard;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 16,
    marginLeft: 4,
  },
  dealsList: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    margin: 8,
    flex: 1,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#ddd',
    shadowOpacity: 0.15,
    shadowOffset: {width: 1, height: 2},
    shadowRadius: 8,
    minWidth: 150,
    maxWidth: '48%',
  },
  discountBadge: {
    position: 'absolute',
    left: 12,
    top: 14,
    backgroundColor: '#FF6B81',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 2,
    zIndex: 1,
  },
  discountText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  productImg: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  title: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
    marginBottom: 8,
    textAlign: 'center',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 15,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  starIcon: {
    width: 18,
    height: 18,
    tintColor: '#FFD700',
    marginRight: 2,
  },
});