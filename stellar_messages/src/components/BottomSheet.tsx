import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  userEmail: string;
  username: string;
  onAboutPress: () => void;
  onLogoutPress: () => Promise<void>;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  userEmail,
  username,
  onAboutPress,
  onLogoutPress,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.sheetContainer}>
              <View style={styles.headerRow}>
                <View style={styles.userInfo}>
                  <Text style={styles.userEmail}>{userEmail}</Text>
                  <Text style={styles.username}>@{username}</Text>
                </View>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.menuItem} onPress={onAboutPress}>
                <Text style={styles.menuItemText}>About</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={onLogoutPress}>
                <Text style={styles.menuItemText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
  },
  sheetContainer: {
    backgroundColor: '#202433',
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  userInfo: {
    flex: 1,
    marginRight: 20,
  },
  userEmail: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  username: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '400',
    marginTop: 4,
  },
  closeButton: {
    backgroundColor: '#FF6934',
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  menuItem: {
    marginBottom: 20,
  },
  menuItemText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default BottomSheet;
