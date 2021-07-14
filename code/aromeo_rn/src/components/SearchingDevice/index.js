import React, {useRef, useEffect} from 'react';
import {View, Text, Animated} from 'react-native';
import styles from './style';

const SearchingDevice = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const opacityA = useRef(new Animated.Value(1)).current;
  const fadeAnim1 = useRef(new Animated.Value(0)).current;
  const opacityA1 = useRef(new Animated.Value(1)).current;
  const fadeAnim2 = useRef(new Animated.Value(0)).current;
  const opacityA2 = useRef(new Animated.Value(1)).current;
  const fadeAnim3 = useRef(new Animated.Value(0)).current;
  const opacityA3 = useRef(new Animated.Value(1)).current;
  const fadeAnim4 = useRef(new Animated.Value(0)).current;
  const opacityA4 = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.loop(
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            //   useNativeDriver: true,
          }),
          Animated.timing(opacityA, {
            toValue: 0,
            duration: 2000,
            //   useNativeDriver: true,
          }),
          Animated.timing(fadeAnim1, {
            toValue: 1,
            duration: 1500,
            //   useNativeDriver: true,
          }),
          Animated.timing(opacityA1, {
            toValue: 0,
            duration: 3000,
            //   useNativeDriver: true,
          }),
          //   Animated.parallel([
          Animated.timing(fadeAnim2, {
            toValue: 1,
            duration: 2000,
            //   useNativeDriver: true,
          }),
          Animated.timing(opacityA2, {
            toValue: 0,
            duration: 3000,
            //   useNativeDriver: true,
          }),
          //   ]),
          Animated.timing(fadeAnim3, {
            toValue: 1,
            duration: 2500,
            //   useNativeDriver: true,
          }),
          Animated.timing(opacityA3, {
            toValue: 0,
            duration: 3000,
            //   useNativeDriver: true,
          }),
          Animated.timing(fadeAnim4, {
            toValue: 1,
            duration: 3000,
            //   useNativeDriver: true,
          }),
          Animated.timing(opacityA4, {
            toValue: 0,
            duration: 3000,
            //   useNativeDriver: true,
          }),
        ]),
      ),
    ]).start();
  }, [1]);
  return (
    <View style={styles.container}>
      <View style={styles.shadowCircle}>
        <Animated.View
          style={[
            styles.animatedCircle,
            {
              opacity: opacityA,
              zIndex: 1,
              transform: [
                {
                  scale: fadeAnim,
                },
              ],
            },
          ]}>
          <Animated.View
            style={[
              styles.animatedCircle,
              {
                opacity: opacityA1,
                zIndex: 2,
                transform: [
                  {
                    scale: fadeAnim1,
                  },
                ],
              },
            ]}>
            <Animated.View
              style={[
                styles.animatedCircle,
                {
                  opacity: opacityA2,
                  zIndex: 3,
                  transform: [
                    {
                      scale: fadeAnim2,
                    },
                  ],
                },
              ]}>
              <Animated.View
                style={[
                  styles.animatedCircle,
                  {
                    opacity: opacityA3,
                    zIndex: 4,
                    transform: [
                      {
                        scale: fadeAnim3,
                      },
                    ],
                  },
                ]}>
                <Animated.View
                  style={[
                    styles.animatedCircle,
                    {
                      opacity: opacityA4,
                      zIndex: 5,
                      transform: [
                        {
                          scale: fadeAnim4,
                        },
                      ],
                    },
                  ]}
                />
              </Animated.View>
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </View>
      <Text style={styles.searchingText}>Searching for Aromeo Diffuser…</Text>
    </View>
  );
};

export default SearchingDevice;
