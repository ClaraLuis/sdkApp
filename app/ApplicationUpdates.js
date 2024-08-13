import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import { Dimensions } from 'react-native';
import * as Updates from 'expo-updates';
import SpinnerButton from 'react-native-spinner-button';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import InstituteLoader from './InstituteLoader';
import { LanguageContext } from './Templates/LanguageContext/LanguageContext';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

function ApplicationUpdates(props) {
    const [IsUpdating, setIsUpdating] = useState(false);
    // useEffect(async () => {
    //     if (Device.isDevice) {
    //         try {
    //             const update = await Updates.checkForUpdateAsync();

    //             if (update.isAvailable) {
    //                 setIsUpdating(true);
    //                 await Updates.fetchUpdateAsync()
    //                     .then(Updates.reloadAsync)
    //                     .catch((e) => {
    //                         Updates.reloadAsync();
    //                     });
    //                 // ... notify user of update ...
    //                 // await Updates.reloadAsync();
    //             } else {
    //                 setIsUpdating(false);
    //             }
    //         } catch (e) {
    //             // Updates.reloadAsync();
    //             // Restart();
    //         }
    //     }
    // }, []);
    useEffect(() => {
        const checkForUpdates = async () => {
            try {
                if (Device.isDevice) {
                    const update = await Updates.checkForUpdateAsync();

                    if (update.isAvailable) {
                        setIsUpdating(true);
                        await Updates.fetchUpdateAsync()
                            .then(() => {
                                Updates.reloadAsync();
                            })
                            .catch(() => {
                                // Handle fetch error gracefully
                                setIsUpdating(false);
                            });
                    } else {
                        setIsUpdating(false);
                    }
                }
            } catch (error) {
                console.error('Error checking for updates:', error);
                // Handle check for update error gracefully
                setIsUpdating(false);
            }
        };

        checkForUpdates();
    }, []);
    return (
        <View style={{}}>
            {IsUpdating && (
                <>
                    <InstituteLoader isupdatesprops={true} />
                </>
            )}
        </View>
    );
}
export default ApplicationUpdates;
