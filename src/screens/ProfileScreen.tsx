import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState, useEffect} from 'react';
import CustomSelect from '../common/CustomSelect';
import SelectableCardGrid from '../common/SelectableCardGrid';
import HeightSlider from '../components/slider/HeightSlider';
import CustomButton from '../common/CustumButton'; // Note: Typo in import (CustumButton -> CustomButton)
import {CustomImages} from '../assets/images';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ScreenProps} from '../navigation/Stack';
import {cmToInches, inchesToCm} from '../utils/helperFunctions';
import ProgressIndicator from '../components/header/CustomHeader';

const bodyShapeOptions = [
  {id: 'triangle', label: 'Triangle', emoji: CustomImages.triangle},
  {id: 'rectangle', label: 'Rectagle', emoji: CustomImages.square},
  {
    id: 'invertedTriangle',
    label: 'Inverted Triangle',
    emoji: CustomImages.downTriangle,
  },
  {id: 'oval', label: 'Oval', emoji: CustomImages.ellipse},
  {id: 'trapzoid', label: 'Trapezoid', emoji: CustomImages.pentagone},
];

const bodySizeOptions = [
  {id: 'slim', label: 'Slim', emoji: CustomImages.slimBody},
  {id: 'average', label: 'Average', emoji: CustomImages.averageBody},
  {
    id: 'heavy',
    label: 'HeavySet',
    emoji: CustomImages.heavyBody,
  },
  {id: 'athletic', label: 'Athelete', emoji: CustomImages.atheleteBody},
  {id: 'muscular', label: 'Muscular', emoji: CustomImages.muscularBody},
];

const ProfileScreen: React.FC<ScreenProps<'ProfileScreen'>> = ({
  navigation,
}) => {
  const [height, setHeight] = useState<number>(70);
  const [gender, setGender] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [bodyShape, setBodyShape] = useState<string[]>([]);
  const [bodyType, setBodyType] = useState<string[]>([]);
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);

  // Validate if all required fields are filled
  useEffect(() => {
    const isValid =
      height !== null &&
      gender !== '' &&
      age !== '' &&
      bodyShape.length > 0 &&
      bodyType.length > 0;
    setIsButtonEnabled(isValid);
  }, [height, gender, age, bodyShape, bodyType]);

  const handleSelectionChange =
    (type: 'bodyShape' | 'bodyType') => (selectedIds: string[]) => {
      if (type === 'bodyShape') {
        setBodyShape(selectedIds);
      } else {
        setBodyType(selectedIds);
      }
      console.log(`Selected ${type}:`, selectedIds);
    };

  const handleNextNav = useCallback(() => {
    if (isButtonEnabled) {
      console.log('Navigating to Step 2', {
        height,
        gender,
        age,
        bodyShape,
        bodyType,
      });

      let heightIncm = inchesToCm(height);

      navigation.navigate('ProfileScreenTwo', {
        height: heightIncm,
        gender,
        age,
        bodyShape,
        bodyType,
      });
      // Add navigation logic here
    }
  }, [isButtonEnabled, height, gender, age, bodyShape, bodyType]);

  const {top, bottom} = useSafeAreaInsets();

  console.log(isButtonEnabled);
  

  return (
    <View style={{flex: 1}}>
      <ProgressIndicator isPageOneComplete={isButtonEnabled} isPageTwoComplete={false} />
      <View style={[styles.container, {marginBottom: bottom}]}>
        <ScrollView
          contentContainerStyle={[styles.scrollContent]}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled>
          {/* Height Section */}
          <View style={styles.section}>
            <HeightSlider onHeightChange={height => setHeight(height)} />
          </View>

          {/* Gender and Age Select */}
          <View style={styles.section}>
            <CustomSelect
              label="Gender"
              data={['male', 'female', 'other']}
              placeholder="Select your gender"
              onSelect={value => setGender(value)}
            />
            <CustomSelect
              label="Age"
              data={['18-24', '25-34', '35-44', '45-54', '55+']}
              placeholder="Select your age"
              onSelect={value => setAge(value)}
            />
          </View>

          {/* Body Shape */}
          <View style={[styles.section, {marginTop: 10}]}>
            <SelectableCardGrid
              title="Body Shape"
              description="Choose the shape that best describes your body type"
              data={bodyShapeOptions}
              isMultiSelect={false}
              onSelectionChange={handleSelectionChange('bodyShape')}
            />
          </View>

          {/* Body Size */}
          <View style={styles.section}>
            <SelectableCardGrid
              title="Body Size"
              description="Select your overall build and physique"
              data={bodySizeOptions}
              isMultiSelect={false}
              onSelectionChange={handleSelectionChange('bodyType')}
            />
          </View>
        </ScrollView>
        <CustomButton
          title="Continue to Step 2"
          onPress={handleNextNav}
          disabled={!isButtonEnabled}
          style={[styles.button, !isButtonEnabled && {opacity: 0.3}]}
        />
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  scrollContent: {},
  section: {
    marginBottom: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
  },
  heightValueContainer: {
    marginTop: 8,
    padding: 12,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  heightValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  button: {
    // Add any default button styles here if needed
  },
});
