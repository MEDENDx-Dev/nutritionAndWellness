import {StyleSheet} from 'react-native';
import {COLORS, Fonts} from '../../utils';
import {hp, normalize, wp} from '../../components/responsive';

export const portraitStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      COLORS.backColor || '#F7F9F8',
  },

  headerView: {
    height: hp(8),
    width: '100%',
    backgroundColor:
      COLORS.primary,
    justifyContent: 'center',
  },

  content: {
    flex: 1,
    paddingHorizontal: wp(4),
  },

  /* ------------------------------------------
   * SEARCH
   * ------------------------------------------ */

  searchContainer: {
    height: hp(6),
    marginTop: hp(2),
    marginBottom: hp(1),
    backgroundColor:
      COLORS.primary,
    borderRadius: 12,
    paddingHorizontal: wp(4),
    flexDirection: 'row',
    alignItems: 'center',
  },

  searchInput: {
    flex: 1,
    marginLeft: wp(2.5),
    fontSize: normalize(14),
    color: COLORS.white,
    paddingVertical: 0,
    fontFamily:
      Fonts.FONTS.PoppinsMedium,
  },

  /* ------------------------------------------
   * SELECTED MEMBERS
   * ------------------------------------------ */

  selectedSection: {
    marginTop: hp(1),
    marginBottom: hp(1),
  },

  sectionTitle: {
    fontSize: normalize(15),
    fontFamily:
      Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
  },

  selectedList: {
    paddingTop: hp(1.5),
    paddingBottom: hp(1),
  },

  selectedUserContainer: {
    width: wp(18),
    alignItems: 'center',
    marginRight: wp(2),
  },

  selectedAvatarWrapper: {
    position: 'relative',
  },

  selectedAvatar: {
    width: wp(15),
    height: wp(15),
    borderRadius: wp(7.5),
  },

  selectedAvatarPlaceholder: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    backgroundColor: '#E0F4F2',
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectedAvatarText: {
    fontSize: normalize(17),
    fontFamily:
      Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.primary,
  },

  removeSelectedButton: {
    position: 'absolute',
    right: -3,
    top: -3,
    width: wp(5),
    height: wp(5),
    borderRadius: wp(2.5),
    backgroundColor: '#E34B4B',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },

  selectedUserName: {
    marginTop: hp(0.6),
    fontSize: normalize(11),
    fontFamily:
      Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
    textAlign: 'center',
  },

  /* ------------------------------------------
   * SECTION HEADER
   * ------------------------------------------ */

  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(1.5),
    marginBottom: hp(0.8),
  },

  sectionSubtitle: {
    fontSize: normalize(12),
    color: COLORS.white,
    marginTop: hp(0.3),
    fontFamily:
      Fonts.FONTS.PoppinsRegular,
  },

  countBadge: {
    minWidth: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E7F7F6',
    paddingHorizontal: 8,
  },

  countBadgeText: {
    fontSize: normalize(14),
    fontFamily:
      Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.primary,
  },

  inviteCountBadge: {
    minWidth: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F2F2',
    paddingHorizontal: 8,
  },

  inviteCountBadgeText: {
    fontSize: normalize(14),
    fontFamily:
      Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.primary,
  },

  /* ------------------------------------------
   * CONTACT
   * ------------------------------------------ */

  contactList: {
    paddingBottom: hp(1),
  },

  contactRow: {
    minHeight: hp(8),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1),
    borderBottomWidth: 1,
    borderBottomColor: '#ECEFEE',
  },

  contactRowSelected: {
    backgroundColor:
      'rgba(12,184,182,0.08)',
    borderRadius: 10,
    paddingHorizontal: wp(2),
  },

  contactAvatar: {
    width: wp(13),
    height: wp(13),
    borderRadius: wp(6.5),
    overflow: 'hidden',
  },

  contactImage: {
    width: '100%',
    height: '100%',
  },

  contactPlaceholder: {
    width: '90%',
    height: '90%',
    borderRadius: wp(6.5),
    backgroundColor: '#E0F4F2',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  contactInitials: {
    fontSize: normalize(15),
    fontFamily:
      Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.primary,
  },

  contactInfo: {
    flex: 1,
    marginLeft: wp(3),
    marginRight: wp(2),
  },

  nameWithRegistered: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  contactName: {
    flexShrink: 1,
    fontSize: normalize(15),
    fontFamily:
      Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
  },

  contactNumber: {
    marginTop: hp(0.4),
    fontSize: normalize(12),
    fontFamily:
      Fonts.FONTS.PoppinsMedium,
    color: COLORS.greyColor,
  },

  registeredBadge: {
    marginLeft: 8,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: '#E8F7E8',
  },

  registeredBadgeText: {
    fontSize: normalize(9),
    fontFamily:
      Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.secondary,
  },

  /* ------------------------------------------
   * SELECTION
   * ------------------------------------------ */

  selectionCircle: {
    width: wp(6),
    height: wp(6),
    borderRadius: wp(3),
    borderWidth: 1.5,
    borderColor: '#C7CECB',
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectionCircleSelected: {
    backgroundColor:
      COLORS.secondary,
    borderColor:
      COLORS.secondary,
  },

  /* ------------------------------------------
   * INVITE
   * ------------------------------------------ */

  inviteSection: {
    paddingTop: hp(1),
    paddingBottom: hp(12),
  },

  inviteContactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.2),
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },

  inviteButton: {
    minWidth: 78,
    height: 36,
    borderRadius: 18,
    backgroundColor:
      COLORS.subPrimary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },

  inviteButtonText: {
    color: '#FFFFFF',
    fontSize: normalize(12),
    fontFamily:
      Fonts.FONTS.PoppinsSemiBold,
    marginLeft: 5,
  },

  /* ------------------------------------------
   * EMPTY
   * ------------------------------------------ */

  smallEmptyView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(3),
  },

  emptyTitle: {
    fontSize: normalize(15),
    fontFamily:
      Fonts.FONTS.PoppinsSemiBold,
    color: COLORS.white,
    marginTop: hp(1),
  },

  emptyText: {
    fontSize: normalize(12),
    color: COLORS.white,
    textAlign: 'center',
    marginTop: hp(0.5),
    paddingHorizontal: 30,
    fontFamily:
      Fonts.FONTS.PoppinsRegular,
    lineHeight: normalize(18),
  },

  /* ------------------------------------------
   * BOTTOM BUTTON
   * ------------------------------------------ */

  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: wp(4),
    paddingTop: hp(1),
    backgroundColor:
      COLORS.primary,
  },

  continueButton: {
    height: hp(6.5),
    borderRadius: 12,
    backgroundColor:
      COLORS.subPrimary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  continueButtonDisabled: {
    opacity: 0.65,
  },

  continueButtonText: {
    color: COLORS.white,
    fontSize: normalize(16),
    fontFamily:
      Fonts.FONTS.PoppinsSemiBold,
    marginRight: wp(2),
  },
});

export const landscapeStyles =
  StyleSheet.create({
    ...portraitStyles,

    content: {
      flex: 1,
      paddingHorizontal: wp(8),
    },

    selectedUserContainer: {
      width: wp(10),
      alignItems: 'center',
      marginRight: wp(1.5),
    },

    selectedAvatar: {
      width: wp(8),
      height: wp(8),
      borderRadius: wp(4),
    },

    selectedAvatarPlaceholder: {
      width: wp(6),
      height: wp(6),
      borderRadius: wp(3),
      backgroundColor: '#E0F4F2',
      justifyContent: 'center',
      alignItems: 'center',
    },

    contactRow: {
      minHeight: hp(11),
      paddingVertical: hp(1),
    },

    contactAvatar: {
      width: hp(8),
      height: hp(8),
      borderRadius: hp(4),
      overflow: 'hidden',
    },

    contactPlaceholder: {
      width: '90%',
      height: '90%',
      borderRadius: hp(4),
      backgroundColor: '#E0F4F2',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },

    contactName: {
      fontSize: normalize(15),
    },

    inviteContactRow: {
      paddingVertical: hp(1.2),
    },

    bottomButtonContainer: {
      paddingHorizontal: wp(8),
    },

    inviteSection: {
      paddingBottom: hp(14),
    },
  });
