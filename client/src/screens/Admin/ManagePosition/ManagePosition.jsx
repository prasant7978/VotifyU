import React from "react";
import { SafeAreaView } from "react-native";
import globalStyles from "../../../assets/styles/globalStyles";
import ManagePositionTabNavigation from "../../../navigation/ManagePositionTabNavigation";

const ManagePositions = () => {
    return (
        <SafeAreaView style={[globalStyles.flex, globalStyles.paddingHorizontal, globalStyles.whiteBackground]}>
            <ManagePositionTabNavigation />
        </SafeAreaView>
    )
}

export default ManagePositions;