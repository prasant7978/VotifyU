import React, { useState } from "react";

// styles
import styles from "./style";
import globalStyles from "../../../../assets/styles/globalStyles";

import { Alert, Image, Pressable, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import DropShadow from "react-native-drop-shadow";
import { Dropdown } from "react-native-element-dropdown";
import DatePicker from "react-native-date-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Snackbar from "react-native-snackbar";

import { COLORS, imageUri } from "../../../../constants/theme";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSquarePen } from "@fortawesome/free-solid-svg-icons";

import { horizontalScale } from "../../../../assets/styles/scaling";
import { getFontFamily } from "../../../../assets/fonts/helper";

// APIs
import { updateStudentAPI } from "../../../../api/student/updateStudentAPI";
import deleteStudentAPI from "../../../../api/student/deleteStudentAPI";

const ViewSingleStudentDetails = (props) => {
    const student = props.route.params.student

    const navigation = useNavigation();

    const [name, setName] = useState(student.name)
    const [gender, setGender] = useState(student.gender)
    const [dob, setDob] = useState(student?.dob || 'N/A')
    const [phone, setPhone] = useState(student.phone)
    const [parentPhone, setParentPhone] = useState(student?.parentPhone || 'N/A')
    const [roll, setRoll] = useState(student.roll)
    const [email, setEmail] = useState(student.email)
    const [course, setCourse] = useState(student?.course || 'N/A')
    const [department, setDepartment] = useState(student?.department || 'N/A')

    const [isLoading, setIsLoading] = useState(false)
    const [isEditPersonalDetails, setIsEditPersonalDetails] = useState(false)
    const [isEditAcademicDetails, setIsEditAcademicDetails] = useState(false)

    // dropdown visibility state
    const [isFocus, setIsFocus] = useState(false);

    // date picker state
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const genderList = [
        {label: "Male", value: "Male"},
        {label: "Female", value: "Female"},
    ];

    const updateStudent = async() => {
        const newDetails = {
            name: name,
            gender: gender,
            dob: dob,
            phone: phone,
            parentPhone: parentPhone,
            roll: roll,
            email: email,
            course: course,
            department: department
        }

        setIsLoading(true)
        try {
            const token = JSON.parse(await AsyncStorage.getItem('@auth-token'))
            const response = await updateStudentAPI(token, student._id, newDetails);

            if(!response.success){
                console.log('Error in updating the student: ', response.error);
                Alert.alert('Error', response.error)
                return
            }

            const updateStudentStatePromises = [
                setName(response.user.name),
                setGender(response.user.gender),
                setDob(response.user.dob),
                setPhone(response.user.phone),
                setParentPhone(response.user.parentPhone),
                setRoll(response.user.roll),
                setEmail(response.user.email),
                setCourse(response.user.course),
                setDepartment(response.user.department),
            ];

            await Promise.all(updateStudentStatePromises);

            setIsEditPersonalDetails(false)
            setIsEditAcademicDetails(false)

            Snackbar.show({
                text: 'Student details has been updated successfully',
                duration: Snackbar.LENGTH_SHORT,
                fontFamily: getFontFamily('Inter', '400')
            });
        } catch (error) {
            console.log('Error in updating student: ', error);
            Alert.alert('Error', error)
        } finally {
            setIsLoading(false)
        }
    }

    const deleteStudent = async() => {
        setIsLoading(true);

        try {
            const token = JSON.parse(await AsyncStorage.getItem('@auth-token'))
            const response = await deleteStudentAPI(token, student._id)

            if(!response.success){
                console.log('Error in deleting the student: ', response.error);
                Alert.alert('Error', response.error)
                return
            }

            Alert.alert('Alert', response.message)
            navigation.goBack()
        } catch (error) {
            console.log('Error in deleting student: ', error);
            Alert.alert('Error', error)
        } finally {
            setIsLoading(false)
        }
    }

    const confirmDioalog = (type) => {
        if(type === 'delete'){
            Alert.alert(
                'Delete Student', 
                'Are you sure, you want to delete the student?',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel'
                  },
                  {
                    text: 'Yes',
                    onPress: () => deleteStudent()
                  }
                ],
                {
                  cancelable: false
                }
            );
        }
        else{
            Alert.alert(
                'Update Student', 
                'Are you sure, you want to update the student?',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel'
                  },
                  {
                    text: 'Yes',
                    onPress: () => updateStudent()
                  }
                ],
                {
                  cancelable: false
                }
            );
        }
    }

    const validation = type => {
      if (
        !name ||
        !roll ||
        !gender ||
        !dob ||
        !phone ||
        !parentPhone ||
        !email ||
        !course ||
        !department
      ) {
        Alert.alert('Alert', 'Please Provide All Information');
        return;
      }

      confirmDioalog(type);
    };

    return (
        <SafeAreaView style={[globalStyles.flex, globalStyles.paddingHorizontal, globalStyles.whiteBackground, styles.container]}>
            <ScrollView>
                <DropShadow style={styles.imageContainerShadow}>
                    {student.profileImage ? (
                        <Image
                            source={{uri: `${imageUri}/profile/${student.profileImage}`}}
                            style={styles.image}
                        />
                    ) : (
                        <View style={[styles.imageContainer, styles.image]}>
                            <Image
                                source={require('../../../../assets/images/no-pictures.png')}
                                style={styles.noImage}
                                resizeMode={'contain'}
                            />
                            <Text style={styles.noImageText}>No Profile</Text>
                            <Text style={styles.noImageText}>Image</Text>
                        </View>
                    )}
                </DropShadow>

                <View style={styles.detailsContainer}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={styles.containerHeading}>Personal Details</Text>

                        <TouchableOpacity onPress={() => setIsEditPersonalDetails(!isEditPersonalDetails)}>
                            <FontAwesomeIcon icon={faSquarePen} size={horizontalScale(24)}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.detailsSubContainer}>
                        <View>
                            <Text style={styles.labelText}>Name</Text>
                            <TextInput
                                value={name}
                                onChangeText={(val) => setName(val)}
                                style={[styles.detailsText, isEditPersonalDetails && styles.editableTextInput]}
                                editable={isEditPersonalDetails}
                                autoFocus={true}
                            />
                        </View>

                        <View style={styles.secondRowContainer}>
                            <View>
                                <Text style={styles.labelText}>Gender</Text>

                                <View style={styles.modalContainer}>
                                    <Dropdown
                                        disable={!isEditPersonalDetails}
                                        style={[styles.modal, isFocus && { borderColor: '#333333' }]}
                                        containerStyle={styles.dropdownItemListContainer}
                                        itemTextStyle={{color: COLORS.slateShadow}}
                                        activeColor={COLORS.coffeeWhite}
                                        placeholderStyle={styles.modalText}
                                        selectedTextStyle={styles.modalText}
                                        fontFamily={getFontFamily('Inter', '500')}
                                        data={genderList}
                                        labelField="label"
                                        valueField="value"
                                        placeholder={!isFocus ? 'Select Gender' : '...'}
                                        value={gender}
                                        onFocus={() => setIsFocus(true)}
                                        onBlur={() => setIsFocus(false)}
                                        onChange={item => {
                                            setGender(item.value);
                                            setIsFocus(false);
                                        }}
                                    />
                                </View>
                            </View>

                            <View style={styles.dobContainer}>
                                <Text style={styles.labelText}>Date of Birth</Text>

                                <View style={[styles.modalContainer, styles.modal, styles.dateContainer]}>
                                    <Pressable onPress={() => (
                                        setShowDatePicker(isEditPersonalDetails)
                                    )}>
                                        <Text style={[styles.modalText, styles.dobContainerText]}>{dob}</Text>
                                    </Pressable>  
                                </View>
                                    
                                {showDatePicker && (
                                    <DatePicker
                                        modal
                                        mode='date'
                                        open={showDatePicker}
                                        date={selectedDate}
                                        androidVariant='nativeAndroid'
                                        theme='light'
                                        title={'Select Date'}
                                        onConfirm={(date) => {
                                            setSelectedDate(date)
                                            setDob(date.toISOString().split('T')[0])
                                            setShowDatePicker(false)
                                        }}
                                        onCancel={() => {
                                            setShowDatePicker(false)
                                        }}
                                    />
                                )}
                            </View>
                        </View>

                        <View style={styles.secondRowContainer}>
                            <View>
                                <Text style={styles.labelText}>Phone Number</Text>
                                <TextInput
                                    value={phone}
                                    onChangeText={(val) => setPhone(val)}
                                    style={[styles.detailsText, isEditPersonalDetails && styles.editableTextInput]}
                                    editable={isEditPersonalDetails}
                                    keyboardType={'phone-pad'}
                                />
                            </View>

                            <View>
                                <Text style={styles.labelText}>Parent Phone Number</Text>
                                <TextInput
                                    value={parentPhone}
                                    onChangeText={(val) => setParentPhone(val)}
                                    style={[styles.detailsText, isEditPersonalDetails && styles.editableTextInput]}
                                    editable={isEditPersonalDetails}
                                    keyboardType={'phone-pad'}
                                />
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.detailsContainer}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={styles.containerHeading}>Academic Details</Text>

                        <TouchableOpacity onPress={() => setIsEditAcademicDetails(!isEditAcademicDetails)}>
                            <FontAwesomeIcon icon={faSquarePen} size={horizontalScale(24)}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.detailsSubContainer}>
                        <View>
                            <Text style={styles.labelText}>Registration No.</Text>
                            <TextInput
                                value={roll}
                                onChangeText={(val) => setRoll(val)}
                                style={[styles.detailsText, isEditAcademicDetails && styles.editableTextInput]}
                                editable={isEditAcademicDetails}
                                focusable={isEditAcademicDetails}
                            />
                        </View>

                        <View style={styles.singleDetailsContainer}>
                            <Text style={styles.labelText}>Email</Text>
                            <TextInput
                                value={email}
                                onChangeText={(val) => setEmail(val)}
                                style={[styles.detailsText, isEditAcademicDetails && styles.editableTextInput]}
                                editable={isEditAcademicDetails}
                                focusable={isEditAcademicDetails}
                            />
                        </View>

                        <View style={styles.singleDetailsContainer}>
                            <Text style={styles.labelText}>Course</Text>
                            <TextInput
                                value={course}
                                onChangeText={(val) => setCourse(val)}
                                style={[styles.detailsText, isEditAcademicDetails && styles.editableTextInput]}
                                editable={isEditAcademicDetails}
                                focusable={isEditAcademicDetails}
                            />
                        </View>

                        <View style={styles.singleDetailsContainer}>
                            <Text style={styles.labelText}>Department</Text>
                            <TextInput
                                value={department}
                                onChangeText={(val) => setDepartment(val)}
                                style={[styles.detailsText, isEditAcademicDetails && styles.editableTextInput]}
                                editable={isEditAcademicDetails}
                                focusable={isEditAcademicDetails}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.bottomConatiner}>
                    <TouchableOpacity disabled={isLoading} style={[styles.singleBottomContainer, {backgroundColor: COLORS.darkLove}]} onPress={() => confirmDioalog('delete')}>
                        <Text style={styles.bottomText}>DELETE</Text>
                    </TouchableOpacity>

                    <TouchableOpacity disabled={isLoading} style={[styles.singleBottomContainer, {backgroundColor: COLORS.darkSkyLine}]} onPress={() => validation('update')}>
                        <Text style={styles.bottomText}>UPDATE</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ViewSingleStudentDetails