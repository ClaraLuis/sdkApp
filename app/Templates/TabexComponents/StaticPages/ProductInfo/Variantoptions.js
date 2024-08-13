import RenderHtml from 'react-native-render-html';
import React, { useState, useContext, useEffect, useRef } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, Linking, Share, Platform, Modal, FlatList, Pressable } from 'react-native';
import { SIZES, icons, images } from '../../GeneralFiles/constants';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign, Feather } from '@expo/vector-icons';

const Variantoptions = (props) => {
    const { lang, langdetect } = useContext(LanguageContext);
    const { StyleParseToIntFuncContext, CurrentPageIdContext } = useContext(WebsiteDesignWorkPlaceContext);
    const [fetchProductInfoQuery, setfetchProductInfoQuery] = useState(props.actions.fetchProductInfoQuery);
    const selectproductoptionvalue = props.actions.selectproductoptionvalue;
    const sectionproperties = props.actions.sectionproperties;
    const clearchoosenvaluesbutkeepcurrentvalue = props.actions.clearchoosenvaluesbutkeepcurrentvalue;
    const [selectedItem, setSelectedItem] = useState(null);
    const [choosevariantoptionmodal, setchoosevariantoptionmodal] = useState(false);
    const [optionindexmodal, setoptionindexmodal] = useState(null);
    const [productOptionModal, setproductOptionModal] = useState(null);
    const [searchinputmodalvalue, setsearchinputmodalvalue] = useState('');
    const variantindexcompleted = props.actions.variantindexcompleted;
    const modalvaluesarrayReturn = () => {
        var temparr = [];
        if (productOptionModal != null) {
            if (searchinputmodalvalue?.length == 0) {
                if (productOptionModal?.optionvalues != undefined) {
                    temparr = productOptionModal?.optionvalues;
                }
            } else {
                if (productOptionModal?.optionvalues != undefined) {
                    productOptionModal?.optionvalues.forEach(function (item, index) {
                        if (item.valuename.toLowerCase().includes(searchinputmodalvalue.toLowerCase())) {
                            temparr.push(item);
                        }
                    });
                }
            }
        }
        return temparr;
    };
    const source = {
        html:
            variantindexcompleted.length != 0
                ? langdetect == 'en'
                    ? fetchProductInfoQuery.data.data.productinfo.variants[variantindexcompleted].variantdescription_en != null
                        ? `<p><span style="font-size: 15px;">` + fetchProductInfoQuery.data.data.productinfo.variants[variantindexcompleted].variantdescription_en + `</span> </p>`
                        : ''
                    : fetchProductInfoQuery.data.data.productinfo.variants[variantindexcompleted].variantdescription_ar != null
                    ? `<p><span style="font-size: 15px">` + fetchProductInfoQuery.data.data.productinfo.variants[variantindexcompleted].variantdescription_ar + `</span> </p>`
                    : ''
                : '',
    };
    return (
        <View
            style={[
                {
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    marginTop: 20,
                    flex: 1,
                    paddingHorizontal: 15,
                    paddingVertical: 15,
                    backgroundColor: sectionproperties.reservation_bgcolor,
                    marginTop: sectionproperties.productInformationType == 'Profile' ? 0 : 15,
                },
                Platform.select({ ios: { zIndex: 1 } }),
            ]}
        >
            {sectionproperties.productInformationType == 'Product/Service Information' && (
                <View style={{ width: '100%' }}>
                    {sectionproperties.variantstyle == 'Select Box' && (
                        <View style={[{ flex: 1, flexDirection: 'column', alignItems: 'center', width: '100%' }]}>
                            {fetchProductInfoQuery.data.data.productinfo.productoptions.map((item, index) => {
                                var selecteditem = null;
                                item?.optionvalues?.forEach(function (tt, ti) {
                                    if (tt.isselected == 1) {
                                        if (langdetect == 'en') {
                                            selecteditem = tt?.valuename;
                                        } else {
                                            selecteditem = tt?.valuename_ar;
                                        }
                                    }
                                });

                                return (
                                    <TouchableOpacity
                                        style={{ marginBottom: 10, width: '100%' }}
                                        onPress={() => {
                                            setchoosevariantoptionmodal(true);
                                            setproductOptionModal(item);
                                            setsearchinputmodalvalue('');
                                            setoptionindexmodal(index);
                                        }}
                                    >
                                        <Text
                                            style={[
                                                {
                                                    fontFamily:
                                                        sectionproperties.form_labelfontweight == 300
                                                            ? 'Poppins-Thin'
                                                            : sectionproperties.form_labelfontweight == 400
                                                            ? 'Poppins-Light'
                                                            : sectionproperties.form_labelfontweight == 500
                                                            ? 'Poppins-Regular'
                                                            : sectionproperties.form_labelfontweight == 600
                                                            ? 'Poppins-Medium'
                                                            : sectionproperties.form_labelfontweight == 700
                                                            ? 'Poppins-Semibold'
                                                            : 'Poppins-Bold',
                                                    color: sectionproperties.form_labelcolor,
                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.form_labelfontsize),
                                                    textAlign: 'left',
                                                    textTransform:
                                                        sectionproperties.form_labeltexttransform == 'Uppercase'
                                                            ? 'uppercase'
                                                            : sectionproperties.form_labeltexttransform == 'Capitalize'
                                                            ? 'capitalize'
                                                            : sectionproperties.form_labeltexttransform == 'None'
                                                            ? 'none'
                                                            : 'lowercase',
                                                    marginBottom: 10,
                                                },
                                            ]}
                                        >
                                            {langdetect == 'en' ? item.optionname : item.optionname_ar}
                                        </Text>
                                        <View
                                            style={[
                                                styles.textinput,
                                                {
                                                    paddingHorizontal: 10,
                                                    width: '100%',
                                                    marginLeft: 'auto',
                                                    marginRight: 'auto',
                                                    height: 45,
                                                    borderRadius: StyleParseToIntFuncContext(sectionproperties.inputfieldborderradius, '', true),
                                                    color: sectionproperties.inputfieldcolor,
                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.inputfieldfontsize),
                                                    shadowColor: sectionproperties.inputshadowcolor,
                                                    shadowOpacity: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 0.1 : 0,
                                                    shadowOffset: {
                                                        width: 0,
                                                        height: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 3 : 0,
                                                    },
                                                    shadowRadius: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 3 : 0,
                                                    elevation: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 1 : 0,
                                                    backgroundColor: sectionproperties.input_bgcolor,
                                                    borderWidth: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true),
                                                    borderColor: sectionproperties.inputfieldborderColor,
                                                    justifyContent: 'center',
                                                },
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    {
                                                        color: sectionproperties.inputfieldcolor,
                                                        fontSize: StyleParseToIntFuncContext(sectionproperties.inputfieldfontsize),
                                                        fontFamily: 'Poppins-Medium',
                                                        justifyContent: 'center',
                                                    },
                                                ]}
                                            >
                                                {selecteditem}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    )}
                    {sectionproperties.variantstyle == 'Slider' && (
                        <View style={{ width: '100%' }}>
                            {fetchProductInfoQuery.data.data.productinfo.productoptions.map((item, index) => {
                                return (
                                    <View style={{ width: '100%', marginBottom: 10 }}>
                                        <Text
                                            style={[
                                                {
                                                    marginBottom: 10,
                                                    color: sectionproperties.varianttitle_color,
                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.varianttitle_fontSize),
                                                    textTransform:
                                                        sectionproperties.varianttitle_texttransform == 'Uppercase'
                                                            ? 'uppercase'
                                                            : sectionproperties.varianttitle_texttransform == 'Capitalize'
                                                            ? 'capitalize'
                                                            : sectionproperties.varianttitle_texttransform == 'None'
                                                            ? 'none'
                                                            : 'lowercase',
                                                    textAlign: 'left',
                                                    fontFamily:
                                                        sectionproperties.varianttitle_fontweight == 300
                                                            ? 'Poppins-Thin'
                                                            : sectionproperties.varianttitle_fontweight == 400
                                                            ? 'Poppins-Light'
                                                            : sectionproperties.varianttitle_fontweight == 500
                                                            ? 'Poppins-Regular'
                                                            : sectionproperties.varianttitle_fontweight == 600
                                                            ? 'Poppins-Medium'
                                                            : sectionproperties.varianttitle_fontweight == 700
                                                            ? 'Poppins-Semibold'
                                                            : 'Poppins-Bold',
                                                },
                                            ]}
                                        >
                                            {lang.select} {langdetect == 'en' ? item.optionname : item.optionname_ar}:
                                        </Text>
                                        <View style={[generalstyles.flexRow, { paddingHorizontal: 5 }]}>
                                            <ScrollView horizontal>
                                                {item.optionvalues.map((optionvaluesitem, optionvaluesindex) => {
                                                    var isoptionvalueselected = 0;
                                                    if (optionvaluesitem.isselected == 1) {
                                                        isoptionvalueselected = 1;
                                                    } else {
                                                        isoptionvalueselected = 0;
                                                    }
                                                    var isoptionvaluedenabled = 0;
                                                    if (optionvaluesitem.isenabled == 1) {
                                                        isoptionvaluedenabled = 1;
                                                    } else {
                                                        isoptionvaluedenabled = 0;
                                                    }
                                                    if (item.optionname == 'color' || item.optionname == 'Color') {
                                                        if (sectionproperties.colorvariant == 'Color') {
                                                            return (
                                                                <TouchableOpacity
                                                                    style={[
                                                                        generalstyles.allcentered,
                                                                        {
                                                                            width: 40,
                                                                            height: 40,
                                                                            marginEnd: 10,
                                                                            borderWidth: isoptionvalueselected == 1 ? 3 : 0,
                                                                            borderColor: optionvaluesitem.valuename,
                                                                            borderRadius: 50,
                                                                            display: 'flex',
                                                                        },
                                                                    ]}
                                                                    onPress={() => {
                                                                        if (optionvaluesitem.isenabled == 1) {
                                                                            selectproductoptionvalue(index, optionvaluesitem, optionvaluesindex);
                                                                        } else {
                                                                            clearchoosenvaluesbutkeepcurrentvalue(index, optionvaluesitem, optionvaluesindex);
                                                                        }
                                                                    }}
                                                                >
                                                                    <View
                                                                        style={[
                                                                            generalstyles.shadow,
                                                                            {
                                                                                width: isoptionvalueselected == 1 ? 28 : 35,
                                                                                height: isoptionvalueselected == 1 ? 28 : 35,
                                                                                borderRadius: isoptionvalueselected == 1 ? 50 : 10,
                                                                                backgroundColor: optionvaluesitem.valuename,
                                                                                opacity: isoptionvaluedenabled == 1 ? 1 : 0.2,
                                                                            },
                                                                        ]}
                                                                    ></View>
                                                                </TouchableOpacity>
                                                            );
                                                        } else {
                                                            return (
                                                                <TouchableOpacity
                                                                    style={[
                                                                        generalstyles.allcentered,
                                                                        {
                                                                            minWidth:
                                                                                sectionproperties.variantcontainer_bgcolortransparent == 'Transparent'
                                                                                    ? 'auto'
                                                                                    : StyleParseToIntFuncContext(
                                                                                          sectionproperties.variantcontainer_minwidth != null &&
                                                                                              sectionproperties.variantcontainer_minwidth != undefined
                                                                                              ? sectionproperties.variantcontainer_minwidth
                                                                                              : 40,
                                                                                      ),
                                                                            height:
                                                                                sectionproperties.variantcontainer_bgcolortransparent == 'Transparent'
                                                                                    ? 'auto'
                                                                                    : StyleParseToIntFuncContext(
                                                                                          sectionproperties.variantcontainer_height != null && sectionproperties.variantcontainer_height != undefined
                                                                                              ? sectionproperties.variantcontainer_height
                                                                                              : 40,
                                                                                      ),
                                                                            display: 'flex',
                                                                            backgroundColor:
                                                                                isoptionvaluedenabled == 1
                                                                                    ? isoptionvalueselected == 1
                                                                                        ? sectionproperties.activevariantcontainer_bgcolor
                                                                                        : sectionproperties.variantcontainer_bgcolor
                                                                                    : 'grey',
                                                                            borderRadius: StyleParseToIntFuncContext(
                                                                                sectionproperties.variantcontainer_borderBottomLeftRadius != undefined &&
                                                                                    sectionproperties.variantcontainer_borderBottomLeftRadius != null
                                                                                    ? sectionproperties.variantcontainer_borderBottomLeftRadius
                                                                                    : 100,
                                                                            ),
                                                                            paddingHorizontal: 10,
                                                                            marginEnd: 10,
                                                                        },
                                                                    ]}
                                                                    onPress={() => {
                                                                        if (optionvaluesitem.isenabled == 1) {
                                                                            selectproductoptionvalue(index, optionvaluesitem, optionvaluesindex);
                                                                        } else {
                                                                            clearchoosenvaluesbutkeepcurrentvalue(index, optionvaluesitem, optionvaluesindex);
                                                                        }
                                                                    }}
                                                                >
                                                                    <Text
                                                                        style={[
                                                                            generalstyles.poppinsMedium,
                                                                            {
                                                                                color: sectionproperties.variantcontainer_color,
                                                                                fontSize: StyleParseToIntFuncContext(
                                                                                    sectionproperties.variantcontainer_fontSize != null && sectionproperties.variantcontainer_fontSize != undefined
                                                                                        ? sectionproperties.variantcontainer_fontSize
                                                                                        : 15,
                                                                                ),
                                                                            },
                                                                        ]}
                                                                    >
                                                                        {langdetect == 'en' ? optionvaluesitem.valuename : optionvaluesitem.valuename_ar}
                                                                    </Text>
                                                                </TouchableOpacity>
                                                            );
                                                        }
                                                    } else if (item.optionname == 'size' || item.optionname == 'Size') {
                                                        return (
                                                            <TouchableOpacity
                                                                style={[
                                                                    generalstyles.allcentered,
                                                                    {
                                                                        minWidth:
                                                                            sectionproperties.variantcontainer_bgcolortransparent == 'Transparent'
                                                                                ? 'auto'
                                                                                : StyleParseToIntFuncContext(
                                                                                      sectionproperties.variantcontainer_minwidth != null && sectionproperties.variantcontainer_minwidth != undefined
                                                                                          ? sectionproperties.variantcontainer_minwidth
                                                                                          : 40,
                                                                                  ),
                                                                        height:
                                                                            sectionproperties.variantcontainer_bgcolortransparent == 'Transparent'
                                                                                ? 'auto'
                                                                                : StyleParseToIntFuncContext(
                                                                                      sectionproperties.variantcontainer_height != null && sectionproperties.variantcontainer_height != undefined
                                                                                          ? sectionproperties.variantcontainer_height
                                                                                          : 40,
                                                                                  ),
                                                                        display: 'flex',
                                                                        backgroundColor:
                                                                            isoptionvaluedenabled == 1
                                                                                ? isoptionvalueselected == 1
                                                                                    ? sectionproperties.activevariantcontainer_bgcolor
                                                                                    : sectionproperties.variantcontainer_bgcolor
                                                                                : 'grey',
                                                                        borderRadius: StyleParseToIntFuncContext(
                                                                            sectionproperties.variantcontainer_borderBottomLeftRadius != undefined &&
                                                                                sectionproperties.variantcontainer_borderBottomLeftRadius != null
                                                                                ? sectionproperties.variantcontainer_borderBottomLeftRadius
                                                                                : 100,
                                                                        ),
                                                                        paddingHorizontal: 10,
                                                                        marginEnd: 10,
                                                                        borderWidth: sectionproperties.variantcontainerbordercolor != undefined ? 1 : 0,
                                                                        borderColor:
                                                                            isoptionvalueselected == 1 ? sectionproperties.activevariantcontainer_color : sectionproperties.variantcontainerbordercolor,
                                                                    },
                                                                ]}
                                                                onPress={() => {
                                                                    if (optionvaluesitem.isenabled == 1) {
                                                                        selectproductoptionvalue(index, optionvaluesitem, optionvaluesindex);
                                                                    } else {
                                                                        clearchoosenvaluesbutkeepcurrentvalue(index, optionvaluesitem, optionvaluesindex);
                                                                    }
                                                                }}
                                                            >
                                                                <Text
                                                                    style={[
                                                                        generalstyles.poppinsMedium,
                                                                        {
                                                                            color:
                                                                                isoptionvalueselected == 1 ? sectionproperties.activevariantcontainer_color : sectionproperties.variantcontainer_color,
                                                                            fontSize: StyleParseToIntFuncContext(
                                                                                sectionproperties.variantcontainer_fontSize != null && sectionproperties.variantcontainer_fontSize != undefined
                                                                                    ? sectionproperties.variantcontainer_fontSize
                                                                                    : 15,
                                                                            ),
                                                                        },
                                                                    ]}
                                                                >
                                                                    {langdetect == 'en' ? optionvaluesitem.valuename : optionvaluesitem.valuename_ar}
                                                                </Text>
                                                            </TouchableOpacity>
                                                        );
                                                    } else {
                                                        return (
                                                            <TouchableOpacity
                                                                style={[
                                                                    generalstyles.allcentered,
                                                                    {
                                                                        minWidth: StyleParseToIntFuncContext(
                                                                            sectionproperties.variantcontainer_minwidth != null && sectionproperties.variantcontainer_minwidth != undefined
                                                                                ? sectionproperties.variantcontainer_minwidth
                                                                                : 40,
                                                                        ),
                                                                        height: StyleParseToIntFuncContext(
                                                                            sectionproperties.variantcontainer_height != null && sectionproperties.variantcontainer_height != undefined
                                                                                ? sectionproperties.variantcontainer_height
                                                                                : 40,
                                                                        ),
                                                                        display: 'flex',
                                                                        backgroundColor:
                                                                            isoptionvaluedenabled == 1
                                                                                ? isoptionvalueselected == 1
                                                                                    ? sectionproperties.activevariantcontainer_bgcolor
                                                                                    : sectionproperties.variantcontainer_bgcolor
                                                                                : 'grey',
                                                                        // backgroundColor:
                                                                        //     sectionproperties.variantcontainer_bgcolortransparent == 'Transparent' ? 'transparent' : sectionproperties.variantcontainer_bgcolor,
                                                                        borderRadius: StyleParseToIntFuncContext(
                                                                            sectionproperties.variantcontainer_borderBottomLeftRadius != undefined &&
                                                                                sectionproperties.variantcontainer_borderBottomLeftRadius != null
                                                                                ? sectionproperties.variantcontainer_borderBottomLeftRadius
                                                                                : 100,
                                                                        ),
                                                                        marginEnd: 10,
                                                                        paddingHorizontal: 10,
                                                                    },
                                                                ]}
                                                                onPress={() => {
                                                                    if (optionvaluesitem.isenabled == 1) {
                                                                        selectproductoptionvalue(index, optionvaluesitem, optionvaluesindex);
                                                                    } else {
                                                                        clearchoosenvaluesbutkeepcurrentvalue(index, optionvaluesitem, optionvaluesindex);
                                                                    }
                                                                }}
                                                            >
                                                                <Text
                                                                    style={[
                                                                        generalstyles.poppinsMedium,
                                                                        {
                                                                            color: isoptionvalueselected == 1 ? 'white' : sectionproperties.varianttext_color,
                                                                            fontSize: StyleParseToIntFuncContext(sectionproperties.varianttext_fontSize),
                                                                        },
                                                                    ]}
                                                                >
                                                                    {langdetect == 'en' ? optionvaluesitem.valuename : optionvaluesitem.valuename_ar}
                                                                </Text>
                                                            </TouchableOpacity>
                                                        );
                                                    }
                                                })}
                                            </ScrollView>
                                        </View>
                                    </View>
                                );
                            })}
                        </View>
                    )}
                    {variantindexcompleted.length != 0 && (
                        <View
                            style={{
                                backgroundColor: '#eee',
                                borderRadius: 10,
                                paddingHorizontal: 10,
                                display:
                                    langdetect == 'en' && fetchProductInfoQuery.data.data.productinfo.variants[variantindexcompleted].variantdescription_en != null
                                        ? 'flex'
                                        : langdetect == 'ar' && fetchProductInfoQuery.data.data.productinfo.variants[variantindexcompleted].variantdescription_ar != null
                                        ? 'flex'
                                        : 'none',
                            }}
                        >
                            <Text style={[generalstyles.poppinsMedium]}>
                                <RenderHtml
                                    source={source}
                                    tagsStyles={{
                                        body: {
                                            direction: langdetect == 'en' ? 'ltr' : 'rtl',
                                            textAlign: 'left',
                                        },
                                        span: {
                                            direction: langdetect == 'en' ? 'ltr' : 'rtl',
                                            textAlign: 'left',
                                            color: sectionproperties.descriptionoverwritestyles == 'Yes' ? sectionproperties.desc_secondarycolor : '',
                                        },
                                    }}
                                />
                            </Text>
                        </View>
                    )}
                </View>
            )}
            {sectionproperties.productInformationType == 'Profile' && (
                <View style={{ width: '100%', position: 'relative', backgroundColor: 'white', paddingVertical: 15, paddingHorizontal: 10, paddingBottom: 0, borderRadius: 10 }}>
                    {fetchProductInfoQuery.data.data.productinfo.productoptions.map((item, index) => {
                        return (
                            <View style={{ width: '100%' }}>
                                {fetchProductInfoQuery.data.data.productinfo.productoptions.length - 1 != index && (
                                    <View style={{ width: 1, height: '100%', backgroundColor: sectionproperties.upperseparatorbgcolor, position: 'absolute', top: 7 }} />
                                )}
                                <View style={{ width: 8, height: 8, borderRadius: 100, backgroundColor: sectionproperties.upperseparatorsecondarybgcolor, position: 'absolute', top: 7, left: -3.5 }} />
                                <View style={[generalstyles.flexRow, { width: '100%', marginHorizontal: 15, marginBottom: 30, alignItems: 'center' }]}>
                                    <Text
                                        style={[
                                            {
                                                color: sectionproperties.varianttitle_color,
                                                fontSize: StyleParseToIntFuncContext(sectionproperties.varianttitle_fontSize),
                                                textTransform:
                                                    sectionproperties.varianttitle_texttransform == 'Uppercase'
                                                        ? 'uppercase'
                                                        : sectionproperties.varianttitle_texttransform == 'Capitalize'
                                                        ? 'capitalize'
                                                        : sectionproperties.varianttitle_texttransform == 'None'
                                                        ? 'none'
                                                        : 'lowercase',
                                                textAlign: 'left',
                                                fontFamily:
                                                    sectionproperties.varianttitle_fontweight == 300
                                                        ? 'Poppins-Thin'
                                                        : sectionproperties.varianttitle_fontweight == 400
                                                        ? 'Poppins-Light'
                                                        : sectionproperties.varianttitle_fontweight == 500
                                                        ? 'Poppins-Regular'
                                                        : sectionproperties.varianttitle_fontweight == 600
                                                        ? 'Poppins-Medium'
                                                        : sectionproperties.varianttitle_fontweight == 700
                                                        ? 'Poppins-Semibold'
                                                        : 'Poppins-Bold',
                                            },
                                        ]}
                                    >
                                        {langdetect == 'en' ? item.optionname : item.optionname_ar}:
                                    </Text>
                                    <View style={[generalstyles.flexRow, { marginHorizontal: 10 }]}>
                                        {item.optionvalues.map((optionvaluesitem, optionvaluesindex) => {
                                            return (
                                                <View
                                                    style={[
                                                        generalstyles.allcentered,
                                                        {
                                                            minWidth:
                                                                sectionproperties.variantcontainer_bgcolortransparent == 'Transparent'
                                                                    ? 'auto'
                                                                    : StyleParseToIntFuncContext(
                                                                          sectionproperties.variantcontainer_minwidth != null && sectionproperties.variantcontainer_minwidth != undefined
                                                                              ? sectionproperties.variantcontainer_minwidth
                                                                              : 40,
                                                                      ),
                                                            height:
                                                                sectionproperties.variantcontainer_bgcolortransparent == 'Transparent'
                                                                    ? 'auto'
                                                                    : StyleParseToIntFuncContext(
                                                                          sectionproperties.variantcontainer_height != null && sectionproperties.variantcontainer_height != undefined
                                                                              ? sectionproperties.variantcontainer_height
                                                                              : 40,
                                                                      ),
                                                            display: 'flex',
                                                            backgroundColor:
                                                                sectionproperties.variantcontainer_bgcolortransparent == 'Transparent' ? 'transparent' : sectionproperties.variantcontainer_bgcolor,
                                                            borderRadius: StyleParseToIntFuncContext(
                                                                sectionproperties.variantcontainer_borderBottomLeftRadius != undefined &&
                                                                    sectionproperties.variantcontainer_borderBottomLeftRadius != null
                                                                    ? sectionproperties.variantcontainer_borderBottomLeftRadius
                                                                    : 100,
                                                            ),
                                                        },
                                                    ]}
                                                >
                                                    <Text
                                                        style={[
                                                            generalstyles.poppinsMedium,
                                                            {
                                                                color: sectionproperties.variantcontainer_color,
                                                                fontSize: StyleParseToIntFuncContext(
                                                                    sectionproperties.variantcontainer_fontSize != null && sectionproperties.variantcontainer_fontSize != undefined
                                                                        ? sectionproperties.variantcontainer_fontSize
                                                                        : 15,
                                                                ),
                                                            },
                                                        ]}
                                                    >
                                                        {langdetect == 'en' ? optionvaluesitem.valuename : optionvaluesitem.valuename_ar}
                                                    </Text>
                                                </View>
                                            );
                                        })}
                                    </View>
                                </View>
                            </View>
                        );
                    })}
                </View>
            )}
            <Modal
                animationType="slide"
                presentationStyle="formSheet"
                visible={choosevariantoptionmodal}
                onRequestClose={() => {
                    setchoosevariantoptionmodal(false);
                }}
            >
                {productOptionModal != null && (
                    <View style={Modalstyles.centeredView}>
                        <View style={Modalstyles.modalView}>
                            <View style={{ width: '100%', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                <Pressable
                                    style={[generalstyles.allcentered, { backgroundColor: sectionproperties.closeSliderBgColor, width: 40, height: 40, borderRadius: 100 }]}
                                    onPress={() => {
                                        setchoosevariantoptionmodal(false);
                                    }}
                                >
                                    <AntDesign name="close" color={sectionproperties.closeSlider_color} size={20} />
                                </Pressable>
                            </View>
                            {sectionproperties.searchbar_show == 'Show' && (
                                <View style={{ width: '100%' }}>
                                    <View
                                        style={[
                                            generalstyles.flexRow,
                                            {
                                                borderRadius: StyleParseToIntFuncContext(sectionproperties.searchbarcont_borderRadius, '', true),
                                                shadowColor: sectionproperties.searchbarcontinputshadowcolor,
                                                shadowOpacity: 0.1,
                                                shadowOffset: {
                                                    width: 0,
                                                    height: 3,
                                                },
                                                elevation: StyleParseToIntFuncContext(sectionproperties.searchbarcontinput_borderwidth, '', true) == 0 ? 1 : 0,
                                                backgroundColor: sectionproperties.searchbarcont_bgcolor,
                                                paddingHorizontal: 15,
                                                borderWidth: StyleParseToIntFuncContext(sectionproperties.searchbarcontinput_borderwidth, '', true),
                                                borderColor: sectionproperties.searchbarcontinput_bordercolor,
                                            },
                                        ]}
                                    >
                                        <Feather name="search" size={20} color={sectionproperties.searchbarcont_color} />
                                        <TextInput
                                            style={[
                                                styles.textinput,
                                                {
                                                    paddingHorizontal: 20,
                                                    width: '100%',
                                                    marginLeft: 'auto',
                                                    marginRight: 'auto',
                                                    height: StyleParseToIntFuncContext(sectionproperties.searchbarcont_height),
                                                    fontFamily: 'Poppins-Medium',
                                                    color: sectionproperties.searchbarcont_color,
                                                },
                                            ]}
                                            value={searchinputmodalvalue}
                                            onChangeText={(event) => {
                                                setsearchinputmodalvalue(event);
                                            }}
                                            placeholder="Search"
                                        ></TextInput>
                                    </View>
                                </View>
                            )}
                            <View style={{ width: '100%', marginTop: 20 }}>
                                <Text
                                    style={[
                                        {
                                            fontFamily:
                                                sectionproperties.form_labelfontweight == 300
                                                    ? 'Poppins-Thin'
                                                    : sectionproperties.form_labelfontweight == 400
                                                    ? 'Poppins-Light'
                                                    : sectionproperties.form_labelfontweight == 500
                                                    ? 'Poppins-Regular'
                                                    : sectionproperties.form_labelfontweight == 600
                                                    ? 'Poppins-Medium'
                                                    : sectionproperties.form_labelfontweight == 700
                                                    ? 'Poppins-Semibold'
                                                    : 'Poppins-Bold',
                                            color: sectionproperties.form_labelcolor,
                                            fontSize: StyleParseToIntFuncContext(sectionproperties.form_labelfontsize),
                                            textAlign: 'left',
                                            textTransform:
                                                sectionproperties.form_labeltexttransform == 'Uppercase'
                                                    ? 'uppercase'
                                                    : sectionproperties.form_labeltexttransform == 'Capitalize'
                                                    ? 'capitalize'
                                                    : sectionproperties.form_labeltexttransform == 'None'
                                                    ? 'none'
                                                    : 'lowercase',
                                            marginBottom: 10,
                                        },
                                    ]}
                                >
                                    {langdetect == 'en' ? productOptionModal?.optionname : productOptionModal?.optionname_ar}
                                </Text>
                                <FlatList
                                    data={modalvaluesarrayReturn()}
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item, index }) => {
                                        var isoptionvalueselected = 0;
                                        var backgroundcolor = sectionproperties.variantcontainer_bgcolor;
                                        var color = '';
                                        if (item.isselected == 1) {
                                            isoptionvalueselected = 1;
                                        } else {
                                            isoptionvalueselected = 0;
                                        }
                                        var isoptionvaluedenabled = 0;
                                        if (item.isenabled == 1) {
                                            isoptionvaluedenabled = 1;
                                        } else {
                                            isoptionvaluedenabled = 0;
                                        }
                                        if (item.isselected == 1) {
                                            backgroundcolor = sectionproperties.activevariantcontainer_bgcolor;
                                            color = sectionproperties.variantcontainer_color;
                                        } else {
                                            if (item.isenabled == 1) {
                                                backgroundcolor = sectionproperties.variantcontainer_bgcolor;
                                                color = sectionproperties.variantcontainer_color;
                                            } else {
                                                backgroundcolor = sectionproperties.variantcontainer_bgcolor;
                                            }
                                        }
                                        return (
                                            <TouchableOpacity
                                                activeOpacity={0.9}
                                                onPress={() => {
                                                    if (item.isselected == 1) {
                                                    } else {
                                                        if (item.isenabled == 1) {
                                                            selectproductoptionvalue(optionindexmodal, item, index);
                                                        } else {
                                                            clearchoosenvaluesbutkeepcurrentvalue(optionindexmodal, item, index);
                                                        }
                                                    }
                                                    setchoosevariantoptionmodal(false);
                                                }}
                                                style={[
                                                    {
                                                        borderRadius: 10,
                                                        overflow: 'hidden',
                                                        marginRight: 10,
                                                        borderWidth: 1,
                                                        borderColor: sectionproperties.variantcontainerbordercolor,
                                                        width: '100%',
                                                        borderWidth: 1,
                                                        marginBottom: 20,
                                                        paddingHorizontal: 10,
                                                        height: StyleParseToIntFuncContext(sectionproperties.variantcontainer_height),
                                                        backgroundColor: backgroundcolor,
                                                        justifyContent: 'center',
                                                    },
                                                ]}
                                            >
                                                <Text style={[generalstyles.poppinsMedium, { color: color, textTransform: 'capitalize' }]}>
                                                    {langdetect == 'en' ? item?.valuename : item?.valuename_ar}
                                                </Text>
                                            </TouchableOpacity>
                                        );
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                )}
            </Modal>
        </View>
    );
};

export default Variantoptions;

const styles = StyleSheet.create({
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        backgroundColor: 'white',
        // borderRadius: 20,
        // padding: 35,
        width: SIZES.width,
        height: SIZES.height - 80,
    },
});
const Modalstyles = StyleSheet.create({
    logocontainer: {
        width: 120,
        height: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputscontainer: {
        marginBottom: 30,
        width: '100%',
        position: 'relative',
        flexDirection: 'column',
    },
    textinput: {
        position: 'relative',
        height: 45,
        paddingStart: 10,
        paddingEnd: 10,
        width: '100%',
        fontFamily: 'Poppins-Medium',
        marginTop: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        width: '100%',
        height: '100%',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 5,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});
