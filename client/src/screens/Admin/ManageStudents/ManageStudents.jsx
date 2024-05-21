import React from "react";
import { SafeAreaView } from "react-native";
import globalStyles from "../../../assets/styles/globalStyles";
import ManageStudentTabNavigation from "../../../navigation/ManageStudentsTabNavigation";

const ManageStudent = () => {
    return (
        <SafeAreaView style={[globalStyles.flex, globalStyles.paddingHorizontal, globalStyles.whiteBackground]}>
            <ManageStudentTabNavigation />
        </SafeAreaView>
    )
}

export default ManageStudent;