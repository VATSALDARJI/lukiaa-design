import {StyleSheet, Text} from 'react-native';
import React from 'react';
import ReadMore from 'react-native-read-more-text';
import {colors} from '../constants/colors';

type Props = {
  numberOfLines?: number;
} & Text['props'];

const ReadMoreText = ({numberOfLines, children, ...rest}: Props) => {
  const readMore = (onPress: () => void) => (
    <Text onPress={onPress} style={styles.ReadMore}>
      Read more
    </Text>
  );

  const readLess = (onPress: () => void) => (
    <Text onPress={onPress} style={styles.ReadMore}>
      Read less
    </Text>
  );

  return (
    <ReadMore
      numberOfLines={numberOfLines || 3}
      renderRevealedFooter={readLess}
      renderTruncatedFooter={readMore}>
      <Text {...rest}>{children}</Text>
    </ReadMore>
  );
};

const styles = StyleSheet.create({
  ReadMore: {color: colors.gradientendColor, fontWeight: '500'},
});

export default ReadMoreText;
