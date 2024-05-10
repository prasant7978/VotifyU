import AsyncStorage from "@react-native-async-storage/async-storage"
import checkIfExistAPI from "../../api/candidate/checkExistingCandidateAPI"

const checkExistingCandidate = async() => {
    const token = JSON.parse(await AsyncStorage.getItem('@auth-token'));
    const result = await checkIfExistAPI(token);

    // console.log('result: ', result);

    if(result.data.isExist){
        return {
            isExist: result.data.isExist,
            candidate: result.data.candidate,
        }
    }
    else{
        return {
            isExist: result.data.isExist
        }
    }
}

export default checkExistingCandidate;