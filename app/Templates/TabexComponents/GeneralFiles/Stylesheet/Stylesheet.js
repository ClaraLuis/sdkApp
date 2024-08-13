import { StyleSheet, Platform } from 'react-native';
import { icons, images, SIZES, COLORS, FONTS } from '../constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray4,
        // padding: 10,
        // paddingLeft: 15,
        // paddingRight: 15,
    },
    containerInnerPage: {
        paddingTop: 20,
        paddingStart: 12,
        paddingEnd: 12,
    },
    containerInner: {
        paddingLeft: 15,
        paddingRight: 15,
    },
    containerInnerStart: {
        paddingStart: SIZES.padding * 2,
        marginBottom: 10,
    },
    containerInnerEnd: {
        paddingEnd: SIZES.padding * 2,
        marginBottom: 10,
    },
    flexColumn: {
        flexDirection: 'column',
    },
    flexRow: {
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
    },
    mainTitle: {
        fontFamily: 'Poppins-Semibold',
        fontSize: SIZES.h1,
        color: COLORS.turqouise,
        marginBottom: 5,
    },
    titleIcon: {
        width: 25,
        height: 25,
        tintColor: COLORS.danger,
        marginTop: -5,
    },
    subTitlecont: {
        marginStart: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    subTitle: {
        fontFamily: 'Poppins-Semibold',
        fontSize: 15,
        textDecorationLine: 'underline',
    },
    headerfilterIconcont: {
        height: 40,
        backgroundColor: '#fee7e7',
        width: 40,
        borderRadius: 15,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerfiltericon: {
        width: 30,
        height: 30,
        tintColor: COLORS.cimon,
    },
    searchtextInput: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'white',
        fontSize: 17,
        height: 45,
        borderRadius: 30,
        display: 'flex',
        alignItems: 'center',
        marginEnd: 10,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -5,
        paddingLeft: 10,
        fontSize: 20,
        fontFamily: 'Poppins-Light',
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
    },
    inputcont: {
        flexDirection: 'column',
        marginTop: 10,
        width: SIZES.width - 60,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 10,
    },
    form_label: {
        fontFamily: 'Poppins-Medium',
        color: '#444054',
        fontSize: 17,
        marginBottom: 10,
    },
    poppinsMedium: {
        fontFamily: 'Poppins-Medium',
    },
    textcapitalize: {
        textTransform: 'capitalize',
    },
    maintext: {
        fontFamily: 'Poppins-Medium',
        fontSize: SIZES.maintext,
        lineHeight: 15,
        textTransform: 'capitalize',
    },
    subtext: {
        fontFamily: 'Poppins-Light',
        fontSize: 13,
        lineHeight: 13,
    },
    // Sliding Panel
    slideuppanel: {
        margin: 0,
        position: 'absolute',
        padding: 0,
        bottom: 0,
        height: '100%',
        backgroundColor: '#F8F8F8',
    },
    slideuppanelLanguage: {
        margin: 0,
        position: 'relative',
        padding: 0,
        bottom: 0,
        height: '50%',
        backgroundColor: 'white',
    },
    viewcontainerswipe: {
        height: '70%',
        width: '100%',
        position: 'absolute',
        margin: 0,
        padding: 0,
        backgroundColor: 'transparent',
    },
    viewslideuppanel: {
        zIndex: 999999,
    },
    allcentered: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
