import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import backArrow from '../../images/backArrow.png';
import exit from '../../images/exit.png';
import Icon from '../../components/Icon';
import {
  portraitStyles,
  landscapeStyles,
} from './styles';
import useOrientation from '../../components/OrientationComponent';
import {COLORS, Fonts} from '../../utils';
import {normalize, wp} from '../../components/responsive';
import {useTranslation} from 'react-i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useAuthStore from '../../store/authStore';
import { showMessage } from 'react-native-flash-message';
import {onAddCommonJsonApi, onDeleteCommonApi} from '../../services/Api';

const GroupDetailsScreen = ({navigation, route}) => {
  const {profileData} = useAuthStore();
  const currentUserId = Number(profileData?.id);
  const orientation = useOrientation();
  const isPortrait = orientation === 'portrait';
  const styles = isPortrait ? portraitStyles : landscapeStyles;
  const insets = useSafeAreaInsets();
  const {t} = useTranslation();
  const groupDetails = route?.params?.groupDetails || {};
  const groupName = groupDetails.name || 'Nutrition Support Group';
  const groupImage = groupDetails.logo || null;
  const routeMembers = Array.isArray(groupDetails.members)
    ? groupDetails.members
    : [];
  const [members, setMembers] = useState(routeMembers);
  const [showAllMembers, setShowAllMembers] = useState(false);
  const memberCount = members.length;
  const displayedMembers = showAllMembers
    ? members
    : members.slice(0, 3);

  useEffect(() => {
    setMembers(
      Array.isArray(groupDetails.members)
        ? groupDetails.members
        : [],
    );
    setShowAllMembers(false);
  }, [groupDetails.members]);

  const handleLeaveGroup = async () => {
    Alert.alert(
      'Leave Group',
      'Are you sure you want to leave this group?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Leave',
          style: 'destructive',
          onPress: () => {
            console.log('Leave group');
            onLeaveApiData();
          },
        },
      ],
    );
  };

  const onLeaveApiData = async () => {
    try {
      let raw = JSON.stringify({});
      const response = await onAddCommonJsonApi(`chat-groups/${groupDetails.id}/leave`, raw);
      if (response.data.status) {
        navigation.navigate('CommunityForum');
      }
    } catch (err) {
      console.log('Error:', err);
      showMessage({
        message: 'Server is down. please try after sometime.',
        duration: 3000,
        icon: 'danger',
        type: 'danger',
      });
    }
  };

  const getMemberId = member =>
    member?.user_id ?? member?.user?.id ?? member?.id;

  const removeMember = member => {
    const memberId = getMemberId(member);

    if (memberId === null || memberId === undefined) {
      showMessage({
        message: 'Unable to identify this member.',
        duration: 3000,
        icon: 'danger',
        type: 'danger',
      });
      return;
    }

    Alert.alert(
      'Remove Member',
      `Remove ${member?.name || 'this member'} from the group?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await onDeleteCommonApi(
                `chat-groups/${groupDetails.id}/members/${memberId}`,
              );

              if (response.data.status) {
                setMembers(currentMembers =>
                  currentMembers.filter(
                    currentMember =>
                      String(getMemberId(currentMember)) !==
                      String(memberId),
                  ),
                );
                showMessage({
                  message: 'Member removed successfully.',
                  duration: 3000,
                  icon: 'success',
                  type: 'success',
                });
              }
            } catch (error) {
              console.log('Remove member error:', error);
              showMessage({
                message: 'Unable to remove member. Please try again.',
                duration: 3000,
                icon: 'danger',
                type: 'danger',
              });
            }
          },
        },
      ],
    );
  };

  const renderMember = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.memberRow}
        activeOpacity={0.7}
        onLongPress={() => {
          if (currentUserId == groupDetails?.created_by) {
            removeMember(item);
          }
        }}
        onPress={() => {
          console.log(
            'Selected member:',
            item.id,
          );
        }}>

        <View style={styles.memberAvatar}>
          <Text style={styles.memberAvatarText}>
            {item.name
              ?.charAt(0)
              ?.toUpperCase()}
          </Text>

          {item.online && (
            <View style={styles.memberOnlineDot} />
          )}
        </View>

        <View style={styles.memberInfo}>
          <Text
            numberOfLines={1}
            style={styles.memberName}>
            {item.name}
          </Text>

          <Text style={styles.memberRole}>
            {item.pivot.role}
          </Text>
        </View>

        {item.pivot.role === 'admin' && (
          <View style={styles.adminBadge}>
            <Text style={styles.adminBadgeText}>
              Admin
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>

      {/* SAFE AREA */}
      <View
        style={[
          styles.safeArea,
          {
            height: insets.top,
          },
        ]}
      />

      {/* HEADER */}
      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image
            source={backArrow}
            style={styles.backArrow}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Group Info
        </Text>
        {currentUserId == groupDetails?.created_by ? (
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => {
              navigation.navigate('EditGroupScreen', {
                groupDetails: groupDetails,
              });
            }}>
            <Icon
              name="edit"
              size={21}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.headerButton} />
        )}
      </View>

      <FlatList
        data={displayedMembers}
        keyExtractor={item => item.id}
        renderItem={renderMember}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.contentContainer
        }
        ListHeaderComponent={
          <>
            {/* GROUP PROFILE */}
            <View style={styles.groupProfile}>

              {groupImage ? (
                <Image
                  source={{uri: groupImage}}
                  style={styles.groupImage}
                />
              ) : (
                <View
                  style={
                    styles.groupImagePlaceholder
                  }>
                  <Text
                    style={
                      styles.groupImageText
                    }>
                    {groupName
                      ?.charAt(0)
                      ?.toUpperCase()}
                  </Text>
                </View>
              )}

              <Text style={styles.groupName}>
                {groupName}
              </Text>

              <Text style={styles.groupMembers}>
                {memberCount} members
              </Text>

              <Text style={styles.typeMembers}>
                {groupDetails.type}
              </Text>
            </View>

            {/* DESCRIPTION */}
            {/* <View style={styles.card}>

              <Text style={styles.sectionTitle}>
                About Group
              </Text>

              <Text style={styles.description}>
                Welcome to the {groupName}. This
                community is a place where members
                can share healthy lifestyle tips,
                recipes, fitness ideas and support
                each other.
              </Text>

            </View> */}

            {/* ACTIONS */}
            <View style={styles.card}>

              {/* <TouchableOpacity
                style={styles.actionRow}
                onPress={() => {
                  setIsMuted(!isMuted);
                }}>

                <View
                  style={styles.actionIcon}>
                  <Icon
                    name={
                      isMuted
                        ? 'bell-off'
                        : 'bell'
                    }
                    size={21}
                    color={COLORS.primary}
                  />
                </View>

                <Text style={styles.actionText}>
                  {isMuted
                    ? 'Unmute Notifications'
                    : 'Mute Notifications'}
                </Text>

                <View style={styles.actionArrow}>
                  <Icon
                    name="chevronRight"
                    size={24}
                    color={COLORS.white}
                  />
                </View>
              </TouchableOpacity>

              <View style={styles.divider} /> */}

              <TouchableOpacity
                style={styles.actionRow}
                onPress={() => {
                  navigation.navigate('MediaListScreen', {
                    groupName: groupDetails?.name,
                    groupId: groupDetails?.id,
                  });
                }}>

                <View
                  style={styles.actionIcon}>
                  <Icon
                    name="image"
                    size={21}
                    color={COLORS.primary}
                  />
                </View>

                <Text style={styles.actionText}>
                  Media, Links & Documents
                </Text>

                <Text style={styles.actionCount}>
                  18
                </Text>

                <Icon
                  name="chevronRight"
                  size={24}
                  color={COLORS.white}
                />
              </TouchableOpacity>

              {/* <View style={styles.divider} />

              <TouchableOpacity
                style={styles.actionRow}
                onPress={() => {
                  console.log('Search clicked');
                }}>

                <View
                  style={styles.actionIcon}>
                  <Icon
                    name="search"
                    size={24}
                    color={COLORS.primary}
                  />
                </View>

                <Text style={styles.actionText}>
                  Search in Conversation
                </Text>

                <Icon
                  name="chevronRight"
                  size={24}
                  color={COLORS.white}
                />
              </TouchableOpacity> */}

            </View>

            {/* MEMBERS HEADER */}
            <View style={styles.membersHeader}>

              <Text style={styles.sectionTitle}>
                Members
              </Text>

              <Text style={styles.memberTotal}>
                {memberCount}
              </Text>

            </View>

            {/* ADD MEMBER */}
            {currentUserId == groupDetails?.created_by && (
              <TouchableOpacity
                style={styles.addMemberRow}
                onPress={() => navigation.navigate('AddMembersScreen', {
                  groupDetails: groupDetails,
                })}>
                <View style={styles.addMemberIcon}>
                  <Icon
                    name="add"
                    size={23}
                    color={COLORS.black}
                  />
                </View>
                <Text style={styles.addMemberText}>
                  Add Members
                </Text>
              </TouchableOpacity>
            )}
          </>
        }
        ListFooterComponent={
          <>
            {!showAllMembers &&
              members.length > 3 && (
                <TouchableOpacity
                  style={styles.seeAllButton}
                  onPress={() =>
                    setShowAllMembers(true)
                  }>
                  <Text
                    style={
                      styles.seeAllText
                    }>
                    View All Members
                  </Text>

                  <Icon
                    name="chevronRight"
                    size={24}
                    color={COLORS.white}
                  />
                </TouchableOpacity>
              )}

            {/* LEAVE GROUP */}
            <View style={styles.dangerCard}>

              <TouchableOpacity
                style={styles.leaveRow}
                onPress={handleLeaveGroup}>

                <View
                  style={styles.leaveIcon}>
                  <Image
                    source={exit}
                    style={[styles.backArrow, {tintColor: COLORS.subPrimary}]}
                  />
                </View>

                <Text style={styles.leaveText}>
                  Leave Group
                </Text>

              </TouchableOpacity>

            </View>

            <View
              style={styles.bottomSpace}
            />
          </>
        }
      />
    </View>
  );
};

export default GroupDetailsScreen;
