import {useEffect, useState} from "react";
import axios from "axios";
import {Box, Flex, Text} from "@chakra-ui/react";
import {FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter, MdLocalPhone, SiGmail} from "react-icons/all";

const Contact = () => {
    const [contactDetails, setContactDetails] = useState([])
    const [didWeGetInfo, setDidWeGetInfo] = useState(false)

    useEffect(() => {
        async function fetchData() {
            try {
                await axios.get(`${process.env.REACT_APP_API_HOST}/contact`).then(response => {
                    setContactDetails(response.data)
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
            {didWeGetInfo &&
            <Box bgColor='gray.50'>
                <Box p='1rem' maxW='800px' mx='auto'
                     py={{base: '3rem', md: '5rem'}}>
                    <Text color='#e31b6d' fontSize={{base: '2rem', md: '3rem'}} fontWeight='600' fontFamily="Raleway">Connect
                        with
                        me.</Text>
                    {contactDetails.email && <Flex mb='1rem' alignItems='center'><SiGmail size='2rem'/><Text
                        ml='1rem'>{contactDetails.email}</Text></Flex>}
                    {contactDetails.phone && <Flex mb='1rem' alignItems='center'><MdLocalPhone size='2rem'/><Text
                        ml='1rem'>{contactDetails.phone}</Text></Flex>}
                    <Flex>
                        {contactDetails.twitter &&
                        <Text mr='1rem'><a href={contactDetails.twitter}><FaTwitter size='2rem'/></a></Text>}
                        {contactDetails.linkedIn &&
                        <Text mr='1rem'><a href={contactDetails.linkedIn}><FaLinkedin size='2rem'/></a></Text>}
                        {contactDetails.github &&
                        <Text mr='1rem'><a href={contactDetails.github}><FaGithub size='2rem'/></a></Text>}
                        {contactDetails.instagram &&
                        <Text mr='1rem'><a href={contactDetails.instagram}><FaInstagram size='2rem'/></a></Text>}
                        {contactDetails.facebook &&
                        <Text mr='1rem'><a href={contactDetails.facebook}><FaFacebook size='2rem'/></a></Text>}
                    </Flex>
                </Box>
            </Box>
            }
        </>
    )
}

export default Contact;