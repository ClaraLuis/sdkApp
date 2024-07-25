import React, { useState, useContext, useEffect } from 'react';
import { View, FlatList, TextInput, StyleSheet, Text, Platform } from 'react-native';
import { SIZES } from '../../../GeneralFiles/constants';
import { WebsiteDesignWorkPlaceContext } from '../../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import generalstyles from '../../../GeneralFiles/Stylesheet/Stylesheet';
import { urlEndpoint } from '../../../../../config/imagekit';
import { LanguageContext } from '../../../../LanguageContext/LanguageContext';
import { useSelector } from 'react-redux';
import { TemplateRoutingContext } from '../../../../TemplateRoutingContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { FetchingContext } from '../../../../FetchingContext/FetchingContext';
import PickerModal from 'react-native-picker-modal-view';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { AntDesign } from '@expo/vector-icons';

const DynamicForm = (props) => {
    const navigation = useNavigation();
    const { lang, langdetect } = useContext(LanguageContext);
    const StatePageProperties11 = useSelector((state) => state.page.value);
    const { StyleParseToIntFuncContext, CurrentPageIdContext, imageurlendpointcontext } = useContext(WebsiteDesignWorkPlaceContext);
    const { routingcountext, routingtemp, StaticPagesLinksContext } = useContext(TemplateRoutingContext);
    const { fetchdynamicformfeildsQueryContext, FetchQueriesEngineContext, showUpTopNotificationBarContext, GeneralAPIMutationContext, setFetchQueriesEngineContext } = useContext(FetchingContext);
    const [sectionproperties, setsectionproperties] = useState('');
    const [formtitleen, setformtitleen] = useState('');
    const [formtitlear, setformtitlear] = useState('');
    const [confirmationtext, setconfirmationtext] = useState('');
    const [dynamicform, setdynamicform] = useState({});
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
        if (fetchdynamicformfeildsQueryContext.isSuccess) {
            fetchdynamicformfeildsQueryContext?.data?.data?.dynamicforms?.forEach(function (item, index) {
                if (item.id == props.dynamicformid) {
                    var tempitem = item;
                    var temptitleen = item.title_en;
                    var temptitlear = item.title_ar;
                    setformtitleen(temptitleen);
                    setformtitlear(temptitlear);
                    tempitem?.fields?.forEach(function (fielditem) {
                        fielditem.value = '';
                        fielditem.isshowcalendar = false;
                        fielditem.nameen = item.title_en;
                    });
                    setdynamicform(tempitem);
                }
            });
        }
    }, [fetchdynamicformfeildsQueryContext.isSuccess]);
    const updateformfield = (value, index) => {
        var tempynamicform = { ...dynamicform };
        tempynamicform.fields[index].value = value;
        tempynamicform.fields[index].isshowcalendar = false;
        setdynamicform({ ...dynamicform });
    };
    const submitform = () => {
        var tempynamicform = { ...dynamicform };
        var fields = tempynamicform.fields;
        var validationpassed = true;
        var reason = '';
        fields?.forEach(function (item, index) {
            if (item.isrequired == 1) {
                if (item.value != undefined && item.value != null) {
                    if (item.value.length == 0) {
                        validationpassed = false;
                        reason = item.title_en + ' ' + 'Is Missing';
                    }
                }
            }
        });
        if (validationpassed) {
            GeneralAPIMutationContext.mutate({
                endpointurl: '/submitdynamicforms',
                data: tempynamicform,
                mutateSuccesscallback: function mutateSuccesscallback(data, variables) {
                    //   setslots(data.data.slots);
                    // alert('done');
                    setconfirmationtext(langdetect == 'en' ? 'We have recieved your message' : 'تم استقبال رسالتك');
                    clearform();
                },
            });
        } else {
            showUpTopNotificationBarContext(reason, 'orange');
        }
    };
    const clearform = () => {
        var tempitem = { ...dynamicform };
        tempitem?.fields?.forEach(function (fielditem) {
            fielditem.value = '';
        });
        setdynamicform(tempitem);
    };
    const inputitem = (item, index) => {
        var type = 'input';
        if (item.type == 'textarea') {
            type = 'textarea';
        } else if (item.type == 'number') {
            type = 'number';
        } else if (item.type == 'text') {
            type = 'text';
        }
        return (
            <View style={{ width: '100%' }}>
                <Text
                    style={{
                        marginBottom: 5,
                        marginTop: 20,
                        fontSize: StyleParseToIntFuncContext(sectionproperties.form_labelfontsize),
                        color: sectionproperties.form_labelcolor,
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
                        textAlign: 'left',
                    }}
                >
                    {langdetect == 'en' ? item.title_en : item.title_ar} {item.isrequired == 1 ? '*' : ''}
                </Text>
                <TextInput
                    keyboardType={type == 'number' ? 'numeric' : 'default'}
                    style={[
                        styles.textinput,
                        generalstyles.poppinsMedium,
                        {
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
                            backgroundColor: 'transparent',
                            borderWidth: sectionproperties.inputfieldbordertype == 'All' ? StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) : 0,
                            borderBottomWidth: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true),
                            borderColor: sectionproperties.inputfieldborderColor,
                        },
                    ]}
                    value={item.value?.toString()}
                    // multiline={type == 'textarea' ? true : false}
                    // numberOfLines={type == 'textarea' ? 4 : 0}
                    onChangeText={(value) => {
                        updateformfield(value, index);
                    }}
                    underlineColorAndroid="transparent"
                    placeholder={''}
                    placeholderTextColor={'#ccc'}

                    // style={[generalstyles.poppinsMedium, { paddingLeft: 5 }]}
                />
            </View>
        );
    };
    const dateitem = (item, index) => {
        var type = 'input';
        if (item.type == 'textarea') {
            type = 'textarea';
        } else if (item.type == 'number') {
            type = 'number';
        } else if (item.type == 'text') {
            type = 'text';
        }
        return (
            <View style={{ width: '100%' }}>
                <View style={{ marginBottom: 10 }}>
                    <Text
                        style={{
                            marginBottom: 20,
                            marginTop: 20,
                            fontSize: StyleParseToIntFuncContext(sectionproperties.form_labelfontsize),
                            color: sectionproperties.form_labelcolor,
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
                            textAlign: 'left',
                        }}
                    >
                        {langdetect == 'en' ? item.title_en : item.title_ar} {item.isrequired == 1 ? '*' : ''}
                    </Text>
                    <TouchableOpacity
                        style={[
                            styles.textinput,
                            generalstyles.poppinsMedium,
                            generalstyles.allcentered,
                            {
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
                                backgroundColor: 'transparent',
                                borderWidth: sectionproperties.inputfieldbordertype == 'All' ? StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) : 0,
                                borderBottomWidth: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true),
                                borderColor: sectionproperties.inputfieldborderColor,
                            },
                        ]}
                        onPress={() => {
                            var tempynamicform = { ...dynamicform };
                            tempynamicform.fields[index].isshowcalendar = true;
                            setdynamicform({ ...dynamicform });
                        }}
                    >
                        <Text
                            style={[
                                generalstyles.poppinsMedium,
                                {
                                    color: sectionproperties.inputfieldcolor,
                                    fontSize: StyleParseToIntFuncContext(sectionproperties.inputfieldfontsize),
                                },
                            ]}
                            underlineColorAndroid="transparent"
                            placeholder="dd/mm/yyyy"
                            placeholderTextColor="black"
                            autoCapitalize="none"
                            editable={false}
                        >
                            {item.value.length == 0 ? lang.choosedate : item.value}
                        </Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={item.isshowcalendar == undefined ? false : item.isshowcalendar}
                        mode={'date'}
                        // minimumDate={new Date(fetchProductInfoQuery?.data?.data?.productinfo?.serviceinfo?.reservationstarts)}
                        // maximumDate={new Date(fetchProductInfoQuery?.data?.data?.productinfo?.serviceinfo?.reservationends)}
                        onCancel={() => {
                            var tempynamicform = { ...dynamicform };
                            tempynamicform.fields[index].isshowcalendar = false;
                            setdynamicform({ ...dynamicform });
                        }}
                        onConfirm={(date) => {
                            var myDate = date;
                            var day = myDate.getDate();
                            var month = myDate.getMonth();
                            var year = myDate.getFullYear();
                            var hours = myDate.getHours();
                            var minutes = myDate.getMinutes();

                            month = month + 1;
                            var fulldate = year + '-' + month + '-' + day;
                            var fulltime = hours + ':' + minutes;
                            var dateonly = fulldate;
                            // if (inputtype == 'date') {
                            //     var dateonly = fulldate;
                            // }
                            // else if (inputtype == 'time') {
                            //     var dateonly = fulltime;
                            // } else if (inputtype == 'datetime') {
                            //     var dateonly = fulldate + ' ' + fulltime;
                            // }

                            // var tempproductsextrafields = [...productextrafields];
                            // tempproductsextrafields[xindex].isshowcalendar = false;
                            // tempproductsextrafields[xindex].datechoosed = dateonly;
                            // setproductextrafields([...tempproductsextrafields]);
                            updateformfield(dateonly, index);
                            // handleonchangeinput(dateonly, item);
                        }}
                        pickerContainerStyleIOS={{
                            backgroundColor: 'white',
                        }}
                        textColor={'black'}
                    />
                </View>
            </View>
        );
    };
    // const textareaitem = (item, index) => {
    //     return (
    //         <div>
    //             Label: {item.title_en} {item.isrequired == 1 ? '*' : ''}
    //             <TextareaAutosize
    //                 value={item.value}
    //                 onChange={(event) => {
    //                     updateformfield(event.target.value, index);
    //                 }}
    //             />
    //         </div>
    //     );
    // };
    const selectboitem = (item, index) => {
        var itemsarr = item.selectboxvalues;
        if (itemsarr != undefined) {
            var decoditems = JSON.parse(itemsarr);
            if (decoditems != undefined && Array.isArray(decoditems)) {
                var arrtobeused = [];
                decoditems?.forEach(function (arrtoitem) {
                    arrtobeused.push({
                        Name: arrtoitem.optionname_en,
                        Id: arrtoitem.optionname_en,
                    });
                });
                return (
                    <View style={{ width: '100%' }}>
                        <Text
                            style={{
                                marginBottom: 20,
                                marginTop: 20,
                                fontSize: StyleParseToIntFuncContext(sectionproperties.form_labelfontsize),
                                color: sectionproperties.form_labelcolor,
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
                            }}
                        >
                            {item.title_en} {item.isrequired == 1 ? '*' : ''}
                        </Text>

                        <PickerModal
                            renderSelectView={(disabled, selected, showModal) => (
                                <TouchableOpacity
                                    style={[
                                        styles.textinput,
                                        generalstyles.poppinsMedium,
                                        generalstyles.allcentered,
                                        {
                                            borderRadius: StyleParseToIntFuncContext(sectionproperties.inputfieldborderradius, '', true),
                                            shadowColor: sectionproperties.inputshadowcolor,
                                            shadowOpacity: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 0.1 : 0,
                                            shadowOffset: {
                                                width: 0,
                                                height: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 3 : 0,
                                            },
                                            shadowRadius: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 3 : 0,
                                            elevation: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 1 : 0,
                                            backgroundColor: 'transparent',
                                            borderWidth: sectionproperties.inputfieldbordertype == 'All' ? StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) : 0,
                                            borderBottomWidth: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true),
                                            borderColor: sectionproperties.inputfieldborderColor,
                                        },
                                    ]}
                                    // style={[styles.textinput]}
                                    onPress={showModal}
                                >
                                    <Text
                                        disabled={disabled}
                                        title={'Show me!'}
                                        style={{
                                            color: sectionproperties.inputfieldcolor,
                                            fontSize: StyleParseToIntFuncContext(sectionproperties.inputfieldfontsize),
                                        }}
                                    >
                                        {item.value?.length != 0 ? item.value : ''}
                                    </Text>
                                </TouchableOpacity>
                            )}
                            onSelected={(selected) => {
                                if (Object.keys(selected).length != 0) {
                                    updateformfield(selected.Id, index);
                                }
                            }}
                            items={arrtobeused}
                            sortingLanguage={'tr'}
                            showToTopButton={true}
                            selectPlaceholderText={'Choose'}
                            searchPlaceholderText={lang.search}
                            requireSelection={false}
                            autoSort={false}
                            searchInputTextColor={sectionproperties.inputfieldcolor}
                        />
                    </View>
                );
            }
        }
    };

    const cardsrender = React.useMemo(() => {
        return (
            <View
                style={[
                    generalstyles.allcentered,
                    {
                        backgroundColor: sectionproperties.backgroundColor,
                        paddingVertical: StyleParseToIntFuncContext(sectionproperties.cardpaddingvertical),
                        paddingHorizontal: StyleParseToIntFuncContext(sectionproperties.cardpaddinghorizontal),
                        width: '100%',
                        // height: '100%',
                    },
                ]}
            >
                <View
                    style={{
                        width: '100%',
                    }}
                >
                    <TouchableOpacity
                        style={[
                            generalstyles.flexRow,
                            {
                                marginTop: 'auto',
                                marginBottom: 'auto',
                                marginEnd: 5,
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                            },
                        ]}
                        onPress={() => {
                            navigation.goBack();
                        }}
                    >
                        <AntDesign
                            name={langdetect == 'en' ? 'arrowleft' : 'arrowright'}
                            size={20}
                            style={{
                                color: sectionproperties.sectionTitleColor,
                            }}
                        />

                        <Text
                            style={{
                                fontSize: StyleParseToIntFuncContext(sectionproperties.sectionTitleFontSize),
                                fontFamily: 'Poppins-Medium',
                                marginVertical: 20,
                                marginHorizontal: 10,
                                textAlign: 'left',
                                color: sectionproperties.sectionTitleColor,
                                fontSize: StyleParseToIntFuncContext(sectionproperties.sectionTitleFontSize),
                                fontFamily:
                                    sectionproperties.sectionTitleFontWeight == 300
                                        ? 'Poppins-Thin'
                                        : sectionproperties.sectionTitleFontWeight == 400
                                        ? 'Poppins-Light'
                                        : sectionproperties.sectionTitleFontWeight == 500
                                        ? 'Poppins-Regular'
                                        : sectionproperties.sectionTitleFontWeight == 600
                                        ? 'Poppins-Medium'
                                        : sectionproperties.sectionTitleFontWeight == 700
                                        ? 'Poppins-Semibold'
                                        : 'Poppins-Bold',
                            }}
                        >
                            {langdetect == 'en' ? formtitleen : formtitlear}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={[{ width: '100%' }]}>
                    <FlatList
                        data={dynamicform.fields}
                        scrollEnabled={false}
                        vertical
                        // numColumns={sectionproperties.sectionbgstyle == 'Text above image' ? 1 : Math.ceil(bgimagearrayofobjs.length)}
                        // key={sectionproperties.sectionbgstyle == 'Text above image' ? 1 : Math.ceil(bgimagearrayofobjs.length)}
                        renderItem={({ item, index }) => {
                            if (item.type == 'text' || item.type == 'textarea' || item.type == 'number') {
                                return inputitem(item, index);
                            } else if (item.type == 'selectbox') {
                                return selectboitem(item, index);
                            } else if (item.type == 'date') {
                                return dateitem(item, index);
                            }
                            // else if (item.type == 'textarea') {
                            //     return textareaitem(item, index);
                            // } else if (item.type == 'selectbox') {
                            //     return selectboitem(item, index);
                            // }
                        }}
                    />
                </View>
                <View style={[{ width: '100%', justifyContent: 'center' }]}>
                    <TouchableOpacity
                        onPress={() => {
                            submitform();
                        }}
                        disabled={GeneralAPIMutationContext.isLoading}
                        style={[
                            generalstyles.allcentered,
                            {
                                width: StyleParseToIntFuncContext(sectionproperties.generalbtn_width) + '%',
                                height: StyleParseToIntFuncContext(sectionproperties.generalbtn_height),
                                borderRadius: StyleParseToIntFuncContext(sectionproperties.generalbtnborderradius, '', true),
                                backgroundColor: sectionproperties.generalbtn_bgColor,
                                marginVertical: 50,
                                marginLeft: 'auto',
                                marginRight: 'auto',
                            },
                        ]}
                    >
                        {GeneralAPIMutationContext.isLoading == true && (
                            <Text
                                style={{
                                    color: sectionproperties.generalbtn_textColor,
                                    fontSize: StyleParseToIntFuncContext(sectionproperties.generalbtn_fontsize),
                                    fontFamily:
                                        sectionproperties.generalbtn_fontweight == 300
                                            ? 'Poppins-Thin'
                                            : sectionproperties.generalbtn_fontweight == 400
                                            ? 'Poppins-Light'
                                            : sectionproperties.generalbtn_fontweight == 500
                                            ? 'Poppins-Regular'
                                            : sectionproperties.generalbtn_fontweight == 600
                                            ? 'Poppins-Medium'
                                            : sectionproperties.generalbtn_fontweight == 700
                                            ? 'Poppins-Semibold'
                                            : 'Poppins-Bold',
                                }}
                            >
                                {langdetect == 'en' ? 'Loading..' : 'تحميل...'}
                            </Text>
                        )}
                        {GeneralAPIMutationContext.isLoading == false && (
                            <Text
                                style={{
                                    color: sectionproperties.generalbtn_textColor,
                                    fontSize: StyleParseToIntFuncContext(sectionproperties.generalbtn_fontsize),
                                    fontFamily:
                                        sectionproperties.generalbtn_fontweight == 300
                                            ? 'Poppins-Thin'
                                            : sectionproperties.generalbtn_fontweight == 400
                                            ? 'Poppins-Light'
                                            : sectionproperties.generalbtn_fontweight == 500
                                            ? 'Poppins-Regular'
                                            : sectionproperties.generalbtn_fontweight == 600
                                            ? 'Poppins-Medium'
                                            : sectionproperties.generalbtn_fontweight == 700
                                            ? 'Poppins-Semibold'
                                            : 'Poppins-Bold',
                                }}
                            >
                                {langdetect == 'en' ? sectionproperties.generalbtn_content : sectionproperties.slideshow_btn_text_ar}
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>
                <View style={[generalstyles.allcentered, { width: '100%', justifyContent: 'center' }]}>
                    <Text
                        style={[
                            generalstyles.poppinsMedium,
                            {
                                color: '#000',
                                fontSize: 20,
                            },
                        ]}
                    >
                        {confirmationtext}
                    </Text>
                </View>
            </View>
        );
    }, [sectionproperties, dynamicform, GeneralAPIMutationContext.isLoading]);
    return cardsrender;
};

const styles = StyleSheet.create({
    textinput: {
        height: 45,
        paddingStart: 10,
        paddingEnd: 10,
        width: '100%',
        fontFamily: 'Poppins-Medium',
        marginTop: 5,
    },
});

export default DynamicForm;
