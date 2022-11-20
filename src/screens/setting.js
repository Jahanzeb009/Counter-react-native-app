import { View, Text, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import toast from '../components/toast'
import ImageLoading from '../components/imageLoading'
import { LinkInButton } from '../components/link'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Setting = () => {

  

  let getAll = async () => {
    await AsyncStorage.getAllKeys().then(value => { alert(value) })
  }

  let deleteAll = async () => {
    await AsyncStorage.multiRemove(await AsyncStorage.getAllKeys()).then(() => toast('All Values Deleted'))
  }

  const [value, setValue] = useState('')
  const [keyValue, setKeyValue] = useState('')

  let set = async () => {
    if(value !== ''){
      await AsyncStorage.setItem(keyValue, value).then(() => toast('value saved'))
      setValue('')
      setKeyValue('')
    } else {
      toast('please enter a value')
    }
  }



  return (
    <View style={{ marginTop: 40 }}>
      {/* <Button onPress={() => toast('This is a test Toast')}>Toast Component</Button> */}

      {/* <ImageLoading uri={'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'} height={200} width={200} roundness={100} />

      <LinkInButton link={'https://pixabay.com/images/search/hd/'} text='Open Link Component' b tf /> */}

      <View style={{ flexDirection: 'row' }}>
        <TextInput placeholder='Enter key value' value={keyValue} onChangeText={setKeyValue} style={{ flex: 1, backgroundColor: '#fffafa', marginLeft: 10 }} />
        <TextInput placeholder='Enter value' value={value} onChangeText={setValue} style={{ flex: 1, backgroundColor: '#fffafa', marginHorizontal: 10 }} />
      </View>
      <Button onPress={() => set()}>set value</Button>
      <Button onPress={() => getAll()}>get all value</Button>
      <Button onPress={() => deleteAll()}>Remove all values</Button>

    </View>
  )
}

export default Setting















// import { View, Text, Vibration, StatusBar, Dimensions, StyleSheet, ToastAndroid, FlatList } from 'react-native'
// import React, { useMemo, useRef, useState, useEffect } from 'react'
// import { Button, IconButton, Modal, Provider, Switch, TouchableRipple } from 'react-native-paper'
// import CircularProgress, { CircularProgressBase } from 'react-native-circular-progress-indicator';
// import { Picker } from '@react-native-picker/picker';
// import { useTheme } from '@react-navigation/native';

// import Slider from '@react-native-community/slider';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet';

// import ColorPicker, { Swatches, Preview, HueSlider, Panel3, SaturationSlider, BrightnessSlider } from 'reanimated-color-picker';
// import { If } from '../components/conditionalRendering';

// import * as Progress from 'react-native-progress';

// import { openDatabase } from 'react-native-sqlite-storage';


// const Home = ({ navigation }) => {

//   var db = openDatabase({ name: 'setting.db' });

//   const { colors, dark } = useTheme()

//   const [value, setValue] = useState(0)
//   const [targetValue, setTargetValue] = useState(33)

//   let Storage = (keyValue) => {

//     const [value, setValue] = useState(null)
//     AsyncStorage.getItem(keyValue).then(vl => { setValue(vl) })
//     return value;
//   }

//   const [dbValues, setDbValues] = useState([])

//   const [roundedProgress, setRoundedProgress] = useState({
//     isDashedOn: 'false',
//     clockwiseRotation: 'false',
//     strokeRotation: 0,
//     strokeLinecap: 'round',
//     activeStrokeColor: colors.primary,
//     activeStrokeColor2: colors.primary,
//     activeStrokeWidth: 30,
//     inActiveStrokeColor: colors.border,
//     inActiveStrokeWidth: 10,
//     solidStrokeWidth: 5,
//     newlook: 'default'
//   })

//   let width = Dimensions.get('screen').width

//   let rotation = Storage('clockwiseRotation') === 'true'
//   let dashedBar = Storage('isDashedOn') === 'true'

//   let newlook = (value) => Storage('newlook') === value

//   const bottomSheetModalRef = useRef(null);

//   const snapPoints = useMemo(() => ['25%', '60%'], []);

//   // for colors pickers 
//   let [showModal, setShowModal] = useState({
//     modal1: false,
//     modal2: false,
//     modal3: false,
//   })

//   const styles = StyleSheet.create({
//     dialerView: {
//       flex: 1, justifyContent: 'center', alignItems: 'center'
//     },
//     counterValuePicker: {
//       borderRadius: 30, overflow: 'scroll', borderWidth: 1, borderColor: colors.border + 50
//     },
//     pressMeView: {
//       flex: 1, justifyContent: 'center', alignItems: 'center'
//     },
//     pressMeText: {
//       color: colors.mainText + 50, fontSize: 20, fontWeight: 'bold'
//     },
//     //Bottom Sheet Modeal
//     settingView: {
//       alignItems: 'center', flexDirection: 'row', paddingHorizontal: 10
//     },
//     settingText: {
//       flex: 1, fontWeight: 'bold', fontSize: 25, marginVertical: 5
//     },
//     //Enable / Disable dashed rounded bar
//     dashedRipple: {
//       marginHorizontal: 5, marginVertical: 5, borderRadius: 10
//     },
//     dashedView: {
//       flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: colors.background
//     },
//     // Enable two dialer / new look
//     twoDialer: {
//       marginHorizontal: 5, marginVertical: 5, borderRadius: 10
//     },
//     twoDialerView: {
//       flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: colors.background
//     },
//     // Enable / Disable RTL / clockwiserotation
//     RTLripple: {
//       marginHorizontal: 5, marginVertical: 5, borderRadius: 10
//     },
//     RTLView: {
//       flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: colors.background
//     },
//     // Rotate Dialer
//     rotateDialerView: {
//       marginHorizontal: 5, marginVertical: 5, padding: 10, borderRadius: 10, backgroundColor: colors.background
//     },
//     rotateDialerView2: {
//       backgroundColor: colors.card, borderRadius: 10, marginTop: 5
//     },
//     // Stroke line cap
//     strokeLinecapView: {
//       marginHorizontal: 5, marginVertical: 5, padding: 10, borderRadius: 10, backgroundColor: colors.background
//     },
//     strokeLinecapView2: {
//       backgroundColor: colors.card, borderRadius: 10, marginTop: 5
//     },
//     // Active / inActive stroke width
//     activeStrokeWidth: {
//       marginHorizontal: 5, marginVertical: 5, padding: 10, borderRadius: 10, backgroundColor: colors.background
//     },
//     // activeStrokeColor button / select color
//     activeStrokeColorView: {
//       marginHorizontal: 5, marginVertical: 5, borderRadius: 10, padding: 10, paddingRight: 30, backgroundColor: colors.background
//     },
//     activeStrokeColorShowView: {
//       aspectRatio: 1, width: 30, borderRadius: 10, backgroundColor: Storage('activeStrokeColor') || roundedProgress.activeStrokeColor
//     },
//     // activeStrokeColor2 / gradient button / select color
//     activeStrokeColorViewGradient: {
//       marginHorizontal: 5, marginVertical: 5, borderRadius: 10, padding: 10, paddingRight: 30, backgroundColor: colors.background
//     },
//     activeStrokeColorShowViewGradient: {
//       aspectRatio: 1, width: 30, borderRadius: 10, backgroundColor: Storage('activeStrokeColor2') || roundedProgress.activeStrokeColor2
//     },
//     // inactiveStrokeColor button / select color
//     inActiveStrokeColorView: {
//       marginHorizontal: 5, marginVertical: 5, borderRadius: 10, backgroundColor: colors.background, padding: 10, paddingRight: 30
//     },
//     inActiveStrokeColorShowView: {
//       aspectRatio: 1, width: 30, borderRadius: 10, backgroundColor: Storage('inActiveStrokeColor') || roundedProgress.inActiveStrokeColor
//     }
//   })

//   //  {Enable / Disable dashed rounded bar 
//   let Dashed = () => <TouchableRipple borderless rippleColor={colors.border} style={styles.dashedRipple}
//     onPress={() => {
//       setRoundedProgress(prev => ({ ...prev, isDashedOn: !roundedProgress.isDashedOn }))
//       AsyncStorage.setItem('isDashedOn', (!roundedProgress.isDashedOn).toString())
//     }}>
//     <View style={styles.dashedView}>
//       <Text style={{ color: colors.mainText, flex: 1 }}>Enable dashed rounded bar</Text>
//       <Switch value={dashedBar || roundedProgress.isDashedOn} onValueChange={() => {
//         setRoundedProgress(prev => ({ ...prev, isDashedOn: !roundedProgress.isDashedOn }))
//         AsyncStorage.setItem('isDashedOn', (!roundedProgress.isDashedOn).toString())
//       }} />
//     </View>
//   </TouchableRipple>

//   //  Enable / Disable RTL / clockwiserotation 
//   let RTL = () => <TouchableRipple borderless rippleColor={colors.border} style={styles.RTLripple}
//     onPress={() => {
//       setRoundedProgress(prev => ({ ...prev, clockwiseRotation: !roundedProgress.clockwiseRotation }))
//       AsyncStorage.setItem('clockwiseRotation', (!roundedProgress.clockwiseRotation).toString())
//     }}>
//     <View style={styles.RTLView}>
//       <Text style={{ color: colors.mainText, flex: 1 }}>Enable RTL Dialer</Text>
//       <Switch value={rotation || roundedProgress.clockwiseRotation} onValueChange={() => {
//         setRoundedProgress(prev => ({ ...prev, clockwiseRotation: !roundedProgress.clockwiseRotation }))
//         AsyncStorage.setItem('clockwiseRotation', (!roundedProgress.clockwiseRotation).toString())
//       }} />
//     </View>
//   </TouchableRipple>

//   {/* Rotate Dialer */ }
//   let Rotate = () => <View style={styles.rotateDialerView}>

//     <Text style={{ color: colors.mainText }}>Rotate Dialer</Text>
//     <View style={styles.rotateDialerView2}>
//       <Picker
//         selectedValue={parseInt(Storage('strokeRotation'))}
//         onValueChange={(itemValue, itemIndex) => {
//           setRoundedProgress(prev => ({ ...prev, strokeRotation: itemValue }))
//           AsyncStorage.setItem('strokeRotation', itemValue.toString())
//         }}
//         prompt='Select Count Number'
//         mode='dropdown'
//         style={{ color: colors.mainText, }}
//         dropdownIconColor={colors.mainText}
//         dropdownIconRippleColor={colors.primary}
//       >
//         <Picker.Item color={colors.mainText} label="0" value={0} />
//         <Picker.Item color={colors.mainText} label="45" value={45} />
//         <Picker.Item color={colors.mainText} label="90" value={90} />
//         <Picker.Item color={colors.mainText} label="135" value={135} />
//         <Picker.Item color={colors.mainText} label="180" value={180} />
//         <Picker.Item color={colors.mainText} label="225" value={225} />
//         <Picker.Item color={colors.mainText} label="270" value={270} />
//         <Picker.Item color={colors.mainText} label="315" value={315} />
//         <Picker.Item color={colors.mainText} label="360" value={360} />
//       </Picker>
//     </View>
//   </View>

//   //  Stroke line cap 
//   let StrokeLineCap = () => <View style={styles.strokeLinecapView}>

//     <Text style={{ color: colors.mainText }}>Stroke Line Cap</Text>
//     <View style={styles.strokeLinecapView2}>
//       <Picker
//         selectedValue={Storage('strokeLinecap')}
//         onValueChange={(itemValue, itemIndex) => {
//           setRoundedProgress(prev => ({ ...prev, strokeLinecap: itemValue }))
//           AsyncStorage.setItem('strokeLinecap', itemValue)
//         }}
//         prompt='Select Count Number'
//         mode='dropdown'
//         style={{ color: colors.mainText, }}
//         dropdownIconColor={colors.mainText}
//         dropdownIconRippleColor={colors.primary}
//       >
//         <Picker.Item color={colors.mainText} label="round" value={'round'} />
//         <Picker.Item color={colors.mainText} label="square" value={'square'} />
//         <Picker.Item color={colors.mainText} label="butt" value={'butt'} />
//       </Picker>
//     </View>

//   </View>

//   // database start

//   // database created
//   useEffect(() => {
//     db.transaction((txn) => {
//       txn.executeSql(
//         "SELECT name FROM sqlite_master WHERE type='table' AND name='setting_values'",
//         [],
//         (tx, res) => {
//           console.log('item:', res.rows.length);
//           if (res.rows.length == 0) {
//             txn.executeSql('DROP TABLE IF EXISTS setting_values', []);
//             txn.executeSql(
//               // yaha py jo header name hon gy wo db me save hon gay
//               'CREATE TABLE IF NOT EXISTS setting_values(id INTEGER PRIMARY KEY AUTOINCREMENT,isDashedOn VARCHAR(15),clockwiseRotation VARCHAR(15),strokeRotation INT(255),strokeLinecap VARCHAR(15),activeStrokeColor VARCHAR(15),activeStrokeColor2 VARCHAR(15),activeStrokeWidth INT(255),inActiveStrokeColor VARCHAR(15),inActiveStrokeWidth INT(255),solidStrokeWidth INT(255), newlook VARCHAR(50) )',
//               // 'CREATE TABLE IF NOT EXISTS table_user(id INTEGER PRIMARY KEY AUTOINCREMENT, userName VARCHAR(20), contact INT(10), address VARCHAR(255))',
//               []
//             );
//           }
//         }
//       );
//     });
//   }, [])

//   // add / insert content in database

//   let addData = () => {

//     console.log('insertDB Called');

//     db.transaction((tx) => {

//       tx.executeSql(
//         'INSERT INTO setting_values(id,isDashedOn,clockwiseRotation,strokeRotation,strokeLinecap,activeStrokeColor,activeStrokeColor2,activeStrokeWidth,inActiveStrokeColor,inActiveStrokeWidth,solidStrokeWidth,newlook) VALUES (1,?,?,?,?,?,?,?,?,?,?,?)',
//         [
//           roundedProgress.isDashedOn,
//           roundedProgress.clockwiseRotation,
//           roundedProgress.strokeRotation,
//           roundedProgress.strokeLinecap,
//           roundedProgress.activeStrokeColor,
//           roundedProgress.activeStrokeColor2,
//           roundedProgress.activeStrokeWidth,
//           roundedProgress.inActiveStrokeColor,
//           roundedProgress.inActiveStrokeWidth,
//           roundedProgress.solidStrokeWidth,
//           roundedProgress.newlook
//         ],

//         (results) => {
//           console.log('Insert Results', results.rowsAffected)
//           if (results.rowsAffected > 0) {
//             alert('Success')
//           } else {
//             alert('Updation Failed')
//           }
//         })
//     })
//   }

//   useEffect(() => {
//     addData()
//   }, [])


//   //value get krny ky liay
//   let getValue = () => {

//     console.log('Select DB is Called');

//     db.transaction(tx => {
//       tx.executeSql(
//         'SELECT * FROM setting_values', [],
//         (tx, results) => {
//           var len = results.rows.length;
//           console.log('select * results are = ', len);
//           if (len > 0) {

//             var temp = [];
//             for (let i = 0; i < results.rows.length; ++i) {
//               temp.push(results.rows.item(i));
//               // setDbValues(results.rows.item(i));
//             }
//           } else {
//             alert('No user found');
//           }
//           setDbValues(temp)
//         }
//       );
//     });

//     // }
//   }


//   let update = () => {



//     db.transaction((tx) => {

//       tx.executeSql(
//         'UPDATE setting_values set isDashedOn=?,clockwiseRotation=?,strokeRotation=?,strokeLinecap=?,activeStrokeColor=?,activeStrokeColor2=?,activeStrokeWidth=?,inActiveStrokeColor=?,inActiveStrokeWidth=?,solidStrokeWidth=?,newlook=? where id=1',
//         [roundedProgress.isDashedOn,
//         roundedProgress.clockwiseRotation,
//         roundedProgress.strokeRotation,
//         roundedProgress.strokeLinecap,
//         roundedProgress.activeStrokeColor,
//         roundedProgress.activeStrokeColor2,
//         roundedProgress.activeStrokeWidth,
//         roundedProgress.inActiveStrokeColor,
//         roundedProgress.inActiveStrokeWidth,
//         roundedProgress.solidStrokeWidth,
//         roundedProgress.newlook],

//         (tx, results) => {
//           console.log('Results', results.rowsAffected);
//           if (results.rowsAffected > 0) {
//             ToastAndroid.show('Success', ToastAndroid.SHORT)
//           } else {
//             ToastAndroid.show('Updation Failed', ToastAndroid.SHORT);
//           }
//         }
//       );
//     });
//   }




//   // database end






//   return (
//     <BottomSheetModalProvider >
//       <View style={{ flex: 1 }}>
//         <Provider >

//           <View style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
//             <StatusBar animated translucent backgroundColor={'transparent'} barStyle={dark ? 'light-content' : "dark-content"} />
//             <Button onPress={() => { update() }}>update value</Button>
//             <Button onPress={() => { getValue() }}>get value</Button>
//             {/* <Button icon={'arrow-right-bold-hexagon-outline'} onPress={() => { navigation.navigate('CountDown', { name: 'someValue' }) }} >Second Screen</Button>
//             <Button icon={'arrow-right-bold-hexagon-outline'} onPress={() => { navigation.navigate('Setting') }} >Setting</Button> */}





//             <IconButton icon={'cog'} iconColor={colors.mainText + 'd7'} mode='contained'
//               style={{ backgroundColor: colors.border + 30, position: 'absolute', marginTop: StatusBar.currentHeight, right: 10, zIndex: 1111 }}
//               onPress={() => {
//                 bottomSheetModalRef.current.present()
//               }} />


//             <View style={styles.dialerView}>

//               <Button icon={'restart'} mode='elevated' style={{ position: 'absolute', right: 10, bottom: 10, }}
//                 textColor={colors.mainText} buttonColor={colors.card} onPress={() => { Vibration.vibrate(20), setValue(0) }}
//               >Reset</Button>

//               <If

//                 // condition1={newlook('default')}
//                 condition1={newlook('longbar')}

//                 // longbar (longbar)
//                 firstComponent={
//                   <View style={{ alignItems: 'flex-start', transition: 'opacity 1s ease-in-out' }}>
//                     <Text style={{ fontSize: 15, color: colors.mainText + 99 }}>{value} / {targetValue}</Text>
//                     <Progress.Bar progress={value / targetValue} borderColor={roundedProgress.activeStrokeColor} color={roundedProgress.activeStrokeColor} width={width * 0.5} />
//                   </View>
//                 }

//                 condition2={newlook('rounded2')}
//                 // condition2={newlook('rounded2') || roundedProgress.newLook === 'rounded2'}

//                 // 2 progress bar (rounded2)
//                 secondComponent={<CircularProgressBase

//                   radius={120}
//                   duration={300}
//                   maxValue={targetValue}

//                   rotation={parseInt(Storage('strokeRotation')) || roundedProgress.strokeRotation}

//                   clockwise={rotation || roundedProgress.clockwiseRotation}

//                   value={value}

//                   activeStrokeColor={Storage('activeStrokeColor') || roundedProgress.activeStrokeColor}
//                   activeStrokeSecondaryColor={Storage('activeStrokeColor2') || roundedProgress.activeStrokeColor2}
//                   activeStrokeWidth={Storage('activeStrokeWidth') || roundedProgress.activeStrokeWidth}
//                   inActiveStrokeColor={Storage('inActiveStrokeColor') || roundedProgress.inActiveStrokeColor}
//                   inActiveStrokeWidth={Storage('inActiveStrokeWidth') || roundedProgress.inActiveStrokeWidth}
//                   inActiveStrokeOpacity={0.2}
//                   strokeLinecap={Storage('strokeLinecap') || roundedProgress.strokeLinecap}

//                   progressValueStyle={{ fontWeight: 'bold', fontSize: 30 }}
//                   progressValueColor={Storage('activeStrokeColor') || roundedProgress.activeStrokeColor}

//                   dashedStrokeConfig={{
//                     count: dashedBar || roundedProgress.isDashedOn ? 40 : 0,
//                     width: 8
//                   }}>

//                   <CircularProgressBase

//                     radius={80}
//                     duration={300}
//                     maxValue={targetValue}

//                     rotation={parseInt(Storage('strokeRotation')) || roundedProgress.strokeRotation}

//                     clockwise={!(rotation || roundedProgress.clockwiseRotation)}

//                     value={value}

//                     activeStrokeColor={Storage('activeStrokeColor') || roundedProgress.activeStrokeColor}
//                     activeStrokeSecondaryColor={Storage('activeStrokeColor2') || roundedProgress.activeStrokeColor2}
//                     activeStrokeWidth={Storage('activeStrokeWidth') || roundedProgress.activeStrokeWidth}
//                     inActiveStrokeColor={Storage('inActiveStrokeColor') || roundedProgress.inActiveStrokeColor}
//                     inActiveStrokeWidth={Storage('inActiveStrokeWidth') || roundedProgress.inActiveStrokeWidth}
//                     inActiveStrokeOpacity={0.2}
//                     strokeLinecap={Storage('strokeLinecap') || roundedProgress.strokeLinecap}

//                     progressValueStyle={{ fontWeight: 'bold', fontSize: 30 }}
//                     progressValueColor={Storage('activeStrokeColor') || roundedProgress.activeStrokeColor}

//                     dashedStrokeConfig={{
//                       count: dashedBar || roundedProgress.isDashedOn ? 40 : 0,
//                       width: 8
//                     }}>
//                     <Text style={{ fontWeight: 'bold', fontSize: 20, color: colors.mainText }}>{value} / {targetValue}</Text>
//                   </CircularProgressBase>

//                 </CircularProgressBase>}

//                 condition3={newlook('solid')}
//                 // condition3={newlook('solid') || roundedProgress.newLook === 'solid'}

//                 // solid (solid)
//                 thirdComponent={
//                   <View style={{ justifyContent: 'center', alignItems: 'center', }}>

//                     <Progress.Pie progress={value / targetValue} borderWidth={parseInt(Storage('solidStrokeWidth')) || roundedProgress.solidStrokeWidth} borderColor={Storage("activeStrokeColor") || roundedProgress.activeStrokeColor} color={Storage("activeStrokeColor") || roundedProgress.activeStrokeColor} size={width * 0.5} />
//                     <View style={{ position: 'absolute' }}>
//                       <Text style={{ fontSize: 25, color: colors.mainText }}>{value} / {targetValue}</Text>
//                     </View>
//                   </View>
//                 }

//                 // single progress bar (default)
//                 forthComponent={<CircularProgress
//                   radius={120}
//                   duration={300}
//                   maxValue={targetValue}

//                   rotation={parseInt(Storage('strokeRotation')) || roundedProgress.strokeRotation}

//                   clockwise={!(rotation || roundedProgress.clockwiseRotation)}

//                   value={value}
//                   // valuePrefix={'$'}
//                   valueSuffix={` / ${targetValue}`}
//                   // initialValue={10}

//                   // demimal value convert krny ka liay

//                   // progressFormatter={(value) => {
//                   //   'worklet';
//                   //   return value.toFixed(2); // 2 decimal places
//                   // }}

//                   activeStrokeColor={Storage('activeStrokeColor') || roundedProgress.activeStrokeColor}
//                   activeStrokeSecondaryColor={Storage('activeStrokeColor2') || roundedProgress.activeStrokeColor2}
//                   activeStrokeWidth={Storage('activeStrokeWidth') || roundedProgress.activeStrokeWidth}
//                   inActiveStrokeColor={Storage('inActiveStrokeColor') || roundedProgress.inActiveStrokeColor}
//                   inActiveStrokeWidth={Storage('inActiveStrokeWidth') || roundedProgress.inActiveStrokeWidth}
//                   inActiveStrokeOpacity={0.2}
//                   strokeLinecap={Storage('strokeLinecap') || roundedProgress.strokeLinecap}

//                   progressValueStyle={{ fontWeight: 'bold', fontSize: 30 }}
//                   progressValueColor={Storage('activeStrokeColor') || roundedProgress.activeStrokeColor}

//                   // circleBackgroundColor={'#333'}

//                   // dashed lines ka liay

//                   dashedStrokeConfig={{
//                     count: dashedBar || roundedProgress.isDashedOn ? 40 : 0,
//                     width: 8,
//                   }}

//                 // multicolor stock

//                 // strokeColorConfig={[
//                 //   { color: 'red', value: 0 },
//                 //   { color: 'skyblue', value: targetValue },
//                 //   { color: 'yellowgreen', value: targetValue },
//                 // ]}

//                 // title={'Counter'}
//                 // subtitle={targetValue}
//                 // titleFontSize={16}
//                 // titleColor={'white'}
//                 // titleStyle={{ fontWeight: 'bold' }}
//                 />}
//               />

//             </View>

//             <View style={styles.counterValuePicker}>
//               <Picker
//                 selectedValue={targetValue}
//                 onValueChange={(itemValue, itemIndex) => setTargetValue(itemValue)}
//                 prompt='Select Count Number'
//                 mode='dropdown'
//                 style={{ color: colors.mainText, }}
//                 dropdownIconColor={colors.mainText}
//                 dropdownIconRippleColor={colors.primary}
//               >
//                 <Picker.Item color={colors.mainText} label="33" value={33} />
//                 <Picker.Item color={colors.mainText} label="66" value={66} />
//                 <Picker.Item color={colors.mainText} label="100" value={100} />
//                 <Picker.Item color={colors.mainText} label="200" value={200} />
//                 <Picker.Item color={colors.mainText} label="300" value={300} />
//                 <Picker.Item color={colors.mainText} label="400" value={400} />
//                 <Picker.Item color={colors.mainText} label="500" value={500} />
//               </Picker>
//             </View>

//             <TouchableRipple
//               borderless
//               disabled={value === targetValue ? true : false}
//               rippleColor="#00000021"
//               style={styles.pressMeView}
//               onPress={() => { Vibration.vibrate(20), setValue(value + 1) }}
//             >
//               <Text style={styles.pressMeText}>Press me</Text>
//             </TouchableRipple>
//           </View>

//           <BottomSheetModal
//             ref={bottomSheetModalRef}
//             index={1}
//             snapPoints={snapPoints}
//             // onChange={handleSheetChanges}
//             handleIndicatorStyle={{ backgroundColor: colors.border, borderRadius: 100 }}
//             backgroundStyle={{ backgroundColor: colors.card }}
//             style={{ flex: 1 }}
//           >
//             <View style={{ flex: 1 }}>
//               <View style={styles.settingView}>
//                 <Text style={styles.settingText}>Setting</Text>
//                 <IconButton icon={'close-thick'} iconColor={colors.mainText} mode='contained'
//                   onPress={() => { bottomSheetModalRef.current.close() }} style={{ backgroundColor: colors.border + 90 }} />
//               </View>
//               <BottomSheetScrollView>

//                 {/* Enable / Disable dashed rounded bar */}
//                 <If condition1={newlook('default')}
//                   firstComponent={<Dashed />}
//                   condition2={newlook('rounded2')}
//                   secondComponent={<Dashed />}
//                 />

//                 {/* Enable  new look */}
//                 <View style={styles.rotateDialerView}>

//                   <Text style={{ color: colors.mainText }}>Change dialer style</Text>
//                   <View style={styles.rotateDialerView2}>
//                     <Picker
//                       selectedValue={Storage('newlook') || roundedProgress.newLook}
//                       onValueChange={(itemValue, itemIndex) => {
//                         setRoundedProgress(prev => ({ ...prev, newLook: itemValue }))
//                         AsyncStorage.setItem('newlook', itemValue)
//                       }}
//                       prompt='Select Count Number'
//                       mode='dropdown'
//                       style={{ color: colors.mainText, }}
//                       dropdownIconColor={colors.mainText}
//                       dropdownIconRippleColor={colors.primary}
//                     >
//                       <Picker.Item color={colors.mainText} label="Default" value={'default'} />
//                       <Picker.Item color={colors.mainText} label="Rounded with 2 dial" value={'rounded2'} />
//                       <Picker.Item color={colors.mainText} label="Solid" value={'solid'} />
//                       <Picker.Item color={colors.mainText} label="Long bar" value={'longbar'} />
//                     </Picker>
//                   </View>
//                 </View>

//                 {/* Enable / Disable RTL / clockwiserotation */}
//                 <If condition1={newlook('default')} firstComponent={
//                   <>
//                     <RTL />
//                     {/* Rotate Dialer */}
//                     <Rotate />
//                     {/* Stroke line cap */}
//                     <StrokeLineCap />
//                   </>}
//                   condition2={newlook('rounded2')} secondComponent={
//                     <>
//                       <RTL />
//                       {/* Rotate Dialer */}
//                       <Rotate />
//                       {/* Stroke line cap */}
//                       <StrokeLineCap />
//                     </>
//                   } />

//                 {/* Active / inActive stroke width */}
//                 <View style={styles.activeStrokeWidth}>

//                   {/* Solid dialer stroke width */}
//                   <>
//                     <Text style={{ color: colors.mainText }}>Solid dialer stroke width</Text>

//                     <Slider
//                       style={{ width: '100%', height: 40 }}
//                       step={1}
//                       value={parseInt(Storage('solidStrokeWidth')) || roundedProgress.solidStrokeWidth}
//                       minimumValue={0}
//                       maximumValue={50}
//                       minimumTrackTintColor="#03a073"
//                       maximumTrackTintColor="#03a0737c"
//                       thumbTintColor='#03a073'
//                       onSlidingComplete={(e) => {
//                         AsyncStorage.setItem('solidStrokeWidth', e.toString())
//                       }}
//                       onValueChange={(e) => {
//                         setRoundedProgress(prev => ({ ...prev, solidStrokeWidth: e }))
//                         Vibration.vibrate(2)
//                       }}
//                     />
//                   </>


//                   {/* Active stroke width */}
//                   <If
//                     condition1={newlook('default')} firstComponent={<>

//                       {/* Active stroke width */}
//                       <Text style={{ color: colors.mainText }}>Acitve Stoke width</Text>

//                       <Slider
//                         style={{ width: '100%', height: 40 }}
//                         step={5}
//                         value={parseInt(Storage('activeStrokeWidth')) || roundedProgress.activeStrokeWidth}
//                         minimumValue={5}
//                         maximumValue={100}
//                         minimumTrackTintColor="#03a073"
//                         maximumTrackTintColor="#03a0737c"
//                         thumbTintColor='#03a073'
//                         onSlidingComplete={(e) => {
//                           AsyncStorage.setItem('activeStrokeWidth', e.toString())
//                         }}
//                         onValueChange={(e) => {
//                           setRoundedProgress(prev => ({ ...prev, activeStrokeWidth: e }))
//                           Vibration.vibrate(2)
//                         }}
//                       />

//                       {/* inActive stroke width */}
//                       <Text style={{ color: colors.mainText }}>Inacitve Stoke width</Text>

//                       <Slider
//                         style={{ width: '100%', height: 40 }}
//                         step={1}

//                         value={parseInt(Storage('inActiveStrokeWidth')) || roundedProgress.inActiveStrokeWidth}
//                         minimumValue={1}
//                         maximumValue={50}
//                         minimumTrackTintColor="#03a073"
//                         maximumTrackTintColor="#03a0737c"
//                         thumbTintColor='#03a073'
//                         onSlidingComplete={(e) => {
//                           AsyncStorage.setItem('inActiveStrokeWidth', e.toString())
//                         }}
//                         onValueChange={(e) => {
//                           setRoundedProgress(prev => ({ ...prev, inActiveStrokeWidth: e }))
//                           Vibration.vibrate(2)
//                         }}
//                       />
//                     </>}

//                     condition2={newlook('rounded2')} secondComponent={<>
//                       {/* Active stroke width */}
//                       <Text style={{ color: colors.mainText }}>Acitve Stoke width</Text>

//                       <Slider
//                         style={{ width: '100%', height: 40 }}
//                         step={5}
//                         value={parseInt(Storage('activeStrokeWidth')) || roundedProgress.activeStrokeWidth}
//                         minimumValue={5}
//                         maximumValue={100}
//                         minimumTrackTintColor="#03a073"
//                         maximumTrackTintColor="#03a0737c"
//                         thumbTintColor='#03a073'
//                         onSlidingComplete={(e) => {
//                           AsyncStorage.setItem('activeStrokeWidth', e.toString())
//                         }}
//                         onValueChange={(e) => {
//                           setRoundedProgress(prev => ({ ...prev, activeStrokeWidth: e }))
//                           Vibration.vibrate(2)
//                         }}
//                       />

//                       {/* inActive stroke width */}
//                       <Text style={{ color: colors.mainText }}>Inacitve Stoke width</Text>

//                       <Slider
//                         style={{ width: '100%', height: 40 }}
//                         step={1}

//                         value={parseInt(Storage('inActiveStrokeWidth')) || roundedProgress.inActiveStrokeWidth}
//                         minimumValue={1}
//                         maximumValue={50}
//                         minimumTrackTintColor="#03a073"
//                         maximumTrackTintColor="#03a0737c"
//                         thumbTintColor='#03a073'
//                         onSlidingComplete={(e) => {
//                           AsyncStorage.setItem('inActiveStrokeWidth', e.toString())
//                         }}
//                         onValueChange={(e) => {
//                           setRoundedProgress(prev => ({ ...prev, inActiveStrokeWidth: e }))
//                           Vibration.vibrate(2)
//                         }}
//                       />

//                     </>}
//                   />

//                 </View>

//                 {/* activeStrokeColor button */}
//                 <TouchableRipple borderless rippleColor={colors.border} style={styles.activeStrokeColorView}
//                   onPress={() => { bottomSheetModalRef.current.close(), setShowModal(prev => ({ ...prev, modal1: !showModal.modal1 })) }}>

//                   <View style={{ flexDirection: 'row', alignItems: 'center' }}>

//                     <Text style={{ flex: 1, color: colors.mainText }}>activeStrokeColor</Text>
//                     <View style={styles.activeStrokeColorShowView} />

//                   </View>
//                 </TouchableRipple>


//                 {/* activeStrokeColor2 & inactivecolor button */}
//                 <If
//                   condition1={newlook('default')} firstComponent={<>
//                     {/* activeStrokeColor2 button */}
//                     <TouchableRipple borderless rippleColor={colors.border} style={styles.activeStrokeColorViewGradient}
//                       onPress={() => { bottomSheetModalRef.current.close(), setShowModal(prev => ({ ...prev, modal3: !showModal.modal3 })) }}>

//                       <View style={{ flexDirection: 'row', alignItems: 'center' }}>

//                         <Text style={{ flex: 1, color: colors.mainText }}>activeStrokeColor2</Text>
//                         <View style={styles.activeStrokeColorShowViewGradient} />

//                       </View>
//                     </TouchableRipple>

//                     {/* inactiveStrokeColor button */}
//                     <TouchableRipple borderless rippleColor={colors.border} style={styles.inActiveStrokeColorView}
//                       onPress={() => { bottomSheetModalRef.current.close(), setShowModal(prev => ({ ...prev, modal2: !showModal.modal2 })) }}>

//                       <View style={{ flexDirection: 'row', alignItems: 'center' }}>

//                         <Text style={{ flex: 1, color: colors.mainText }}>InActiveStrokeColor</Text>
//                         <View style={styles.inActiveStrokeColorShowView} />

//                       </View>
//                     </TouchableRipple>
//                   </>}

//                   condition2={newlook('rounded2')} secondComponent={<>
//                     {/* activeStrokeColor2 button */}
//                     <TouchableRipple borderless rippleColor={colors.border} style={styles.activeStrokeColorViewGradient}
//                       onPress={() => { bottomSheetModalRef.current.close(), setShowModal(prev => ({ ...prev, modal3: !showModal.modal3 })) }}>

//                       <View style={{ flexDirection: 'row', alignItems: 'center' }}>

//                         <Text style={{ flex: 1, color: colors.mainText }}>activeStrokeColor2</Text>
//                         <View style={styles.activeStrokeColorShowViewGradient} />

//                       </View>
//                     </TouchableRipple>

//                     {/* inactiveStrokeColor button */}
//                     <TouchableRipple borderless rippleColor={colors.border} style={styles.inActiveStrokeColorView}
//                       onPress={() => { bottomSheetModalRef.current.close(), setShowModal(prev => ({ ...prev, modal2: !showModal.modal2 })) }}>

//                       <View style={{ flexDirection: 'row', alignItems: 'center' }}>

//                         <Text style={{ flex: 1, color: colors.mainText }}>InActiveStrokeColor</Text>
//                         <View style={styles.inActiveStrokeColorShowView} />

//                       </View>
//                     </TouchableRipple>
//                   </>} />

//                 {/* Clear All Button */}
//                 <TouchableRipple borderless rippleColor={colors.border} style={{ marginHorizontal: 5, marginVertical: 5, borderRadius: 10, }}
//                   onPress={async () => {

//                     let get = await AsyncStorage.getAllKeys()
//                     setRoundedProgress(prev => ({
//                       ...prev,
//                       activeStrokeWidth: 30,
//                       inActiveStrokeWidth: 10,
//                       isDashedOn: false,
//                       strokeLinecap: 'round',
//                       activeStrokeColor: colors.primary,
//                       activeStrokeColor2: colors.primary,
//                       inActiveStrokeColor: colors.border,
//                       strokeRotation: 0,
//                       inActiveStrokeColor: colors.border,
//                       newLook: false,
//                       clockwiseRotation: false,
//                     }))
//                     return await AsyncStorage.multiRemove(get).then(val => ToastAndroid.show('Setting Cleared', ToastAndroid.SHORT))


//                   }}>
//                   <View style={{ alignItems: 'center', padding: 10, backgroundColor: '#ff000090', }}>
//                     <Text style={{ color: colors.mainText, flex: 1 }}>Clear All Setting</Text>
//                   </View>
//                 </TouchableRipple>


//               </BottomSheetScrollView>
//             </View>
//           </BottomSheetModal>

//         </Provider >
//         <View style={{ zIndex: 1 }}>
//         </View>

//         {/* Active Stroke Color */}
//         <Modal visible={showModal.modal1} animationType='slide' style={{ backgroundColor: colors.background }} contentContainerStyle={{ flex: 1 }}  >
//           <ColorPicker style={{ width: '60%' }} value={Storage('activeStrokeColor') || colors.primary}
//             onComplete={(e) => {
//               return (

//                 setRoundedProgress(prev => ({ ...prev, activeStrokeColor: e.hex })),
//                 AsyncStorage.setItem('activeStrokeColor', e.hex)
//               )
//             }}>
//             <Preview />
//             <Panel3 />
//             <HueSlider thumbShape='circle' />
//             <SaturationSlider thumbShape='circle' />
//             <BrightnessSlider thumbShape='circle' />
//             <Swatches />
//           </ColorPicker>

//           <Button onPress={() => { bottomSheetModalRef.current.present(), setShowModal(prev => ({ ...prev, modal1: false })) }} buttonColor={colors.primary} textColor={colors.mainText} style={{ borderRadius: 0 }} >Done</Button>
//         </Modal>

//         {/* Active Stroke Color 2 */}
//         <Modal visible={showModal.modal3} animationType='slide' style={{ backgroundColor: colors.background }} contentContainerStyle={{ flex: 1 }}  >
//           <ColorPicker style={{ width: '60%' }} value={Storage('activeStrokeColor2') || colors.primary}
//             onComplete={(e) => {
//               return (

//                 setRoundedProgress(prev => ({ ...prev, activeStrokeColor2: e.hex })),
//                 AsyncStorage.setItem('activeStrokeColor2', e.hex)
//               )
//             }}>
//             <Preview />
//             <Panel3 />
//             <HueSlider thumbShape='circle' />
//             <SaturationSlider thumbShape='circle' />
//             <BrightnessSlider thumbShape='circle' />
//             <Swatches />
//           </ColorPicker>

//           <Button onPress={() => { bottomSheetModalRef.current.present(), setShowModal(prev => ({ ...prev, modal3: false })) }} buttonColor={colors.primary} textColor={colors.mainText} style={{ borderRadius: 0 }} >Done</Button>
//         </Modal>

//         {/*InActive Stroke Color */}
//         <Modal visible={showModal.modal2} animationType='slide' style={{ backgroundColor: colors.background }} contentContainerStyle={{ flex: 1 }}  >
//           <ColorPicker style={{ width: '60%' }} value={Storage('inActiveStrokeColor') || colors.primary}
//             onComplete={(e) => {
//               return (

//                 setRoundedProgress(prev => ({ ...prev, inActiveStrokeColor: e.hex })),
//                 AsyncStorage.setItem('inActiveStrokeColor', e.hex)
//               )
//             }}>
//             <Preview />
//             <Panel3 />
//             <HueSlider thumbShape='circle' />
//             <SaturationSlider thumbShape='circle' />
//             <BrightnessSlider thumbShape='circle' />
//             <Swatches />
//           </ColorPicker>

//           <Button onPress={() => { bottomSheetModalRef.current.present(), setShowModal(prev => ({ ...prev, modal2: false })) }} buttonColor={colors.primary} textColor={colors.mainText} style={{ borderRadius: 0 }} >Done</Button>
//         </Modal>
//       </View>
//     </BottomSheetModalProvider>
//   )
// }

// export default Home