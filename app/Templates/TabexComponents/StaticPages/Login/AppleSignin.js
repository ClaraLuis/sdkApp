import React, { useContext } from 'react';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import * as AppleAuthentication from 'expo-apple-authentication';
import { Platform } from 'react-native';
const AppleSignin = (props) => {
    const { lang, langdetect, setlang } = useContext(LanguageContext);
    return (
        <>
            {Platform.OS == 'ios' && (
                <AppleAuthentication.AppleAuthenticationButton
                    buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                    buttonStyle={props.srcfrom == 'swipepanel' ? AppleAuthentication.AppleAuthenticationButtonStyle.BLACK : AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                    cornerRadius={10}
                    style={{
                        width: 40,
                        height: 40,
                        marginLeft: 5,
                        marginRight: 5,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onPress={async () => {
                        try {
                            const credential = await AppleAuthentication.signInAsync({
                                requestedScopes: [AppleAuthentication.AppleAuthenticationScope.FULL_NAME, AppleAuthentication.AppleAuthenticationScope.EMAIL],
                            });
                            alert(JSON.stringify(credential));
                            // signed in
                        } catch (e) {
                            if (e.code === 'ERR_CANCELED') {
                                alert(JSON.stringify(e));
                                // handle that the user canceled the sign-in flow
                            } else {
                                alert(JSON.stringify(e));
                                // handle other errors
                            }
                        }
                    }}
                />
            )}
        </>
    );
};
export default AppleSignin;
