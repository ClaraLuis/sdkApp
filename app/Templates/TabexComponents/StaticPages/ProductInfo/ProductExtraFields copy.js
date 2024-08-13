import React, { useState, useContext, useEffect, useRef } from 'react';
import { StyleSheet, SafeAreaView, TextInput, View, Text, TouchableOpacity, Image, Linking, Share, Platform, Modal, FlatList } from 'react-native';
import { SIZES, icons, images } from '../../GeneralFiles/constants';
import generalstyles from '../../GeneralFiles/Stylesheet/Stylesheet';
import { WebsiteDesignWorkPlaceContext } from '../../../../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import { FetchingContext } from '../../../FetchingContext/FetchingContext';
import { useQueryClient } from 'react-query';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../GeneralFiles/constants';
import ColorPicker from 'react-native-wheel-color-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import SelectDropdown from 'react-native-select-dropdown';

const ProductExtraFields = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const carouselRef = useRef();
    const navigation = useNavigation();
    const queryClient = useQueryClient();
    const { lang, langdetect } = useContext(LanguageContext);
    const { showUpTopNotificationBarContext, fetchAuthorizationQueryContext } = useContext(FetchingContext);
    const { StyleParseToIntFuncContext, CurrentPageIdContext } = useContext(WebsiteDesignWorkPlaceContext);
    const [IsFavItemProps, setIsFavItemProps] = useState(props.actions.IsFavItemProps);
    const [fetchProductInfoQuery, setfetchProductInfoQuery] = useState(props.actions.fetchProductInfoQuery);
    const variantcompleting = props.actions.variantcompleting;
    const selectproductoptionvalue = props.actions.selectproductoptionvalue;
    const variantchecker = props.actions.variantchecker;
    const sectionproperties = props.actions.sectionproperties;
    const variantindexcompleted = props.actions.variantindexcompleted;
    const clearchoosenvaluesbutkeepcurrentvalue = props.actions.clearchoosenvaluesbutkeepcurrentvalue;
    const addtocardpayloadobj = props.actions.addtocardpayloadobj;
    const setaddtocardpayloadobj = props.actions.setaddtocardpayloadobj;
    const [productextravaluesarray, setproductextravaluesarray] = useState([]);
    const [productextrafields, setproductextrafields] = useState([]);

    const handleonchangeinput = (value, item) => {
        var tempproductextravaluesarray = [...productextravaluesarray];
        var isfieldexists = false;
        var fieldexistsid = null;
        tempproductextravaluesarray.forEach(function (choosenitem, choosenindex) {
            if (item.id == choosenitem.id) {
                isfieldexists = true;
                fieldexistsid = choosenindex;
                tempproductextravaluesarray.splice(choosenindex, 1);
            }
        });
        if (value != null && value.length != 0) {
            tempproductextravaluesarray.push({
                id: item.id,
                title_en: item.title_en,
                title_ar: item.title_ar,
                value: value,
            });
        }
        setproductextravaluesarray([...tempproductextravaluesarray]);
        var tempaddtocardpayloadobj = { ...addtocardpayloadobj };
        tempaddtocardpayloadobj.extrafields = tempproductextravaluesarray;
        setaddtocardpayloadobj({ ...tempaddtocardpayloadobj });
    };
    useEffect(() => {
        if (fetchProductInfoQuery.isSuccess) {
            if (Array.isArray(fetchProductInfoQuery?.data?.data?.productinfo?.productextrafields)) {
                setproductextrafields(fetchProductInfoQuery?.data?.data?.productinfo?.productextrafields);
            }
        }
    }, [fetchProductInfoQuery.isSuccess]);
    return (
        <View
            style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                marginTop: 20,
                flex: 1,
                paddingHorizontal: 15,
                paddingVertical: 15,
                backgroundColor: 'white',
                marginTop: sectionproperties.productInformationType == 'Profile' ? 0 : 15,
            }}
        >
            <View style={{ width: '100%' }}>
                {productextrafields?.map(function (item, index) {
                    var inputtype = '';
                    if (item.type == 'input') {
                        inputtype = 'text';
                    } else {
                        inputtype = item.type;
                    }
                    var componenttype = '';
                    if (inputtype == 'text' || inputtype == 'input' || inputtype == 'number' || inputtype == 'url') {
                        componenttype = 'input';
                    } else if (inputtype == 'date' || inputtype == 'time' || inputtype == 'datetime') {
                        componenttype = 'date';
                    } else if (inputtype == 'color') {
                        componenttype = 'color';
                    } else if (inputtype == 'selectbox') {
                        componenttype = 'selectbox';
                    } else if (inputtype == 'textarea') {
                        componenttype = 'textarea';
                    }
                    var selectboxvaluesparsedarray = [];
                    var selectboxvaluesparsedarrayflatlist = [];
                    if (item.selectboxvalues != undefined && item.selectboxvalues != null) {
                        var selectboxvaluesparsed = JSON.parse(item.selectboxvalues);
                        if (selectboxvaluesparsed != undefined && selectboxvaluesparsed != null && Array.isArray(selectboxvaluesparsed)) {
                            var arraytobeadded = [];
                            var arraytobeaddedflatlist = [];
                            var obj = {
                                value_en: '',
                                value_ar: '',
                            };
                            selectboxvaluesparsed.forEach(function (selextboxitem) {
                                if (langdetect == 'en') {
                                    arraytobeadded.push(selextboxitem.value_en);
                                }
                                if (langdetect == 'ar') {
                                    arraytobeadded.push(selextboxitem.value_ar);
                                }
                            });
                            selectboxvaluesparsed.forEach(function (selextboxitem) {
                                arraytobeaddedflatlist.push({
                                    value_en: selextboxitem.value_en,
                                    value_ar: selextboxitem.value_ar,
                                });
                            });
                            selectboxvaluesparsedarray = arraytobeadded;
                            selectboxvaluesparsedarrayflatlist = arraytobeaddedflatlist;
                        }
                    }
                    var inputvalue = '';
                    productextravaluesarray.forEach(function (chooseditem, chooseditemindex) {
                        if (chooseditem.id == item.id) {
                            inputvalue = chooseditem.value;
                        }
                    });
                    return (
                        <View style={[styles.inputscontainer]}>
                            {componenttype == 'input' && (
                                <View style={{ marginBottom: 10 }}>
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
                                        {langdetect == 'en' ? item.title_en : item.title_ar} {item.isrequired == 1 && <Text style={{ color: COLORS.danger }}>*</Text>}
                                    </Text>
                                    <TextInput
                                        style={[
                                            styles.textinput,
                                            {
                                                paddingHorizontal: 5,
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
                                                fontFamily: 'Poppins-Medium',
                                                paddingHorizontal: 10,
                                            },
                                        ]}
                                        keyboardType={inputtype == 'number' ? 'numeric' : 'default'}
                                        multiline={inputtype == 'textarea' ? true : false}
                                        value={inputvalue}
                                        onChangeText={(event) => {
                                            handleonchangeinput(event, item);
                                        }}
                                    />
                                </View>
                            )}
                            {componenttype == 'textarea' && (
                                <View style={{ marginBottom: 10 }}>
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
                                        {langdetect == 'en' ? item.title_en : item.title_ar} {item.isrequired == 1 && <Text style={{ color: COLORS.danger }}>*</Text>}
                                    </Text>
                                    <TextInput
                                        style={[
                                            styles.textinput,
                                            {
                                                fontFamily: 'Poppins-Medium',
                                                width: '100%',
                                                minHeight: 45,
                                                paddingHorizontal: 5,
                                                marginLeft: 'auto',
                                                marginRight: 'auto',
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
                                                paddingHorizontal: 10,
                                                paddingVertical: 10,
                                            },
                                        ]}
                                        keyboardType={inputtype == 'number' ? 'numeric' : 'default'}
                                        multiline={inputtype == 'textarea' ? true : false}
                                        value={inputvalue}
                                        onChangeText={(event) => {
                                            handleonchangeinput(event, item);
                                        }}
                                    />
                                </View>
                            )}
                            {componenttype == 'color' && (
                                <View style={{ marginBottom: 10 }}>
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
                                        {langdetect == 'en' ? item.title_en : item.title_ar} {item.isrequired == 1 && <Text style={{ color: COLORS.danger }}>*</Text>}
                                    </Text>
                                    <ColorPicker
                                        ref={(r) => {
                                            // this.picker = r;
                                        }}
                                        // color={}
                                        // swatchesOnly={this.state.swatchesOnly}
                                        // onColorChange={this.onColorChange}
                                        // onColorChangeComplete={this.onColorChangeComplete}
                                        thumbSize={30}
                                        sliderSize={30}
                                        noSnap={true}
                                        row={true}
                                        onColorChangeComplete={(color) => {
                                            handleonchangeinput(color, item);
                                        }}
                                        // swatchesLast={this.state.swatchesLast}
                                        // swatches={this.state.swatchesEnabled}
                                        // discrete={this.state.disc}
                                    />
                                </View>
                            )}
                            {componenttype == 'date' && (
                                <View style={{ marginBottom: 10 }}>
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
                                        {langdetect == 'en' ? item.title_en : item.title_ar} {item.isrequired == 1 && <Text style={{ color: COLORS.danger }}>*</Text>}
                                    </Text>
                                    <TouchableOpacity
                                        style={[
                                            generalstyles.allcentered,

                                            {
                                                width: '100%',
                                                height: 40,
                                                marginEnd: 'auto',
                                                marginStart: 'auto',
                                                borderColor: sectionproperties.inputfieldborderColor,
                                                borderRadius: StyleParseToIntFuncContext(sectionproperties.inputfieldborderradius),
                                                backgroundColor: sectionproperties.input_bgcolor,
                                                borderWidth: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true),
                                            },
                                        ]}
                                        onPress={() => {
                                            var tempproductsextrafields = [...productextrafields];
                                            tempproductsextrafields[index].isshowcalendar = true;
                                            setproductextrafields([...tempproductsextrafields]);
                                        }}
                                    >
                                        <Text
                                            style={[generalstyles.poppinsMedium, generalstyles.allcentered, { width: '100%', textAlign: 'center' }]}
                                            underlineColorAndroid="transparent"
                                            placeholder="dd/mm/yyyy"
                                            placeholderTextColor="black"
                                            autoCapitalize="none"
                                            editable={false}
                                        >
                                            {item.datechoosed == undefined ? (inputtype == 'date' ? lang.choosedate : inputtype == 'time' ? lang.choosetime : lang.choosedatetime) : item.datechoosed}
                                        </Text>
                                    </TouchableOpacity>
                                    <DateTimePickerModal
                                        isVisible={item.isshowcalendar == undefined ? false : item.isshowcalendar}
                                        mode={inputtype}
                                        // minimumDate={new Date(fetchProductInfoQuery?.data?.data?.productinfo?.serviceinfo?.reservationstarts)}
                                        // maximumDate={new Date(fetchProductInfoQuery?.data?.data?.productinfo?.serviceinfo?.reservationends)}
                                        onCancel={() => {
                                            var tempproductsextrafields = [...productextrafields];
                                            tempproductsextrafields[index].isshowcalendar = false;
                                            setproductextrafields([...tempproductsextrafields]);
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
                                            if (inputtype == 'date') {
                                                var dateonly = fulldate;
                                            } else if (inputtype == 'time') {
                                                var dateonly = fulltime;
                                            } else if (inputtype == 'datetime') {
                                                var dateonly = fulldate + ' ' + fulltime;
                                            }

                                            var tempproductsextrafields = [...productextrafields];
                                            tempproductsextrafields[index].isshowcalendar = false;
                                            tempproductsextrafields[index].datechoosed = dateonly;
                                            setproductextrafields([...tempproductsextrafields]);
                                            handleonchangeinput(dateonly, item);
                                        }}
                                        pickerContainerStyleIOS={{
                                            backgroundColor: 'white',
                                        }}
                                        textColor={'black'}
                                    />
                                </View>
                            )}
                            {componenttype == 'Selectbox' && (
                                <View style={{ marginBottom: 10 }}>
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
                                        {langdetect == 'en' ? item.title_en : item.title_ar} {item.isrequired == 1 && <Text style={{ color: COLORS.danger }}>*</Text>}
                                    </Text>
                                    {sectionproperties.extrafield_selectbox_flatlist == 'Vertical' && (
                                        <FlatList
                                            data={selectboxvaluesparsedarrayflatlist}
                                            keyExtractor={(item) => item.id}
                                            vertical
                                            numColumns={sectionproperties.extrafieldflatlistnumofcols}
                                            renderItem={({ item, index }) => {
                                                return (
                                                    <TouchableOpacity
                                                        activeOpacity={0.9}
                                                        onPress={() => {}}
                                                        style={[
                                                            generalstyles.allcentered,
                                                            {
                                                                borderRadius: StyleParseToIntFuncContext(sectionproperties.variantcontainer_borderBottomLeftRadius),
                                                                overflow: 'hidden',
                                                                marginRight: 10,
                                                                borderWidth: 1,
                                                                borderColor: sectionproperties.variantcontainerbordercolor,
                                                                width: StyleParseToIntFuncContext(sectionproperties.variantcontainer_minwidth),
                                                                borderWidth: 1,
                                                                marginBottom: 20,
                                                                // paddingHorizontal: 10,
                                                                height: StyleParseToIntFuncContext(sectionproperties.variantcontainer_height),
                                                                backgroundColor: sectionproperties.variantcontainer_bgcolor,
                                                                justifyContent: 'center',
                                                                paddingHorizontal: 5,
                                                            },
                                                        ]}
                                                    >
                                                        <Text
                                                            style={[
                                                                generalstyles.poppinsMedium,
                                                                {
                                                                    color: sectionproperties.variantcontainer_color,
                                                                    textTransform: 'capitalize',
                                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.variantcontainer_fontSize),
                                                                },
                                                            ]}
                                                        >
                                                            {langdetect == 'en' ? item.value_en : item.value_ar}
                                                        </Text>
                                                    </TouchableOpacity>
                                                );
                                            }}
                                        />
                                    )}
                                    {sectionproperties.extrafield_selectbox_flatlist == 'Selectbox' && (
                                        <View
                                            style={{
                                                width: '100%',
                                                height: 45,
                                                marginLeft: 'auto',
                                                marginRight: 'auto',
                                                backgroundColor: sectionproperties.input_bgcolor,
                                                shadowColor: sectionproperties.inputshadowcolor,
                                                shadowOpacity: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true) == 0 ? 0.1 : 0,
                                                shadowOffset: {
                                                    width: 0,
                                                    height: 3,
                                                },
                                                shadowRadius: 3,
                                                elevation: 1,
                                                borderRadius: StyleParseToIntFuncContext(sectionproperties.inputfieldborderradius, '', true),
                                                borderWidth: StyleParseToIntFuncContext(sectionproperties.inputfieldborderWidth, '', true),
                                                borderColor: sectionproperties.inputfieldborderColor,
                                            }}
                                        >
                                            <SelectDropdown
                                                search
                                                searchInputStyle={{
                                                    backgroundColor: '#EFEFEF',
                                                    borderRadius: 8,
                                                    borderBottomWidth: 1,
                                                    borderBottomColor: '#444',
                                                }}
                                                defaultButtonText={lang.chooseanoption}
                                                searchPlaceHolder={'Search here'}
                                                data={selectboxvaluesparsedarray}
                                                // defaultValue={item.customersignupvalue}
                                                onSelect={(selectedItem) => {
                                                    var tempproductsextrafields = [...productextrafields];
                                                    tempproductsextrafields[index].isshowcalendar = false;
                                                    tempproductsextrafields[index].selectboxvalue = selectedItem;
                                                    setproductextrafields([...tempproductsextrafields]);
                                                    handleonchangeinput(selectedItem, item);
                                                }}
                                                buttonTextAfterSelection={(selectedItem, index) => {
                                                    return selectedItem;
                                                }}
                                                rowTextForSelection={(item, index) => {
                                                    return item;
                                                }}
                                                buttonStyle={{
                                                    color: sectionproperties.inputfieldcolor,
                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.inputfieldfontsize),
                                                    width: '100%',
                                                    height: 45,
                                                    backgroundColor: 'transparent',
                                                    fontFamily: 'Poppins-Medium',
                                                }}
                                                buttonTextStyle={{
                                                    textAlign: 'left',
                                                    fontFamily: 'Poppins-Light',
                                                    color: sectionproperties.form_labelcolor,
                                                    fontSize: StyleParseToIntFuncContext(sectionproperties.form_labelfontsize),
                                                    fontFamily: 'Poppins-Medium',
                                                }}
                                            />
                                        </View>
                                    )}
                                </View>
                            )}
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

export default ProductExtraFields;

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
