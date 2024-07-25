import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { WebsiteDesignWorkPlaceContext } from '../../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { LanguageContext } from '../../../../LanguageContext/LanguageContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import generalstyles from '../../../GeneralFiles/Stylesheet/Stylesheet';
import { FetchingContext } from '../../../../FetchingContext/FetchingContext';
import { Entypo, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
const SocialMediaSection = (props) => {
    const { lang, langdetect } = useContext(LanguageContext);
    const { StyleParseToIntFuncContext } = useContext(WebsiteDesignWorkPlaceContext);
    const { fetchAuthorizationQueryContext } = useContext(FetchingContext);
    const [sectionproperties, setsectionproperties] = useState('');

    useEffect(() => {
        if (props?.sectionpropertiesProps != undefined) {
            var secpropobj = {};
            props?.sectionpropertiesProps?.forEach(function (sectionpropertiesobj, sectionpropertiesindex) {
                secpropobj[sectionpropertiesobj.property_css_name] = sectionpropertiesobj.property_value;
            });
            setsectionproperties({ ...secpropobj });
        }
    }, [props.sectionpropertiesProps]);
    const cardsrender = React.useMemo(() => {
        return (
            <View
                style={[
                    generalstyles.flexRow,
                    {
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: StyleParseToIntFuncContext(sectionproperties.cardpaddingvertical),
                        backgroundColor: sectionproperties.backgroundColor,
                    },
                ]}
            >
                {sectionproperties.fbbtn_show == 'Show' && fetchAuthorizationQueryContext?.data?.data?.instinfo?.facebooklink != null && (
                    <TouchableOpacity
                        style={[
                            generalstyles.allcentered,
                            {
                                width: StyleParseToIntFuncContext(sectionproperties.facebkbtnnWidth),
                                height: StyleParseToIntFuncContext(sectionproperties.facebkbtnnHeight),
                                borderRadius: StyleParseToIntFuncContext(sectionproperties.facebkbtnn_borderRadius, '', true),
                                backgroundColor: sectionproperties.facebkbtnnbgColor,
                                borderWidth: StyleParseToIntFuncContext(sectionproperties.facebkbtnnborderwidth, '', true),
                                borderColor: sectionproperties.facebkbtnnbordercolor,
                                marginHorizontal: 10,
                            },
                        ]}
                        onPress={() => {
                            Linking.openURL(fetchAuthorizationQueryContext?.data?.data?.instinfo?.facebooklink);
                        }}
                    >
                        <MaterialCommunityIcons name="facebook" size={StyleParseToIntFuncContext(sectionproperties.facebkbtnniconfontsize)} color={sectionproperties.facebkbtnnTextcolor} />
                    </TouchableOpacity>
                )}
                {sectionproperties.instbtn_show == 'Show' && fetchAuthorizationQueryContext?.data?.data?.instinfo?.instagramlink != null && (
                    <TouchableOpacity
                        style={[
                            generalstyles.allcentered,
                            {
                                width: StyleParseToIntFuncContext(sectionproperties.instgrambtnWidth),
                                height: StyleParseToIntFuncContext(sectionproperties.instgrambtnHeight),
                                borderRadius: StyleParseToIntFuncContext(sectionproperties.instgrambtn_borderRadius, '', true),
                                backgroundColor: sectionproperties.instgrambtnbgColor,
                                borderWidth: StyleParseToIntFuncContext(sectionproperties.instgrambtnborderwidth, '', true),
                                borderColor: sectionproperties.instgrambtnbordercolor,
                                marginHorizontal: 10,
                            },
                        ]}
                        onPress={() => {
                            Linking.openURL(fetchAuthorizationQueryContext?.data?.data?.instinfo?.instagramlink);
                        }}
                    >
                        <Entypo name="instagram" size={StyleParseToIntFuncContext(sectionproperties.instgrambtniconfontsize)} color={sectionproperties.instgrambtnTextcolor} />
                    </TouchableOpacity>
                )}
                {sectionproperties.youtbtn_show == 'Show' && fetchAuthorizationQueryContext?.data?.data?.instinfo?.whatsappnumber != null && (
                    <TouchableOpacity
                        style={[
                            generalstyles.allcentered,
                            {
                                width: StyleParseToIntFuncContext(sectionproperties.youtubebtnWidth),
                                height: StyleParseToIntFuncContext(sectionproperties.youtubebtnHeight),
                                borderRadius: StyleParseToIntFuncContext(sectionproperties.youtubebtn_borderRadius, '', true),
                                backgroundColor: sectionproperties.youtubebtnbgColor,
                                borderWidth: StyleParseToIntFuncContext(sectionproperties.youtubebtnborderwidth, '', true),
                                borderColor: sectionproperties.youtubebtnbordercolor,
                                marginHorizontal: 10,
                            },
                        ]}
                        onPress={() => {
                            Linking.openURL('whatsapp://send?text=&phone=' + fetchAuthorizationQueryContext?.data?.data?.instinfo?.whatsappnumber);
                        }}
                    >
                        <FontAwesome
                            name="whatsapp"
                            size={StyleParseToIntFuncContext(sectionproperties.youtubebtniconfontsize)}
                            style={{
                                color: sectionproperties.youtubebtnTextcolor,
                            }}
                        />
                    </TouchableOpacity>
                )}
            </View>
        );
    }, [sectionproperties, fetchAuthorizationQueryContext.isSuccess]);
    return cardsrender;
};

const styles = StyleSheet.create({});

export default SocialMediaSection;
