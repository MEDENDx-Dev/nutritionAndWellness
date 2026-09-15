import {StyleSheet} from 'react-native';
import { COLORS, Fonts } from '../../utils';
import { hp, normalize, wp } from '../../components/responsive';

export const portraitStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backColor || '#F7F9F8',
  },

  safeArea: {
    width: '100%',
    backgroundColor: COLORS.primary,
  },

  /* HEADER */
  backArrow: {
    height: hp(3),
    width: wp(5),
    resizeMode: 'contain',
    tintColor: COLORS.white,
  },
  inputIcon: {
    height: hp(3),
    width: wp(5),
    resizeMode: 'contain',
  },
  header: {
    height: 62,
    width: '100%',
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(2),
  },

  headerButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: normalize(17),
    fontFamily: Fonts?.semiBold,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  /* CONTENT */

  contentContainer: {
    paddingBottom: 20,
  },

  /* GROUP PROFILE */

  groupProfile: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingTop: 25,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E8ECEA',
  },

  groupImage: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: '#E8E8E8',
  },

  groupImagePlaceholder: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: '#DDF3F1',
    justifyContent: 'center',
    alignItems: 'center',
  },

  groupImageText: {
    fontSize: normalize(34),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.primary,
  },

  groupName: {
    marginTop: 13,
    fontSize: normalize(20),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
    textAlign: 'center',
  },

  groupMembers: {
    marginTop: 4,
    fontSize: normalize(14),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.greyColor,
  },

  /* CARD */

  card: {
    marginTop: 10,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: normalize(15),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
    paddingTop: 15,
    paddingBottom: 10,
  },
  description: {
    fontSize: normalize(13),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.white,
    lineHeight: 20,
    paddingBottom: 16,
  },

  /* ACTION */

  actionRow: {
    minHeight: 57,
    flexDirection: 'row',
    alignItems: 'center',
  },

  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EAF8F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  actionText: {
    flex: 1,
    fontSize: normalize(14),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
  },
  actionCount: {
    fontSize: normalize(12),
    color: COLORS.white,
    marginRight: 8,
    fontFamily: Fonts.FONTS.PoppinsMedium,
  },

  actionArrow: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginLeft: 52,
  },

  /* MEMBERS */

  membersHeader: {
    marginTop: 10,
    paddingHorizontal: 16,
    backgroundColor: COLORS.primary,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
  },

  memberTotal: {
    fontSize: normalize(12),
    color: '#999999',
    fontFamily: Fonts.FONTS.PoppinsMedium,
    marginLeft: 5,
  },

  addMemberRow: {
    height: 60,
    paddingHorizontal: 16,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
  },

  addMemberIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#DDF3F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  addMemberText: {
    fontSize: normalize(14),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.white,
  },

  /* MEMBER */

  memberRow: {
    minHeight: 66,
    paddingHorizontal: 16,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
  },

  memberAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#DDF3F1',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  memberAvatarText: {
    fontSize: normalize(16),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.primary,
  },

  memberOnlineDot: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.secondary,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    right: 0,
    bottom: 1,
  },

  memberInfo: {
    flex: 1,
    marginLeft: 12,
  },

  memberName: {
    fontSize: normalize(15),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.white,
  },

  memberRole: {
    marginTop: 2,
    fontSize: normalize(12),
    fontFamily: Fonts.FONTS.PoppinsRegular,
    color: COLORS.greyColor,
  },

  adminBadge: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 10,
    backgroundColor: COLORS.subPrimary,
  },
  adminBadgeText: {
    fontSize: normalize(11),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.white,
  },

  seeAllButton: {
    height: 52,
    backgroundColor: COLORS.primary,
    marginTop: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  seeAllText: {
    fontSize: normalize(15),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.white,
    marginRight: 4,
  },

  /* LEAVE */

  dangerCard: {
    marginTop: 10,
    backgroundColor: COLORS.primary,
  },

  leaveRow: {
    minHeight: 58,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },

  leaveIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF0F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  leaveText: {
    fontSize: normalize(15),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.subPrimary,
  },

  bottomSpace: {
    height: 30,
  },
    /* EDIT GROUP */

  editContentContainer: {
    paddingBottom: 30,
  },

  editImageSection: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingTop: 28,
    paddingBottom: 28,
  },
  
  editImageWrapper: {
    position: 'relative',
  },

  editGroupImage: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: '#E8E8E8',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },

  editGroupImagePlaceholder: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: '#DDF3F1',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },

  editGroupImageText: {
    fontSize: normalize(38),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.primary,
  },

  cameraButton: {
    position: 'absolute',
    right: 0,
    bottom: 2,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.primary,
  },

  changePhotoText: {
    marginTop: 13,
    fontSize: normalize(14),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
  },

  photoHint: {
    marginTop: 3,
    fontSize: normalize(10),
    fontFamily: Fonts.FONTS.PoppinsRegular,
    color: '#D7E5E3',
  },

  formCard: {
    marginTop: 10,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 8,
  },

  formSection: {
    width: '100%',
  },

  inputLabel: {
    fontSize: normalize(16),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
    marginBottom: 8,
  },

  inputDescription: {
    fontSize: normalize(12),
    fontFamily: Fonts.FONTS.PoppinsRegular,
    color: COLORS.greyColor,
    marginTop: -3,
    marginBottom: 12,
  },

  textInputContainer: {
    width: '100%',
    height: 52,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
    borderWidth: 1,
    borderColor: '#E7ECEB',
  },

  textInputError: {
    borderColor: '#E04F5F',
  },

  inputLeadingIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#EAF8F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 9,
  },

  textInput: {
    flex: 1,
    height: 50,
    paddingVertical: 0,
    fontSize: normalize(13),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: '#252525',
  },

  clearButton: {
    width: 30,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  errorText: {
    marginTop: 5,
    fontSize: normalize(10),
    fontFamily: Fonts.FONTS.PoppinsRegular,
    color: '#FFB8BE',
  },

  characterCount: {
    textAlign: 'right',
    marginTop: 5,
    fontSize: normalize(10),
    fontFamily: Fonts.FONTS.PoppinsRegular,
    color: COLORS.greyColor,
  },

  formDivider: {
    height: 1,
    backgroundColor: '#3E8C8A',
    marginVertical: 22,
  },

  typeContainer: {
    width: '100%',
  },

  typeCard: {
    minHeight: 76,
    width: '100%',
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E7ECEB',
  },

  typeCardSelected: {
    borderColor: COLORS.secondary,
    borderWidth: 2,
  },

  typeIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EAF8F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 11,
  },

  typeIconSelected: {
    backgroundColor: COLORS.primary,
  },

  typeContent: {
    flex: 1,
  },

  typeTitle: {
    fontSize: normalize(16),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: '#292929',
  },

  typeTitleSelected: {
    color: COLORS.primary,
  },

  typeDescription: {
    marginTop: 2,
    fontSize: normalize(12),
    fontFamily: Fonts.FONTS.PoppinsRegular,
    color: '#8C8C8C',
  },

  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: '#C7CECC',
    justifyContent: 'center',
    alignItems: 'center',
  },

  radioOuterSelected: {
    borderColor: COLORS.secondary,
  },

  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.secondary,
  },

  infoCard: {
    marginHorizontal: 16,
    marginTop: 12,
    padding: 13,
    borderRadius: 14,
    backgroundColor: '#EAF8F7',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  infoIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  infoContent: {
    flex: 1,
  },

  infoTitle: {
    fontSize: normalize(14),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.primary,
  },

  infoText: {
    marginTop: 2,
    fontSize: normalize(12),
    lineHeight: 16,
    fontFamily: Fonts.FONTS.PoppinsRegular,
    color: '#6E7775',
  },

  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 15,
    backgroundColor: COLORS.primary,
    borderTopWidth: 1,
    borderTopColor: '#3E8C8A',
  },

  saveButton: {
    height: 52,
    width: '100%',
    borderRadius: 8,
    backgroundColor: COLORS.subPrimary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  saveButtonDisabled: {
    opacity: 0.65,
  },
  cameraImage: {
    width: wp(5),
    height: hp(3),
    resizeMode: 'contain',
    tintColor: COLORS.white
  },
  saveButtonText: {
    marginLeft: 8,
    fontSize: normalize(16),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
  },
});

export const landscapeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backColor || '#F7F9F8',
  },

  safeArea: {
    width: '100%',
    backgroundColor: COLORS.primary,
  },

  /* HEADER */
  backArrow: {
    height: hp(3),
    width: wp(5),
    resizeMode: 'contain',
    tintColor: COLORS.white,
  },
  inputIcon: {
    height: hp(3),
    width: wp(5),
    resizeMode: 'contain',
  },
  header: {
    height: 62,
    width: '100%',
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(2),
  },

  headerButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: normalize(17),
    fontFamily: Fonts?.semiBold,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  /* CONTENT */

  contentContainer: {
    paddingBottom: 20,
  },

  /* GROUP PROFILE */

  groupProfile: {
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingTop: 25,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E8ECEA',
  },

  groupImage: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: '#E8E8E8',
  },

  groupImagePlaceholder: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: '#DDF3F1',
    justifyContent: 'center',
    alignItems: 'center',
  },

  groupImageText: {
    fontSize: normalize(34),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.primary,
  },

  groupName: {
    marginTop: 13,
    fontSize: normalize(20),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
    textAlign: 'center',
  },

  groupMembers: {
    marginTop: 4,
    fontSize: normalize(14),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.greyColor,
  },

  /* CARD */

  card: {
    marginTop: 10,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: normalize(15),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
    paddingTop: 15,
    paddingBottom: 10,
  },
  description: {
    fontSize: normalize(13),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.white,
    lineHeight: 20,
    paddingBottom: 16,
  },

  /* ACTION */

  actionRow: {
    minHeight: 57,
    flexDirection: 'row',
    alignItems: 'center',
  },

  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EAF8F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  actionText: {
    flex: 1,
    fontSize: normalize(14),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
  },
  actionCount: {
    fontSize: normalize(12),
    color: COLORS.white,
    marginRight: 8,
    fontFamily: Fonts.FONTS.PoppinsMedium,
  },

  actionArrow: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginLeft: 52,
  },

  /* MEMBERS */

  membersHeader: {
    marginTop: 10,
    paddingHorizontal: 16,
    backgroundColor: COLORS.primary,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
  },

  memberTotal: {
    fontSize: normalize(12),
    color: '#999999',
    fontFamily: Fonts.FONTS.PoppinsMedium,
    marginLeft: 5,
  },

  addMemberRow: {
    height: 60,
    paddingHorizontal: 16,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
  },

  addMemberIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#DDF3F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  addMemberText: {
    fontSize: normalize(14),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.white,
  },

  /* MEMBER */

  memberRow: {
    minHeight: 66,
    paddingHorizontal: 16,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
  },

  memberAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#DDF3F1',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  memberAvatarText: {
    fontSize: normalize(16),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.primary,
  },

  memberOnlineDot: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.secondary,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    right: 0,
    bottom: 1,
  },

  memberInfo: {
    flex: 1,
    marginLeft: 12,
  },

  memberName: {
    fontSize: normalize(15),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.white,
  },

  memberRole: {
    marginTop: 2,
    fontSize: normalize(12),
    fontFamily: Fonts.FONTS.PoppinsRegular,
    color: COLORS.greyColor,
  },

  adminBadge: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 10,
    backgroundColor: COLORS.subPrimary,
  },
  adminBadgeText: {
    fontSize: normalize(11),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.white,
  },

  seeAllButton: {
    height: 52,
    backgroundColor: COLORS.primary,
    marginTop: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  seeAllText: {
    fontSize: normalize(15),
    fontFamily: Fonts.FONTS.PoppinsMedium,
    color: COLORS.white,
    marginRight: 4,
  },

  /* LEAVE */

  dangerCard: {
    marginTop: 10,
    backgroundColor: COLORS.primary,
  },

  leaveRow: {
    minHeight: 58,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },

  leaveIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF0F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  leaveText: {
    fontSize: normalize(15),
    fontFamily: Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.subPrimary,
  },
  cameraImage: {
    width: wp(5),
    height: hp(3),
    resizeMode: 'contain',
    tintColor: COLORS.white
  },
  bottomSpace: {
    height: 30,
  },
    /* EDIT GROUP */

  editContentContainer: {
    paddingBottom: 30,
    width: '100%',
    maxWidth: 850,
    alignSelf: 'center',
  },

  editImageSection: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: 22,
    paddingBottom: 22,
  },

  editImageWrapper: {
    position: 'relative',
  },

  editGroupImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E8E8E8',
    borderWidth: 3,
    borderColor: COLORS.primary,
  },

  editGroupImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#DDF3F1',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: COLORS.primary,
  },

  editGroupImageText: {
    fontSize: normalize(34),
    fontWeight: '700',
    color: COLORS.primary,
  },

  cameraButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },

  changePhotoText: {
    marginTop: 10,
    fontSize: normalize(13),
    fontWeight: '600',
    color: COLORS.primary,
  },

  photoHint: {
    marginTop: 3,
    fontSize: normalize(10),
    color: '#888888',
  },

  formCard: {
    marginTop: 8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 8,
  },

  formSection: {
    width: '100%',
  },

  inputLabel: {
    fontSize: normalize(14),
    fontWeight: '600',
    color: '#252525',
    marginBottom: 8,
  },

  inputDescription: {
    fontSize: normalize(11),
    color: '#888888',
    marginTop: -3,
    marginBottom: 12,
  },

  textInputContainer: {
    width: '100%',
    height: 52,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
    borderWidth: 1,
    borderColor: '#E2E7E5',
  },

  textInputError: {
    borderColor: '#E04F5F',
  },

  inputLeadingIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#EAF8F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 9,
  },

  textInput: {
    flex: 1,
    height: 50,
    paddingVertical: 0,
    fontSize: normalize(13),
    fontWeight: '500',
    color: '#252525',
  },

  clearButton: {
    width: 30,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  errorText: {
    marginTop: 5,
    fontSize: normalize(10),
    color: '#E04F5F',
  },

  characterCount: {
    textAlign: 'right',
    marginTop: 5,
    fontSize: normalize(10),
    color: '#999999',
  },

  formDivider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 22,
  },

  typeContainer: {
    width: '100%',
  },

  typeCard: {
    minHeight: 76,
    width: '100%',
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E7E5',
  },

  typeCardSelected: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },

  typeIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EAF8F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 11,
  },

  typeIconSelected: {
    backgroundColor: COLORS.primary,
  },

  typeContent: {
    flex: 1,
  },

  typeTitle: {
    fontSize: normalize(13),
    fontWeight: '600',
    color: '#292929',
  },

  typeTitleSelected: {
    color: COLORS.primary,
  },

  typeDescription: {
    marginTop: 2,
    fontSize: normalize(10),
    color: '#8C8C8C',
  },

  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: '#C7CECC',
    justifyContent: 'center',
    alignItems: 'center',
  },

  radioOuterSelected: {
    borderColor: COLORS.primary,
  },

  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
  },

  infoCard: {
    marginHorizontal: 20,
    marginTop: 10,
    padding: 13,
    borderRadius: 14,
    backgroundColor: '#EAF8F7',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  infoIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  infoContent: {
    flex: 1,
  },

  infoTitle: {
    fontSize: normalize(12),
    fontWeight: '600',
    color: COLORS.primary,
  },

  infoText: {
    marginTop: 2,
    fontSize: normalize(10),
    lineHeight: 16,
    color: '#6E7775',
  },

  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },

  saveButton: {
    height: 52,
    width: '100%',
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  saveButtonDisabled: {
    opacity: 0.65,
  },

  saveButtonText: {
    marginLeft: 8,
    fontSize: normalize(14),
    fontWeight: '600',
    color: '#FFFFFF',
  },
});