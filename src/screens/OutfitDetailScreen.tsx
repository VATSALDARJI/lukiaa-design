import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  StatusBar,
  Image,
  FlatList,
  ListRenderItemInfo,
  Pressable,
  RefreshControl,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {colors} from '../constants/colors';
import {CustomImages} from '../assets/images';
import CompleteLookCard from '../components/card/CompleteLookCard';
import {OutfitDataType} from '../types/outfitDataType';
import {keyExtractor} from '../utils/helperFunctions';
import CustomButton from '../common/CustumButton';
import ReadMoreText from '../common/ReadMoreText';
import LinearGradient from 'react-native-linear-gradient';
import ImageViewModal from '../components/modals/ImageViewModal';
import {ModalRefType} from '../types/otherTypes';
import {getOutfits} from '../axios/GetApis';

const DummyData: OutfitDataType = {
  id: '1',
  heading: 'Office party • Professional',
  title: 'Sophisticated Evening Wear',
  description:
    'Elevate your evening with this sophisticated outfit, perfect for formal gatherings or upscale events. The ensemble features a tailored black tuxedo jacket with satin lapels, paired with crisp white dress trousers. The look is completed with a classic black bow tie and polished leather shoes, ensuring you make a lasting impression.',
  ai_score: 4.8,
  image:
    'https://www.artisansoul.in/cdn/shop/products/7c_71eb85b9-8587-48c1-9ba9-82cfb3e4179f.jpg?v=1680788083',
  CompleteLookData: [
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlg1uJSWpMOXfYvcYgQXHBlrcqgexzVNQ58g&s',
      title: 'Watch',
      price: '$299.99',
      store: 'Zara',
    },
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8v1mnCZNia_UCrZho66AChi2w8j9JSEgVgg&s',
      title: 'Heels',
      price: '$89.99',
      store: 'Nordstrom',
    },
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE2QYWk3hSM_ZECLaraK1D_JtU4BrHE0AuFw&s',
      title: 'Earrings',
      price: '$49.99',
      store: "Macy's",
    },
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjlmDNx9LI0AzomzCQZZkB9bllGI49J9tRhg&s',
      title: 'Vanity Bag',
      price: '$199.99',
      store: 'Rolex',
    },
  ],
};

const OutfitDetailScreen = () => {
  const imageModalRef = useRef<ModalRefType>(null);
  const [OutfitData, setOutfitData] = useState<any>();
  const [Refreshing, setRefreshing] = useState(false);

  const handleImagePress = useCallback(() => {
    imageModalRef.current?.open?.();
  }, []);

  const fetchOutfitData = useCallback(async () => {
    try {
      setRefreshing(true);
      const response = await getOutfits();
      setOutfitData(DummyData);
    } catch (error) {
      console.error('Error fetching outfit data:', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchOutfitData();
  }, [fetchOutfitData]);

  const renderLookItems = useCallback(
    ({item}: ListRenderItemInfo<OutfitDataType['CompleteLookData'][0]>) => {
      return <CompleteLookCard item={item} />;
    },
    [],
  );

  return (
    <SafeAreaView style={styles.scrollView}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'light-content'}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.mainCont}
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={Refreshing}
            onRefresh={fetchOutfitData}
            colors={[colors.gradientstartColor, colors.gradientendColor]}
            tintColor={colors.gradientstartColor}
          />
        }>
        {OutfitData ? (
          <>
            <View style={styles.topContainer}>
              <LinearGradient
                colors={[colors.gradientstartColor, colors.gradientendColor]}
                style={styles.headingContainer}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}>
                <Text style={styles.heading}>{DummyData.heading}</Text>
              </LinearGradient>

              <Text style={styles.title}>{DummyData.title}</Text>

              <ReadMoreText style={styles.desc}>
                {DummyData.description}
              </ReadMoreText>

              <View style={styles.scoreContainer}>
                <Image source={CustomImages.star} style={styles.star} />
                <Text style={styles.scoreText}>
                  {DummyData.ai_score} • AI Match Score
                </Text>
              </View>

              <Pressable
                style={styles.imageContainer}
                onPress={handleImagePress}>
                <Image source={{uri: DummyData.image}} style={styles.image} />

                <View style={styles.viewFullContainer}>
                  <Text style={styles.heading}>Tap to view Full</Text>
                </View>
              </Pressable>
            </View>

            <Text style={styles.lookText}>Complete Look</Text>
            <FlatList
              data={DummyData.CompleteLookData}
              keyExtractor={keyExtractor}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={renderLookItems}
              removeClippedSubviews
              contentContainerStyle={styles.flatList}
            />
            <CustomButton
              title="Save Complete Outfit"
              onPress={() => {}}
              btnStyle={styles.btn}
            />
            <ImageViewModal ref={imageModalRef} imageUrl={DummyData.image} />
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainCont: {flexGrow: 1, backgroundColor: colors.white},
  scrollView: {flex: 1, backgroundColor: colors.white},
  topContainer: {padding: 16},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 8,
  },
  desc: {
    fontSize: 15,
    color: colors.textSecondary,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 10,
  },
  star: {width: 15, height: 15},
  scoreText: {fontSize: 14, color: colors.textSecondary, alignSelf: 'center'},
  imageContainer: {
    height: 250,
    width: '100%',
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f4f4f4',
  },
  image: {height: '100%', width: '100%', resizeMode: 'contain'},
  lookText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
    marginTop: 5,
    marginLeft: 16,
  },
  flatList: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    marginTop: 10,
  },
  btn: {
    height: 50,
    margin: 10,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  headingContainer: {
    padding: 10,
    borderRadius: 25,
    marginBottom: 10,
    justifyContent: 'center',
    marginLeft: -10,
    paddingHorizontal: 15,
    alignSelf: 'flex-start',
  },
  heading: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.white,
  },
  viewFullContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
});
export default OutfitDetailScreen;
