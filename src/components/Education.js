import {useEffect, useState} from "react";
import axios from "axios";
import {Box, Text} from "@chakra-ui/react";
import marked from "marked";

const Education = () => {
    const [formalEducation, setFormalEducation] = useState([])
    const [onlineEducation, setOnlineEducation] = useState([])
    const [didWeGetFormalInfo, setDidWeGetFormalInfo] = useState(false)
    const [didWeGetOnlineInfo, setDidWeGetOnlineInfo] = useState(false)

    useEffect(() => {
        async function fetchData() {
            try {
                await axios.get(`${process.env.REACT_APP_API_HOST}/formal-education`).then(response => {
                    setFormalEducation(response.data)
                    setDidWeGetFormalInfo(true)
                })
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])

    useEffect(() => {
        async function fetchData() {
            try {
                await axios.get(`${process.env.REACT_APP_API_HOST}/online-education-and-courses`).then(response => {
                    setOnlineEducation(response.data)
                    setDidWeGetOnlineInfo(true)
                })
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])

    return (
        <>{(didWeGetFormalInfo || didWeGetOnlineInfo) &&
            <Box p='1rem' maxW='800px' mx='auto' fontFamily="Raleway"
                 py={{base: '2rem', md: '3rem', lg: '5rem'}}>
                <Text fontSize={{base: '3rem', md: '4rem'}} fontWeight='600' mb='1rem'>Education</Text>
                {didWeGetFormalInfo&&<Box bgColor='red.50' p='1rem' mb='1rem' borderRadius='0.5rem'>
                    <Text fontSize={{base: '1rem', md: '2rem'}}>Formal Education</Text>
                    <Box textAlign='justify'
                         dangerouslySetInnerHTML={{__html: marked(formalEducation.description)}}/>
                </Box>}
                {didWeGetOnlineInfo &&
                <Box bgColor='red.50' p='1rem' borderRadius='0.5rem'>
                    <Text fontSize={{base: '1rem', md: '2rem'}}>Online Education & Courses</Text>
                    <Box textAlign='justify'
                         dangerouslySetInnerHTML={{__html: marked(onlineEducation.description)}}/>
                </Box>}
            </Box>
            }
        </>
    )
}

export default Education;