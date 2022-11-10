import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import toast from '../components/toast'
import ImageLoading from '../components/imageLoading'
import { LinkInButton } from '../components/link'

const Setting = () => {
  return (
    <View style={{ marginTop: 40 }}>
      <Button onPress={() => toast('This is a test Toast')}>Toast Component</Button>

      <ImageLoading uri={'https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569__340.jpg'} height={200} width={200} roundness={1} />

      <LinkInButton link={'https://pixabay.com/images/search/hd/'} text='Open Link Component' b tf/>

    </View>
  )
}

export default Setting