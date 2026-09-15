// import React, {useState, useRef, useCallback} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   TextInput,
//   KeyboardAvoidingView,
//   Platform,
//   Image,
// } from 'react-native';
// import backArrow from '../../images/backArrow.png';
// import plus from '../../images/plus.png';
// import Icon from '../../components/Icon';
// import {
//   portraitStyles,
//   landscapeStyles,
// } from './styles';

// import useOrientation from '../../components/OrientationComponent';
// import {COLORS, Fonts} from '../../utils';
// import {normalize, wp} from '../../components/responsive';
// import {useTranslation} from 'react-i18next';
// import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import { useFocusEffect } from '@react-navigation/native';
// import { onAddCommonFormApi, onAddCommonJsonApi, onGetCommonApi } from '../../services/Api';
// import useAuthStore from '../../store/authStore';

// const MessageScreen = ({navigation, route}) => {
//   const orientation = useOrientation();
//   const isPortrait = orientation === 'portrait';
//   const styles = isPortrait
//     ? portraitStyles
//     : landscapeStyles;

//   const insets = useSafeAreaInsets();
//   const {t} = useTranslation();
//   const flatListRef = useRef(null);
//   const {profileData} = useAuthStore();
//   const group = route?.params || {};
//   const groupName = group.groupName || 'Nutrition Support Group';
//   const memberCount = group.memberCount || 24;
//   const groupImage = group.groupImage;
//   const currentUserId = '1';
//   const [messageText, setMessageText] = useState('');
//   const [joinGroup, setJoinGroup] = useState(false);
//   const [groupId, setGroupId] = useState('');
//   const [messages, setMessages] = useState([]);
  
//   useFocusEffect(
//     useCallback(() => {
//       setJoinGroup(group.isJoined);
//       setGroupId(group.id);
//       console.log('Get group Data:', group);

//       setMessages([
//     {
//       id: '1',
//       senderId: '2',
//       senderName: 'chirag',
//       message: 'Hello everyone 👋',
//       time: '10:01 AM',
//       date: 'Today',
//     },
//     {
//       id: '2',
//       senderId: '3',
//       senderName: 'Test User',
//       message:
//         'Good morning! Has anyone tried the new healthy breakfast recipe?',
//       time: '10:02 AM',
//       date: 'Today',
//     },
//     {
//       id: '3',
//       senderId: '1',
//       senderName: 'You',
//       message: 'Yes! I tried it this morning. It was really good.',
//       time: '10:04 AM',
//       date: 'Today',
//     },
//     {
//       id: '4',
//       senderId: '4',
//       senderName: 'chirag',
//       message: 'Can you share the recipe?',
//       time: '10:05 AM',
//       date: 'Today',
//     },
//     {
//       id: '5',
//       senderId: '1',
//       senderName: 'You',
//       message: 'Sure, I will share it here 👍',
//       time: '10:06 AM',
//       date: 'Today',
//     },
//   ]);
//       onGetMessageData();
//     }, [])
//   );

//   const onGetMessageData = async () => {
//     try {
//       const responseData = await onGetCommonApi(`chat-groups/${group.id}/messages`);
      
//       if (responseData.data.status) {
//         console.log('Get message Response:', responseData.data.data.messages);
//       }
//     } catch (err) {
//       console.log('Error:', err);
//     }
//   }

//   const onHandleSendMessage = async () => {
//     try {
//       var formData = new FormData();
//       formData.append("prompt", messageText);
//       if (imageAttachment) {
//           formData.append("image", imageAttachment);
//       }
//       const response = await onAddCommonFormApi(`chat-groups/${group.id}/messages`, formData);
//       if (response.data.status);
//     } catch (error) {
//       console.log('Error:', error);      
//     }
//   };

//   const handleSendMessage = () => {
//     const text = messageText.trim();
//     if (!text) {
//       return;
//     }
//     const newMessage = {
//       id: Date.now().toString(),
//       senderId: currentUserId,
//       senderName: 'You',
//       message: text,
//       time: formatTime(new Date()),
//       date: 'Today',
//     };
//     setMessages(prevMessages => [
//       ...prevMessages,
//       newMessage,
//     ]);
//     setMessageText('');
//     setTimeout(() => {
//       flatListRef.current?.scrollToEnd({
//         animated: true,
//       });
//     }, 100);
//   };

//   const formatTime = date => {
//     return date.toLocaleTimeString([], {
//       hour: '2-digit',
//       minute: '2-digit',
//     });
//   };

//   const onJoinGroupHandle = async () => {
//     try {
//       let raw = JSON.stringify({});
//       const responseData = await onAddCommonJsonApi(`chat-groups/${groupId}/join`, raw);
//       console.log('Get Response:', responseData, groupId);
//       if (responseData.data.status) {
//         setJoinGroup(true);
//       }
//     } catch (err) {
//       console.log('Error:', err, groupId);
//     }
//   };

//   const renderMessage = ({item, index}) => {
//     const isMine = item.senderId === currentUserId;
//     const previousMessage = messages[index - 1];
//     const showDate =
//       !previousMessage ||
//       previousMessage.date !== item.date;
//     return (
//       <View>
//         {showDate && (
//           <View style={styles.dateContainer}>
//             <View style={styles.dateLine} />
//             <Text style={styles.dateText}>
//               {item.date}
//             </Text>
//             <View style={styles.dateLine} />
//           </View>
//         )}
//         <View
//           style={[
//             styles.messageRow,
//             isMine && styles.myMessageRow,
//           ]}>
//           {!isMine && (
//             <View style={styles.avatar}>
//               <Text style={styles.avatarText}>
//                 {item.senderName
//                   ?.charAt(0)
//                   ?.toUpperCase()}
//               </Text>
//             </View>
//           )}
//           <View
//             style={[
//               styles.messageContent,
//               isMine
//                 ? styles.myMessageContent
//                 : styles.otherMessageContent,
//             ]}>
//             {!isMine && (
//               <Text style={styles.senderName}>
//                 {item.senderName}
//               </Text>
//             )}
//             <View
//               style={[
//                 styles.messageBubble,
//                 isMine
//                   ? styles.myBubble
//                   : styles.otherBubble,
//               ]}>
//               <Text
//                 style={[
//                   styles.messageText,
//                   isMine
//                     ? styles.myMessageText
//                     : styles.otherMessageText,
//                 ]}>
//                 {item.message}
//               </Text>
//               <View style={styles.messageBottomRow}>
//                 <Text
//                   style={[
//                     styles.messageTime,
//                     isMine &&
//                       styles.myMessageTime,
//                   ]}>
//                   {item.time}
//                 </Text>
//                 {isMine && (
//                   <Text style={styles.readStatus}>
//                     ✓✓
//                   </Text>
//                 )}
//               </View>
//             </View>
//           </View>
//         </View>
//       </View>
//     );
//   };

//   return (
//     <View style={[styles.container, {paddingBottom: 0}]}>
//       <View
//         style={{
//           width: '100%',
//           height: insets.top,
//           backgroundColor: COLORS.primary,
//         }}
//       />
//       <View style={styles.chatHeader}>
//         <TouchableOpacity
//           style={styles.backButton}
//           onPress={() => navigation.goBack()}>
//           <Image
//             source={backArrow}
//             style={styles.backArrow}
//           />
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.groupInfo}
//           activeOpacity={0.8}
//           onPress={() => {
//             navigation.navigate('GroupDetailsScreen', {
//               groupId: group.groupId,
//             });
//           }}>
//           {groupImage ? (
//             <Image
//               source={{uri: groupImage}}
//               style={styles.groupImage}
//             />
//           ) : (
//             <View style={styles.groupImagePlaceholder}>
//               <Text style={styles.groupImageText}>
//                 {groupName
//                   ?.charAt(0)
//                   ?.toUpperCase()}
//               </Text>
//             </View>
//           )}
//           <View style={styles.groupTextContainer}>
//             <Text
//               numberOfLines={1}
//               style={styles.groupName}>
//               {groupName}
//             </Text>
//             <View style={styles.onlineRow}>
//               <View style={styles.onlineDot} />
//               <Text style={styles.memberCount}>
//                 {memberCount} members
//               </Text>
//             </View>
//           </View>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.headerAction}
//           onPress={() => {
//             navigation.navigate('GroupDetailsScreen', {
//               groupId: group.groupId,
//             });
//           }}>
//           <Icon
//             name="ellipsis-vertical"
//             size={24}
//             color={COLORS.white || '#FFFFFF'}
//           />
//         </TouchableOpacity>
//       </View>
//       <KeyboardAvoidingView
//         style={styles.keyboardView}
//         behavior={
//           Platform.OS === 'ios'
//             ? 'padding'
//             : undefined
//         }>
//         <FlatList
//           ref={flatListRef}
//           data={messages}
//           keyExtractor={item => item.id}
//           renderItem={renderMessage}
//           contentContainerStyle={
//             styles.chatContent
//           }
//           showsVerticalScrollIndicator={false}
//           keyboardShouldPersistTaps="handled"
//           onContentSizeChange={() =>
//             flatListRef.current?.scrollToEnd({
//               animated: false,
//             })
//           }
//         />
//         {joinGroup ? (
//           <View style={styles.inputContainer}>
//             <TouchableOpacity
//               style={styles.inputIconButton}
//               onPress={() => {
//                 console.log('Attachment clicked');
//               }}>
//               <Image
//                 source={plus}
//                 style={styles.inputIcon}
//               />
//             </TouchableOpacity>
//             <View style={styles.inputWrapper}>
//               <TextInput
//                 value={messageText}
//                 onChangeText={setMessageText}
//                 placeholder={t('type_message') || 'Type a message...'}
//                 placeholderTextColor="#9A9A9A"
//                 style={styles.textInput}
//                 multiline
//                 maxLength={1000}
//               />
//             </View>
//             <TouchableOpacity
//               style={[
//                 styles.sendButton,
//                 !messageText.trim() &&
//                   styles.sendButtonDisabled,
//               ]}
//               onPress={handleSendMessage}
//               disabled={!messageText.trim()}>
//               <Icon
//                 name="send"
//                 size={19}
//                 color="#FFFFFF"
//               />
//             </TouchableOpacity>
//           </View>
//         ) : (
//           <TouchableOpacity style={styles.joinView} onPress={() => onJoinGroupHandle()}>
//             <Text style={styles.joinText}>Join Group</Text>
//           </TouchableOpacity>
//         )}
//       </KeyboardAvoidingView>
//     </View>
//   );
// };

// export default MessageScreen;


import React, {useState, useRef, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
  Keyboard,
} from 'react-native';
import backArrow from '../../images/backArrow.png';
import plus from '../../images/plus.png';
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
import { useFocusEffect } from '@react-navigation/native';
import { onAddCommonFormApi, onAddCommonJsonApi, onGetCommonApi } from '../../services/Api';
import useAuthStore from '../../store/authStore';
import ImagePicker from "react-native-image-crop-picker";

const MessageScreen = ({navigation, route}) => {
  const orientation = useOrientation();
  const isPortrait = orientation === 'portrait';
  const styles = isPortrait
    ? portraitStyles
    : landscapeStyles;

  const insets = useSafeAreaInsets();
  const {t} = useTranslation();
  const flatListRef = useRef(null);
  const {profileData} = useAuthStore();
  const group = route?.params || {};
  const groupName = group.groupName || 'Nutrition Support Group';
  const memberCount = group.memberCount || 24;
  const groupImage = group.groupImage;
  const currentGroupId = group?.id || '';
  const currentUserId = Number(profileData?.id ?? group?.user_id ?? 1);
  const [messageText, setMessageText] = useState('');
  const [joinGroup, setJoinGroup] = useState(Boolean(group.isJoined));
  const [groupId, setGroupId] = useState(currentGroupId);
  const [messages, setMessages] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [imageAttachment, setImageAttachment] = useState(null);
  const [isGroupDetails, setIsGroupDetails] = useState(null);

  const formatMessageTime = createdAt => {
    if (!createdAt) {
      return '';
    }

    return new Date(createdAt).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatMessageDate = createdAt => {
    if (!createdAt) {
      return 'Today';
    }

    const date = new Date(createdAt);
    const today = new Date();

    if (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    ) {
      return 'Today';
    }

    return date.toLocaleDateString([], {
      month: 'short',
      day: 'numeric',
    });
  };

  const normalizeMessage = useCallback(
    item => {
      const senderId = Number(item.user_id ?? item.sender?.id ?? currentUserId);

      return {
        id: String(item.id ?? `${Date.now()}-${Math.random()}`),
        senderId,
        senderName:
          item.sender?.name ||
          (senderId === currentUserId ? 'You' : 'User'),
        message: item.message || '',
        time: formatMessageTime(item.created_at),
        date: formatMessageDate(item.created_at),
        attachment: item.attachment || null,
        createdAt: item.created_at || null,
      };
    },
    [currentUserId],
  );

  const onGetMessageData = useCallback(
    async (nextGroupId = currentGroupId) => {
      if (!nextGroupId) {
        setMessages([]);
        return;
      }

      try {
        const responseData = await onGetCommonApi(
          `chat-groups/${nextGroupId}/messages`,
        );
        const incomingMessages =
          responseData?.data?.data?.messages || responseData?.data?.data || [];

        const normalizedMessages = Array.isArray(incomingMessages)
          ? incomingMessages
              .map(normalizeMessage)
              .sort(
                (a, b) =>
                  new Date(a.createdAt || 0) - new Date(b.createdAt || 0),
              )
          : [];

        setMessages(normalizedMessages);
      } catch (err) {
        console.log('Error:', err);
        setMessages([]);
      }
    },
    [currentGroupId, normalizeMessage],
  );

  useEffect(() => {
    if (messages.length) {
      requestAnimationFrame(() => {
        flatListRef.current?.scrollToEnd({
          animated: false,
        });
      });
    }
  }, [messages.length]);

  useFocusEffect(
    useCallback(() => {
      const nextGroupId = group?.id || group?.groupId || '';

      setJoinGroup(Boolean(group.isJoined));
      setGroupId(nextGroupId);
      onGetMessageData(nextGroupId);
      onGetGroupDetailsData(nextGroupId);
    }, [group?.id, group?.groupId, group?.isJoined, onGetMessageData]),
  );

  const onGetGroupDetailsData = async (nextGroupId) => {
    try {
      const groupDetailResponse = await onGetCommonApi(`chat-groups/${nextGroupId}`);
      if (groupDetailResponse.data.status) {
        setIsGroupDetails(groupDetailResponse.data.data.group);
      }
    } catch (err) {
      console.log('Group Detail Error:', err);
    }
  }

  const onHandleSendMessage = async () => {
    Keyboard.dismiss();
    const text = messageText.trim();

    if (!text || !currentGroupId || isSending) {
      return;
    }

    try {
      setIsSending(true);

      const formData = new FormData();
      formData.append('message', text);

      const response = await onAddCommonFormApi(
        `chat-groups/${currentGroupId}/messages`,
        formData,
      );

      if (response?.data?.status) {
        setMessageText('');
        await onGetMessageData(currentGroupId);
      }
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setIsSending(false);
    }
  };

  const onDocumentPress = async () => {
    try {
      ImagePicker.openPicker({
        cropping: false,
        mediaType: 'photo',
      }).then((image) => {
        console.log('Get Document Data:::', image);
        console.log('Get Document Data:::', image.path);
        setImageAttachment({
          uri: image.path,
          type: image.mime,
          name: image.filename,
        });
      });
    } catch (err) {
        console.log('onDocumentPress Error:', err);
    }
  };

  const onJoinGroupHandle = async () => {
    try {
      let raw = JSON.stringify({});
      const responseData = await onAddCommonJsonApi(`chat-groups/${currentGroupId}/join`, raw);
      console.log('Get Response:', responseData, currentGroupId);
      if (responseData.data.status) {
        setJoinGroup(true);
        onGetMessageData(currentGroupId);
      }
    } catch (err) {
      console.log('Error:', err, currentGroupId);
    }
  };

  const renderMessage = ({item, index}) => {
    const isMine = item.senderId === currentUserId;
    const previousMessage = messages[index - 1];
    const showDate =
      !previousMessage ||
      previousMessage.date !== item.date;
    return (
      <View>
        {showDate && (
          <View style={styles.dateContainer}>
            <View style={styles.dateLine} />
            <Text style={styles.dateText}>
              {item.date}
            </Text>
            <View style={styles.dateLine} />
          </View>
        )}
        <View
          style={[
            styles.messageRow,
            isMine && styles.myMessageRow,
          ]}>
          {!isMine && (
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {item.senderName
                  ?.charAt(0)
                  ?.toUpperCase()}
              </Text>
            </View>
          )}
          <View
            style={[
              styles.messageContent,
              isMine
                ? styles.myMessageContent
                : styles.otherMessageContent,
            ]}>
            {!isMine && (
              <Text style={styles.senderName}>
                {item.senderName}
              </Text>
            )}
            <View
              style={[
                styles.messageBubble,
                isMine
                  ? styles.myBubble
                  : styles.otherBubble,
              ]}>
              <Text
                style={[
                  styles.messageText,
                  isMine
                    ? styles.myMessageText
                    : styles.otherMessageText,
                ]}>
                {item.message}
              </Text>
              <View style={styles.messageBottomRow}>
                <Text
                  style={[
                    styles.messageTime,
                    isMine &&
                      styles.myMessageTime,
                  ]}>
                  {item.time}
                </Text>
                {isMine && (
                  <Text style={styles.readStatus}>
                    ✓✓
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, {paddingBottom: 0}]}>
      <View
        style={{
          width: '100%',
          height: insets.top,
          backgroundColor: COLORS.primary,
        }}
      />
      <View style={styles.chatHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image
            source={backArrow}
            style={styles.backArrow}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.groupInfo}
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('GroupDetailsScreen', {
              groupDetails: isGroupDetails,
            });
          }}>
          {groupImage ? (
            <Image
              source={{uri: groupImage}}
              style={styles.groupImage}
            />
          ) : (
            <View style={styles.groupImagePlaceholder}>
              <Text style={styles.groupImageText}>
                {groupName
                  ?.charAt(0)
                  ?.toUpperCase()}
              </Text>
            </View>
          )}
          <View style={styles.groupTextContainer}>
            <Text
              numberOfLines={1}
              style={styles.groupName}>
              {groupName}
            </Text>
            <View style={styles.onlineRow}>
              <View style={styles.onlineDot} />
              <Text style={styles.memberCount}>
                {memberCount} members
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.headerAction}
          onPress={() => {
            navigation.navigate('GroupDetailsScreen', {
              groupDetails: isGroupDetails,
            });
          }}>
          <Icon
            name="ellipsis-vertical"
            size={24}
            color={COLORS.white || '#FFFFFF'}
          />
        </TouchableOpacity> */}
      </View>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : undefined
        }
        keyboardVerticalOffset={0}>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          renderItem={renderMessage}
          contentContainerStyle={
            styles.chatContent
          }
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({
              animated: false,
            })
          }
        />
        {joinGroup ? (
          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={styles.inputIconButton}
              onPress={() => onDocumentPress()}>
              <Image
                source={plus}
                style={styles.inputIcon}
              />
            </TouchableOpacity>
            <View style={styles.inputWrapper}>
              <TextInput
                value={messageText}
                onChangeText={setMessageText}
                placeholder={t('type_message') || 'Type a message...'}
                placeholderTextColor="#9A9A9A"
                style={styles.textInput}
                multiline
                maxLength={1000}
              />
            </View>
            <TouchableOpacity
              style={[
                styles.sendButton,
                (!messageText.trim() || isSending) &&
                  styles.sendButtonDisabled,
              ]}
              onPress={onHandleSendMessage}
              disabled={!messageText.trim() || isSending}>
              <Icon
                name="send"
                size={19}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.joinView} onPress={() => onJoinGroupHandle()}>
            <Text style={styles.joinText}>Join Group</Text>
          </TouchableOpacity>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default MessageScreen;
