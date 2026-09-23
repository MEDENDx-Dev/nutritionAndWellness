import {
    Text,
    View,
    Image,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import React from 'react';
import { portraitStyles, landscapeStyles } from './styles';
import useOrientation from '../../components/OrientationComponent';
import { COLORS, Fonts } from '../../utils/index';
import logo from '../../images/logo.png';
import welcome from '../../images/welcome.jpg';
import { useTranslation } from 'react-i18next';

const WelcomeScreen = ({ navigation }) => {
    const { t } = useTranslation();

    const orientation = useOrientation();
    const isPortrait = orientation === 'portrait';

    const styles = isPortrait ? portraitStyles : landscapeStyles;

    return (
        <View
            style={[
                styles.safeAreaStyle,
                { backgroundColor: COLORS.backColor },
            ]}
        >
            <StatusBar
                barStyle="light-content"
                backgroundColor={COLORS.backColor}
            />

            <View style={styles.container}>

                <View style={styles.mainView}>

                    {/* Logo */}
                    <Image
                        source={welcome}
                        style={styles.logoImage}
                    />

                    {/* App Name */}
                    <Text style={styles.appName}>
                        Nutrition & Wellness
                    </Text>

                    {/* Tagline */}
                    <Text style={styles.tagline}>
                        Your Complete Wellness Companion
                    </Text>

                    {/* Description */}
                    <Text style={styles.description}>
                        Take care of your health with personalized
                        nutrition, medical care, healthy food choices,
                        and exercise — all in one place.
                    </Text>

                    {/* Feature Cards */}
                    <View style={styles.featureContainer}>

                        <View style={styles.featureCard}>
                            <Text style={styles.featureIcon}>🥗</Text>
                            <Text style={styles.featureTitle}>
                                Nutrition
                            </Text>
                            <Text style={styles.featureText}>
                                Personalized nutrition plans
                            </Text>
                        </View>

                        <View style={styles.featureCard}>
                            <Text style={styles.featureIcon}>❤️</Text>
                            <Text style={styles.featureTitle}>
                                Medical
                            </Text>
                            <Text style={styles.featureText}>
                                Manage your health
                            </Text>
                        </View>

                        <View style={styles.featureCard}>
                            <Text style={styles.featureIcon}>🍎</Text>
                            <Text style={styles.featureTitle}>
                                Food
                            </Text>
                            <Text style={styles.featureText}>
                                Discover healthy recipes
                            </Text>
                        </View>

                        <View style={styles.featureCard}>
                            <Text style={styles.featureIcon}>🏃</Text>
                            <Text style={styles.featureTitle}>
                                Exercise
                            </Text>
                            <Text style={styles.featureText}>
                                Stay active and fit
                            </Text>
                        </View>

                    </View>

                    {/* Get Started */}
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.getStartedButton}
                        onPress={() => navigation.navigate('LoginScreen')}
                    >
                        <Text style={styles.getStartedText}>
                            Get Started
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default WelcomeScreen;