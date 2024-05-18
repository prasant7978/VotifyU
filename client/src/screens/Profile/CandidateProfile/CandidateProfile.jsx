import React, { useContext, useEffect, useState } from "react";

import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

// importing styles
import globalStyles from "../../../assets/styles/globalStyles";
import styles from "./styles";

// importing api
import { getAllOwnPostsAPI } from "../../../api/posts/getAllOwnPostsAPI";
import getSingleCandidateApplicationAPI from "../../../api/candidate/getSingleCandidateApplication";

// importing user context api
import { AuthContext } from "../../../context/authContext";

// importing components
import InitialAvatar from "../../../components/InitialAvatar/InitialAvatar";
import CampaignCard from "../../../components/CampaignCard/CampaignCard";
import FooterMenu from "../../../components/Menus/FooterMenu";

const CandidateProfile = (props) => {
    // global states
    const [userState] = useContext(AuthContext);
    
    // local states
    const [ownPosts, setOwnPosts] = useState([]);
    const [candidate, setCandidate] = useState({});
    // console.log('all own posts: ', ownPosts);

    const candidateId = props.route.params.candidateId;
    // console.log('candidateId in candidate profile: ', candidateId);

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

    return (
        <View style={[globalStyles.whiteBackground, globalStyles.flex, globalStyles.paddingHorizontal]}>
            <ScrollView>
                <View style={styles.topContainer}>
                    <View style={{alignItems: 'center'}}>
                        <View style={styles.profileImageContainer}>
                            {candidate.student?.profileImage ? (
                                <Image
                                    source={{uri: `http://192.168.93.221:3001/api/uploads/profile/${candidate.student?.profileImage}`}}
                                    style={styles.profileImage}
                                    resizeMode='cover'
                                /> ) : (
                                    <InitialAvatar
                                        name={candidate.student?.name}
                                        avatarSize={40} 
                                        textSize={16}
                                        padding={5}
                                    />
                                )
                            }
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

                    <View style={styles.socialLinksContainer}>
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
                    </View>

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
            </ScrollView>

            <View>
                <FooterMenu/>
            </View>
        </View>
    )
}

export default CandidateProfile;