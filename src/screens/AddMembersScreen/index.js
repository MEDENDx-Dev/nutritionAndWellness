import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
  ScrollView,
} from 'react-native';

import Contacts from 'react-native-contacts';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Icon from '../../components/Icon';
import Header from '../../components/HeaderComponent';
import useOrientation from '../../components/OrientationComponent';

import {
  portraitStyles,
  landscapeStyles,
} from './styles';

import {COLORS} from '../../utils';
import {hp} from '../../components/responsive';
import useAuthStore from '../../store/authStore';
import { onAddCommonJsonApi, onGetCommonApi } from '../../services/Api';
import { showMessage } from 'react-native-flash-message';

const AddMembersScreen = ({navigation, route}) => {
  const {allUsersList} = useAuthStore();

  const orientation = useOrientation();
  const isPortrait = orientation === 'portrait';

  const styles = isPortrait
    ? portraitStyles
    : landscapeStyles;

  const insets = useSafeAreaInsets();

  const groupDetails =
    route?.params?.groupDetails || {};

  const groupId = groupDetails?.id;

  const [contacts, setContacts] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [addingMembers, setAddingMembers] = useState(false);

  // ---------------------------------------------------------
  // Initials
  // ---------------------------------------------------------

  const getInitials = useCallback(name => {
    const parts = String(name || '')
      .trim()
      .split(' ')
      .filter(Boolean);

    if (parts.length === 0) {
      return '?';
    }

    if (parts.length === 1) {
      return parts[0]
        .charAt(0)
        .toUpperCase();
    }

    return (
      parts[0].charAt(0) +
      parts[parts.length - 1].charAt(0)
    ).toUpperCase();
  }, []);

  // ---------------------------------------------------------
  // Normalize phone number
  // ---------------------------------------------------------

  const normalizePhone = useCallback(phone => {
    if (!phone) {
      return '';
    }

    let value = String(phone)
      .replace(/[^\d+]/g, '')
      .trim();

    if (
      value.length === 10 &&
      !value.startsWith('+')
    ) {
      value = `+91${value}`;
    }
    if (
      value.length === 11 &&
      value.startsWith('0')
    ) {
      value = `+91${value.substring(1)}`;
    }

    return value;
  }, []);

  // ---------------------------------------------------------
  // Existing group member IDs
  // ---------------------------------------------------------

  const existingMemberIds = useMemo(() => {
    const members = Array.isArray(
      groupDetails?.members,
    )
      ? groupDetails.members
      : [];

    const ids = members
      .map(member => {
        return (
          member?.user_id ??
          member?.user?.id ??
          member?.id
        );
      })
      .filter(
        id =>
          id !== null &&
          id !== undefined,
      );

    return new Set(
      ids.map(id => String(id)),
    );
  }, [groupDetails]);

  // ---------------------------------------------------------
  // Load contacts
  // ---------------------------------------------------------

  const loadContacts = useCallback(async () => {
    try {
      setLoading(true);

      const result =
        await Contacts.getAll();

      const appUsers = Array.isArray(
        allUsersList,
      )
        ? allUsersList
        : [];

      const registeredUsersMap =
        new Map();

      appUsers.forEach(user => {
        const phone =
          normalizePhone(
            user?.mobileno ||
              user?.mobile ||
              user?.phone ||
              user?.phoneNumber,
          );

        if (phone) {
          registeredUsersMap.set(
            phone,
            user,
          );
        }
      });

      const formattedContacts = (
        Array.isArray(result)
          ? result
          : []
      )
        .map(contact => {
          const phoneNumber =
            contact?.phoneNumbers
              ?.length > 0
              ? contact.phoneNumbers[0]
                  ?.number
              : '';

          const fullName =
            `${contact?.givenName || ''} ${
              contact?.familyName || ''
            }`.trim();

          const normalizedPhone =
            normalizePhone(
              phoneNumber,
            );

          const matchedUser =
            normalizedPhone
              ? registeredUsersMap.get(
                  normalizedPhone,
                )
              : null;

          const appPhoneNumber =
            matchedUser?.mobileno ||
            matchedUser?.mobile ||
            matchedUser?.phone ||
            matchedUser?.phoneNumber ||
            phoneNumber;

          const displayName =
            fullName ||
            matchedUser?.name ||
            'Unknown User';

          const appUserId =
            matchedUser?.id;

          const isAlreadyMember =
            appUserId !== null &&
            appUserId !== undefined &&
            existingMemberIds.has(
              String(appUserId),
            );

          return {
            id: matchedUser
              ? matchedUser.id
              : contact?.recordID ||
                `${displayName}-${phoneNumber}`,

            contactId:
              contact?.recordID ||
              `${displayName}-${phoneNumber}`,

            name: displayName,

            phoneNumber:
              appPhoneNumber || '',

            normalizedPhone:
              normalizePhone(
                appPhoneNumber,
              ),

            image:
              contact?.thumbnailPath ||
              matchedUser?.profile_image ||
              matchedUser?.profileImage ||
              matchedUser?.image ||
              null,

            initials:
              getInitials(displayName),

            isRegistered:
              !!matchedUser,

            appUser:
              matchedUser || null,

            email:
              matchedUser?.email || '',

            isAlreadyMember,
          };
        })
        .filter(item => {
          if (!item.phoneNumber) {
            return false;
          }

          if (item.isAlreadyMember) {
            return false;
          }

          return true;
        });
      const uniqueMap = new Map();

      formattedContacts.forEach(item => {
        const key = item.isRegistered
          ? `user-${item.id}`
          : `contact-${item.normalizedPhone}`;

        if (!uniqueMap.has(key)) {
          uniqueMap.set(key, item);
        }
      });

      const uniqueContacts =
        Array.from(uniqueMap.values());

      uniqueContacts.sort((a, b) =>
        a.name
          .toLowerCase()
          .localeCompare(
            b.name.toLowerCase(),
          ),
      );

      setContacts(uniqueContacts);
    } catch (error) {
      console.log(
        'Load contacts error:',
        error,
      );

      Alert.alert(
        'Contacts',
        error?.message ||
          'Unable to load contacts from this device.',
      );
    } finally {
      setLoading(false);
    }
  }, [
    allUsersList,
    existingMemberIds,
    getInitials,
    normalizePhone,
  ]);

  // ---------------------------------------------------------
  // Contact permission
  // ---------------------------------------------------------

  const requestContactsPermission =
    useCallback(async () => {
      try {
        if (Platform.OS === 'android') {
          const result =
            await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS
                .READ_CONTACTS,
              {
                title:
                  'Contacts Permission',

                message:
                  'This app needs access to your contacts so you can add members to your group.',

                buttonPositive: 'Allow',

                buttonNegative: 'Cancel',

                buttonNeutral:
                  'Ask Me Later',
              },
            );

          if (
            result !==
            PermissionsAndroid.RESULTS
              .GRANTED
          ) {
            setLoading(false);

            Alert.alert(
              'Permission Required',
              'Please allow Contacts permission to add members.',
            );

            return;
          }
        }

        /*
         * iOS
         */

        if (Platform.OS === 'ios') {
          const permission =
            await Contacts.checkPermission();

          if (
            permission ===
            Contacts.PERMISSION_UNAVAILABLE
          ) {
            setLoading(false);

            Alert.alert(
              'Contacts Unavailable',
              'Contacts are not available on this device.',
            );

            return;
          }

          if (
            permission ===
            Contacts.PERMISSION_DENIED
          ) {
            const request =
              await Contacts.requestPermission();

            if (
              request !==
              Contacts.PERMISSION_AUTHORIZED
            ) {
              setLoading(false);

              Alert.alert(
                'Permission Required',
                'Please allow Contacts access from Settings.',
              );

              return;
            }
          }
        }

        await loadContacts();
      } catch (error) {
        console.log(
          'Contact permission error:',
          error,
        );

        setLoading(false);

        Alert.alert(
          'Contacts',
          'Unable to access your contacts.',
        );
      }
    }, [loadContacts]);

  useEffect(() => {
    requestContactsPermission();
  }, [requestContactsPermission]);

  // ---------------------------------------------------------
  // Registered users
  // ---------------------------------------------------------

  const registeredContacts =
    useMemo(() => {
      return contacts.filter(
        item => item.isRegistered,
      );
    }, [contacts]);

  // ---------------------------------------------------------
  // Invite users
  // ---------------------------------------------------------

  const inviteContacts =
    useMemo(() => {
      return contacts.filter(
        item => !item.isRegistered,
      );
    }, [contacts]);

  // ---------------------------------------------------------
  // Search
  // ---------------------------------------------------------

  const filterContacts =
    useCallback(
      list => {
        const keyword =
          search.trim().toLowerCase();

        if (!keyword) {
          return list;
        }

        return list.filter(item => {
          return (
            String(item?.name || '')
              .toLowerCase()
              .includes(keyword) ||
            String(
              item?.phoneNumber || '',
            )
              .toLowerCase()
              .includes(keyword) ||
            String(item?.email || '')
              .toLowerCase()
              .includes(keyword)
          );
        });
      },
      [search],
    );

  const filteredRegisteredContacts =
    useMemo(() => {
      return filterContacts(
        registeredContacts,
      );
    }, [
      filterContacts,
      registeredContacts,
    ]);

  const filteredInviteContacts =
    useMemo(() => {
      return filterContacts(
        inviteContacts,
      );
    }, [
      filterContacts,
      inviteContacts,
    ]);

  // ---------------------------------------------------------
  // Selected user
  // ---------------------------------------------------------

  const isSelected = userId => {
    return selectedUsers.some(
      item =>
        String(item.id) ===
        String(userId),
    );
  };

  // ---------------------------------------------------------
  // Select / Unselect
  // ---------------------------------------------------------

  const toggleUser = user => {
    /*
     * Only registered users can actually
     * be added to the group.
     */

    if (!user?.isRegistered) {
      return;
    }

    const alreadySelected =
      selectedUsers.some(
        item =>
          String(item.id) ===
          String(user.id),
      );

    if (alreadySelected) {
      setSelectedUsers(prev =>
        prev.filter(
          item =>
            String(item.id) !==
            String(user.id),
        ),
      );
    } else {
      setSelectedUsers(prev => [
        ...prev,
        user,
      ]);
    }
  };

  // ---------------------------------------------------------
  // Remove selected user
  // ---------------------------------------------------------

  const removeSelectedUser = user => {
    setSelectedUsers(prev =>
      prev.filter(
        item =>
          String(item.id) !==
          String(user.id),
      ),
    );
  };

  // ---------------------------------------------------------
  // Invite user
  // ---------------------------------------------------------

  const handleInvite = user => {
    Alert.alert(
      'Invite User',
      `Send an invitation to ${user.name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Invite',
          onPress: () => {
            /*
             * ------------------------------------------------
             * INVITE API
             * ------------------------------------------------
             *
             * Add your invitation API here.
             *
             * Example payload:
             *
             * {
             *   group_id: groupId,
             *   phone_number:
             *     user.normalizedPhone,
             *   name: user.name
             * }
             *
             * ------------------------------------------------
             */

            console.log(
              'Invite group member:',
              {
                groupId,
                user,
              },
            );

            Alert.alert(
              'Invitation Sent',
              `Invitation sent to ${user.name}.`,
            );
          },
        },
      ],
    );
  };

  // ---------------------------------------------------------
  // Add members API
  // ---------------------------------------------------------

  const addMembersToGroup =
    useCallback(async () => {
      if (
        selectedUsers.length === 0
      ) {
        Alert.alert(
          'Select Members',
          'Please select at least one registered member.',
        );

        return;
      }

      try {
        setAddingMembers(true);

        const userIds =
          selectedUsers.map(
            user => user.id,
          );

        const payload = JSON.stringify({
          users: userIds,
        });

        const response = await onAddCommonJsonApi(`chat-groups/${groupId}/members`, payload);

        if (response.data.status) {
          showMessage({
            message: 'Group member added successfully.',
            duration: 3000,
            icon: 'success',
            type: 'success',
          });
          const groupDetailResponse = await onGetCommonApi(`chat-groups/${groupId}`);
          if (groupDetailResponse.data.status) {
            navigation.navigate('GroupDetailsScreen', {groupDetails: groupDetailResponse.data.data.group});
          } else {
            navigation.navigate('CommunityForum');
          }
          
        }

      } catch (error) {
        console.log(
          'Add members error:',
          error,
        );
        showMessage({
            message: 'Unable to add members. Please try again.',
            duration: 3000,
            icon: 'danger',
            type: 'danger',
          });
      } finally {
        setAddingMembers(false);
      }
    }, [
      groupId,
      navigation,
      selectedUsers,
    ]);

  // ---------------------------------------------------------
  // Selected user item
  // ---------------------------------------------------------

  const renderSelectedUser =
    ({item}) => {
      return (
        <View
          style={
            styles.selectedUserContainer
          }>

          <View
            style={
              styles.selectedAvatarWrapper
            }>

            {item.image ? (
              <Image
                source={{
                  uri: item.image,
                }}
                style={
                  styles.selectedAvatar
                }
              />
            ) : (
              <View
                style={
                  styles.selectedAvatarPlaceholder
                }>
                <Text
                  style={
                    styles.selectedAvatarText
                  }>
                  {item.initials}
                </Text>
              </View>
            )}

            <TouchableOpacity
              activeOpacity={0.8}
              style={
                styles.removeSelectedButton
              }
              onPress={() =>
                removeSelectedUser(
                  item,
                )
              }>

              <Icon
                name="close"
                size={10}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>

          <Text
            style={
              styles.selectedUserName
            }
            numberOfLines={1}>
            {String(item.name || '')
              .split(' ')[0]}
          </Text>
        </View>
      );
    };

  // ---------------------------------------------------------
  // Registered user item
  // ---------------------------------------------------------

  const renderRegisteredUser =
    ({item}) => {
      const selected = isSelected(
        item.id,
      );

      return (
        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.contactRow,
            selected &&
              styles.contactRowSelected,
          ]}
          onPress={() =>
            toggleUser(item)
          }>

          {/* Avatar */}

          <View
            style={
              styles.contactAvatar
            }>

            {item.image ? (
              <Image
                source={{
                  uri: item.image,
                }}
                style={
                  styles.contactImage
                }
              />
            ) : (
              <View
                style={
                  styles.contactPlaceholder
                }>
                <Text
                  style={
                    styles.contactInitials
                  }>
                  {item.initials}
                </Text>
              </View>
            )}
          </View>

          {/* User information */}

          <View
            style={
              styles.contactInfo
            }>

            <View
              style={
                styles.nameWithRegistered
              }>

              <Text
                style={
                  styles.contactName
                }
                numberOfLines={1}>
                {item.name}
              </Text>

              <View
                style={
                  styles.registeredBadge
                }>
                <Text
                  style={
                    styles.registeredBadgeText
                  }>
                  Registered
                </Text>
              </View>
            </View>

            <Text
              style={
                styles.contactNumber
              }
              numberOfLines={1}>
              {item.phoneNumber}
            </Text>
          </View>

          {/* Selection */}

          <View
            style={[
              styles.selectionCircle,
              selected &&
                styles.selectionCircleSelected,
            ]}>

            {selected && (
              <Icon
                name="check"
                size={15}
                color="#FFFFFF"
              />
            )}
          </View>
        </TouchableOpacity>
      );
    };

  // ---------------------------------------------------------
  // Invite user item
  // ---------------------------------------------------------

  const renderInviteUser =
    ({item}) => {
      return (
        <View
          style={
            styles.inviteContactRow
          }>

          {/* Avatar */}

          <View
            style={
              styles.contactAvatar
            }>

            {item.image ? (
              <Image
                source={{
                  uri: item.image,
                }}
                style={
                  styles.contactImage
                }
              />
            ) : (
              <View
                style={
                  styles.contactPlaceholder
                }>
                <Text
                  style={
                    styles.contactInitials
                  }>
                  {item.initials}
                </Text>
              </View>
            )}
          </View>

          {/* Information */}

          <View
            style={
              styles.contactInfo
            }>

            <Text
              style={
                styles.contactName
              }
              numberOfLines={1}>
              {item.name}
            </Text>

            <Text
              style={
                styles.contactNumber
              }
              numberOfLines={1}>
              {item.phoneNumber}
            </Text>
          </View>

          {/* Invite */}

          <TouchableOpacity
            activeOpacity={0.8}
            style={
              styles.inviteButton
            }
            onPress={() =>
              handleInvite(item)
            }>

            <Icon
              name="send"
              size={15}
              color="#FFFFFF"
            />

            <Text
              style={
                styles.inviteButtonText
              }>
              Invite
            </Text>
          </TouchableOpacity>
        </View>
      );
    };

  // ---------------------------------------------------------
  // Registered empty
  // ---------------------------------------------------------

  const renderRegisteredEmpty =
    () => {
      if (loading) {
        return (
          <View
            style={
              styles.smallEmptyView
            }>
            <ActivityIndicator
              size="small"
              color={COLORS.subPrimary}
            />
          </View>
        );
      }

      return (
        <View
          style={
            styles.smallEmptyView
          }>

          <Icon
            name="people"
            size={35}
            color="#AAAAAA"
          />

          <Text
            style={
              styles.emptyTitle
            }>
            No members available
          </Text>

          <Text
            style={
              styles.emptyText
            }>
            All registered contacts are
            already members of this group.
          </Text>
        </View>
      );
    };

  // ---------------------------------------------------------
  // Invite empty
  // ---------------------------------------------------------

  const renderInviteEmpty =
    () => {
      if (loading) {
        return (
          <View
            style={
              styles.smallEmptyView
            }>
            <ActivityIndicator
              size="small"
              color={COLORS.subPrimary}
            />
          </View>
        );
      }

      return (
        <View
          style={
            styles.smallEmptyView
          }>

          <Icon
            name="check"
            size={35}
            color={COLORS.primary}
          />

          <Text
            style={
              styles.emptyTitle
            }>
            All contacts are registered
          </Text>

          <Text
            style={
              styles.emptyText
            }>
            You don't have any unregistered
            contacts.
          </Text>
        </View>
      );
    };

  // ---------------------------------------------------------
  // Render
  // ---------------------------------------------------------

  return (
    <View style={styles.container}>

      {/* Safe Area */}

      <View
        style={{
          height: insets.top,
          backgroundColor:
            COLORS.primary,
        }}
      />

      {/* Header */}

      <View
        style={styles.headerView}>

        <Header
          title="Add Members"
          onPress={() =>
            navigation.goBack()
          }
        />
      </View>

      {/* Main Content */}

      <View
        style={styles.content}>

        {/* Search */}

        <View
          style={
            styles.searchContainer
          }>

          <Icon
            name="search"
            size={22}
            color="#777777"
          />

          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search contacts"
            placeholderTextColor="#999999"
            style={
              styles.searchInput
            }
            autoCapitalize="none"
            autoCorrect={false}
          />

          {search.length > 0 && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                setSearch('')
              }>

              <Icon
                name="close"
                size={20}
                color="#777777"
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Selected Members */}
        <ScrollView contentContainerStyle={{paddingBottom: hp(12)}}>
        {selectedUsers.length > 0 && (
          <View
            style={
              styles.selectedSection
            }>

            <Text
              style={
                styles.sectionTitle
              }>
              Selected Members (
              {selectedUsers.length})
            </Text>

            <FlatList
              horizontal
              data={selectedUsers}
              keyExtractor={item =>
                `selected-${item.id}`
              }
              renderItem={
                renderSelectedUser
              }
              showsHorizontalScrollIndicator={
                false
              }
              contentContainerStyle={
                styles.selectedList
              }
            />
          </View>
        )}

        {/* Registered Users */}

        <View
          style={
            styles.sectionHeaderRow
          }>

          <View>
            <Text
              style={
                styles.sectionTitle
              }>
              Registered Users
            </Text>

            <Text
              style={
                styles.sectionSubtitle
              }>
              Select people to add to this
              group
            </Text>
          </View>

          <View
            style={
              styles.countBadge
            }>
            <Text
              style={
                styles.countBadgeText
              }>
              {
                filteredRegisteredContacts.length
              }
            </Text>
          </View>
        </View>

        <FlatList
          data={
            filteredRegisteredContacts
          }
          keyExtractor={item =>
            `registered-${item.id}`
          }
          renderItem={
            renderRegisteredUser
          }
          scrollEnabled={false}
          showsVerticalScrollIndicator={
            false
          }
          contentContainerStyle={
            styles.contactList
          }
          ListEmptyComponent={
            renderRegisteredEmpty
          }
          keyboardShouldPersistTaps="handled"
        />

        {/* Invite Users */}

        <View
          style={
            styles.inviteSection
          }>

          <View
            style={
              styles.sectionHeaderRow
            }>

            <View>
              <Text
                style={
                  styles.sectionTitle
                }>
                Invite User
              </Text>

              <Text
                style={
                  styles.sectionSubtitle
                }>
                Invite contacts who are not
                registered
              </Text>
            </View>

            <View
              style={
                styles.inviteCountBadge
              }>
              <Text
                style={
                  styles.inviteCountBadgeText
                }>
                {
                  filteredInviteContacts.length
                }
              </Text>
            </View>
          </View>

          <FlatList
            data={
              filteredInviteContacts
            }
            keyExtractor={item =>
              `invite-${item.id}`
            }
            renderItem={
              renderInviteUser
            }
            scrollEnabled={false}
            showsVerticalScrollIndicator={
              false
            }
            contentContainerStyle={
              styles.contactList
            }
            ListEmptyComponent={
              renderInviteEmpty
            }
            keyboardShouldPersistTaps="handled"
          />
        </View>
        </ScrollView>
      </View>

      {/* Bottom Add Button */}

      {selectedUsers.length > 0 && (
        <View
          style={[
            styles.bottomButtonContainer,
            {
              paddingBottom:
                insets.bottom + hp(1),
            },
          ]}>

          <TouchableOpacity
            activeOpacity={0.8}
            disabled={addingMembers}
            style={[
              styles.continueButton,
              addingMembers &&
                styles.continueButtonDisabled,
            ]}
            onPress={
              addMembersToGroup
            }>

            {addingMembers ? (
              <ActivityIndicator
                size="small"
                color={
                  COLORS.white
                }
              />
            ) : (
              <>
                <Text
                  style={
                    styles.continueButtonText
                  }>
                  Add Members (
                  {selectedUsers.length})
                </Text>

                <Icon
                  name="check"
                  size={18}
                  color={
                    COLORS.white
                  }
                />
              </>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default AddMembersScreen;
