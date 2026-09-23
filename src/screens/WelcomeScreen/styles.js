import { StyleSheet } from 'react-native';

import {
    hp,
    wp,
    normalize,
} from '../../components/responsive';

import {
    COLORS,
    Fonts,
} from '../../utils/index';

export const portraitStyles = StyleSheet.create({

    safeAreaStyle: {
        flex: 1,
        width: '100%',
        height: '100%',
    },

    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.backColor,
    },
    headerView: {
        height: '10%',
        alignItems: 'center',
        width: '90%'
    },
    mainView: {
        width: '80%',
        alignItems: 'center',
        height: '90%',
        justifyContent: 'center',
    },

    logoImage: {
        width: wp(42),
        height: hp(18),
        resizeMode: 'contain',
        marginBottom: hp(1),
    },

    appName: {
        fontSize: hp(3.2),
        color: COLORS.white,
        fontFamily: Fonts.FONTS.PoppinsBold,
        textAlign: 'center',
        marginTop: hp(0.5),
    },

    tagline: {
        fontSize: hp(2),
        color: COLORS.secondary,
        fontFamily: Fonts.FONTS.PoppinsSemiBold,
        textAlign: 'center',
        marginTop: hp(0.5),
    },

    description: {
        width: '92%',
        fontSize: hp(1.7),
        lineHeight: hp(2.6),
        color: COLORS.greyColor,
        fontFamily: Fonts.FONTS.PoppinsRegular,
        textAlign: 'center',
        marginTop: hp(1.5),
    },

    featureContainer: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: hp(2.5),
    },

    featureCard: {
        width: '48%',
        minHeight: hp(10),
        borderRadius: 10,
        paddingVertical: hp(1.2),
        paddingHorizontal: wp(2),
        marginBottom: hp(1.2),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        borderWidth: 0.5,
        borderColor: COLORS.greyColor,
    },

    featureIcon: {
        fontSize: hp(3),
        marginBottom: hp(0.3),
    },

    featureTitle: {
        fontSize: hp(1.7),
        color: COLORS.white,
        fontFamily: Fonts.FONTS.PoppinsSemiBold,
        textAlign: 'center',
    },

    featureText: {
        fontSize: hp(1.25),
        lineHeight: hp(1.8),
        color: COLORS.greyColor,
        fontFamily: Fonts.FONTS.PoppinsRegular,
        textAlign: 'center',
        marginTop: hp(0.2),
    },

    getStartedButton: {
        width: '100%',
        height: hp(6),
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(2),
        backgroundColor: COLORS.subPrimary,
    },

    getStartedText: {
        fontSize: hp(2.1),
        color: COLORS.white,
        fontFamily: Fonts.FONTS.PoppinsBold,
    },

    signupButton: {
        width: '100%',
        height: hp(6),
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(1),
        backgroundColor: COLORS.white,
        borderWidth: 0.5,
        borderColor: COLORS.greyColor,
    },

    signupText: {
        fontSize: hp(2),
        color: COLORS.secondary,
        fontFamily: Fonts.FONTS.PoppinsSemiBold,
    },

    bottomText: {
        fontSize: hp(1.6),
        color: COLORS.greyColor,
        fontFamily: Fonts.FONTS.PoppinsRegular,
        textAlign: 'center',
        marginTop: hp(1.5),
    },

    loginText: {
        color: COLORS.secondary,
        fontFamily: Fonts.FONTS.PoppinsSemiBold,
    },
});


export const landscapeStyles = StyleSheet.create({

    safeAreaStyle: {
        flex: 1,
        width: '100%',
        height: '100%',
    },

    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.backColor,
    },

    mainView: {
        width: '65%',
        alignItems: 'center',
    },

    logoImage: {
        width: wp(28),
        height: hp(17),
        resizeMode: 'contain',
        marginBottom: hp(0.5),
    },

    appName: {
        fontSize: hp(4),
        color: COLORS.white,
        fontFamily: Fonts.FONTS.PoppinsBold,
        textAlign: 'center',
    },

    tagline: {
        fontSize: hp(2.4),
        color: COLORS.secondary,
        fontFamily: Fonts.FONTS.PoppinsSemiBold,
        textAlign: 'center',
        marginTop: hp(0.3),
    },

    description: {
        width: '85%',
        fontSize: hp(1.8),
        lineHeight: hp(2.6),
        color: COLORS.greyColor,
        fontFamily: Fonts.FONTS.PoppinsRegular,
        textAlign: 'center',
        marginTop: hp(1),
    },

    featureContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: hp(1.8),
    },

    featureCard: {
        width: '23.5%',
        minHeight: hp(11),
        borderRadius: 10,
        paddingVertical: hp(1),
        paddingHorizontal: wp(1),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        borderWidth: 0.5,
        borderColor: COLORS.greyColor,
    },

    featureIcon: {
        fontSize: hp(3),
        marginBottom: hp(0.2),
    },

    featureTitle: {
        fontSize: hp(1.7),
        color: COLORS.white,
        fontFamily: Fonts.FONTS.PoppinsSemiBold,
        textAlign: 'center',
    },

    featureText: {
        fontSize: hp(1.25),
        lineHeight: hp(1.7),
        color: COLORS.greyColor,
        fontFamily: Fonts.FONTS.PoppinsRegular,
        textAlign: 'center',
        marginTop: hp(0.2),
    },

    getStartedButton: {
        width: '100%',
        height: hp(6),
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(1.8),
        backgroundColor: COLORS.subPrimary,
    },

    getStartedText: {
        fontSize: wp(1.7),
        color: COLORS.white,
        fontFamily: Fonts.FONTS.PoppinsBold,
    },

    signupButton: {
        width: '100%',
        height: hp(6),
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp(1),
        backgroundColor: COLORS.white,
        borderWidth: 0.5,
        borderColor: COLORS.greyColor,
    },

    signupText: {
        fontSize: wp(1.7),
        color: COLORS.secondary,
        fontFamily: Fonts.FONTS.PoppinsSemiBold,
    },

    bottomText: {
        fontSize: wp(1.4),
        color: COLORS.greyColor,
        fontFamily: Fonts.FONTS.PoppinsRegular,
        textAlign: 'center',
        marginTop: hp(1),
    },

    loginText: {
        color: COLORS.secondary,
        fontFamily: Fonts.FONTS.PoppinsSemiBold,
    },
});
