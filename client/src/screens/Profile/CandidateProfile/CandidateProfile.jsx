import React, { useContext, useEffect, useState } from "react";

import { ActivityIndicator, Alert, Image, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Pdf from "react-native-pdf";

// importing styles
import globalStyles from "../../../assets/styles/globalStyles";
import styles from "./styles";

// importing api
import { getAllOwnPostsAPI } from "../../../api/posts/getAllOwnPostsAPI";
import getSingleCandidateApplicationAPI from "../../../api/candidate/getSingleCandidateApplication";
import deleteCandidateAPI from "../../../api/candidate/deleteCandidateAPI";

// importing user context api
import { AuthContext } from "../../../context/authContext";

// importing components
import CampaignCard from "../../../components/CampaignCard/CampaignCard";
import FooterMenu from "../../../components/Menus/FooterMenu";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { imageUri } from "../../../constants/theme";

const CandidateProfile = (props) => {
    // global states
    const [userState] = useContext(AuthContext);
    
    // local states
    const [ownPosts, setOwnPosts] = useState([]);
    const [candidate, setCandidate] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    // console.log('candidate profile: ', candidate);
    // console.log('all own posts: ', ownPosts);

    const navigation = useNavigation();

    const candidateId = props.route.params.candidateId;

    // get candidate posts
    useFocusEffect(
        React.useCallback(() => {
            async function fetchAllOwnPosts(){
                const {posts} = await getAllOwnPostsAPI(userState.token, candidateId);
                setOwnPosts(posts);
            }

            fetchAllOwnPosts();
        }, [])
    );

    // get candidate profile details
    useFocusEffect(
        React.useCallback(() => {
            async function candidateProfileDetails(){
                const response = await getSingleCandidateApplicationAPI(userState.token, candidateId);

                if(response.status)
                    setCandidate(response.data?.candidate);
                else
                    console.log('Error In Getting Candidate Profile Details');
            }

            candidateProfileDetails();
        }, [])
    );

    const deleteCandidate = async() => {
        setIsLoading(true);
        
        try {
            const token = JSON.parse(await AsyncStorage.getItem('@auth-token'))
            const response = await deleteCandidateAPI(token, candidate._id)
            console.log('response: ', response);

            if(!response.success){
                console.log('Error in deleting the candidate: ', response.error);
                Alert.alert('Error', response.error)
                return
            }

            Alert.alert('Alert', response.message)
            navigation.goBack()
        } catch (error) {
            console.log('Error in deleting candidate: ', error);
            Alert.alert('Error', error)
        } finally {
            setIsLoading(false)
        }
    }

    const confirmDioalog = () => {
        Alert.alert(
            'Delete Candidate', 
            'Are you sure, you want to delete the candidate?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Yes',
                    onPress: () => deleteCandidate()
                }
            ],
            {
                cancelable: false
            }
        );
    }

    return (
        <View style={[globalStyles.whiteBackground, globalStyles.flex, globalStyles.paddingHorizontal]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.topContainer}>
                    <View style={{alignItems: 'center'}}>
                        <View style={styles.profileImageContainer}>
                            {candidate?.imageUrl ? (
                                <Image
                                    source={{uri: `${candidate.imageUrl}`}}
                                    style={styles.profileImage}
                                    resizeMode='cover'
                                />
                                
                            ) : (
                                <View style={[styles.imageContainer, styles.profileImage]}>
                                    <Image
                                        source={require('../../../assets/images/no-pictures.png')}
                                        style={styles.noImage}
                                        resizeMode={'contain'}
                                    />
                                    <Text style={styles.noImageText}>No Profile</Text>
                                    <Text style={styles.noImageText}>Image</Text>
                                </View>
                            )}
                        </View>
                    </View>

                    <View style={styles.primaryDetailsContainer}>
                        <Text style={styles.candidateNameText}>{candidate.student?.name}</Text>
                        <Text style={styles.sloganText}>
                            {candidate.slogan ? candidate.slogan : 'Vote for Unity: Together, We Can Achieve Greater Success'}
                        </Text>
                    </View>

                    <View style={styles.secondaryDetailsContainer}>
                        <Text style={styles.conatainerHeadingText}>About Me</Text>

                        <View style={styles.singleDetailsContainer}>
                            <Text style={styles.detailsLabelText}>Course</Text>
                            <Text style={styles.detailsText}>{candidate.student?.course}</Text>
                        </View>

                        <View style={styles.singleDetailsContainer}>
                            <Text style={styles.detailsLabelText}>Email</Text>
                            <Text style={styles.detailsText}>{candidate.student?.email}</Text>
                        </View>

                        <View style={styles.singleDetailsContainer}>
                            <Text style={styles.detailsLabelText}>Department</Text>
                            <Text style={styles.detailsText}>{candidate.student?.department}</Text>
                        </View>

                        <View style={styles.singleDetailsContainer}>
                            <Text style={styles.detailsLabelText}>Registration No.</Text>
                            <Text style={styles.detailsText}>{candidate.student?.roll}</Text>
                        </View>

                    </View>

                    {/* <View style={styles.socialLinksContainer}>
                        <Text style={styles.conatainerHeadingText}>Connect With Me</Text>

                        <View style={styles.logoContainer}>
                            <Pressable onPress={() => {console.log('linkedin')}}>
                                <Image
                                    source={require('../../../assets/images/linkedin.png')}
                                    style={styles.socialLogo}
                                    resizeMode='cover'
                                />
                            </Pressable>

                            <Pressable onPress={() => {console.log('instagram')}}>
                                <Image
                                    source={require('../../../assets/images/instagram.png')}
                                    style={styles.socialLogo}
                                    resizeMode='cover'
                                />
                            </Pressable>

                            <Pressable onPress={() => {console.log('facebook')}}>
                                <Image
                                    source={require('../../../assets/images/facebook.png')}
                                    style={styles.socialLogo}
                                    resizeMode='cover'
                                />
                            </Pressable>

                            <Pressable onPress={() => {console.log('youtube')}}>
                                <Image
                                    source={require('../../../assets/images/youtube.png')}
                                    style={styles.socialLogo}
                                    resizeMode='cover'
                                />
                            </Pressable>
                        </View>
                    </View> */}

                    {userState.user.role === 'Admin' && (
                        <View style={styles.documentsContainer}>
                            <Text style={styles.conatainerHeadingText}>Document Details:</Text>

                            <View style={styles.pdfContainer}>
                                <Text style={styles.labelText}>Aadhar Card</Text>
                                {candidate?.aadharCardUrl && (
                                    <Pdf
                                        trustAllCerts={false}
                                        source={{uri: `${candidate.aadharCardUrl}`}}
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
                                )}
                            </View>

                            <View style={styles.pdfContainer}>
                                <Text style={styles.labelText}>Marksheet</Text>
                                {candidate?.marksheetUrl && (
                                    <Pdf
                                        trustAllCerts={false}
                                        source={{uri: `${candidate?.marksheetUrl}`}}
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
                                )}
                            </View>

                            <View style={styles.pdfContainer}>
                                <Text style={styles.labelText}>College Id Card</Text>
                                {candidate?.collegeIdCardUrl && (
                                    <Pdf
                                        trustAllCerts={false}
                                        source={{uri: `${candidate.collegeIdCardUrl}`}}
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
                                )}
                            </View>

                            {/* app crashing */}
                            {/* <View style={styles.pdfContainer}>
                                <Text style={styles.labelText}>Hostel Id Card</Text>
                                {candidate?.hostelIdCardUrl && (
                                    <Pdf
                                        trustAllCerts={false}
                                        source={{uri: `${candidate.hostelIdCardUrl}`}}
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
                                )}
                            </View> */}
                        </View>
                    )}

                    <View style={styles.campaignListsContainer}>
                        <Text style={styles.conatainerHeadingText}>Campaigns</Text>

                        {ownPosts.length > 0 && (
                            <View style={styles.campaignContainer}>
                                {ownPosts.map((post) => {
                                    return(
                                        <View key={post._id}>
                                            <CampaignCard post={post}/>
                                        </View>
                                    )
                                })}
                            </View>
                        )}
                    </View>
                </View>

                {userState.user.role === 'Admin' && (
                    <View style={styles.bottomConatiner}>
                        <TouchableOpacity style={styles.singleBottomContainer} onPress={() => confirmDioalog()}>
                            <Text style={styles.bottomText}>Delete Candidate</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>

            {userState.user.role !== 'Admin' && (
                <View>
                    <FooterMenu/>
                </View>
            )}
        </View>
    )
}

export default CandidateProfile;