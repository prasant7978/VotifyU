import { StyleSheet } from "react-native";
import { horizontalScale } from "./scaling";

const globalStyles = StyleSheet.create({
    whiteBackground: {
        backgroundColor: '#FFFFFF'
    },
    flex: {
        flex: 1
    },
    paddingHorizontal: {
        paddingHorizontal: horizontalScale(10)
    }
})

export default globalStyles;