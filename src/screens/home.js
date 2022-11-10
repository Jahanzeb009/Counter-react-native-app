import { View, Text, Vibration, StatusBar, ScrollView, TouchableWithoutFeedback, TouchableOpacity, Dimensions } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Button, IconButton, Menu, Modal, Provider, Switch, TouchableRipple } from 'react-native-paper'
import CircularProgress, { CircularProgressBase } from 'react-native-circular-progress-indicator';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '@react-navigation/native';

import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomSheet, { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet';

import ColorPicker, { Swatches, Preview, OpacitySlider, HueSlider, Panel3, SaturationSlider, BrightnessSlider } from 'reanimated-color-picker';
import { If } from '../components/conditionalRendering';


const Home = () => {

  const { colors, dark } = useTheme()

  const [value, setValue] = useState(0)
  const [targetValue, setTargetValue] = useState(33)

  let Storage = (keyValue) => {

    const [value, setValue] = useState(null)

    AsyncStorage.getItem(keyValue).then(vl => { setValue(vl) })

    return value;
  }

  const [roundedProgress, setRoundedProgress] = useState({
    isDashedOn: false,
    clockwiseRotation: false,
    strokeRotation: 0,
    strokeLinecap: 'round',
    activeStrokeColor: colors.primary,
    activeStrokeColor2: colors.primary,
    activeStrokeWidth: 30,
    inActiveStrokeColor: colors.border,
    inActiveStrokeWidth: 10,
    newLook: false
  })

  const [valueFromStorage] = useState({
    rotation: Storage('clockwiseRotation') === 'true',
    dashedBar: Storage('isDashedOn') === 'true',
    newlook: Storage('newLook') === 'true'
  })
  let rotation = Storage('clockwiseRotation') === 'true'
  let dashedBar = Storage('isDashedOn') === 'true'
  let newlook = Storage('newLook') === 'true'

  console.log(valueFromStorage.newlook)

  const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => ['25%', '60%'], []);

  let [showModal, setShowModal] = useState({
    modal1: false,
    modal2: false,
    modal3: false,
  })

  const [updateScreen, setupdateScreen] = useState(false)



  return (
    <BottomSheetModalProvider >
      <View style={{ flex: 1 }}>
        <Provider >

          <View style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
            <StatusBar animated translucent backgroundColor={'transparent'} barStyle={dark ? 'light-content' : "dark-content"} />
            <View style={{ alignItems: 'flex-end' }}>

              <IconButton icon={'cog'} iconColor={colors.mainText} mode='contained' style={{ backgroundColor: colors.border + 90 }} onPress={() => { bottomSheetModalRef.current.present() }} />
              {/* <IconButton icon={'cog'} onPress={() => { setRoundedProgress(prev => ({ ...prev, newLook: !roundedProgress.newLook })) }} /> */}
              {/* <IconButton icon={'cog'} onPress={() => { navigation.navigate('CountDown') }} /> */}

            </View>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

              <Button icon={'restart'} mode='elevated' style={{ position: 'absolute', right: 10, bottom: 10, }}
                textColor={colors.mainText} buttonColor={colors.card} onPress={() => { Vibration.vibrate(20), setValue(0) }}
              >Reset</Button>

              <If c={newlook || roundedProgress.newLook} v={
                <CircularProgressBase

                  radius={120}
                  duration={300}
                  maxValue={targetValue}

                  rotation={parseInt(Storage('strokeRotation')) || roundedProgress.strokeRotation}

                  clockwise={rotation || roundedProgress.clockwiseRotation}

                  value={value}


                  activeStrokeColor={Storage('activeStrokeColor') || roundedProgress.activeStrokeColor}
                  activeStrokeSecondaryColor={Storage('activeStrokeColor2') || roundedProgress.activeStrokeColor2}
                  activeStrokeWidth={Storage('activeStrokeWidth') || roundedProgress.activeStrokeWidth}
                  inActiveStrokeColor={Storage('inActiveStrokeColor') || roundedProgress.inActiveStrokeColor}
                  inActiveStrokeWidth={Storage('inActiveStrokeWidth') || roundedProgress.inActiveStrokeWidth}
                  inActiveStrokeOpacity={0.2}
                  strokeLinecap={Storage('strokeLinecap') || roundedProgress.strokeLinecap}

                  progressValueStyle={{ fontWeight: 'bold', fontSize: 30 }}
                  progressValueColor={Storage('activeStrokeColor') || roundedProgress.activeStrokeColor}

                  dashedStrokeConfig={{
                    count: dashedBar || roundedProgress.isDashedOn ? 40 : 0,
                    width: 8
                  }}

                >
                  <CircularProgressBase

                    radius={80}
                    duration={300}
                    maxValue={targetValue}

                    rotation={parseInt(Storage('strokeRotation')) || roundedProgress.strokeRotation}

                    clockwise={!(rotation || roundedProgress.clockwiseRotation)}

                    value={value}

                    activeStrokeColor={Storage('activeStrokeColor') || roundedProgress.activeStrokeColor}
                    activeStrokeSecondaryColor={Storage('activeStrokeColor2') || roundedProgress.activeStrokeColor2}
                    activeStrokeWidth={Storage('activeStrokeWidth') || roundedProgress.activeStrokeWidth}
                    inActiveStrokeColor={Storage('inActiveStrokeColor') || roundedProgress.inActiveStrokeColor}
                    inActiveStrokeWidth={Storage('inActiveStrokeWidth') || roundedProgress.inActiveStrokeWidth}
                    inActiveStrokeOpacity={0.2}
                    strokeLinecap={Storage('strokeLinecap') || roundedProgress.strokeLinecap}

                    progressValueStyle={{ fontWeight: 'bold', fontSize: 30 }}
                    progressValueColor={Storage('activeStrokeColor') || roundedProgress.activeStrokeColor}

                    dashedStrokeConfig={{
                      count: dashedBar || roundedProgress.isDashedOn ? 40 : 0,
                      width: 8
                    }}
                  >
                    <Text style={{ fontWeight: 'bold', fontSize: 20, color: colors.mainText }}>{value} / {targetValue}</Text>
                  </CircularProgressBase>

                </CircularProgressBase>}
                n={<CircularProgress
                  radius={120}
                  duration={300}
                  maxValue={targetValue}

                  rotation={parseInt(Storage('strokeRotation')) || roundedProgress.strokeRotation}

                  clockwise={!(rotation || roundedProgress.clockwiseRotation)}

                  value={value}
                  // valuePrefix={'$'}
                  valueSuffix={` / ${targetValue}`}
                  // initialValue={10}

                  // demimal value convert krny ka liay

                  // progressFormatter={(value) => {
                  //   'worklet';
                  //   return value.toFixed(2); // 2 decimal places
                  // }}

                  activeStrokeColor={Storage('activeStrokeColor') || roundedProgress.activeStrokeColor}
                  activeStrokeSecondaryColor={Storage('activeStrokeColor2') || roundedProgress.activeStrokeColor2}
                  activeStrokeWidth={Storage('activeStrokeWidth') || roundedProgress.activeStrokeWidth}
                  inActiveStrokeColor={Storage('inActiveStrokeColor') || roundedProgress.inActiveStrokeColor}
                  inActiveStrokeWidth={Storage('inActiveStrokeWidth') || roundedProgress.inActiveStrokeWidth}
                  inActiveStrokeOpacity={0.2}
                  strokeLinecap={Storage('strokeLinecap') || roundedProgress.strokeLinecap}

                  progressValueStyle={{ fontWeight: 'bold', fontSize: 30 }}
                  progressValueColor={Storage('activeStrokeColor') || roundedProgress.activeStrokeColor}

                  // circleBackgroundColor={'#333'}


                  // dashed lines ka liay

                  dashedStrokeConfig={{
                    count: dashedBar || roundedProgress.isDashedOn ? 40 : 0,
                    width: 8,
                  }}

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
                />}
              />

            </View>



            <View style={{ borderRadius: 30, overflow: 'scroll', borderWidth: 1, borderColor: colors.border + 50 }}>
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

            <TouchableRipple
              borderless
              disabled={value === targetValue ? true : false}
              rippleColor="#00000021"
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
              onPress={() => { Vibration.vibrate(20), setValue(value + 1) }}
            >
              <Text style={{ color: colors.mainText, fontSize: 20, fontWeight: 'bold' }}>Press me</Text>
            </TouchableRipple>
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
              <View style={{ alignItems: 'flex-end' }}>
                <IconButton icon={'close-thick'} iconColor={colors.mainText} mode='contained'
                  onPress={() => { bottomSheetModalRef.current.close() }} style={{ backgroundColor: colors.border + 90 }} />
              </View>
              <BottomSheetScrollView  >

                {/* Enable / Disable dashed rounded bar */}
                <TouchableRipple borderless rippleColor={colors.border} style={{ marginHorizontal: 5, marginVertical: 5, borderRadius: 10, }}
                  onPress={() => {
                    setRoundedProgress(prev => ({ ...prev, isDashedOn: !roundedProgress.isDashedOn }))
                    AsyncStorage.setItem('isDashedOn', (!roundedProgress.isDashedOn).toString())
                  }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: colors.background, }}>
                    <Text style={{ color: colors.mainText, flex: 1 }}>Enable dashed rounded bar</Text>
                    <Switch value={dashedBar || roundedProgress.isDashedOn} onValueChange={() => {
                      setRoundedProgress(prev => ({ ...prev, isDashedOn: !roundedProgress.isDashedOn }))
                      AsyncStorage.setItem('isDashedOn', (!roundedProgress.isDashedOn).toString())
                    }} />
                  </View>
                </TouchableRipple>

                {/* Enable two dialer / new look */}
                <TouchableRipple borderless rippleColor={colors.border} style={{ marginHorizontal: 5, marginVertical: 5, borderRadius: 10, }}
                  onPress={() => {
                    setRoundedProgress(prev => ({ ...prev, newLook: !roundedProgress.newLook }))
                    AsyncStorage.setItem('newLook', (!roundedProgress.newLook).toString())
                  }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: colors.background, }}>
                    <Text style={{ color: colors.mainText, flex: 1 }}>Enable two dialer</Text>
                    <Switch value={newlook || roundedProgress.newLook} onValueChange={() => {
                      setRoundedProgress(prev => ({ ...prev, newLook: !roundedProgress.newLook }))
                      AsyncStorage.setItem('newLook', (!roundedProgress.newLook).toString())
                    }} />
                  </View>
                </TouchableRipple>

                {/* Enable / Disable RTL / clockwiserotation */}
                <TouchableRipple borderless rippleColor={colors.border} style={{ marginHorizontal: 5, marginVertical: 5, borderRadius: 10, }}
                  onPress={() => {
                    setRoundedProgress(prev => ({ ...prev, clockwiseRotation: !roundedProgress.clockwiseRotation }))
                    AsyncStorage.setItem('clockwiseRotation', (!roundedProgress.clockwiseRotation).toString())
                  }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: colors.background, }}>
                    <Text style={{ color: colors.mainText, flex: 1 }}>Enable RTL Dialer</Text>
                    <Switch value={rotation || roundedProgress.clockwiseRotation} onValueChange={() => {
                      setRoundedProgress(prev => ({ ...prev, clockwiseRotation: !roundedProgress.clockwiseRotation }))
                      AsyncStorage.setItem('clockwiseRotation', (!roundedProgress.clockwiseRotation).toString())
                    }} />
                  </View>
                </TouchableRipple>

                {/* Stroke line cap */}
                <View style={{ marginHorizontal: 5, marginVertical: 5, padding: 10, borderRadius: 10, backgroundColor: colors.background }}>

                  <Text style={{ color: colors.mainText }}>Rotate Dialer</Text>

                  <Picker
                    selectedValue={parseInt(Storage('strokeRotation'))}
                    onValueChange={(itemValue, itemIndex) => {
                      setRoundedProgress(prev => ({ ...prev, strokeRotation: itemValue }))
                      AsyncStorage.setItem('strokeRotation', itemValue.toString())
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

                {/* Stroke line cap */}
                <View style={{ marginHorizontal: 5, marginVertical: 5, padding: 10, borderRadius: 10, backgroundColor: colors.background }}>

                  <Text style={{ color: colors.mainText }}>Stroke Line Cap</Text>

                  <Picker
                    selectedValue={Storage('strokeLinecap')}
                    onValueChange={(itemValue, itemIndex) => {
                      setRoundedProgress(prev => ({ ...prev, strokeLinecap: itemValue }))
                      AsyncStorage.setItem('strokeLinecap', itemValue)
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

                {/* Active / inActive stroke width */}
                <View style={{ marginHorizontal: 5, marginVertical: 5, padding: 10, borderRadius: 10, backgroundColor: colors.background }}>

                  {/* Active stroke width */}
                  <Text style={{ color: colors.mainText }}>Acitve Stoke width</Text>

                  <Slider
                    style={{ width: '100%', height: 40 }}
                    step={5}
                    value={parseInt(Storage('activeStrokeWidth')) || roundedProgress.activeStrokeWidth}
                    minimumValue={5}
                    maximumValue={100}
                    minimumTrackTintColor="#03a073"
                    maximumTrackTintColor="#03a0737c"
                    thumbTintColor='#03a073'
                    onSlidingComplete={(e) => {
                      AsyncStorage.setItem('activeStrokeWidth', e.toString())
                    }}
                    onValueChange={(e) => {
                      setRoundedProgress(prev => ({ ...prev, activeStrokeWidth: e }))
                      Vibration.vibrate(2)
                    }}
                  />

                  {/* inActive stroke width */}
                  <Text style={{ color: colors.mainText }}>Inacitve Stoke width</Text>

                  <Slider
                    style={{ width: '100%', height: 40 }}
                    step={1}

                    value={parseInt(Storage('inActiveStrokeWidth')) || roundedProgress.inActiveStrokeWidth}
                    minimumValue={1}
                    maximumValue={50}
                    minimumTrackTintColor="#03a073"
                    maximumTrackTintColor="#03a0737c"
                    thumbTintColor='#03a073'
                    onSlidingComplete={(e) => {
                      AsyncStorage.setItem('inActiveStrokeWidth', e.toString())
                    }}
                    onValueChange={(e) => {
                      setRoundedProgress(prev => ({ ...prev, inActiveStrokeWidth: e }))
                      Vibration.vibrate(2)
                    }}
                  />

                </View>

                {/* activeStrokeColor button */}
                <TouchableRipple borderless rippleColor={colors.border} style={{ marginHorizontal: 5, marginVertical: 5, borderRadius: 10, padding: 10, paddingRight: 30, backgroundColor: colors.background }}
                  onPress={() => { bottomSheetModalRef.current.close(), setShowModal(prev => ({ ...prev, modal1: !showModal.modal1 })) }}>

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <Text style={{ flex: 1, color: colors.mainText }}>activeStrokeColor</Text>
                    <View style={{ aspectRatio: 1, width: 30, borderRadius: 10, backgroundColor: Storage('activeStrokeColor') || roundedProgress.activeStrokeColor }} />

                  </View>
                </TouchableRipple>

                {/* activeStrokeColor2 button */}
                <TouchableRipple borderless rippleColor={colors.border} style={{ marginHorizontal: 5, marginVertical: 5, borderRadius: 10, padding: 10, paddingRight: 30, backgroundColor: colors.background }}
                  onPress={() => { bottomSheetModalRef.current.close(), setShowModal(prev => ({ ...prev, modal3: !showModal.modal3 })) }}>

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <Text style={{ flex: 1, color: colors.mainText }}>activeStrokeColor2</Text>
                    <View style={{ aspectRatio: 1, width: 30, borderRadius: 10, backgroundColor: Storage('activeStrokeColor2') || roundedProgress.activeStrokeColor2 }} />

                  </View>
                </TouchableRipple>

                {/* inactiveStrokeColor button */}
                <TouchableRipple borderless rippleColor={colors.border} style={{ marginHorizontal: 5, marginVertical: 5, borderRadius: 10, backgroundColor: colors.background, padding: 10, paddingRight: 30, }}
                  onPress={() => { bottomSheetModalRef.current.close(), setShowModal(prev => ({ ...prev, modal2: !showModal.modal2 })) }}>

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <Text style={{ flex: 1, color: colors.mainText }}>InActiveStrokeColor</Text>
                    <View style={{ aspectRatio: 1, width: 30, borderRadius: 10, backgroundColor: Storage('inActiveStrokeColor') || roundedProgress.inActiveStrokeColor }} />

                  </View>
                </TouchableRipple>

                {/* Clear All Button */}
                <TouchableRipple borderless rippleColor={colors.border} style={{ marginHorizontal: 5, marginVertical: 5, borderRadius: 10, }}
                  onPress={async () => {

                    let get = await AsyncStorage.getAllKeys()
                    setRoundedProgress(prev => ({
                      ...prev, activeStrokeWidth: 30,
                      inActiveStrokeWidth: 10,
                      isDashedOn: false,
                      strokeLinecap: 'round',
                      strokeRotation: 0,
                      inActiveStrokeColor: colors.border,
                      newLook: false,
                      clockwiseRotation: false,
                    }))
                    return await AsyncStorage.multiRemove(get).then(val => setupdateScreen(!updateScreen))


                  }}>
                  <View style={{ alignItems: 'center', padding: 10, backgroundColor: '#ff000090', }}>
                    <Text style={{ color: colors.mainText, flex: 1 }}>Clear All Setting</Text>
                  </View>
                </TouchableRipple>

              </BottomSheetScrollView>
            </View>
          </BottomSheetModal>
        </Provider >
        <View style={{ zIndex: 1 }}>
        </View>

        {/* Active Stroke Color */}
        <Modal visible={showModal.modal1} animationType='slide' style={{ backgroundColor: colors.background }} contentContainerStyle={{ flex: 1 }}  >
          <ColorPicker style={{ width: '60%' }} value={Storage('activeStrokeColor') || colors.primary}
            onComplete={(e) => {
              return (

                setRoundedProgress(prev => ({ ...prev, activeStrokeColor: e.hex })),
                AsyncStorage.setItem('activeStrokeColor', e.hex)
              )
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
          <ColorPicker style={{ width: '60%' }} value={Storage('activeStrokeColor2') || colors.primary}
            onComplete={(e) => {
              return (

                setRoundedProgress(prev => ({ ...prev, activeStrokeColor2: e.hex })),
                AsyncStorage.setItem('activeStrokeColor2', e.hex)
              )
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
          <ColorPicker style={{ width: '60%' }} value={Storage('inActiveStrokeColor') || colors.primary}
            onComplete={(e) => {
              return (

                setRoundedProgress(prev => ({ ...prev, inActiveStrokeColor: e.hex })),
                AsyncStorage.setItem('inActiveStrokeColor', e.hex)
              )
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
    </BottomSheetModalProvider>
  )
}

export default Home