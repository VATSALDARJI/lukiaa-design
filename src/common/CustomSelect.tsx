import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextStyle,
  ViewStyle,
  Image,
} from 'react-native';
import SelectDropdown, {
  SelectDropdownProps,
} from 'react-native-select-dropdown';
import {colors} from '../constants/colors'; // colors.gradientstartColor should exist
import {Fonts} from '../assets/fonts/Customfont';
import {CustomImages} from '../assets/images';
import {useCommonStyles} from './CommonStyle';

interface CustomSelectProps extends Partial<SelectDropdownProps> {
  label?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  placeholder?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  data = [],
  placeholder = 'Select your gender',
  defaultValue,
  onSelect,
  label,
  labelStyle,
  containerStyle,
  ...rest
}) => {
  const [selected, setSelected] = useState<any>(defaultValue ?? null);
  const [isOpened, setIsOpened] = useState(false);
  const {subText} = useCommonStyles();

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

      <SelectDropdown
        data={data}
        defaultValue={defaultValue}
        dropdownOverlayColor="transparent"
        onSelect={(selectedItem, index) => {
          setSelected(selectedItem);
          onSelect?.(selectedItem, index);
        }}
        onFocus={() => setIsOpened(true)}
        onBlur={() => setIsOpened(false)}
        renderButton={(selectedItem, isDropdownOpened) => (
          <TouchableOpacity
            activeOpacity={1}
            style={[
              styles.outlineBorder,
              isDropdownOpened && styles.outlineBorderFocus,
            ]}>
            <View
              style={[
                styles.innerBox,
                isDropdownOpened && styles.focusedInnerBox,
              ]}>
              <Text style={[subText, styles.buttonText]}>
                {selectedItem ?? placeholder}
              </Text>
              <Image
                source={CustomImages.down}
                style={[styles.icon, isDropdownOpened && styles.arrowUpStyle]}
                resizeMode="contain"
                tintColor={colors.textSecondary}
              />
            </View>
          </TouchableOpacity>
        )}
        renderItem={(item, index, isSelected) => (
          <View style={[styles.item, isSelected && styles.selectedItem]}>
            <Text style={[subText, styles.itemText]}>{item}</Text>
          </View>
        )}
        dropdownStyle={styles.dropdown}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  arrowUpStyle: {
    transform: [{rotate: '180deg'}],
  },

  container: {
    // marginVertical: 10,
  },
  label: {
    marginBottom: 6,
    fontSize: 16,
    fontFamily: Fonts.inter500,
    color: colors.textPrimary,
  },
  outlineBorder: {
    borderWidth: 3,
    borderColor: 'transparent',
    borderRadius: 15,
  },
  outlineBorderFocus: {
    borderColor: 'rgba(107, 72, 255, 0.05)', // #6B48FF with 0.7 opacity
  },
  innerBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.trustBase,
    backgroundColor: '#fff',
  },
  focusedInnerBox: {
    borderColor: colors.gradientstartColor,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 18.2,
    textTransform: 'capitalize',
  },
  icon: {
    width: 14,
    height: 14,
  },
  dropdown: {
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 4,
    marginTop: -22, // Pull dropdown closer to button
  },
  item: {
    padding: 14,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  itemText: {
    fontSize: 16,
    color: '#000',
    textTransform: 'capitalize',
  },
  selectedItem: {
    backgroundColor: 'rgba(107, 72, 255, 0.2)',
  },
});

export default CustomSelect;
0;
