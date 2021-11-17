import {useEffect, useState} from "react";
import axios from "axios";
import {Box, Flex, Text} from "@chakra-ui/react";
import marked from "marked";

const Projects = () => {
    const [projects, setProjects] = useState([])
    const [didWeGetInfo, setDidWeGetInfo] = useState(false)

    useEffect(() => {
        async function fetchData() {
            try {
                await axios.get(`${process.env.REACT_APP_API_HOST}/projects`).then(response => {
                    setProjects(response.data)
                    setDidWeGetInfo(true)
                })
            } catch (error) {
                console.log(error)
            }
        }

        fetchData();
    }, [])

    const AllProjects = () => {
        return (
            <>
                {projects.map((item) => {
                    return (
                        <Box key={item.id} maxW={{base: '100%', lg: '49%'}} p='0.75rem' mt='1rem' bgColor='white'
                             boxShadow='rgba(149, 157, 165, 0.2) 0px 8px 24px' borderRadius='0.5rem'>
                            <Text textAlign='center' color='blue.400' fontSize='1.25rem' fontWeight='700'>
                                    {item.name}
                            </Text>
                            <Box textAlign='justify' p='1rem'
                                 dangerouslySetInnerHTML={{__html: marked(item.description)}}/>
                        </Box>
                    )
                })}
            </>
        )
    }

    return (
        <>{didWeGetInfo && projects.length > 0 &&
                <Box bgColor='gray.50'>
                    <Box p='1rem' maxW='800px' mx='auto' fontFamily="Raleway"
                         py={{base: '2rem', md: '3rem', lg: '5rem'}}>
                        <Text color='#e31b6d' fontSize={{base: '3rem', md: '4rem'}} fontWeight='600'>Projects</Text>
                        <Flex flexWrap='wrap' px='auto' justifyContent='space-around'>
                            <AllProjects/>
                        </Flex>
                    </Box>
                </Box>
            }
        </>
    )
}

export default Projects;