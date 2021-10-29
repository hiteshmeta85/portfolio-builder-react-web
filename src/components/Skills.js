import {useEffect, useState} from "react";
import axios from "axios";
import {Box, Flex, Text} from "@chakra-ui/react";

const Skills = () => {
    const [skills, setSkills] = useState([])
    const [didWeGetInfo, setDidWeGetInfo] = useState(false)

    useEffect(() => {
        async function fetchData() {
            try {
                await axios.get(`${process.env.REACT_APP_API_HOST}/skills`).then(response => {
                    setSkills(response.data)
                    setDidWeGetInfo(true)
                })
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])

    const AllSkills = () => {
        return (
            <>
                {skills.map((item) => {
                    return (
                        <Box w={{base: '48%', md: 'auto'}} my={{base: '0.25rem', md: '0.4rem'}} key={item.id}>
                            <Text bgColor='red.100' mr='0.5rem' borderRadius='2rem' p='0.75rem' py='0.25rem' textAlign='center'>
                                {item.title}
                            </Text>
                        </Box>
                    )
                })}
            </>
        )
    }

    return (
        <>{(didWeGetInfo && (skills.length > 0)) &&
            <Box p='1rem' maxW='800px' mx='auto' fontFamily="Raleway" py={{base: '3rem', md: '8rem', lg: '10rem'}}>
                <Text fontSize={{base: '3rem', md: '4rem'}} fontWeight='600'>Skills</Text>
                <Flex flexWrap='wrap' px='auto' justifyContent={{base:'space-between',md:'flex-start'}}>
                    <AllSkills/>
                </Flex>
            </Box>
            }
        </>
    )
}

export default Skills;