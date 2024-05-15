import React from "react";
import { SafeAreaView } from "react-native";
import globalStyles from "../../assets/styles/globalStyles";
import CreatePostTabNavigation from "../../navigation/TabNavigation";

const CreatePost = () => {
    return (
        <SafeAreaView style={[globalStyles.flex, globalStyles.paddingHorizontal, globalStyles.whiteBackground]}>
            <CreatePostTabNavigation />
        </SafeAreaView>
    )
}

export default CreatePost;