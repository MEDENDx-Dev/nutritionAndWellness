// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   FlatList,
//   TouchableOpacity,
//   TextInput,
//   Image,
//   StatusBar,
// } from 'react-native';
// import Icon from '../../components/Icon';
// import { portraitStyles, landscapeStyles } from './styles';
// import useOrientation from '../../components/OrientationComponent';
// import { COLORS } from '../../utils';
// import Header from '../../components/HeaderComponent';
// import { useTranslation } from 'react-i18next';
// import down from '../../images/down.png';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// const categories = [
//   'All',
//   'Nutrition',
//   'Fitness',
//   'Mental Health',
//   'Weight Loss',
//   'Sleep',
// ];

// const posts = [
//   {
//     id: '1',
//     user: 'Sarah Johnson',
//     time: '15 min ago',
//     avatar: 'https://i.pravatar.cc/150?img=47',
//     category: 'Nutrition',
//     title: 'What are some healthy breakfast ideas?',
//     description:
//       'I am trying to improve my breakfast routine. What healthy and easy breakfast options do you recommend?',
//     likes: 24,
//     comments: 8,
//     liked: false,
//     pinned: true,
//   },
//   {
//     id: '2',
//     user: 'Michael Brown',
//     time: '1 hour ago',
//     avatar: 'https://i.pravatar.cc/150?img=12',
//     category: 'Fitness',
//     title: 'Best exercises for beginners?',
//     description:
//       'I am just starting my fitness journey. Which exercises would you recommend for someone who is completely new?',
//     likes: 42,
//     comments: 15,
//     liked: true,
//     pinned: false,
//   },
//   {
//     id: '3',
//     user: 'Emily Davis',
//     time: '3 hours ago',
//     avatar: 'https://i.pravatar.cc/150?img=32',
//     category: 'Mental Health',
//     title: 'How do you manage stress during work?',
//     description:
//       'Work has been quite stressful lately. Would love to hear what everyone does to relax and manage stress.',
//     likes: 36,
//     comments: 19,
//     liked: false,
//     pinned: false,
//   },
//   {
//     id: '4',
//     user: 'David Wilson',
//     time: '5 hours ago',
//     avatar: 'https://i.pravatar.cc/150?img=13',
//     category: 'Weight Loss',
//     title: 'My 30-day weight loss progress',
//     description:
//       'Sharing my progress after following a consistent diet and workout routine for the past month.',
//     likes: 67,
//     comments: 21,
//     liked: false,
//     pinned: false,
//   },
// ];

// const CommunityForum = ({navigation}) => {
//   const orientation = useOrientation();
//   const isPortrait = orientation === 'portrait';
//   const styles = isPortrait ? portraitStyles : landscapeStyles;
//   const insets = useSafeAreaInsets();
//   const { t } = useTranslation();
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [search, setSearch] = useState('');
//   const [postList, setPostList] = useState(posts);

//   const filteredPosts = postList.filter(item => {
//     const categoryMatch =
//       selectedCategory === 'All' ||
//       item.category === selectedCategory;

//     const searchMatch =
//       item.title.toLowerCase().includes(search.toLowerCase()) ||
//       item.description.toLowerCase().includes(search.toLowerCase());

//     return categoryMatch && searchMatch;
//   });

//   const toggleLike = id => {
//     setPostList(prev =>
//       prev.map(item =>
//         item.id === id
//           ? {
//               ...item,
//               liked: !item.liked,
//               likes: item.liked ? item.likes - 1 : item.likes + 1,
//             }
//           : item,
//       ),
//     );
//   };

//   const renderPost = ({item}) => {
//     return (
//       <TouchableOpacity
//         activeOpacity={0.9}
//         style={styles.postCard}
//         onPress={() => navigation.navigate('PostDetailsScreen', {post: item})}>

//         {/* {item.pinned && (
//           <View style={styles.pinnedContainer}>
//             <Text style={styles.pinnedText}>Pinned Post</Text>
//           </View>
//         )} */}

//         <View style={styles.userRow}>
//           <Image
//             source={{uri: item.avatar}}
//             style={styles.avatar}
//           />

//           <View style={styles.userInfo}>
//             <Text style={styles.userName}>{item.user}</Text>
//             <Text style={styles.postTime}>{item.time}</Text>
//           </View>

//           <TouchableOpacity style={styles.moreButton}>
//             <Icon
//               name="ellipsis-horizontal"
//               size={21}
//               color={COLORS.white}
//             />
//           </TouchableOpacity>
//         </View>

//         <View style={styles.categoryBadge}>
//           <Text style={styles.categoryBadgeText}>
//             {item.category}
//           </Text>
//         </View>

//         <Text style={styles.postTitle}>{item.title}</Text>

//         <Text
//           style={styles.postDescription}
//           numberOfLines={3}>
//           {item.description}
//         </Text>

//         <View style={styles.separator} />

//         <View style={styles.actionsRow}>
//           <TouchableOpacity
//             style={styles.actionButton}
//             onPress={() => toggleLike(item.id)}>
//             <Icon
//               name={item.liked ? 'heart' : 'heart-outline'}
//               size={21}
//               color={item.liked ? COLORS.subPrimary : COLORS.white}
//             />
//             <Text
//               style={[
//                 styles.actionText,
//                 item.liked && styles.likedText,
//               ]}>
//               {item.likes}
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.actionButton}>
//             <Icon
//               name="chatbubble-outline"
//               size={20}
//               color={COLORS.white}
//             />
//             <Text style={styles.actionText}>
//               {item.comments}
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.actionButton}>
//             <Icon
//               name="share-social-outline"
//               size={21}
//               color={COLORS.white}
//             />
//             <Text style={styles.actionText}>{t('share')}</Text>
//           </TouchableOpacity>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   const ListHeader = () => (
//     <View>
//       {/* Header */}
//       {/* <View style={styles.header}>
//         <View>
//           <Text style={styles.headerTitle}>Community</Text>
//           <Text style={styles.headerSubtitle}>
//             Connect, share & grow together
//           </Text>
//         </View>

//         <TouchableOpacity style={styles.notificationButton}>
//           <Icon
//             name="notifications"
//             size={23}
//             color={COLORS.white}
//           />
//           <View style={styles.notificationDot} />
//         </TouchableOpacity>
//       </View> */}
      

//       {/* Search */}
//       <View style={styles.searchContainer}>
//         <Icon
//           name="search"
//           size={21}
//           color={COLORS.white}
//         />

//         <TextInput
//           value={search}
//           onChangeText={setSearch}
//           placeholder="Search discussions..."
//           placeholderTextColor="#999"
//           style={styles.searchInput}
//         />

//         {search.length > 0 && (
//           <TouchableOpacity onPress={() => setSearch('')}>
//             <Icon
//               name="close"
//               size={20}
//               color={COLORS.white}
//             />
//           </TouchableOpacity>
//         )}
//       </View>

//       {/* Categories */}
//       <FlatList
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         data={categories}
//         keyExtractor={item => item}
//         contentContainerStyle={styles.categoryList}
//         renderItem={({item}) => (
//           <TouchableOpacity
//             onPress={() => setSelectedCategory(item)}
//             style={[
//               styles.categoryChip,
//               selectedCategory === item &&
//                 styles.activeCategoryChip,
//             ]}>
//             <Text
//               style={[
//                 styles.categoryText,
//                 selectedCategory === item &&
//                   styles.activeCategoryText,
//               ]}>
//               {item}
//             </Text>
//           </TouchableOpacity>
//         )}
//       />

//       {/* Community Stats */}
//       {/* <View style={styles.statsCard}>
//         <View style={styles.statItem}>
//           <Text style={styles.statNumber}>12.5K</Text>
//           <Text style={styles.statLabel}>Members</Text>
//         </View>

//         <View style={styles.statDivider} />

//         <View style={styles.statItem}>
//           <Text style={styles.statNumber}>2.8K</Text>
//           <Text style={styles.statLabel}>Discussions</Text>
//         </View>

//         <View style={styles.statDivider} />

//         <View style={styles.statItem}>
//           <Text style={styles.statNumber}>856</Text>
//           <Text style={styles.statLabel}>Today</Text>
//         </View>
//       </View> */}

//       {/* Section Header */}
//       <View style={styles.sectionHeader}>
//         <Text style={styles.sectionTitle}>
//           Community Discussions
//         </Text>

//         <TouchableOpacity>
//           <Text style={styles.viewAllText}>View All</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <View
//         style={{
//           width: '100%',
//           paddingTop: insets.top,
//           backgroundColor: COLORS.primary,
//         }}
//       />
//       <View style={styles.headerView}>
//         <Header title={t('community_forum')} onPress={() => navigation.goBack()} />
//       </View>
//       <FlatList
//         data={filteredPosts}
//         keyExtractor={item => item.id}
//         renderItem={renderPost}
//         ListHeaderComponent={ListHeader}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.content}
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Icon
//               name="chatbubbles-outline"
//               size={55}
//               color={COLORS.white}
//             />

//             <Text style={styles.emptyTitle}>
//               {t('no_discussion_found')}
//             </Text>

//             <Text style={styles.emptyText}>
//               {t('try_another_search')}
//             </Text>
//           </View>
//         }
//       />

//       {/* Floating Create Post Button */}
//       <TouchableOpacity
//         style={styles.createPostButton}
//         activeOpacity={0.85}
//         onPress={() =>
//           navigation.navigate('CreatePostScreen')
//         }>
//         <Icon
//           name="add"
//           size={27}
//           color={COLORS.white}
//         />
//         <Text style={styles.createPostText}>
//           {t('create_post')}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default CommunityForum;



import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  StatusBar,
  ActivityIndicator,
  Modal,
} from 'react-native';
import Icon from '../../components/Icon';
import { portraitStyles, landscapeStyles } from './styles';
import useOrientation from '../../components/OrientationComponent';
import { COLORS } from '../../utils';
import Header from '../../components/HeaderComponent';
import { useTranslation } from 'react-i18next';
import searchIcon from '../../images/search.png';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { onGetCommonApi } from '../../services/Api';
import moment from 'moment';

const categories = [
  'All',
  'Nutrition',
  'Fitness',
  'Mental Health',
  'Weight Loss',
  'Sleep',
];

// const posts = [
//   {
//     id: '1',
//     user: 'Sarah Johnson',
//     time: '15 min ago',
//     avatar: 'https://i.pravatar.cc/150?img=47',
//     category: 'Nutrition',
//     title: 'What are some healthy breakfast ideas?',
//     description:
//       'I am trying to improve my breakfast routine. What healthy and easy breakfast options do you recommend?',
//     likes: 24,
//     comments: 8,
//     liked: false,
//     pinned: true,
//   },
//   {
//     id: '2',
//     user: 'Michael Brown',
//     time: '1 hour ago',
//     avatar: 'https://i.pravatar.cc/150?img=12',
//     category: 'Fitness',
//     title: 'Best exercises for beginners?',
//     description:
//       'I am just starting my fitness journey. Which exercises would you recommend for someone who is completely new?',
//     likes: 42,
//     comments: 15,
//     liked: true,
//     pinned: false,
//   },
//   {
//     id: '3',
//     user: 'Emily Davis',
//     time: '3 hours ago',
//     avatar: 'https://i.pravatar.cc/150?img=32',
//     category: 'Mental Health',
//     title: 'How do you manage stress during work?',
//     description:
//       'Work has been quite stressful lately. Would love to hear what everyone does to relax and manage stress.',
//     likes: 36,
//     comments: 19,
//     liked: false,
//     pinned: false,
//   },
//   {
//     id: '4',
//     user: 'David Wilson',
//     time: '5 hours ago',
//     avatar: 'https://i.pravatar.cc/150?img=13',
//     category: 'Weight Loss',
//     title: 'My 30-day weight loss progress',
//     description:
//       'Sharing my progress after following a consistent diet and workout routine for the past month.',
//     likes: 67,
//     comments: 21,
//     liked: false,
//     pinned: false,
//   },
// ];

const posts = [
  {
    id: '1',
    user: 'Nutrition Support Group',
    time: '12:45 AM',
    avatar: 'https://i.pravatar.cc/150?img=47',
    category: 'Nutrition',
    title: 'What are some healthy breakfast ideas?',
    description:
      'I am trying to improve my breakfast routine. What healthy and easy breakfast options do you recommend?',
    likes: 24,
    comments: 8,
    liked: false,
    pinned: true,
  },
];

const CommunityForum = ({navigation}) => {
  const orientation = useOrientation();
  const isPortrait = orientation === 'portrait';
  const styles = isPortrait ? portraitStyles : landscapeStyles;
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [postList, setPostList] = useState(posts);
  const [myGroupList, setMyGroupList] = useState([]);
  const [searchGroupList, setSearchGroupList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onGetGroupListData();
    }, [])
  );

  const onGetGroupListData = async () => {
    try {
      setIsLoading(true)
      const responseData = await onGetCommonApi('chat-groups/my');
      if (responseData.data.status) {
        setMyGroupList(responseData.data.data.groups);
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      console.log('ERROR:',err);
    }
  };
  
  const onGetPublicGroupListData = async (query = search) => {
    const trimmedQuery = (query || '').trim();

    if (!trimmedQuery) {
      setSearchGroupList([]);
      return;
    }

    try {
      setIsSearchLoading(true);
      const responseData = await onGetCommonApi(
        `chat-groups/public?search=${encodeURIComponent(trimmedQuery)}`,
      );

      if (responseData.data.status) {
        setSearchGroupList(responseData.data.data.groups || []);
      }
    } catch (err) {
      console.log('ERROR:', err);
    } finally {
      setIsSearchLoading(false);
    }
  };

  const handleOpenSearchModal = () => {
    setSearchGroupList([]);
    setIsSearchModalVisible(true);
  };

  const handleSelectPublicGroup = group => {
    setSearch('');
    setIsSearchModalVisible(false);

    navigation.navigate('MessageScreen', {
      ...group,
      groupName: group.name,
      groupImage: group.logo,
      memberCount: group.members_count || 0,
      isJoined: group.is_joined || false,
    });
  };

  const renderPost = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.postCard}
        onPress={() => 
          navigation.navigate('MessageScreen', {
            ...item,
            groupName: item.name,
            groupImage: item.logo,
            memberCount: item.members_count || 0,
            isJoined: true,
          })
        }>
        <View style={styles.userRow}>
          {/* <Image
            source={{uri: item.avatar}}
            style={styles.avatar}
          /> */}
          {item?.logo ? (
            <Image
              source={{uri: item?.logo}}
              style={styles.groupImage}
            />
          ) : (
            <View style={styles.groupImagePlaceholder}>
              <Text style={styles.groupImageText}>
                {item.name
                  ?.charAt(0)
                  ?.toUpperCase()}
              </Text>
            </View>
          )}
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.postTime}>user1 - i have one question.</Text>
          </View>
          <Text style={styles.postTime}>{moment(item.updated_at).format('DD-MM-YYYY')}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSearchGroupItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.postCard}
        onPress={() => handleSelectPublicGroup(item)}
        activeOpacity={0.8}>
        <View style={styles.userRow}>
          {item?.groupImage || item?.logo ? (
            <Image
              source={{uri: item?.groupImage || item?.logo}}
              style={styles.groupImage}
            />
          ) : (
            <View style={styles.groupImagePlaceholder}>
              <Text style={styles.groupImageText}>
                {item?.name?.charAt(0)?.toUpperCase()}
              </Text>
            </View>
          )}

          <View style={styles.userInfo}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.postTime}>
              {item.members_count || item.member_count || 0} members
            </Text>
          </View>

          <Text style={styles.postTime}>
            {moment(item.updated_at).format('DD-MM-YYYY')}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',
          paddingTop: insets.top,
          backgroundColor: COLORS.primary,
        }}
      />
      <View style={styles.headerView}>
        <Header title={t('community_forum')} onPress={() => navigation.goBack()} />
      </View>
      {/* Search */}
      <View style={styles.searchContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleOpenSearchModal}>
          <Icon
            name="search"
            size={22}
            color="#777777"
          />
        </TouchableOpacity>

        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search public groups"
          placeholderTextColor="#999999"
          style={styles.searchInput}
          onFocus={handleOpenSearchModal}
        />

        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Icon
              name="close"
              size={20}
              color="#777777"
            />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={myGroupList}
        keyExtractor={item => item.id}
        renderItem={renderPost}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListEmptyComponent={
          isLoading ? (
            <View style={styles.emptyContainer}>
              <ActivityIndicator color={COLORS.white} size={'large'} />
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Icon
                name="chatbubbles-outline"
                size={55}
                color={COLORS.white}
              />
              <Text style={styles.emptyTitle}>
                {t('no_discussion_found')}
              </Text>
              <Text style={styles.emptyText}>
                {t('try_another_search')}
              </Text>
            </View>
          )
        }
      />
      <TouchableOpacity
        style={styles.createPostButton}
        activeOpacity={0.85}
        onPress={() =>
          navigation.navigate('CreateGroupScreen')
        }>
        <Icon
          name="add"
          size={27}
          color={COLORS.white}
        />
        <Text style={styles.createPostText}>
          {t('create_post')}
        </Text>
      </TouchableOpacity>

      <Modal
        transparent
        visible={isSearchModalVisible}
        animationType="slide"
        onRequestClose={() => setIsSearchModalVisible(false)}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.45)',
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              backgroundColor: COLORS.primary,
              height: '100%',
              padding: 16,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 12,
              }}>
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 18,
                  fontWeight: '700',
                }}>
                Search Groups
              </Text>

              <TouchableOpacity
                onPress={() => {setSearch(''), setIsSearchModalVisible(false)}}>
                <Text
                  style={{
                    color: COLORS.white,
                    fontSize: 14,
                    fontWeight: '600',
                  }}>
                  Close
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#ffffff',
                borderRadius: 10,
                paddingHorizontal: 10,
                marginBottom: 12,
              }}>
              <TextInput
                value={search}
                onChangeText={text => {
                  setSearch(text);
                  onGetPublicGroupListData(text);
                }}
                placeholder="Search public groups"
                placeholderTextColor="#999999"
                autoFocus={true}
                style={{
                  flex: 1,
                  paddingVertical: 10,
                  color: '#222222',
                  fontSize: 14,
                }}
              />
            </View>

            {isSearchLoading ? (
              <View
                style={{
                  paddingVertical: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <ActivityIndicator color={COLORS.white} size="large" />
              </View>
            ) : (
              <FlatList
                data={searchGroupList}
                keyExtractor={item => `public-group-${item.id}`}
                renderItem={renderSearchGroupItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 16}}
                ListEmptyComponent={
                  <View style={styles.emptyContainer}>
                    <Image style={styles.searchImage} source={searchIcon} />
                    <Text style={styles.emptyTitle}>
                      Search Group not found.
                    </Text>
                    <Text style={styles.emptyText}>
                      Try another search keyword.
                    </Text>
                  </View>
                }
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CommunityForum;