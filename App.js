import { View, Text, Vibration, StatusBar, Dimensions, StyleSheet, ToastAndroid, useColorScheme } from 'react-native'
import React, { useMemo, useRef, useState, useEffect } from 'react'
import { Button, IconButton, Modal, Provider, Switch, TouchableRipple } from 'react-native-paper'
import CircularProgress, { CircularProgressBase } from 'react-native-circular-progress-indicator';
import { Picker } from '@react-native-picker/picker';

import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet';

import ColorPicker, { Swatches, Preview, HueSlider, Panel3, SaturationSlider, BrightnessSlider } from 'reanimated-color-picker';
import { If, If_Setting } from './src/components/conditionalRendering';

import * as Progress from 'react-native-progress';

import SplashScreen from 'react-native-splash-screen';

import { BannerAd, BannerAdSize, TestIds, useRewardedAd, } from "react-native-google-mobile-ads";

// import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
// import { NavigationContainer, useNavigation, useTheme } from '@react-navigation/native';

const Home = ({ navigation }) => {

  useEffect(() => {
    SplashScreen.hide()
  }, [])

  let dark = useColorScheme() === 'dark'

  let colors = dark ? {
    primary: '#03a073',
    background: '#151515',
    card: "#000000",
    border: '#5e5e5e',
    mainText: '#c7c7c7',
    subMainText: '#8f8f8f',
    smallBoxCenter: '#4d4d4d'
  } : {
    primary: '#03a073',
    background: "#f3f4f6",
    card: "#ffffff",
    border: '#c7c7c7',
    mainText: '#1f1f1f',
    subMainText: '#474747',
    smallBoxCenter: "#b2d7d7"
  }

  const [value, setValue] = useState(0)
  const [targetValue, setTargetValue] = useState(33)
  const [roundedProgress, setRoundedProgress] = useState({
    showPressMe: true,
    isDashedOn: false,
    clockwiseRotation: false,
    strokeRotation: 0,
    strokeLinecap: 'round',
    activeStrokeColor: colors.primary,
    activeStrokeColor2: colors.primary,
    activeStrokeWidth: 30,
    inActiveStrokeColor: colors.border,
    inActiveStrokeWidth: 10,
    solidStrokeWidth: 5,
    newlook: 'default'
  })

  let width = Dimensions.get('screen').width

  // bottom sheet modal
  const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => ['25%', '60%'], []);

  // for colors pickers 
  let [showModal, setShowModal] = useState({
    modal1: false,
    modal2: false,
    modal3: false,
  })

  // all styles values
  const styles = StyleSheet.create({
    dialerView: {
      flex: 1, justifyContent: 'center', alignItems: 'center'
    },
    counterValuePicker: {
      borderRadius: 20, overflow: 'scroll', backgroundColor: colors.card, flex: 1
    },
    pressMeView: {
      flex: 1, justifyContent: 'center', alignItems: 'center'
    },
    pressMeText: {
      color: colors.mainText + 50, fontSize: 20, fontWeight: 'bold'
    },
    //Bottom Sheet Modeal
    settingView: {
      alignItems: 'center', flexDirection: 'row', paddingHorizontal: 10
    },
    settingText: {
      flex: 1, fontWeight: 'bold', fontSize: 25, marginVertical: 5, color: colors.mainText
    },
    //Enable / Disable dashed rounded bar
    dashedRipple: {
      marginHorizontal: 5, marginVertical: 5, borderRadius: 10
    },
    dashedView: {
      flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: colors.background
    },
    // Enable two dialer / new look
    twoDialer: {
      marginHorizontal: 5, marginVertical: 5, borderRadius: 10
    },
    twoDialerView: {
      flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: colors.background
    },
    // Enable / Disable RTL / clockwiserotation
    RTLripple: {
      marginHorizontal: 5, marginVertical: 5, borderRadius: 10
    },
    RTLView: {
      flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: colors.background
    },
    // Rotate Dialer
    rotateDialerView: {
      marginHorizontal: 5, marginVertical: 5, padding: 10, borderRadius: 10, backgroundColor: colors.background
    },
    rotateDialerView2: {
      backgroundColor: colors.card, borderRadius: 10, marginTop: 5
    },
    // Stroke line cap
    strokeLinecapView: {
      marginHorizontal: 5, marginVertical: 5, padding: 10, borderRadius: 10, backgroundColor: colors.background
    },
    strokeLinecapView2: {
      backgroundColor: colors.card, borderRadius: 10, marginTop: 5
    },
    // Active / inActive stroke width
    activeStrokeWidth: {
      marginHorizontal: 5, marginVertical: 5, padding: 10, borderRadius: 10, backgroundColor: colors.background
    },
    // activeStrokeColor button / select color
    activeStrokeColorView: {
      marginHorizontal: 5, marginVertical: 5, borderRadius: 10, padding: 10, paddingRight: 30, backgroundColor: colors.background
    },
    activeStrokeColorShowView: {
      aspectRatio: 1, width: 30, borderRadius: 30, backgroundColor: roundedProgress.activeStrokeColor
    },
    // activeStrokeColor2 / gradient button / select color
    activeStrokeColorViewGradient: {
      marginHorizontal: 5, marginVertical: 5, borderRadius: 10, padding: 10, paddingRight: 30, backgroundColor: colors.background
    },
    activeStrokeColorShowViewGradient: {
      aspectRatio: 1, width: 30, borderRadius: 30, backgroundColor: roundedProgress.activeStrokeColor2
    },
    // inactiveStrokeColor button / select color
    inActiveStrokeColorView: {
      marginHorizontal: 5, marginVertical: 5, borderRadius: 10, backgroundColor: colors.background, padding: 10, paddingRight: 30
    },
    inActiveStrokeColorShowView: {
      aspectRatio: 1, width: 30, borderRadius: 30, backgroundColor: roundedProgress.inActiveStrokeColor
    }
  })

  // get and save all setting values when change and every render
  const [changingValue, setChangingValue] = useState(false)

  useEffect(() => {

    AsyncStorage.getItem('setting_values').then(val => {
      if (val == null) {
        AsyncStorage.setItem('setting_values', JSON.stringify(roundedProgress))
      } else {
        setRoundedProgress(JSON.parse(val))
      }
    })

  }, [])

  useEffect(() => {
    AsyncStorage.setItem('setting_values', JSON.stringify(roundedProgress))
  }, [changingValue])


  // Banner Ad
  const bannerID = __DEV__ ? TestIds.BANNER : 'ca-app-pub-4551497516413603/9779893962'

  return (
    <BottomSheetModalProvider  >

      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <Provider >

          <View style={{ flex: 1, }}>
            <StatusBar animated translucent backgroundColor={'transparent'} barStyle={dark ? 'light-content' : "dark-content"} />

            {/* <IconButton icon={'clock-time-three-outline'} iconColor={colors.mainText + 'd7'} mode='contained'
              style={{ backgroundColor: colors.card, position: 'absolute', marginTop: StatusBar.currentHeight + 10, left: 10, zIndex: 1111 }}
              onPress={() => {
                navigation.openDrawer()
              }} /> */}

            <IconButton icon={'cog'} iconColor={colors.mainText + 'd7'} mode='contained'
              style={{ backgroundColor: colors.card, position: 'absolute', marginTop: StatusBar.currentHeight + 10, right: 10, zIndex: 1111 }}
              onPress={() => {
                bottomSheetModalRef.current.present()
              }} />


            <TouchableRipple borderless disabled={roundedProgress.showPressMe || value === targetValue ? true : false} rippleColor="#0000000a" style={styles.dialerView} onPress={() => { Vibration.vibrate(50), setValue(value + 1) }}>

              <View style={styles.dialerView}>

                <If
                  condition1={roundedProgress.newlook === 'longbar'}

                  // longbar (longbar)
                  firstComponent={
                    <View style={{ alignItems: 'flex-start' }}>
                      <Text style={{ fontSize: 15, color: colors.mainText + 99 }}>{value} / {targetValue}</Text>
                      <Progress.Bar progress={value / targetValue} borderColor={roundedProgress.activeStrokeColor} color={roundedProgress.activeStrokeColor} width={width * 0.5} />
                    </View>
                  }

                  condition2={roundedProgress.newlook === 'rounded2'}

                  // 2 progress bar (rounded2)
                  secondComponent={<CircularProgressBase

                    radius={width * 0.3}
                    duration={300}
                    maxValue={targetValue}

                    rotation={roundedProgress.strokeRotation}

                    clockwise={roundedProgress.clockwiseRotation}

                    value={value}

                    activeStrokeColor={roundedProgress.activeStrokeColor}
                    activeStrokeSecondaryColor={roundedProgress.activeStrokeColor2}
                    activeStrokeWidth={roundedProgress.activeStrokeWidth}
                    inActiveStrokeColor={roundedProgress.inActiveStrokeColor}
                    inActiveStrokeWidth={roundedProgress.inActiveStrokeWidth}
                    inActiveStrokeOpacity={0.2}
                    strokeLinecap={roundedProgress.strokeLinecap}

                    progressValueStyle={{ fontWeight: 'bold', fontSize: 30 }}
                    progressValueColor={roundedProgress.activeStrokeColor}

                    dashedStrokeConfig={{
                      count: roundedProgress.isDashedOn ? 40 : 0,
                      width: 8
                    }}>

                    <CircularProgressBase

                      radius={70}
                      duration={300}
                      maxValue={targetValue}

                      rotation={roundedProgress.strokeRotation}

                      clockwise={!roundedProgress.clockwiseRotation}

                      value={value}

                      activeStrokeColor={roundedProgress.activeStrokeColor}
                      activeStrokeSecondaryColor={roundedProgress.activeStrokeColor2}
                      activeStrokeWidth={roundedProgress.activeStrokeWidth}
                      inActiveStrokeColor={roundedProgress.inActiveStrokeColor}
                      inActiveStrokeWidth={roundedProgress.inActiveStrokeWidth}
                      inActiveStrokeOpacity={0.2}
                      strokeLinecap={roundedProgress.strokeLinecap}

                      progressValueStyle={{ fontWeight: 'bold', fontSize: 30 }}
                      progressValueColor={roundedProgress.activeStrokeColor}

                      dashedStrokeConfig={{
                        count: roundedProgress.isDashedOn ? 40 : 0,
                        width: 8
                      }}>
                      <Text style={{ fontWeight: 'bold', fontSize: 20, color: colors.mainText }}>{value} / {targetValue}</Text>
                    </CircularProgressBase>

                  </CircularProgressBase>}


                  // solid (solid)
                  condition3={roundedProgress.newlook === 'solid'}

                  thirdComponent={
                    <View style={{ justifyContent: 'center', alignItems: 'center', }}>

                      <Progress.Pie progress={value / targetValue} borderWidth={roundedProgress.solidStrokeWidth} borderColor={roundedProgress.activeStrokeColor} color={roundedProgress.activeStrokeColor} size={width * 0.5} />
                      <View style={{ position: 'absolute' }}>
                        <Text style={{ fontSize: 25, color: colors.mainText }}>{value} / {targetValue}</Text>
                      </View>
                    </View>
                  }

                  // single progress bar (default)
                  forthComponent={<CircularProgress
                    radius={width * 0.3}
                    duration={300}
                    maxValue={targetValue}

                    rotation={roundedProgress.strokeRotation}

                    clockwise={!roundedProgress.clockwiseRotation}

                    value={value}
                    // valuePrefix={'$'}
                    valueSuffix={` / ${targetValue}`}
                    // initialValue={10}

                    // demimal value convert krny ka liay

                    // progressFormatter={(value) => {
                    //   'worklet';
                    //   return value.toFixed(2); // 2 decimal places
                    // }}

                    activeStrokeColor={roundedProgress.activeStrokeColor}
                    activeStrokeSecondaryColor={roundedProgress.activeStrokeColor2}
                    activeStrokeWidth={roundedProgress.activeStrokeWidth}
                    inActiveStrokeColor={roundedProgress.inActiveStrokeColor}
                    inActiveStrokeWidth={roundedProgress.inActiveStrokeWidth}
                    inActiveStrokeOpacity={0.2}
                    strokeLinecap={roundedProgress.strokeLinecap}

                    progressValueStyle={{ fontWeight: 'bold', fontSize: 30 }}
                    progressValueColor={roundedProgress.activeStrokeColor}

                    // circleBackgroundColor={'#333'}

                    // dashed lines ka liay

                    // multicolor stock

                    // strokeColorConfig={[
                    //   { color: 'red', value: 0 },
                    //   { color: 'skyblue', value: targetValue },
                    //   { color: 'yellowgreen', value: targetValue },
                    // ]}

                    // title={'Counter'}
                    // subtitle={targetValue}
                    // titleFontSize={16}
                    // titleColor={'white'}
                    // titleStyle={{ fontWeight: 'bold' }}

                    dashedStrokeConfig={{
                      count: roundedProgress.isDashedOn ? 40 : 0,
                      width: 8,
                    }}
                  />}
                />

              </View>

            </TouchableRipple>

            <View style={{ width: width - 20, flexDirection: 'row', marginHorizontal: 10, marginBottom: roundedProgress.showPressMe ? 0 : 10 }}>
              <View style={styles.counterValuePicker}>
                <Picker
                  selectedValue={targetValue}
                  onValueChange={(itemValue, itemIndex) => setTargetValue(itemValue)}
                  prompt='Select Count Number'
                  mode='dropdown'
                  style={{ color: colors.mainText, }}
                  dropdownIconColor={colors.mainText}
                  dropdownIconRippleColor={colors.primary}
                >
                  <Picker.Item color={colors.mainText} label="33" value={33} />
                  <Picker.Item color={colors.mainText} label="66" value={66} />
                  <Picker.Item color={colors.mainText} label="100" value={100} />
                  <Picker.Item color={colors.mainText} label="200" value={200} />
                  <Picker.Item color={colors.mainText} label="300" value={300} />
                  <Picker.Item color={colors.mainText} label="400" value={400} />
                  <Picker.Item color={colors.mainText} label="500" value={500} />
                </Picker>
              </View>

              <Button icon={'restart'} mode='elevated'
                style={{ justifyContent: 'center', marginLeft: 10, shadowColor: 'transparent', borderRadius: 20 }}
                textColor={colors.mainText} buttonColor={colors.card} onPress={() => { Vibration.vibrate(40), setValue(0) }}
              >Reset</Button>

            </View>

            {roundedProgress.showPressMe && <TouchableRipple
              borderless
              disabled={value === targetValue ? true : false}
              rippleColor="#0000000a"
              style={styles.pressMeView}
              onPress={() => { Vibration.vibrate(50), setValue(value + 1) }}
            >
              <Text style={styles.pressMeText}>Press me</Text>
            </TouchableRipple>}

          </View>

          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            // onChange={handleSheetChanges}
            handleIndicatorStyle={{ backgroundColor: colors.border, borderRadius: 100 }}
            backgroundStyle={{ backgroundColor: colors.card }}
            style={{ flex: 1 }}
          >
            <View style={{ flex: 1 }}>
              <View style={styles.settingView}>
                <Text style={styles.settingText}>Setting</Text>
                <IconButton icon={'close-thick'} iconColor={colors.mainText} mode='contained'
                  onPress={() => { bottomSheetModalRef.current.close() }} style={{ backgroundColor: colors.border + 90 }} />
              </View>

              <BottomSheetScrollView>

                {/* enable/disable PressMe Text */}
                <TouchableRipple borderless rippleColor={colors.border} style={styles.dashedRipple}
                  onPress={() => {
                    setRoundedProgress(prev => ({ ...prev, showPressMe: !roundedProgress.showPressMe }))
                    setChangingValue(!changingValue)
                  }}>
                  <View style={styles.dashedView}>
                    <Text style={{ color: colors.mainText, flex: 1 }}>Disable PressMe Text</Text>
                    <Switch color={colors.primary} value={!roundedProgress.showPressMe} onValueChange={() => {
                      setRoundedProgress(prev => ({ ...prev, showPressMe: !roundedProgress.showPressMe }))
                      setChangingValue(!changingValue)
                    }} />
                  </View>
                </TouchableRipple>

                {/* Enable / Disable dashed rounded bar */}
                <If_Setting condition1={roundedProgress.newlook === 'default'} condition2={roundedProgress.newlook === 'rounded2'}

                  firstComponent={<TouchableRipple borderless rippleColor={colors.border} style={styles.dashedRipple}
                    onPress={() => {
                      setRoundedProgress(prev => ({ ...prev, isDashedOn: !roundedProgress.isDashedOn }))
                      setChangingValue(!changingValue)
                    }}>
                    <View style={styles.dashedView}>
                      <Text style={{ color: colors.mainText, flex: 1 }}>Enable Dashed Rounded Bar</Text>
                      <Switch color={colors.primary} value={roundedProgress.isDashedOn} onValueChange={() => {
                        setRoundedProgress(prev => ({ ...prev, isDashedOn: !roundedProgress.isDashedOn }))
                        setChangingValue(!changingValue)
                      }} />
                    </View>
                  </TouchableRipple>}
                />

                {/* Enable new look */}
                <View style={styles.rotateDialerView}>

                  <Text style={{ color: colors.mainText }}>Change Dialer Style</Text>
                  <View style={styles.rotateDialerView2}>
                    <Picker
                      selectedValue={roundedProgress.newlook}
                      onValueChange={(itemValue, itemIndex) => {
                        setRoundedProgress(prev => ({ ...prev, newlook: itemValue }))
                        setChangingValue(!changingValue)
                      }}
                      prompt='Select Count Number'
                      mode='dropdown'
                      style={{ color: colors.mainText, }}
                      dropdownIconColor={colors.mainText}
                      dropdownIconRippleColor={colors.primary}
                    >
                      <Picker.Item color={colors.mainText} label="Default" value={'default'} />
                      <Picker.Item color={colors.mainText} label="Rounded with 2 dial" value={'rounded2'} />
                      <Picker.Item color={colors.mainText} label="Solid" value={'solid'} />
                      <Picker.Item color={colors.mainText} label="Long bar" value={'longbar'} />
                    </Picker>
                  </View>
                </View>

                {/* Enable / Disable RTL / clockwiserotation */}
                <If_Setting condition1={roundedProgress.newlook === 'default'} condition2={roundedProgress.newlook === 'rounded2'}

                  firstComponent={
                    <>
                      <TouchableRipple borderless rippleColor={colors.border} style={styles.RTLripple}
                        onPress={() => {
                          setRoundedProgress(prev => ({ ...prev, clockwiseRotation: !roundedProgress.clockwiseRotation }))
                          setChangingValue(!changingValue)
                        }}>
                        <View style={styles.RTLView}>
                          <Text style={{ color: colors.mainText, flex: 1 }}>Enable RTL Dialer</Text>
                          <Switch color={colors.primary} value={roundedProgress.clockwiseRotation} onValueChange={() => {
                            setRoundedProgress(prev => ({ ...prev, clockwiseRotation: !roundedProgress.clockwiseRotation }))
                            setChangingValue(!changingValue)
                          }} />
                        </View>
                      </TouchableRipple>

                      {/* Rotate Dialer */}
                      <View style={styles.rotateDialerView}>

                        <Text style={{ color: colors.mainText }}>Rotate Dialer</Text>
                        <View style={styles.rotateDialerView2}>
                          <Picker
                            selectedValue={roundedProgress.strokeRotation}
                            onValueChange={(itemValue, itemIndex) => {
                              setRoundedProgress(prev => ({ ...prev, strokeRotation: itemValue }))
                              setChangingValue(!changingValue)
                            }}
                            prompt='Select Count Number'
                            mode='dropdown'
                            style={{ color: colors.mainText, }}
                            dropdownIconColor={colors.mainText}
                            dropdownIconRippleColor={colors.primary}
                          >
                            <Picker.Item color={colors.mainText} label="0" value={0} />
                            <Picker.Item color={colors.mainText} label="45" value={45} />
                            <Picker.Item color={colors.mainText} label="90" value={90} />
                            <Picker.Item color={colors.mainText} label="135" value={135} />
                            <Picker.Item color={colors.mainText} label="180" value={180} />
                            <Picker.Item color={colors.mainText} label="225" value={225} />
                            <Picker.Item color={colors.mainText} label="270" value={270} />
                            <Picker.Item color={colors.mainText} label="315" value={315} />
                            <Picker.Item color={colors.mainText} label="360" value={360} />
                          </Picker>
                        </View>
                      </View>

                      {/* Stroke line cap */}
                      <View style={styles.strokeLinecapView}>

                        <Text style={{ color: colors.mainText }}>Stroke Line Cap</Text>
                        <View style={styles.strokeLinecapView2}>
                          <Picker
                            selectedValue={roundedProgress.strokeLinecap}
                            onValueChange={(itemValue, itemIndex) => {
                              setRoundedProgress(prev => ({ ...prev, strokeLinecap: itemValue }))
                              setChangingValue(!changingValue)
                            }}
                            prompt='Select Count Number'
                            mode='dropdown'
                            style={{ color: colors.mainText, }}
                            dropdownIconColor={colors.mainText}
                            dropdownIconRippleColor={colors.primary}
                          >
                            <Picker.Item color={colors.mainText} label="round" value={'round'} />
                            <Picker.Item color={colors.mainText} label="square" value={'square'} />
                            <Picker.Item color={colors.mainText} label="butt" value={'butt'} />
                          </Picker>
                        </View>

                      </View>
                    </>}
                />

                {/* Active / inActive stroke width */}
                <View style={styles.activeStrokeWidth}>

                  {/* Solid dialer stroke width */}
                  <If condition1={roundedProgress.newlook === 'solid'}
                    firstComponent={
                      <>
                        <Text style={{ color: colors.mainText }}>Solid Dialer Stroke Width</Text>

                        <Slider
                          style={{ width: '100%', height: 40 }}
                          step={1}
                          value={roundedProgress.solidStrokeWidth}
                          minimumValue={0}
                          maximumValue={50}
                          minimumTrackTintColor="#03a073"
                          maximumTrackTintColor="#03a0737c"
                          thumbTintColor='#03a073'
                          onSlidingComplete={(e) => {
                            setChangingValue(!changingValue)
                          }}
                          onValueChange={(e) => {
                            setRoundedProgress(prev => ({ ...prev, solidStrokeWidth: e }))
                            Vibration.vibrate(25)
                          }}
                        />
                      </>}
                  />

                  {/* Active stroke width */}
                  <If_Setting
                    condition1={roundedProgress.newlook === 'default'} condition2={roundedProgress.newlook === 'rounded2'}

                    firstComponent={
                      <>
                        {/* Active stroke width */}
                        <Text style={{ color: colors.mainText }}>Acitve Stoke width</Text>

                        <Slider
                          style={{ width: '100%', height: 40 }}
                          step={5}
                          value={roundedProgress.activeStrokeWidth}
                          minimumValue={5}
                          maximumValue={100}
                          minimumTrackTintColor="#03a073"
                          maximumTrackTintColor="#03a0737c"
                          thumbTintColor='#03a073'
                          onSlidingComplete={(e) => {
                            setChangingValue(!changingValue)
                          }}
                          onValueChange={(e) => {
                            setRoundedProgress(prev => ({ ...prev, activeStrokeWidth: e }))
                            Vibration.vibrate(25)
                          }}
                        />

                        {/* inActive stroke width */}
                        <Text style={{ color: colors.mainText }}>In-Acitve Stoke Width</Text>

                        <Slider
                          style={{ width: '100%', height: 40 }}
                          step={1}

                          value={roundedProgress.inActiveStrokeWidth}
                          minimumValue={1}
                          maximumValue={50}
                          minimumTrackTintColor="#03a073"
                          maximumTrackTintColor="#03a0737c"
                          thumbTintColor='#03a073'
                          onSlidingComplete={(e) => {
                            setChangingValue(!changingValue)
                          }}
                          onValueChange={(e) => {
                            setRoundedProgress(prev => ({ ...prev, inActiveStrokeWidth: e }))
                            Vibration.vibrate(25)
                          }}
                        />
                      </>}
                  />

                </View>

                {/* activeStrokeColor button */}
                <TouchableRipple borderless rippleColor={colors.border} style={styles.activeStrokeColorView}
                  onPress={() => { bottomSheetModalRef.current.close(), setShowModal(prev => ({ ...prev, modal1: !showModal.modal1 })) }}>

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <Text style={{ flex: 1, color: colors.mainText }}>Active Stroke Color</Text>
                    <View style={styles.activeStrokeColorShowView} />

                  </View>
                </TouchableRipple>


                {/* activeStrokeColor2 & inactivecolor button */}
                <If_Setting
                  condition1={roundedProgress.newlook === 'default'} condition2={roundedProgress.newlook === 'rounded2'}

                  firstComponent={<>
                    {/* activeStrokeColor2 button */}
                    <TouchableRipple borderless rippleColor={colors.border} style={styles.activeStrokeColorViewGradient}
                      onPress={() => { bottomSheetModalRef.current.close(), setShowModal(prev => ({ ...prev, modal3: !showModal.modal3 })) }}>

                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                        <Text style={{ flex: 1, color: colors.mainText }}>Active Stroke Color 2 (use this for gradient color)</Text>
                        <View style={styles.activeStrokeColorShowViewGradient} />

                      </View>
                    </TouchableRipple>

                    {/* inactiveStrokeColor button */}
                    <TouchableRipple borderless rippleColor={colors.border} style={styles.inActiveStrokeColorView}
                      onPress={() => { bottomSheetModalRef.current.close(), setShowModal(prev => ({ ...prev, modal2: !showModal.modal2 })) }}>

                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                        <Text style={{ flex: 1, color: colors.mainText }}>In-Active Stroke Color</Text>
                        <View style={styles.inActiveStrokeColorShowView} />

                      </View>
                    </TouchableRipple>
                  </>}
                />

                {/* Clear All Button */}
                <TouchableRipple borderless rippleColor={colors.border} style={{ marginHorizontal: 5, marginVertical: 5, borderRadius: 10, }}
                  onPress={async () => {

                    setRoundedProgress(prev => ({
                      isDashedOn: false,
                      clockwiseRotation: false,
                      strokeRotation: 0,
                      strokeLinecap: 'round',
                      activeStrokeColor: colors.primary,
                      activeStrokeColor2: colors.primary,
                      activeStrokeWidth: 30,
                      inActiveStrokeColor: colors.border,
                      inActiveStrokeWidth: 10,
                      solidStrokeWidth: 5,
                      newlook: 'default',
                      showPressMe: true
                    }))
                    await AsyncStorage.removeItem('setting_values').then(val => ToastAndroid.show('Setting Cleared', ToastAndroid.SHORT))
                    setChangingValue(!changingValue)
                  }}>
                  <View style={{ alignItems: 'center', padding: 10, backgroundColor: '#ff000090', }}>
                    <Text style={{ color: colors.mainText, flex: 1, fontWeight: 'bold', textTransform: 'uppercase' }}>Clear All Setting</Text>
                  </View>
                </TouchableRipple>

              </BottomSheetScrollView>
            </View>

            <View style={{ alignItems: 'center', backgroundColor: colors.background }}>
              <BannerAd size={BannerAdSize.BANNER} unitId={bannerID} />
            </View>

          </BottomSheetModal>

        </Provider >

        {/* Active Stroke Color */}
        <Modal visible={showModal.modal1} animationType='slide' style={{ backgroundColor: colors.background }} contentContainerStyle={{ flex: 1 }}  >
          <ColorPicker style={{ width: '60%' }} value={roundedProgress.activeStrokeColor}
            onComplete={(e) => {
              setRoundedProgress(prev => ({ ...prev, activeStrokeColor: e.hex, activeStrokeColor2: e.hex }))
              setChangingValue(!changingValue)
            }}>
            <Preview />
            <Panel3 />
            <HueSlider thumbShape='circle' />
            <SaturationSlider thumbShape='circle' />
            <BrightnessSlider thumbShape='circle' />
            <Swatches />
          </ColorPicker>

          <Button onPress={() => { bottomSheetModalRef.current.present(), setShowModal(prev => ({ ...prev, modal1: false })) }} buttonColor={colors.primary} textColor={colors.mainText} style={{ borderRadius: 0 }} >Done</Button>
        </Modal>

        {/* Active Stroke Color 2 */}
        <Modal visible={showModal.modal3} animationType='slide' style={{ backgroundColor: colors.background }} contentContainerStyle={{ flex: 1 }}  >
          <ColorPicker style={{ width: '60%' }} value={roundedProgress.activeStrokeColor2}
            onComplete={(e) => {
              setRoundedProgress(prev => ({ ...prev, activeStrokeColor2: e.hex }))
              setChangingValue(!changingValue)
            }}>
            <Preview />
            <Panel3 />
            <HueSlider thumbShape='circle' />
            <SaturationSlider thumbShape='circle' />
            <BrightnessSlider thumbShape='circle' />
            <Swatches />
          </ColorPicker>

          <Button onPress={() => { bottomSheetModalRef.current.present(), setShowModal(prev => ({ ...prev, modal3: false })) }} buttonColor={colors.primary} textColor={colors.mainText} style={{ borderRadius: 0 }} >Done</Button>
        </Modal>

        {/*InActive Stroke Color */}
        <Modal visible={showModal.modal2} animationType='slide' style={{ backgroundColor: colors.background }} contentContainerStyle={{ flex: 1 }}  >
          <ColorPicker style={{ width: '60%' }} value={roundedProgress.inActiveStrokeColor}
            onComplete={(e) => {
              setRoundedProgress(prev => ({ ...prev, inActiveStrokeColor: e.hex }))
              setChangingValue(!changingValue)
            }}>
            <Preview />
            <Panel3 />
            <HueSlider thumbShape='circle' />
            <SaturationSlider thumbShape='circle' />
            <BrightnessSlider thumbShape='circle' />
            <Swatches />
          </ColorPicker>

          <Button onPress={() => { bottomSheetModalRef.current.present(), setShowModal(prev => ({ ...prev, modal2: false })) }} buttonColor={colors.primary} textColor={colors.mainText} style={{ borderRadius: 0 }} >Done</Button>
        </Modal>

      </View>
      <View style={{ alignItems: 'center', backgroundColor: colors.background }}>
        <BannerAd size={BannerAdSize.BANNER} unitId={bannerID} />
      </View>
    </BottomSheetModalProvider >
  )

}











// const DrawerTab = createDrawerNavigator();

// const App = () => {

// function CustomDrawerContent() {

//   const { navigate } = useNavigation()

//   let dark = useColorScheme() === 'dark'

//   let colors = dark ? {
//     primary: '#03a073',
//     background: '#151515',
//     card: "#000000",
//     border: '#5e5e5e',
//     mainText: '#c7c7c7',
//     subMainText: '#8f8f8f',
//     smallBoxCenter: '#4d4d4d'
//   } : {
//     primary: '#03a073',
//     background: "#f3f4f6",
//     card: "#ffffff",
//     border: '#c7c7c7',
//     mainText: '#1f1f1f',
//     subMainText: '#474747',
//     smallBoxCenter: "#b2d7d7"
//   }

//   const [subActive, setSubActive] = useState('')
//   const [value, setValue] = useState([])

//   let drawerSectionSub = (label, otherUse, icontype, icon, size, color) => {
//     return (
//       <Drawer.Item
//         label={label}
//         icon={() => icontype === 'icon' ? <IconButton icon={icon} size={30} iconColor={color} /> : null}
//         theme={{
//           colors: {
//             onSecondaryContainer: color,
//             onSurfaceVariant: colors.mainText,
//             secondaryContainer: color + 20,
//           }, roundness: 100
//         }}
//         style={{ marginTop: 10 }}
//         active={subActive === otherUse}
//         onPress={() => {
//           setSubActive(otherUse)
//           navigate(otherUse)
//         }}
//       />
//     )
//   }


//   useEffect(() => {
//     AsyncStorage.getItem('setting_values').then(val => {
//       let v = []

//       v.push(JSON.parse(val))

//       setValue(v)
//       // console.log(v)
//     })
//   }, [])

//   return (

//     <DrawerContentScrollView showsVerticalScrollIndicator={false}>

//       <TouchableOpacity style={{ flex: 1, marginHorizontal: 10, borderRadius: 20, backgroundColor: colors.border, height: 50 }}>
//         <IconButton icon={'plus'} size={30} iconColor={colors.mainText} />
//       </TouchableOpacity>

//       <FlatList
//         data={value}
//         renderItem={({ item }) => {
//           return (
//             <>
//               <Text>{(item.isDashedOn).toString()}</Text>
//             </>
//           )
//         }}
//       />

//       <StatusBar animated backgroundColor={'transparent'} barStyle={dark ? 'light-content' : 'dark-content'} />

//       {/* {drawerSectionSub('Authentication', "Authentication", 'icon', 'account-multiple-outline', '', '#9f1aa6')}
//       {drawerSectionSub('Sign In with Email', "EmailAuth", 'icon', 'email-variant', '', '#00A699')}
//       {drawerSectionSub('Forget Password', "ForgetPasswordAuth", 'icon', 'form-textbox-password', '', '#00A4EF')}
//       {drawerSectionSub('SignUp with Email', "SignUpAuth", 'icon', 'account-arrow-right', '', '#FFB900')}
//       {drawerSectionSub('Phone', "PhoneAuth", 'icon', 'phone-message', '', '#78C257')}
//       {drawerSectionSub('Google', "GoogleAuth", 'icon', 'google', '', '#DB4437')}
//       {drawerSectionSub('Facebook', "FacebookAuth", 'icon', 'facebook', '', '#4267B2')}
//       {drawerSectionSub('Twitter', "TwitterAuth", 'icon', 'twitter', '', '#1DA1F2')} */}
//     </DrawerContentScrollView >
//   );
// }


//   return (
//     <NavigationContainer  >
//       <DrawerTab.Navigator
//       //  drawerContent={(props) => <CustomDrawerContent {...props} />}
//        >
//         <DrawerTab.Screen name="Home" component={Home} options={{ headerShown: false }} />
//       </DrawerTab.Navigator>
//     </NavigationContainer>
//   )
// }

export default Home