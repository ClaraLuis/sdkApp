import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { WebsiteDesignWorkPlaceContext } from '../../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import generalstyles from '../../../GeneralFiles/Stylesheet/Stylesheet';
import { LanguageContext } from '../../../../LanguageContext/LanguageContext';
import { ImageComponent } from '../../../../ImageComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FetchingContext } from '../../../../FetchingContext/FetchingContext';
import { TemplateRoutingContext } from '../../../../TemplateRoutingContext';

const Popup = (props) => {
    const { lang, langdetect } = useContext(LanguageContext);
    const { setshowpopupContext, showpopupContext } = useContext(WebsiteDesignWorkPlaceContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const [imagesarray, setimagesarray] = useState([]);
    const { cardonclickfunctionContext } = useContext(FetchingContext);
    const { routingtemp } = useContext(TemplateRoutingContext);

    // const [showpopup, setshowpopup] = useState(true);

    useEffect(() => {
        if (props?.sectionpropertiesProps != undefined) {
            var secpropobj = {};
            props?.sectionpropertiesProps?.forEach(function (sectionpropertiesobj, sectionpropertiesindex) {
                secpropobj[sectionpropertiesobj.property_css_name] = sectionpropertiesobj.property_value;
            });
            setsectionproperties({ ...secpropobj });
        }
    }, [props.sectionpropertiesProps]);
    useEffect(() => {
        if (sectionproperties.length != 0) {
            if (sectionproperties.bgsection_imagearrayofobjs != null) {
                var bgsection_imagearrayofobjsparsed = JSON.parse(sectionproperties.bgsection_imagearrayofobjs);
                if (Array.isArray(bgsection_imagearrayofobjsparsed)) {
                    setimagesarray([...bgsection_imagearrayofobjsparsed]);
                }
            }
        }
    }, [sectionproperties]);
    // const AsyncFunc = async () => {
    //     // getting value of "seenPopUp" key from localStorage
    //     let returningUser = await AsyncStorage.getItem('seenPopUp');
    //     setshowpopup(!returningUser);
    // };
    // const AsyncFunc2 = async () => {
    //     await AsyncStorage.setItem('seenPopUp', true);
    //     setshowpopup(false);
    //     alert(showpopup);
    // };
    // const closePopUp = () => {
    //     AsyncFunc2();
    // };
    // useEffect(() => {
    //     AsyncFunc();
    // }, []);
    const cardsrender = React.useMemo(() => {
        return (
            <View>
                {Object.keys(sectionproperties).length != 0 && showpopupContext == true && imagesarray.length != 0 && (
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={showpopupContext}
                        onRequestClose={() => {
                            // closePopUp();
                            setshowpopupContext(false);
                        }}
                    >
                        <View
                            style={[
                                styles.centeredView,
                                {
                                    backgroundColor: 'rgba(0,0,0,' + sectionproperties.darknessopacity + ')',
                                },
                            ]}
                        >
                            {imagesarray[0]?.IsClickableimg == 'No' && (
                                <View
                                    style={[
                                        styles.modalView,
                                        {
                                            width: sectionproperties.image_width + '%',
                                            height: sectionproperties.image_height + '%',
                                        },
                                    ]}
                                >
                                    <ImageComponent
                                        path={imagesarray.length != 0 ? (langdetect == 'en' ? imagesarray[0].bgsection_image : imagesarray[0].bgsection_image_ar) : ''}
                                        resizeMode={'contain'}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    />
                                </View>
                            )}
                            {imagesarray[0]?.IsClickableimg == 'Yes' && (
                                <TouchableOpacity
                                    style={[
                                        styles.modalView,
                                        {
                                            width: sectionproperties.image_width + '%',
                                            height: sectionproperties.image_height + '%',
                                        },
                                    ]}
                                    onPress={() => {
                                        if (
                                            imagesarray[0]?.IsClickableimg == 'Yes' &&
                                            imagesarray[0]?.appproductid != null &&
                                            imagesarray[0]?.appproductid != '' &&
                                            imagesarray[0]?.appproductid != undefined
                                        ) {
                                            cardonclickfunctionContext('productinfo', imagesarray[0].appproductid, null, null);
                                            setshowpopupContext(false);
                                        } else if (imagesarray[0]?.IsClickableimg == 'Yes' && imagesarray[0]?.clickableimg_page_route != '' && imagesarray[0]?.clickableimg_page_route != undefined) {
                                            setshowpopupContext(false);

                                            routingtemp(imagesarray[0]?.clickableimg_page_route);
                                        } else {
                                        }
                                    }}
                                >
                                    <ImageComponent
                                        path={imagesarray.length != 0 ? (langdetect == 'en' ? imagesarray[0].bgsection_image : imagesarray[0].bgsection_image_ar) : ''}
                                        resizeMode={'contain'}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    />
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity
                                style={[
                                    generalstyles.allcentered,
                                    {
                                        width: 150,
                                        height: 40,
                                        backgroundColor: 'white',
                                        borderRadius: 10,
                                    },
                                ]}
                                onPress={() => {
                                    // closePopUp();
                                    setshowpopupContext(false);
                                }}
                            >
                                <Text style={[generalstyles.poppinsMedium]}>{langdetect == 'en' ? 'Close' : 'غلق'}</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                )}
            </View>
        );
    }, [sectionproperties, imagesarray, showpopupContext]);
    return cardsrender;
};
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },

        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 5,
        elevation: 2,
    },
});
export default Popup;
