import React, { useContext, useEffect, useState } from "react";

import { Image, Pressable, ScrollView, Text, View } from "react-native";

// importing styles
import globalStyles from "../../../assets/styles/globalStyles";
import styles from "./styles";

// importing api
import { getAllOwnPostsAPI } from "../../../api/posts/getAllOwnPostsAPI";

// importing user context api
import { AuthContext } from "../../../context/authContext";

// importing components
import InitialAvatar from "../../../components/InitialAvatar/InitialAvatar";
import CampaignCard from "../../../components/CampaignCard/CampaignCard";
import FooterMenu from "../../../components/Menus/FooterMenu";

const CandidateProfile = () => {
    // global states
    const [userState] = useContext(AuthContext);
    
    // local states
    const [ownPosts, setOwnPosts] = useState([]);
    // console.log('all own posts: ', ownPosts);

    useEffect(() => {
        async function fetchAllOwnPosts(){
            const {posts} = await getAllOwnPostsAPI(userState.token);
            setOwnPosts(posts);
        }
        fetchAllOwnPosts();
    }, [ownPosts])

    return (
        <View style={[globalStyles.whiteBackground, globalStyles.flex, globalStyles.paddingHorizontal]}>
            <ScrollView>
                <View style={styles.topContainer}>
                    <View style={{alignItems: 'center'}}>
                        <View style={styles.profileImageContainer}>
                            {userState.user.profileImage ? (
                                <Image
                                    source={{uri: `http://192.168.156.96:3001/api/uploads/profile/${userState.user.profileImage}`}}
                                    style={styles.profileImage}
                                    resizeMode='cover'
                                /> ) : (
                                    <InitialAvatar
                                        name={userState.user.name}
                                        avatarSize={40} 
                                        textSize={16}
                                        padding={5}
                                    />
                                )
                            }
                        </View>
                    </View>

                    <View style={styles.primaryDetailsContainer}>
                        <Text style={styles.candidateNameText}>{userState.user.name}</Text>
                        <Text style={styles.sloganText}>
                            {userState.user.slogan ? userState.user.slogan : 'Vote for Unity: Together, We Can Achieve Greater Success'}
                        </Text>
                    </View>

                    <View style={styles.secondaryDetailsContainer}>
                        <Text style={styles.conatainerHeadingText}>About Me</Text>

                        <View style={styles.singleDetailsContainer}>
                            <Text style={styles.detailsLabelText}>Course</Text>
                            <Text style={styles.detailsText}>{userState.user.course}</Text>
                        </View>

                        <View style={styles.singleDetailsContainer}>
                            <Text style={styles.detailsLabelText}>Email</Text>
                            <Text style={styles.detailsText}>{userState.user.email}</Text>
                        </View>

                        <View style={styles.singleDetailsContainer}>
                            <Text style={styles.detailsLabelText}>Department</Text>
                            <Text style={styles.detailsText}>{userState.user.department}</Text>
                        </View>

                        <View style={styles.singleDetailsContainer}>
                            <Text style={styles.detailsLabelText}>Registration No.</Text>
                            <Text style={styles.detailsText}>{userState.user.roll}</Text>
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