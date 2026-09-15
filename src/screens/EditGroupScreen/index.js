import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import backArrow from '../../images/backArrow.png';
import users from '../../images/users.png';
import close from '../../images/close.png';
import cameras from '../../images/cameras.png';
import {COLORS, Fonts} from '../../utils';
import {hp, normalize, wp} from '../../components/responsive';
import Icon from '../../components/Icon';
import {portraitStyles, landscapeStyles} from './styles';

// Change this import according to your actual API file
import {onGetCommonApi} from '../../utils/api';
import { onAddCommonFormApi } from '../../services/Api';
import { showMessage } from 'react-native-flash-message';

const EditGroupScreen = ({navigation, route}) => {
  const insets = useSafeAreaInsets();

  const groupDetails = route?.params?.groupDetails || {};

  const [groupName, setGroupName] = useState(groupDetails?.name || '');
  const [groupType, setGroupType] = useState(
    groupDetails?.type?.toLowerCase() || 'private',
  );

  const [groupLogo, setGroupLogo] = useState(groupDetails?.logo || null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [nameError, setNameError] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const [isLandscape, setIsLandscape] = useState(false);

  const styles = isLandscape ? landscapeStyles : portraitStyles;

  /**
   * Pick group logo
   */
  const handlePickImage = useCallback(() => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      cropping: true,
      width: 800,
      height: 800,
      compressImageQuality: 0.85,
      cropperCircleOverlay: true,
    })
      .then(image => {
        console.log('Selected Group Image:', image);

        setSelectedImage(image);
        setGroupLogo(image?.path || null);
      })
      .catch(error => {
        if (error?.code !== 'E_PICKER_CANCELLED') {
          console.log('Image picker error:', error);
        }
      });
  }, []);

  /**
   * Validate form
   */
  const validateForm = () => {
    let valid = true;

    const trimmedName = groupName.trim();

    if (!trimmedName) {
      setNameError('Please enter group name');
      valid = false;
    } else if (trimmedName.length < 3) {
      setNameError('Group name must be at least 3 characters');
      valid = false;
    } else {
      setNameError('');
    }

    if (!groupType) {
      valid = false;
    }

    return valid;
  };

  /**
   * Update group
   */
  const handleUpdateGroup = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setIsUpdating(true);

      const formData = new FormData();
      formData.append('group_name', groupName.trim());
      formData.append('group_type', groupType);

      /**
       * Only send logo when user selected a new image.
       */
      if (selectedImage) {
        formData.append('group_logo', {
          uri: selectedImage.path,
          type: selectedImage.mime || 'image/jpeg',
          name:
            selectedImage.filename ||
            `group_logo_${Date.now()}.jpg`,
        });
      }

      console.log('Update Group FormData:', formData);

      /**
       * IMPORTANT:
       *
       * Replace this API call with your actual update-group API.
       *
       * Example:
       * const response = await onPostCommonApi(
       *   'update-group',
       *   formData,
       * );
       */

      const response = await onAddCommonFormApi(
        `chat-groups/${groupDetails.id}`,
        formData,
      );

      console.log('Update Group Response:', response?.data);

      if (response?.data?.status) {
        showMessage({
          message: 'Group details updated successfully.',
          duration: 3000,
          icon: 'success',
          type: 'success',
        });
        navigation.navigate('CommunityForum');
      } else {
        Alert.alert(
          'Update Failed',
          response?.data?.message ||
            'Unable to update group details.',
        );
      }
    } catch (error) {
      console.log('Update Group Error:', error);

      Alert.alert(
        'Error',
        error?.response?.data?.message ||
          error?.message ||
          'Something went wrong while updating the group.',
      );
    } finally {
      setIsUpdating(false);
    }
  };

  /**
   * Header
   */
  const renderHeader = () => {
    return (
      <View
        style={[
          styles.header,
          {
            paddingTop: 0,
            height: 62 + insets.top,
          },
        ]}>
        <View
          style={{
            height: 62,
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
          }}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.headerButton}
            onPress={() => navigation.goBack()}>
            <Image
              source={backArrow}
              style={styles.backArrow}
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Edit Group
          </Text>

          <View style={styles.headerButton} />
        </View>
      </View>
    );
  };

  /**
   * Group logo
   */
  const renderGroupImage = () => {
    const imageSource = selectedImage?.path || groupLogo;

    return (
      <View style={styles.editImageSection}>
        <View style={styles.editImageWrapper}>
          {imageSource ? (
            <Image
              source={{uri: imageSource}}
              style={styles.editGroupImage}
            />
          ) : (
            <View style={styles.editGroupImagePlaceholder}>
              <Text style={styles.editGroupImageText}>
                {groupName?.charAt(0)?.toUpperCase() || 'G'}
              </Text>
            </View>
          )}

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.cameraButton}
            onPress={handlePickImage}>
            <Image style={styles.cameraImage} source={cameras} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handlePickImage}>
          <Text style={styles.changePhotoText}>
            Change Group Photo
          </Text>
        </TouchableOpacity>

        <Text style={styles.photoHint}>
          Use a square image for the best result
        </Text>
      </View>
    );
  };

  /**
   * Group name
   */
  const renderGroupName = () => {
    return (
      <View style={styles.formSection}>
        <Text style={styles.inputLabel}>
          Group Name
        </Text>

        <View
          style={[
            styles.textInputContainer,
            nameError ? styles.textInputError : null,
          ]}>
          <View style={styles.inputLeadingIcon}>
            <Image style={[styles.cameraImage, {tintColor: COLORS.black}]} source={users} />
          </View>

          <TextInput
            value={groupName}
            onChangeText={value => {
              setGroupName(value);

              if (nameError) {
                setNameError('');
              }
            }}
            placeholder="Enter group name"
            placeholderTextColor="#9B9B9B"
            style={styles.textInput}
            maxLength={60}
            returnKeyType="done"
          />

          {groupName.length > 0 && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setGroupName('')}
              style={styles.clearButton}>
              <Image style={[styles.cameraImage, {tintColor: COLORS.black, width: wp(3.5)}]} source={close} />
            </TouchableOpacity>
          )}
        </View>

        {nameError ? (
          <Text style={styles.errorText}>
            {nameError}
          </Text>
        ) : null}

        <Text style={styles.characterCount}>
          {groupName.length}/60
        </Text>
      </View>
    );
  };

  /**
   * Group type
   */
  const renderGroupType = () => {
    return (
      <View style={styles.formSection}>
        <Text style={styles.inputLabel}>
          Group Type
        </Text>

        <Text style={styles.inputDescription}>
          Choose who can access and join this group.
        </Text>

        <View style={styles.typeContainer}>
          {/* PRIVATE */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.typeCard,
              groupType === 'private'
                ? styles.typeCardSelected
                : null,
            ]}
            onPress={() => setGroupType('private')}>

            <View style={styles.typeContent}>
              <Text
                style={[
                  styles.typeTitle,
                  groupType === 'private'
                    ? styles.typeTitleSelected
                    : null,
                ]}>
                Private Group
              </Text>

              <Text style={styles.typeDescription}>
                Only invited members can join
              </Text>
            </View>

            <View
              style={[
                styles.radioOuter,
                groupType === 'private'
                  ? styles.radioOuterSelected
                  : null,
              ]}>
              {groupType === 'private' && (
                <View style={styles.radioInner} />
              )}
            </View>
          </TouchableOpacity>

          {/* PUBLIC */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.typeCard,
              groupType === 'public'
                ? styles.typeCardSelected
                : null,
            ]}
            onPress={() => setGroupType('public')}>

            <View style={styles.typeContent}>
              <Text
                style={[
                  styles.typeTitle,
                  groupType === 'public'
                    ? styles.typeTitleSelected
                    : null,
                ]}>
                Public Group
              </Text>

              <Text style={styles.typeDescription}>
                Anyone can discover and join
              </Text>
            </View>

            <View
              style={[
                styles.radioOuter,
                groupType === 'public'
                  ? styles.radioOuterSelected
                  : null,
              ]}>
              {groupType === 'public' && (
                <View style={styles.radioInner} />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  /**
   * Bottom save button
   */
  const renderSaveButton = () => {
    return (
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          activeOpacity={0.85}
          disabled={isUpdating}
          style={[
            styles.saveButton,
            isUpdating && styles.saveButtonDisabled,
          ]}
          onPress={handleUpdateGroup}>
          {isUpdating ? (
            <ActivityIndicator
              size="small"
              color={COLORS.white}
            />
          ) : (
            <>
              <Icon
                name="check"
                size={20}
                color={COLORS.white}
              />

              <Text style={styles.saveButtonText}>
                Save Changes
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.primary}
      />

      {renderHeader()}

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={
          Platform.OS === 'ios' ? 'padding' : undefined
        }>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[
            styles.editContentContainer,
            {
              paddingBottom: 130 + insets.bottom,
            },
          ]}>
          {renderGroupImage()}

          <View style={styles.formCard}>
            {renderGroupName()}

            <View style={styles.formDivider} />

            {renderGroupType()}
          </View>

          {/* <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Icon
                name="info"
                size={18}
                color={COLORS.primary}
              />
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>
                Group settings
              </Text>

              <Text style={styles.infoText}>
                Changes to the group name, photo, and privacy
                settings will be visible to all group members.
              </Text>
            </View>
          </View> */}
        </ScrollView>

        {renderSaveButton()}
      </KeyboardAvoidingView>
    </View>
  );
};

export default EditGroupScreen;