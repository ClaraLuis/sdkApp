import * as React from 'react';

import { Image, Text } from 'react-native';

import { WebsiteDesignWorkPlaceContext } from '../WebsiteDesignWorkPlace/WebsiteDesignWorkPlaceContext';

export function ImageComponent(props) {
    const { imageurlendpointcontext } = React.useContext(WebsiteDesignWorkPlaceContext);
    const [outsidelink, setoutsidelink] = React.useState(false);
    const [outsidelinkpath, setoutsidelinkpath] = React.useState('');
    React.useEffect(() => {
        // alert(props.path);
        if (props.path != undefined) {
            var imagepath = props.path;
            let position = imagepath?.search('https');
            if (position > 0) {
                var myArray = imagepath.split('https');
                if (Array.isArray(myArray)) {
                    if (myArray.length > 1) {
                        setoutsidelinkpath('https' + myArray[1]);
                    }
                }
                setoutsidelink(true);
            }
        }
    }, [props.path]);
    return (
        <>
            <Image
                source={{
                    uri: outsidelink == true ? outsidelinkpath : imageurlendpointcontext + props.path,
                }}
                key={props.key}
                style={props.style}
                resizeMode={props.resizeMode == undefined ? null : props.resizeMode}
                resizeMethod={props.resizeMethod == undefined ? null : props.resizeMethod}
            />
        </>
    );
}
