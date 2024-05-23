import React from "react";
import { SafeAreaView } from "react-native";
import globalStyles from "../../../assets/styles/globalStyles";
import PublishResultsTabNavigation from "../../../navigation/PublishResultTabNavigation";

const PublishResults = () => {
    return (
        <SafeAreaView style={[globalStyles.flex, globalStyles.paddingHorizontal, globalStyles.whiteBackground]}>
            <PublishResultsTabNavigation />
        </SafeAreaView>
    )
}

export default PublishResults;