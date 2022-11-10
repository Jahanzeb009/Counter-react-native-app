import { ToastAndroid } from "react-native"



export default toast = (toast) => {
    return ToastAndroid.show(toast, ToastAndroid.SHORT)
}