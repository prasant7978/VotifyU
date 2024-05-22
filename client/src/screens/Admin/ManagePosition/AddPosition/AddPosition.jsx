import React, { useEffect, useState } from "react";

import styles from "./style";
import globalStyles from "../../../../assets/styles/globalStyles";

import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../../../constants/theme";
import Button from "../../../../components/Button/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import addPositionAPI from "../../../../api/position/addPositionAPI";
import { Dropdown } from "react-native-element-dropdown";
import { getFontFamily } from "../../../../assets/fonts/helper";
import { horizontalScale, verticalScale } from "../../../../assets/styles/scaling";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";
import { useFocusEffect } from "@react-navigation/native";

const AddPosition = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [responsibilities, setResponsibilities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [currentResponsibilityIndex, setCurrentResponsibilityIndex] = useState(null);
    const [currentResponsibilityText, setCurrentResponsibilityText] = useState('');
    const [newResponsibility, setNewResponsibility] = useState('');

    // dropdown visibility state
    const [isFocus, setIsFocus] = useState(false);

    const positionStatusList = [
        {label: "Open", value: "open"},
        {label: "Close", value: "close"},
    ];

    useFocusEffect(
        React.useCallback(() => {
            clearInputText();
        }, [])
      )

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

    const clearInputText = () => {
        setName('');
        setDescription('');
        setStatus('');
        setResponsibilities([]);
    }

    const handleAddPosition = async() => {
        setIsLoading(true)

        try {
            const position = {
                name: name,
                description: description,
                status: status,
                responsibilities: responsibilities,
            }

            const token = JSON.parse(await AsyncStorage.getItem('@auth-token'))
            const response = await addPositionAPI(token, position)

            if(!response?.success){
                console.log('Error in adding the position: ', response.error);
                Alert.alert('Error', response.error)
                return
            }

            Alert.alert('Alert', response.message)
            clearInputText();
        } catch (error) {
            console.log('Error in adding position: ', error);
            Alert.alert('Error', error)
        } finally {
            setIsLoading(false)
        }
    }

    const confirmDioalog = () => {
        Alert.alert(
            'Add Position', 
            'Are you sure, you want to add the position?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Yes',
                    onPress: () => handleAddPosition()
                }
            ],
            {
                cancelable: false
            }
        );
    }

    const validation = () => {
        if (
          !name ||
          !description ||
          !status ||
          responsibilities.length == 0
        ) {
          Alert.alert('Alert', 'Please Provide All Information');
          return;
        }
  
        confirmDioalog();
    };

    return (
        <ScrollView style={[globalStyles.flex, globalStyles.paddingHorizontal, globalStyles.whiteBackground]}>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../../../../assets/images/add.png')}
                    style={styles.image}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.labelText}>Position Name</Text>

                <TextInput
                    value={name}
                    onChangeText={(val) => setName(val)}
                    placeholder={'Position Name'}
                    placeholderTextColor={COLORS.lightGray}
                    style={styles.inputText}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.labelText}>Description</Text>

                <TextInput
                    value={description}
                    onChangeText={(val) => setDescription(val)}
                    placeholder={'Position Description'}
                    placeholderTextColor={COLORS.lightGray}
                    style={styles.inputText}
                    multiline
                />
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

            <View style={styles.inputContainer}>
                <Text style={styles.labelText}>Roles & Responsibilities</Text>

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

                    <TouchableOpacity style={[styles.actionButton, {backgroundColor: COLORS.lightSkyLine, marginTop: verticalScale(10), marginRight: horizontalScale(3), alignSelf: 'flex-end'}]} onPress={handleAddResponsibility}>
                        <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    title={'Add Position'}
                    loading={isLoading}
                    handleSubmit={validation}
                />
            </View>
        </ScrollView>
    )
}

export default AddPosition;