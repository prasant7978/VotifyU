import React, { useEffect, useState } from "react";

// styles
import styles from "./style";
import globalStyles from "../../assets/styles/globalStyles";

// components
import { ActivityIndicator, Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Snackbar from "react-native-snackbar";
import Pdf from "react-native-pdf";

// APIs
import getSingleCandidateApplicationAPI from "../../api/candidate/getSingleCandidateApplication";
import updateApplicationStatusAPI from "../../api/candidate/updateApplicationStatusAPI";

// assets
import { verticalScale } from "../../assets/styles/scaling";
import { getFontFamily } from "../../assets/fonts/helper";

import { COLORS } from "../../constants/theme";

import { Routes } from "../../navigation/Routes";

const SingleCandidateApplication = (props) => {
    const candidateId = props.route.params.candidateId;
    // console.log('candidate id: ', candidateId);

    const navigation = useNavigation();

    const [candidate, setCandidate] = useState({});
    const [loading, setLoading] = useState(false);
    
    // console.log('Candidate Application: ', candidate);

    useEffect(() => {
        const fetchCandidateApplication = async() => {
            const token = JSON.parse(await AsyncStorage.getItem('@auth-token'));
            
            try {
                setLoading(true);
                const application = await getSingleCandidateApplicationAPI(token, candidateId);

                if(application.status){
                    setCandidate(application.data.candidate)
                }
                else{
                    console.error("Error fetching candidate application:", application);
                }
            } catch (error) {
                console.error("Error in getting single candidate application API:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchCandidateApplication();
    }, [candidateId]);

    const updateApplicationStatus = async(applicationStaus) => {
        const token = JSON.parse(await AsyncStorage.getItem('@auth-token'));
        const response = await updateApplicationStatusAPI(token, candidate?._id, applicationStaus);

        if(response.status){
            Snackbar.show({
                text: response.data.message,
                duration: Snackbar.LENGTH_SHORT,
                fontFamily: getFontFamily('Inter', '400')
            });

            navigation.pop();
            navigation.navigate(Routes.AllPendingCandidateApplications);
        } else {
            Snackbar.show({
                text: 'There seems to an issue in accepting the candidate application, please try again later.',
                duration: Snackbar.LENGTH_SHORT,
                fontFamily: getFontFamily('Inter', '400')
            });
        }
    }

    const confirmDioalog = (applicationStatus) => {
        if(applicationStatus === 'rejected'){
            Alert.alert(
                'Reject Candidate', 
                'Are you sure, you want to reject the candidate application?',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel'
                  },
                  {
                    text: 'Yes',
                    onPress: () => updateApplicationStatus(applicationStatus)
                  }
                ],
                {
                  cancelable: false
                }
            );
        }
        else{
            Alert.alert(
                'Accept Candidate', 
                'Are you sure, you want to accept the candidate application?',
                [
                  {
                    text: 'Cancel',
                    style: 'cancel'
                  },
                  {
                    text: 'Yes',
                    onPress: () => updateApplicationStatus(applicationStatus)
                  }
                ],
                {
                  cancelable: false
                }
            );
        }
    }

    return (
        <ScrollView style={[globalStyles.flex, globalStyles.paddingHorizontal, globalStyles.whiteBackground]}>
                {loading === false ? (
                    <>
                        <View style={styles.imageContainer}>
                            {candidate.student?.profileImage ? (
                                <Image
                                    source={{uri: `http://192.168.93.221:3001/api/uploads/profile/${candidate.student?.profileImage}`}}
                                    resizeMode='cover'
                                    style={styles.image}
                                />
                            ) : (
                                <View>
                                    <Text style={styles.imageAltText}>Profile Image</Text>
                                    <Text style={styles.imageAltText}>Not</Text>
                                    <Text style={styles.imageAltText}>Available</Text>
                                </View>
                            )}
                        </View>

                        <View style={styles.candidateNameContainer}>
                            <Text style={styles.candidateNameText}>{candidate.student?.name}</Text>
                        </View>

                        <View style={styles.sloganContainer}>
                            <Text style={styles.sloganText}>{candidate?.slogan}</Text>
                        </View>

                        <View style={styles.personalDetailsContainer}>
                            <Text style={[styles.containerHeading, {marginBottom: verticalScale(3)}]}>Personal Details:</Text>

                            <View style={styles.singleDetailContainer}>
                                <Text style={styles.labelText}>Roll</Text>
                                <Text style={styles.personalDetailsText}>{candidate.student?.roll}</Text>
                            </View>

                            <View style={styles.singleDetailContainer}>
                                <Text style={styles.labelText}>Email</Text>
                                <Text style={styles.personalDetailsText}>{candidate.student?.email}</Text>
                            </View>

                            <View style={styles.singleDetailContainer}>
                                <Text style={styles.labelText}>Course</Text>
                                <Text style={styles.personalDetailsText}>{candidate.student?.course ? candidate.student.course : 'N/A'}</Text>
                            </View>

                            <View style={styles.singleDetailContainer}>
                                <Text style={styles.labelText}>Department</Text>
                                <Text style={styles.personalDetailsText}>{candidate.student?.department ? candidate.student.department : 'N/A'}</Text>
                            </View>

                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={styles.singleDetailContainer}>
                                    <Text style={styles.labelText}>Gender</Text>
                                    <Text style={styles.personalDetailsText}>{candidate.student?.gender ? candidate.student.gender : 'N/A'}</Text>
                                </View>

                                <View style={styles.singleDetailContainer}>
                                    <Text style={styles.labelText}>Phone</Text>
                                    <Text style={styles.personalDetailsText}>{candidate.student?.phone ? candidate.student.phone : 'N/A'}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.positionContainer}>
                            <Text style={styles.containerHeading}>Position Applied:</Text>
                            <Text style={styles.positionText}>{candidate.position?.name}</Text>
                        </View>

                        <View style={styles.documentsContainer}>
                            <Text style={styles.containerHeading}>Document Details:</Text>

                            <View style={styles.pdfContainer}>
                                <Text style={styles.labelText}>Aadhar Card</Text>
                                <Pdf
                                    trustAllCerts={false}
                                    source={{uri: `http://192.168.93.221:3001/api/uploads/files/${candidate.aadharCard}`}}
                                    renderActivityIndicator={() => (
                                        <ActivityIndicator color="white" size="large" />
                                    )}
                                    page={1}
                                    scale={1.0}
                                    minScale={1.0}
                                    maxScale={3.0}
                                    onError={(error) => console.log(error)}
                                    style={styles.pdf}
                                />
                            </View>

                            <View style={styles.pdfContainer}>
                                <Text style={styles.labelText}>Marksheet</Text>
                                <Pdf
                                    trustAllCerts={false}
                                    source={{uri: `http://192.168.93.221:3001/api/uploads/files/${candidate.marksheet}`}}
                                    renderActivityIndicator={() => (
                                        <ActivityIndicator color="white" size="large" />
                                    )}
                                    page={1}
                                    scale={1.0}
                                    minScale={1.0}
                                    maxScale={3.0}
                                    onError={(error) => console.log(error)}
                                    style={styles.pdf}
                                />
                            </View>

                            <View style={styles.pdfContainer}>
                                <Text style={styles.labelText}>College Id Card</Text>
                                <Pdf
                                    trustAllCerts={false}
                                    source={{uri: `http://192.168.93.221:3001/api/uploads/files/${candidate.collegeIdCard}`}}
                                    renderActivityIndicator={() => (
                                        <ActivityIndicator color="white" size="large" />
                                    )}
                                    page={1}
                                    scale={1.0}
                                    minScale={1.0}
                                    maxScale={3.0}
                                    onError={(error) => console.log(error)}
                                    style={styles.pdf}
                                />
                            </View>

                            <View style={styles.pdfContainer}>
                                <Text style={styles.labelText}>Hostel Id Card</Text>
                                <Pdf
                                    trustAllCerts={false}
                                    source={{uri: `http://192.168.93.221:3001/api/uploads/files/${candidate.hostelIdCard}`}}
                                    renderActivityIndicator={() => (
                                        <ActivityIndicator color="white" size="large" />
                                    )}
                                    page={1}
                                    scale={1.0}
                                    minScale={1.0}
                                    maxScale={3.0}
                                    onError={(error) => console.log(error)}
                                    style={styles.pdf}
                                />
                            </View>
                        </View>

                        <View style={styles.bottomConatiner}>
                            <TouchableOpacity style={[styles.singleBottomContainer, {backgroundColor: COLORS.darkLove}]} onPress={() => confirmDioalog('rejected')}>
                                <Text style={styles.bottomText}>REJECT</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.singleBottomContainer, {backgroundColor: COLORS.darkMojito}]} onPress={() => confirmDioalog('accepted')}>
                                <Text style={styles.bottomText}>ACCEPT</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                ) : (
                    <View style={{justifyContent: 'center', alignItems: 'center', alignSelf: 'center'}}>
                        <ActivityIndicator size={'large'} color={COLORS.primary}/>
                    </View>
                )}
        </ScrollView>
    )
}

export default SingleCandidateApplication;