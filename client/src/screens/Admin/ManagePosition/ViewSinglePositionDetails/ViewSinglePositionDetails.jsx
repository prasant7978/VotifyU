import React, { useState } from "react";

import styles from "./style";
import globalStyles from "../../../../assets/styles/globalStyles";

import { Alert, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useNavigation } from "@react-navigation/native";
import DropShadow from "react-native-drop-shadow";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { COLORS, imageUri } from "../../../../constants/theme";

import { horizontalScale, verticalScale } from "../../../../assets/styles/scaling";
import { getFontFamily } from "../../../../assets/fonts/helper";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";

import { Routes } from "../../../../navigation/Routes";

import Button from "../../../../components/Button/Button";

import updatePositionAPI from "../../../../api/position/updatePositionAPI";
import deletePositionAPI from "../../../../api/position/deletePositionAPI";

const ViewSinglePositionDetails = (props) => {
    const position = props.route.params.position

    const navigation = useNavigation();

    const [name, setName] = useState(position.name)
    const [description, setDescription] = useState(position.description)
    const [responsibilities, setResponsibilities] = useState(position.responsibilities)
    const [status, setStatus] = useState(position.status)
    const [currentResponsibilityIndex, setCurrentResponsibilityIndex] = useState(null);
    const [currentResponsibilityText, setCurrentResponsibilityText] = useState('');
    const [newResponsibility, setNewResponsibility] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // dropdown visibility state
    const [isFocus, setIsFocus] = useState(false);

    const positionStatusList = [
        {label: "Open", value: "open"},
        {label: "Close", value: "close"},
    ];

    // console.log('responsibilities: ', responsibilities);

    const handleEditResponsibility = (index) => {
        setCurrentResponsibilityIndex(index);
        setCurrentResponsibilityText(responsibilities[index]); // Set current text for editing
    };

    const handleUpdateResponsibility = (index) => {
        if (!currentResponsibilityText.trim()) {
            Alert.alert('Alert', "Please enter a responsibility description.");
            return;
        }
    
        const newResponsibilities = [...responsibilities]; // Copy the array
        newResponsibilities[index] = currentResponsibilityText; // Update the item at index
        setResponsibilities(newResponsibilities);
        setCurrentResponsibilityIndex(null); // Clear editing state
        setCurrentResponsibilityText(""); // Clear editing text
    };

    const handleDeleteResponsibility = (index) => {
        Alert.alert(
            "Delete Responsibility",
            "Are you sure you want to delete this responsibility?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Yes",
                    onPress: () => {
                        const newResponsibilities = [...responsibilities]; // Copy the array
                        newResponsibilities.splice(index, 1); // Remove the item at index
                        setResponsibilities(newResponsibilities);
                    },
                },
            ],
          { cancelable: false }
        );
    };

    const handleAddResponsibility = () => {
        if (!newResponsibility.trim()) {
            Alert.alert('Alert', "Please enter a responsibility description.");
            return;
        }
    
        setResponsibilities([...responsibilities, newResponsibility]);
        setNewResponsibility('');
    };

    const handleUpdatePosition = async() => {
        setIsLoading(true)

        try {
            const newPosition = {
                positionId: position._id,
                name: name,
                description: description,
                responsibilities: responsibilities,
                status: status
            }

            const token = JSON.parse(await AsyncStorage.getItem('@auth-token'));
            const response = await updatePositionAPI(token, newPosition);

            if(!response.success){
                console.log('Error in updating the position: ', response.message);
                Alert.alert('Error', response.message);
                return;
            }

            Alert.alert('Alert', response.message);
            navigation.goBack();
        } catch (error) {
            console.log('Error in updating position: ', error);
            Alert.alert('Error', error);
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeletePosition = async() => {
        setIsLoading(true)

        try {
            const token = JSON.parse(await AsyncStorage.getItem('@auth-token'));
            const response = await deletePositionAPI(token, position._id);

            if(!response.success){
                console.log('Error in deleting the position: ', response.message);
                Alert.alert('Error', response.message);
                return;
            }

            Alert.alert('Alert', response.message);
            navigation.goBack();
        } catch (error) {
            console.log('Error in deleting position: ', error);
            Alert.alert('Error', error);
        } finally {
            setIsLoading(false)
        }
    }

    const confirmDialog = (type) => {
        if(type === 'update'){
            Alert.alert(
                "Update Position",
                "Are you sure you want to update the position?",
                [
                    { text: "Cancel", style: "cancel" },
                    {
                        text: "Yes",
                        onPress: () => {
                            handleUpdatePosition()
                        },
                    },
                ],
                { cancelable: false }
            );
        }
        else{
            Alert.alert(
                "Delete Position",
                "Are you sure you want to delete the position?",
                [
                    { text: "Cancel", style: "cancel" },
                    {
                        text: "Yes",
                        onPress: () => {
                            handleDeletePosition()
                        },
                    },
                ],
                { cancelable: false }
            );
        }
    }

    return (
        <SafeAreaView style={[globalStyles.flex, globalStyles.paddingHorizontal, globalStyles.whiteBackground]}>
            <ScrollView style={styles.conatiner}>
                <View style={styles.detailsContainer}>
                    <Text style={styles.labelText}>Position Name</Text>

                    <TextInput
                        value={name}
                        onChangeText={(val) => setName(val)}
                        style={styles.inputDetails}
                    />
                </View>

                <View style={styles.detailsContainer}>
                    <Text style={styles.labelText}>About Position</Text>

                    <TextInput
                        value={description}
                        onChangeText={(val) => setDescription(val)}
                        style={styles.descriptionText}
                        multiline
                    />
                </View>

                <View style={styles.detailsContainer}>
                    <Text style={[styles.labelText, {marginBottom: verticalScale(10)}]}>Roles & Responsibilites</Text>

                    {responsibilities.map((item, index) => (
                        <View key={index} style={styles.singleResponsibilityContainer}>
                            {currentResponsibilityIndex === index ? (
                                <TextInput
                                    value={currentResponsibilityText}
                                    onChangeText={(val) => setCurrentResponsibilityText(val)}
                                    style={[styles.responsibilityInput, {borderBottomWidth: horizontalScale(1), borderBottomColor: COLORS.slateShadow}]}
                                    multiline
                                />
                            ) : (
                                <Text style={styles.responsibilityInput}>{item}</Text>
                            )}

                            <View style={styles.responsibilityActions}>
                                <TouchableOpacity onPress={() => handleEditResponsibility(index)}>
                                    <FontAwesomeIcon icon={faPenSquare} size={horizontalScale(26)} color={COLORS.tertiary}/>
                                </TouchableOpacity>
                                
                                <View style={{flexDirection: 'row'}}>
                                    <TouchableOpacity style={[styles.actionButton, {backgroundColor: COLORS.secondary}]} onPress={() => handleUpdateResponsibility(index)}>
                                        <Text style={styles.buttonText}>Save</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={[styles.actionButton, {backgroundColor: COLORS.darkLove}]} onPress={() => handleDeleteResponsibility(index)}>
                                        <Text style={styles.buttonText}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}

                    <View style={styles.addResponsibilityContainer}>
                        <Text style={[styles.labelText, {marginBottom: verticalScale(7)}]}>Add New Responsibility:</Text>

                        <TextInput
                            value={newResponsibility}
                            onChangeText={(text) => setNewResponsibility(text)}
                            style={styles.responsibilityInput}
                            placeholder={"Type new responsibility"}
                            placeholderTextColor={COLORS.lightGray}
                            multiline
                        />

                        <TouchableOpacity style={[styles.actionButton, {backgroundColor: COLORS.primary, marginTop: verticalScale(10), marginRight: horizontalScale(3), alignSelf: 'flex-end'}]} onPress={handleAddResponsibility}>
                            <Text style={styles.buttonText}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.statusContainer}>
                    <Text style={styles.labelText}>Position Status:</Text>

                    <View style={styles.modalContainer}>
                        <Dropdown
                            style={[styles.modal, isFocus && { borderColor: '#333333' }]}
                            containerStyle={styles.dropdownItemListContainer}
                            itemTextStyle={{color: COLORS.slateShadow}}
                            activeColor={COLORS.coffeeWhite}
                            placeholderStyle={styles.modalText}
                            selectedTextStyle={styles.modalText}
                            fontFamily={getFontFamily('Inter', '500')}
                            data={positionStatusList}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Select Status' : '...'}
                            value={status}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setStatus(item.value);
                                setIsFocus(false);
                            }}
                        />
                    </View>
                </View>

                {position.candidate && (
                    <View style={styles.bottomContainer}>
                        <Text style={styles.labelText}>Elected Candidate</Text>

                        <TouchableOpacity style={styles.candidateDetailsContainer} onPress={() => navigation.navigate(Routes.CandidateProfile, {candidateId: position.electedCandidate})}>
                            <DropShadow style={styles.candidateImageShadow}>
                                <Image
                                    source={{uri: `${position.candidate?.imageUrl}`}}
                                    resizeMode={'cover'}
                                    style={styles.candidateImage}
                                />
                            </DropShadow>

                            <View style={styles.candidatePrimaryDetailsContainer}>
                                <Text style={styles.candidateNameText}>{position.candidate?.name}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}

                <View style={styles.updateButtonContainer}>
                    <Button
                        title={'Update Position'}
                        loading={isLoading}
                        handleSubmit={() => confirmDialog('update')}
                    />

                    <TouchableOpacity style={styles.deleteBottomContainer} onPress={() => confirmDialog('delete')}>
                        <Text style={styles.bottomText}>Delete Position</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ViewSinglePositionDetails;