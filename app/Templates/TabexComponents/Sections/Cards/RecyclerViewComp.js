/***
 Use this component inside your React Native Application.
 A scrollable list with different item type
 */
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import { Platform } from 'expo-modules-core';
import { LanguageContext } from '../../../LanguageContext/LanguageContext';
import { icons, SIZES } from '../../GeneralFiles/constants';

const RecyclerViewComp = (props) => {
    const { width, height } = Dimensions.get('window');
    const { langdetect } = useContext(LanguageContext);
    // this._rowRenderer = this._rowRenderer.bind(this);
    // //Since component should always render once data has changed, make data provider part of the state
    // this.state = {
    //     dataProvider: dataProvider.cloneWithRows(this._generateArray(300)),
    // };
    const getcardwithandheight = () => {
        var widthf = width / 1.7;
        var heightf = height;
        var platformtype = Platform.OS;
        if (props.sectioncompname == 'Card6') {
            if (platformtype == 'ios') {
                widthf = width / 1.8;
                heightf = props.heightprops;
            } else if (platformtype == 'android') {
                widthf = width / 1.8;
                heightf = props.heightprops + 6;
            }
        } else if (props.sectioncompname == 'Productcard_withroundedbg') {
            if (platformtype == 'ios') {
                widthf = width / 1.8;
                heightf = props.heightprops;
            } else if (platformtype == 'android') {
                widthf = width / 1.8;
                heightf = props.heightprops + 6;
            }
        } else if (props.sectioncompname == 'Cardwithblureffect') {
            if (platformtype == 'ios') {
                widthf = width / 2;
                heightf = height / 2;
            } else if (platformtype == 'android') {
                widthf = width / 1.9;
                heightf = height / 2;
            }
        } else if (props.sectioncompname == 'Elegantcard_cartbtninbottomofimage') {
            if (platformtype == 'ios') {
                widthf = width / 2.2;
                heightf = props.heightprops;
            } else if (platformtype == 'android') {
                widthf = width / 2.2;
                heightf = props.heightprops + 6;
            }
        } else if (props.sectioncompname == 'ClassicCategoryCard') {
            if (platformtype == 'ios') {
                widthf = width / 2;
                heightf = props.heightprops;
            } else if (platformtype == 'android') {
                widthf = width / 1.9;
                heightf = props.heightprops + 6;
            }
        } else if (props.sectioncompname == 'Cardwithbuttonsontopleft') {
            if (platformtype == 'ios') {
                if (SIZES.width > 1024) {
                    widthf = width / 1;
                } else {
                    widthf = width / 2;
                }
                heightf = props.heightprops;
            } else if (platformtype == 'android') {
                widthf = width / 1.9;
                heightf = props.heightprops + 6;
            }
        } else if (props.sectioncompname == 'Modernproductcardwithquantitybutton') {
            if (platformtype == 'ios') {
                widthf = width / 2;
                heightf = props.heightprops;
            } else if (platformtype == 'android') {
                widthf = width / 1.8;
                heightf = props.heightprops + 6;
            }
        } else if (props.sectioncompname == 'CollectionCardWithBottomTextContainer') {
            if (platformtype == 'ios') {
                widthf = width / 2.1;
                heightf = props.heightprops;
            } else if (platformtype == 'android') {
                widthf = width / 2.1;
                heightf = props.heightprops + 6;
            }
        }

        return { width: widthf, height: heightf };
    };
    const [layoutprovider, setlayoutprovider] = useState(
        new LayoutProvider(
            (index) => {
                return 1;
            },
            (type, dim) => {
                switch (type) {
                    case 1:
                        dim.width = getcardwithandheight().width;
                        dim.height = height;
                        break;
                    default:
                        dim.width = 0;
                        dim.height = 0;
                }
            },
        ),
    );
    const renderSpinner = () => {
        return <View></View>;
    };
    //Given type and data return the view component
    const _rowRenderer = (type, data, index) => {
        return React.createElement(props.sectioncomp, {
            sectionidprops: props.sectionidprops,
            sectionindexprops: props.sectionindexprops,
            cardinfoitemprops: data,
            cardinfoindexprops: index,
            fetchingtypeprops: props.fetchingtypeprops,
            sectiondirection: props.sectiondirection,
            StatePageProperties: props.StatePageProperties,
            fontFamilyProps: props.fontFamilyProps,
        });
    };
    const getrecyclerviewheight = () => {
        return getcardwithandheight().height;
    };
    const getrecycylerflexdirection = () => {
        if (langdetect == 'en') {
            return 'row';
        } else if (langdetect == 'ar') {
            if (Platform.OS == 'ios') {
                return 'row';
            } else if (Platform.OS == 'android') {
                return 'row-reverse';
            }
        }
    };
    return (
        <View style={{ flex: 1 }}>
            {props.data.length != 0 && (
                <RecyclerListView
                    style={{
                        height: getrecyclerviewheight(),
                        width: '100%',
                        direction: langdetect == 'en' ? 'ltr' : 'rtl',
                        flexDirection: getrecycylerflexdirection(),
                    }}
                    isHorizontal={true}
                    scrollViewProps={{
                        showsHorizontalScrollIndicator: false,
                    }}
                    renderFooter={() => {
                        if (Platform.OS == 'ios') {
                            return renderSpinner();
                        } else {
                            if (props.data.length < 70) {
                                if (props.FetchingQuery?.isFetchingNextPage) {
                                    return renderSpinner();
                                }
                            }
                        }
                    }}
                    onEndReached={() => {
                        if (Platform.OS == 'ios') {
                            props.loadMore();
                        } else {
                            if (props.data.length < 70) {
                                props.loadMore();
                            }
                        }
                    }}
                    layoutProvider={layoutprovider}
                    dataProvider={new DataProvider((r1, r2) => {
                        return r1 !== r2;
                    }).cloneWithRows(props.data)}
                    rowRenderer={_rowRenderer}
                    forceNonDeterministicRendering={false}
                />
            )}
        </View>
    );
};
export default RecyclerViewComp;

const styles = {
    container: {
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 300,
        backgroundColor: '#00a1f1',
    },
    containerGridLeft: {
        justifyContent: 'space-around',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#ffbb00',
    },
    containerGridRight: {
        justifyContent: 'space-around',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#7cbb00',
    },
};
