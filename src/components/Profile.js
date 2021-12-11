import {useEffect, useState} from "react";
import axios from "axios";
import {Box, Flex, Text} from "@chakra-ui/react";
import marked from "marked";

const Profile = () => {
    const [userInfo, setUserInfo] = useState([])
    const [didWeGetInfo, setDidWeGetInfo] = useState(false)

    useEffect(() => {
        async function fetchData() {
            try {
                await axios.get(`${process.env.REACT_APP_API_HOST}/user-info`).then(response => {
                    setUserInfo(response.data)
                    setDidWeGetInfo(true)
                })
            } catch (error) {
                console.log(error)
            }
        }

        fetchData();
    }, [])

    return (
        <>
            <Flex flexDirection={{base: 'column', md: 'row'}} alignItems={{md: 'center'}} h={{base: '100vh'}}
                  justifyContent={{md: 'center'}} py={{base: '8rem'}} bgColor='gray.50' fontFamily="Raleway">
                {/*<Image src={'http://localhost:1337' + userInfo.photo[0].url} w='20rem' h='20rem' p='1rem' borderRadius='50%'
                       mx={{base: 'auto', md: '1rem'}}/>*/}
                <Box p='1rem' maxW='800px'>
                    {/*conditional rendering*/}
                    {didWeGetInfo ?
                        <><Text fontSize={{base: '3rem', md: '4rem'}} fontWeight='600'>Hello, I'm <span
                                style={{color: '#e31b6d'}}>{userInfo.username}.</span></Text>
                            <Text fontSize={{base: '1rem', md: '2rem'}} mb='1rem'>A {userInfo.jobtitle}.</Text>
                            {userInfo.description && <Box textAlign='justify'
                                                          dangerouslySetInnerHTML={{__html: marked(userInfo.description)}}/>}</>
                        :
                        <Text fontSize='2rem' color='#e31b6d' fontWeight='600'>Please fill the user-info column.</Text>}
                </Box>
            </Flex>
        </>
    )
}

export default Profile;