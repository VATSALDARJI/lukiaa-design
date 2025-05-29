import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../constants/colors';
import {Fonts} from '../assets/fonts/Customfont';

// Interface (for reference, useful when using TypeScript)
/*
interface SelectableCardGridProps {
  data: {id: string; emoji: string; label: string}[];
  isMultiSelect?: boolean;
  onSelectionChange?: (selectedIds: string[]) => void;
  columns?: number;
  title?: string;
  description?: string;
}
*/

const SelectableCardGrid = ({
  data = [],
  isMultiSelect = true,
  onSelectionChange = () => {},
  columns = 3,
  title = '',
  description = '',
}) => {
  const [selected, setSelected] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);

  const toggleSelect = id => {
    let updated = [];

    if (isMultiSelect) {
      updated = selected.includes(id)
        ? selected.filter(item => item !== id)
        : [...selected, id];
    } else {
      updated = [id];
    }

    setSelected(updated);
    onSelectionChange(updated);
  };

  const renderItem = ({item}) => {
    const isSelected = selected.includes(item.id);
    const isHovered = hoveredId === item.id;

    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => toggleSelect(item.id)}
          onPressIn={() => setHoveredId(item.id)}
          onPressOut={() => setHoveredId(null)}
          activeOpacity={0.8}>
          <View
            style={[
              styles.card,
              isSelected && styles.cardSelected,
              isHovered && styles.cardHovered,
            ]}>
            {isSelected ? (
              <LinearGradient
                colors={[colors.gradientstartColor, colors.gradientendColor]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={styles.gradient}>
                <View style={styles.content}>
                  <Text style={styles.emoji}>{item.emoji}</Text>
                </View>
              </LinearGradient>
            ) : (
              <View style={styles.content}>
                <Text style={styles.emoji}>{item.emoji}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
        <Text
          style={[styles.label, isSelected && styles.labelSelected]}
          numberOfLines={2}
          ellipsizeMode="tail">
          {item.label}
        </Text>
      </View>
    );
  };

  return (
    <View>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {description ? <Text style={styles.subTitle}>{description}</Text> : null}

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={columns}
        style={styles.flatListStyle}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.gridContainer}
      />
    </View>
  );
};

export default SelectableCardGrid;

const styles = StyleSheet.create({
  title: {
    fontFamily: Fonts.DMSans500,
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 4,
    paddingHorizontal: 16,
  },
  subTitle: {
    fontFamily: Fonts.inter400,
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  flatListStyle: {
    paddingTop: 8,
  },
  gridContainer: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemContainer: {
    width: `${100 / 3}%`,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  touchable: {
    width: '100%',
    alignItems: 'center',
  },
  card: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.trustBase,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    overflow: 'hidden',
    width: '100%',
    height: 80,
  },
  cardSelected: {
    backgroundColor: 'transparent',
  },
  cardHovered: {
    transform: [{translateY: -4}],
    borderColor: colors.gradientstartColor,
    backgroundColor: colors.white,
  },
  gradient: {
    borderRadius: 16,
    flex: 1,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  emoji: {
    fontSize: 28,
  },
  label: {
    fontSize: 12,
    fontFamily: Fonts.inter500,
    textAlign: 'center',
    marginTop: 8,
    flexWrap: 'wrap',
  },
  labelSelected: {
    color: colors.gradientstartColor,
  },
});
