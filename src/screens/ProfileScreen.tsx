import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState, useEffect} from 'react';
import CustomSelect from '../common/CustomSelect';
import SelectableCardGrid from '../common/SelectableCardGrid';
import HeightSlider from '../components/slider/HeightSlider';
import CustomButton from '../common/CustumButton'; // Note: Typo in import (CustumButton -> CustomButton)
import {CustomImages} from '../assets/images';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ScreenProps} from '../navigation/Stack';

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
  {id: 'slimBody', label: 'Slim', emoji: CustomImages.slimBody},
  {id: 'averageBody', label: 'Average', emoji: CustomImages.averageBody},
  {
    id: 'headyBody',
    label: 'HeavySet',
    emoji: CustomImages.heavyBody,
  },
  {id: 'athelete', label: 'Athelete', emoji: CustomImages.atheleteBody},
  {id: 'muscular', label: 'Muscular', emoji: CustomImages.muscularBody},
];

const ProfileScreen: React.FC<ScreenProps<'ProfileScreen'>> = ({
  navigation,
}) => {
  const [selectedHeight, setSelectedHeight] = useState<number>(70);
  const [gender, setGender] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [bodyShape, setBodyShape] = useState<string[]>([]);
  const [bodySize, setBodySize] = useState<string[]>([]);
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);

  // Validate if all required fields are filled
  useEffect(() => {
    const isValid =
      selectedHeight !== null &&
      gender !== '' &&
      age !== '' &&
      bodyShape.length > 0 &&
      bodySize.length > 0;
    setIsButtonEnabled(isValid);
  }, [selectedHeight, gender, age, bodyShape, bodySize]);

  const handleSelectionChange =
    (type: 'bodyShape' | 'bodySize') => (selectedIds: string[]) => {
      if (type === 'bodyShape') {
        setBodyShape(selectedIds);
      } else {
        setBodySize(selectedIds);
      }
      console.log(`Selected ${type}:`, selectedIds);
    };

  const handleNextNav = useCallback(() => {
    if (isButtonEnabled) {
      console.log('Navigating to Step 2', {
        selectedHeight,
        gender,
        age,
        bodyShape,
        bodySize,
      });

      navigation.navigate('ProfileScreenTwo');
      // Add navigation logic here
    }
  }, [isButtonEnabled, selectedHeight, gender, age, bodyShape, bodySize]);

  const {top, bottom} = useSafeAreaInsets();

  return (
    <View style={[styles.container, {marginBottom: bottom}]}>
      <ScrollView
        contentContainerStyle={[styles.scrollContent]}
        showsVerticalScrollIndicator={false}>
        {/* Height Section */}
        <View style={styles.section}>
          <HeightSlider onHeightChange={height => setSelectedHeight(height)} />
        </View>

        {/* Gender and Age Select */}
        <View style={styles.section}>
          <CustomSelect
            label="Gender"
            data={['Male', 'Female', 'Other']}
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
        <View style={styles.section}>
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
            onSelectionChange={handleSelectionChange('bodySize')}
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
