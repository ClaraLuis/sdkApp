// import React, { useContext } from 'react';
// import { View, TouchableOpacity } from 'react-native';
// import { LanguageContext } from '../../../LanguageContext/LanguageContext';
// import { AntDesign } from '@expo/vector-icons';
// import * as Google from 'expo-auth-session/providers/google';
// import { FetchingContext } from '../../../FetchingContext/FetchingContext';
// const GooogleSignIn = (props) => {
//     const { SocialLoginMutationContext, fetchAuthorizationQueryContext } = useContext(FetchingContext);
//     const { lang, langdetect, setlang } = useContext(LanguageContext);
//     const [request, response, promptAsync] = Google.useAuthRequest({
//         expoClientId: '632923730930-4c2jmio9s4gt3ad96o6iut1b1f6pnh95.apps.googleusercontent.com',
//         iosClientId: '632923730930-iakl9ucn5h30uvhfjm6b85p9pp4s8mis.apps.googleusercontent.com',
//         androidClientId: '632923730930-786ve121atjjfnk4md4v2jual6pdf4rg.apps.googleusercontent.com',
//     });

//     React.useEffect(() => {
//         if (response?.type === 'success') {
//             const { authentication } = response;
//             fetch('https://www.googleapis.com/oauth2/v2/userinfo?oauth_token=' + authentication.accessToken, {
//                 method: 'get',
//             })
//                 .then((response) => response.json())
//                 .then((data) => {
//                     SocialLoginMutationContext.mutate({
//                         email: data.email,
//                         name: data.given_name + ' ' + data.family_name,
//                         loginplattype: 'google',
//                     });
//                 });
//         }
//     }, [response]);
//     return (
//         <>
//             {fetchAuthorizationQueryContext?.data?.data?.instinfo?.instcred?.googleloginclientid != null && (
//                 <TouchableOpacity
//                     style={{
//                         width: 40,
//                         height: 40,
//                         borderRadius: 10,
//                         marginLeft: 5,
//                         marginRight: 5,
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         backgroundColor: 'black',
//                     }}
//                     disabled={!request}
//                     onPress={() => {
//                         promptAsync();
//                     }}
//                 >
//                     <View style={{ textAlign: 'left' }}>
//                         <AntDesign name="google" size={15} color={'white'} />
//                     </View>
//                 </TouchableOpacity>
//             )}
//         </>
//     );
// };
// export default GooogleSignIn;
import React, { useContext, useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import { AntDesign } from '@expo/vector-icons';
import * as Google from 'expo-auth-session/providers/google';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { useDispatch, useSelector } from 'react-redux';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { icons } from '../../GeneralFiles/constants';

const GooogleSignIn = (props) => {
    const { SocialLoginMutationContext, fetchAuthorizationQueryContext } = useContext(FetchingContext);
    const { lang, langdetect, setlang } = useContext(LanguageContext);
    const { CurrentPageIdContext } = useContext(WebsiteDesignWorkPlaceContext);

    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: fetchAuthorizationQueryContext?.data?.data?.instinfo?.instcred?.googleloginclientidIos,
        iosClientId: fetchAuthorizationQueryContext?.data?.data?.instinfo?.instcred?.googleloginclientidIos,
        androidClientId: fetchAuthorizationQueryContext?.data?.data?.instinfo?.instcred?.googleloginclientidAndroid,
    });
    const [StatePageProperties, setStatePageProperties] = useState({});
    const StatePageProperties11 = useSelector((state) => state.page.value);
    const [sectionproperties, setsectionproperties] = useState('');

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response;

            fetch('https://www.googleapis.com/oauth2/v2/userinfo?oauth_token=' + authentication.accessToken, {
                method: 'get',
            })
                .then((response) => response.json())
                .then((data) => {
                    SocialLoginMutationContext.mutate({
                        email: data.email,
                        name: data.given_name + ' ' + data.family_name,
                        loginplattype: 'google',
                    });
                });
        }
    }, [response]);
    useEffect(() => {
        StatePageProperties11.pages.forEach(function (item, index) {
            if (CurrentPageIdContext == item.pageid) {
                setStatePageProperties(item.pageobj);
            }
        });
    }, [StatePageProperties11]);
    useEffect(() => {
        var secpropobj = {};
        if (StatePageProperties != undefined && StatePageProperties.pageobj != undefined && StatePageProperties.pageobj.pageproperties != undefined) {
            StatePageProperties.pageobj.pageproperties.forEach(function (sectionitem, sectionindex) {
                secpropobj[sectionitem.property_css_name] = sectionitem.property_value;
            });
        }
        setsectionproperties({ ...secpropobj });
    }, [StatePageProperties]);
    return (
        <>
            {fetchAuthorizationQueryContext?.data?.data?.instinfo?.instcred?.googleloginclientidAndroid != null && sectionproperties.socialogindirection == 'Horizontal' && (
                <TouchableOpacity
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        marginLeft: 5,
                        marginRight: 5,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'black',
                    }}
                    disabled={!request}
                    onPress={() => {
                        promptAsync();
                    }}
                >
                    <View style={{ textAlign: 'left' }}>
                        <AntDesign name="google" size={15} color={'white'} />
                    </View>
                </TouchableOpacity>
            )}
            {fetchAuthorizationQueryContext?.data?.data?.instinfo?.instcred?.googleloginclientidAndroid != null && sectionproperties.socialogindirection == 'Vertical' && (
                <TouchableOpacity
                    style={{
                        width: '70%',
                        height: 40,
                        borderRadius: 10,
                        marginLeft: 5,
                        marginRight: 5,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#eee',
                    }}
                    disabled={!request}
                    onPress={() => {
                        promptAsync();
                    }}
                >
                    <View style={{ textAlign: 'left', marginStart: 20 }}>
                        <Image
                            source={icons.googleicon}
                            style={{
                                objectFit: 'contain',
                                width: 20,
                                height: 20,
                            }}
                        />
                    </View>
                    <View style={[generalstyles.allcentered, { flex: 1, marginStart: 0 }]}>
                        <Text
                            style={[
                                generalstyles.poppinsMedium,
                                {
                                    color: '#000',
                                    fontSize: 13,
                                },
                            ]}
                        >
                            {langdetect == 'en' ? 'Continue With Google' : 'تسجيل الدخول عن طريق Google'}
                        </Text>
                    </View>
                </TouchableOpacity>
            )}
        </>
    );
};
export default GooogleSignIn;
