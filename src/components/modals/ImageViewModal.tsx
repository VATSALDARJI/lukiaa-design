import {Image, Modal, Pressable, StyleSheet, View} from 'react-native';
import {forwardRef, useCallback, useImperativeHandle, useState} from 'react';
import {ModalRefType} from '../../types/otherTypes';
import {CustomImages} from '../../assets/images';

interface ImageViewModalProps {
  imageUrl?: string;
}

const ImageViewModal = forwardRef<ModalRefType, ImageViewModalProps>(
  (props, ref) => {
    const {imageUrl} = props;
    const [Visible, setVisible] = useState(false);

    useImperativeHandle(
      ref,
      () => ({
        open: () => setVisible(true),
        close: () => setVisible(false),
      }),
      [],
    );

    const handleClose = useCallback(() => setVisible(false), []);

    return (
      <Modal
        style={{flex: 1}}
        visible={Visible}
        transparent={true}
        animationType="fade"
        statusBarTranslucent>
        <View style={styles.bg}>
          <Image source={{uri: imageUrl}} style={styles.images} />
          <Pressable onPress={handleClose} style={styles.crossContainer}>
            <Image source={CustomImages.close} style={styles.cross} />
          </Pressable>
        </View>
      </Modal>
    );
  },
);

const styles = StyleSheet.create({
  bg: {
    backgroundColor: 'rgba(0, 0, 0, 0.77)',
    flex: 1,
  },
  images: {width: '100%', height: '100%', resizeMode: 'contain'},
  crossContainer: {
    position: 'absolute',
    top: 25,
    right: 20,
    zIndex: 1,
    padding: 15,
    backgroundColor: 'rgb(37, 37, 37)',
    borderRadius: 50,
  },
  cross: {
    width: 15,
    height: 15,
    tintColor: '#ffffff',
  },
});

ImageViewModal.displayName = 'ImageViewModal';
export default ImageViewModal;
