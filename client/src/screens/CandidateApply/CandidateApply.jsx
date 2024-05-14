import React, { useEffect, useState } from "react";

// styles
import styles from "./style";
import globalStyles from "../../assets/styles/globalStyles";

import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";

// assets and constants
import { COLORS } from "../../constants/theme";
import { getFontFamily } from "../../assets/fonts/helper";
import { horizontalScale, verticalScale } from "../../assets/styles/scaling";

// apis
import getAllPositionAPI from "../../api/position/getAllPositionAPI";
import applyCandidateAPI from "../../api/candidate/applyCandidateAPI";

// components
import Button from '../../components/Button/Button'

// functions
import checkExistingCandidate from "./checkExistingCandidate";

const CandidateApply = ({navigation}) => {
    // local states
    const [slogan, setSlogan] = useState('');
    const [allPositions, setAllPositions] = useState([]);
    const [position, setPosition] = useState('');
    const [aadhar, setAadhar] = useState({});
    const [collegeId, setCollegeId] = useState({});
    const [hostelId, setHostelId] = useState({});
    const [marksheet, setMarksheet] = useState({});
    const [loading, setLoading] = useState(false);

    const [aadharCardFileName, setAadharCardFileName] = useState('Select aadhar')
    const [marksheetFileName, setMarksheetFileName] = useState('Select marksheet')
    const [collegeIdFileName, setCollegeIdFileName] = useState('Select college id card')
    const [hostelIdFileName, setHostelIdFileName] = useState('Select hostel id card')

    const [documents, setDocuments] = useState([]);

    // dropdown visibility state
    const [isFocus, setIsFocus] = useState(false);

    const selectDocument = async(docType) => {
        try {
            const doc = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.pdf]
            });

            setDocuments([...documents, doc]);

            // console.log('Document Selected: ', doc);

            if(docType === 'aadhar'){
                setAadhar(doc)
                setAadharCardFileName(doc.name)
            }
            else if(docType === 'marksheet'){
                setMarksheet(doc)
                setMarksheetFileName(doc.name)
            }
            else if(docType === 'collegeId'){
                setCollegeId(doc)
                setCollegeIdFileName(doc.name)
            }
            else if(docType === 'hostelId'){
                setHostelId(doc)
                setHostelIdFileName(doc.name)
            }
        } catch (error) {
            console.log("Error in selecting the document: ", error);
        }
    }

    const handleClearStates = () => {
        setSlogan('');
        setPosition('');
        setAadhar({});
        setCollegeId({});
        setHostelId({});
        setMarksheet({});
        setAadharCardFileName('Select aadhar');
        setMarksheetFileName('Select marksheet');
        setCollegeIdFileName('Select college id card');
        setHostelIdFileName('Select hostel id card');
    }

    const handleApplyCandidate = async() => {
        const formData = new FormData();

        // console.log('documents array: ', documents);

        for(const documentIndex in documents){
            const document = documents[documentIndex];

            const {uri, name, type} = document;

            formData.append('documents[]', {
                uri,
                type,
                name
            });

        }

        formData.append('slogan', slogan);
        formData.append('position', position);

        setLoading(true)
        const token = JSON.parse(await AsyncStorage.getItem('@auth-token'));
        const createCandidate = await applyCandidateAPI(formData, token);
        setLoading(false)

        // console.log('received data: ', createCandidate.data);

        if(!createCandidate.status){
            Alert.alert('Alert', 'Error in candidate apply, please try again later')
        }
        else{
            Alert.alert(`Congratulations, ${createCandidate.data.candidate.student.name}`, `Your application for the ${createCandidate.data.candidate.position.name} position has been submitted successfully.`)
            handleClearStates();
            navigation.goBack();
        }
    }

    const confirmDioalog = async() => {
        const check = await checkExistingCandidate();

        if(check.isExist === true){
            Alert.alert('Alert', `You've already applied for the ${check.candidate.position.name} position`);
            return;
        }
        else{
            Alert.alert(
                'Apply for candidate', 
                'Once you apply as a candidate, your application details cannot be changed or revoked. Are you sure you want to proceed?',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel'
                  },
                  {
                    text: 'Submit',
                    onPress: () => handleApplyCandidate()
                  }
                ],
                {
                  cancelable: false
                }
            );
        }
    }

    useEffect(() => {
        const fetchAllPositions = async() => {
            const token = JSON.parse(await AsyncStorage.getItem('@auth-token'));
            const {positions} = await getAllPositionAPI(token);

            // reseting the array before assigning all positions
            allPositions.length = 0;

            positions.map((item) => {
                allPositions.push({
                    label: item.name,
                    value: item._id
                });
            });

            // console.log('all positions list: ', allPositions)
        }

        fetchAllPositions();
    }, [])

    return (
        <ScrollView style={[globalStyles.flex, globalStyles.whiteBackground, globalStyles.paddingHorizontal]}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../../assets/images/fill.png')}
                        resizeMode={'contain'}
                        style={styles.image}
                    />
                </View>
                
                <View style={styles.sloganContainer}>
                    <Text style={styles.labelText}>Slogan</Text>

                    <TextInput
                        value={slogan}
                        onChangeText={(val) => setSlogan(val)}
                        multiline={true}
                        returnKeyType={'next'}
                        style={styles.inputBox}
                        placeholder={'Write your slogan here'}
                        placeholderTextColor={COLORS.darkGray}
                    />
                </View>

                <View>
                    <Text style={styles.labelText}>Select a position</Text>
                    
                    <View style={styles.modalContainer}>
                        <Dropdown
                            style={[styles.modal, isFocus && { borderColor: '#333333' }]}
                            containerStyle={styles.dropdownItemListContainer}
                            itemTextStyle={{color: COLORS.slateShadow}}
                            activeColor={COLORS.coffeeWhite}
                            placeholderStyle={styles.modalText}
                            selectedTextStyle={styles.modalText}
                            fontFamily={getFontFamily('Inter', '500')}
                            data={allPositions}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Select position' : '...'}
                            value={position}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setPosition(item.value);
                                setIsFocus(false);
                            }}
                        />
                    </View>
                </View>

                <View style={{marginTop: verticalScale(10)}}>
                    <View>
                        <Text style={styles.labelText}>Upload Aadhar Card</Text>

                        <TouchableOpacity style={styles.documentSelectContainer} onPress={() => selectDocument('aadhar')}>
                                <FontAwesomeIcon icon={faFileCirclePlus} color="#ffffff" size={horizontalScale(20)}/>
                                <Text style={styles.documentSelectText}>{aadharCardFileName}</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text style={styles.labelText}>Upload Last Semester Marksheet</Text>

                        <TouchableOpacity style={styles.documentSelectContainer} onPress={() => selectDocument('marksheet')}>
                                <FontAwesomeIcon icon={faFileCirclePlus} color="#ffffff" size={horizontalScale(20)}/>
                                <Text style={styles.documentSelectText}>{marksheetFileName}</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text style={styles.labelText}>Upload College ID Card</Text>

                        <TouchableOpacity style={styles.documentSelectContainer} onPress={() => selectDocument('collegeId')}>
                                <FontAwesomeIcon icon={faFileCirclePlus} color="#ffffff" size={horizontalScale(20)}/>
                                <Text style={styles.documentSelectText}>{collegeIdFileName}</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text style={styles.labelText}>Upload Hostel ID Card</Text>

                        <TouchableOpacity style={styles.documentSelectContainer} onPress={() => selectDocument('hostelId')}>
                                <FontAwesomeIcon icon={faFileCirclePlus} color="#ffffff" size={horizontalScale(20)}/>
                                <Text style={styles.documentSelectText}>{hostelIdFileName}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* <View>
                    <Text style={styles.labelText}>Add your social media links</Text>
                </View> */}

                <View style={styles.buttonContainer}>
                    <Button
                        title={'Apply for Candidate'}
                        loading={loading}
                        handleSubmit={confirmDioalog}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

export default CandidateApply;