// import React, { useContext } from 'react';
// import { View, TouchableOpacity } from 'react-native';
// import { LanguageContext } from '../../../LanguageContext/LanguageContext';
// import { FontAwesome } from '@expo/vector-icons';
// import * as WebBrowser from 'expo-web-browser';
// import * as Facebook from 'expo-facebook';
// import { FetchingContext } from '../../../FetchingContext/FetchingContext';
// WebBrowser.maybeCompleteAuthSession();
// const FacebookSignin = (props) => {
//     const { lang, langdetect, setlang } = useContext(LanguageContext);
//     const { SocialLoginMutationContext, fetchAuthorizationQueryContext } = useContext(FetchingContext);
//     async function logIn() {
//         try {
//             await Facebook.initializeAsync({
//                 appId: '1050890242198982',
//             });
//             const { type, token, expirationDate, permissions, declinedPermissions } = await Facebook.logInWithReadPermissionsAsync({
//                 permissions: ['email'],
//             });
//             if (type === 'success') {
//                 fetch(`https://graph.facebook.com/me?access_token=${token}&fields=name,email`, {
//                     method: 'get',
//                 })
//                     .then((response) => response.json())
//                     .then((data) => {
//                         var [first, last] = data.name.split(' ');

//                         SocialLoginMutationContext.mutate({
//                             email: data.email,
//                             name: first + ' ' + last,
//                             loginplattype: 'facebook',
//                         });
//                     });
//             } else {
//                 // type === 'cancel'
//             }
//         } catch ({ message }) {
//             alert(`Facebook Login Error: ${message}`);
//         }
//     }
//     return (
//         <>
//             {fetchAuthorizationQueryContext?.data?.data?.instinfo?.instcred?.facebookloginappid != null && (
//                 <TouchableOpacity
//                     style={{
//                         width: 40,
//                         height: 40,
//                         borderRadius: 10,
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         flexDirection: 'row',
//                         backgroundColor: 'black',
//                         marginLeft: 5,
//                         marginRight: 5,
//                     }}
//                     // disabled={!request}
//                     onPress={() => {
//                         logIn();
//                     }}
//                 >
//                     <View style={{ textAlign: 'left' }}>
//                         <FontAwesome name="facebook-f" size={15} color={'white'} />
//                     </View>
//                 </TouchableOpacity>
//             )}
//         </>
//     );
// };
// export default FacebookSignin;
