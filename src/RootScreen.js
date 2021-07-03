/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { PermissionsAndroid } from 'react-native';

import RNLocation from 'react-native-location';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import Geolocation from '@react-native-community/geolocation';
import GetLocation from 'react-native-get-location'

RNLocation.configure({
    distanceFilter: 0, // Meters
    desiredAccuracy: {
        ios: 'best',
        android: 'balancedPowerAccuracy',
    },
    // Android only
    androidProvider: 'auto',
    interval: 5000, // Milliseconds
    fastestInterval: 1000, // Milliseconds
    maxWaitTime: 5000, // Milliseconds
    // iOS Only
    // activityType: 'other',
    // allowsBackgroundLocationUpdates: false,
    // headingFilter: 1, // Degrees
    // headingOrientation: 'portrait',
    // pausesLocationUpdatesAutomatically: false,
    // showsBackgroundLocationIndicator: false,
});
let locationSubscription = null;
let locationTimeout = null;







const RootScreen = () => {
    const [info, setInfo] = useState([]);
    const [lat, setLat] = useState('');

    useEffect(() => {

        const requestPermission = async () => {

            //request the permission before starting the service.
            const backgroundgranted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
                {
                    title: 'Background Location Permission',
                    message:
                        'We need access to your location ' +
                        'so you can get live quality updates.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (backgroundgranted === PermissionsAndroid.RESULTS.GRANTED) {
                //do your thing!
                console.log("permission granted sir")

                const interval = setInterval(async () => {
                    console.log('Logs every minute');
                    await GetLocation.getCurrentPosition({
                        enableHighAccuracy: true,
                        timeout: 15000,
                    })
                        .then(location => {
                            console.log(location);
                            const longitude = location.longitude;
                            const latitude = location.latitude;
                            const data = {
                                longitude: longitude,
                                latitude: latitude,
                            }
                            const newInfo = info.concat(data)
                            setInfo(newInfo)
                            setLat(location.latitude)
                        })
                        .catch(error => {
                            const { code, message } = error;
                            console.warn(code, message);
                        })
                }, 5000);

                // Geolocation.getCurrentPosition(data => {
                //     setLong(data.coords.latitude);
                // })
                // ReactNativeForegroundService.add_task(
                //     () => {
                //         RNLocation.requestPermission({
                //             ios: 'whenInUse',
                //             android: {
                //                 detail: 'fine',
                //             },
                //         }).then((granted) => {
                //             console.log('Location Permissions: ', granted);
                //             // if has permissions try to obtain location with RN location
                //             if (granted === true) {
                //                 locationSubscription && locationSubscription();
                //                 locationSubscription = RNLocation.subscribeToLocationUpdates(
                //                     ([locations]) => {
                //                         locationSubscription();
                //                         locationTimeout && clearTimeout(locationTimeout);
                //                         console.log(JSON.stringify(locations));
                //                         console.log(JSON.parse(locations));
                //                         setLong(locations);
                //                     },
                //                 );
                //             } else {
                //                 locationSubscription && locationSubscription();
                //                 locationTimeout && clearTimeout(locationTimeout);
                //                 console.log('no permissions to obtain location');
                //             }
                //         });
                //     },
                //     {
                //         delay: 1000,
                //         onLoop: true,
                //         taskId: 'taskid',
                //         onError: (e) => console.log('Error logging:', e),
                //     },
                // );


            }
        }
        requestPermission();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <View>
            <Text>Halo CUAKS</Text>
            {console.log(info)}
            <Text> {lat} </Text>
        </View>
    );
};

const styles = StyleSheet.create({});


export default RootScreen;