import {ChakraProvider} from "@chakra-ui/react";
import Profile from "./components/Profile";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";

function App() {

    return (
        <ChakraProvider>
            <Profile/>
            <Skills/>
            <Projects/>
            <Education />
            <Contact />
        </ChakraProvider>
    );
}

export default App;