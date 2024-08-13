// import React from 'react';
// import { View, Platform } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
// export default function (props) {
//     return (
//         <View style={{ height: Platform.OS === 'ios' ? 48 : 35, backgroundColor: Platform.OS === 'ios' ? '#000' : '#fff' }} barStyle="light-content">
//             <StatusBar backgroundColor="#fff" barStyle={'light-content'} />
//         </View>
//     );
// }
import React from 'react';
import { View, Platform, useColorScheme, StyleSheet, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function (props) {
    const colorScheme = useColorScheme();
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;

    return (
        <View
            style={[
                // themeContainerStyle,
                // lightbgcolor
                // ffffff
                // ffffff
                {
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: Platform.OS === 'ios' ? 48 : 35,
                    backgroundColor:
                        colorScheme === 'light'
                            ? props?.styles?.lightbgcolor == null
                                ? '#ffffff'
                                : props?.styles?.lightbgcolor
                            : props?.styles?.darkbgcolor == null
                            ? '#000000'
                            : props?.styles?.darkbgcolor,
                    // backgroundColor: '#000',
                },
            ]}
        >
            <StatusBar />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    lightContainer: {
        backgroundColor: '#ffffff',
    },
    darkContainer: {
        backgroundColor: '#000000',
    },
});
