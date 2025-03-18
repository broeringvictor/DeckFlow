import "./App.css";
import {useState} from "react";
import Btn from "../../components/Btn.tsx";
import Alert from "../../components/Alert.tsx";


function App() {
    const [isAlertActive, setIsAlertActive] = useState(false);



    const toggleAlert = () => {
        setIsAlertActive(!isAlertActive);
    };

    return (
        <>
            <Btn onClick={toggleAlert} />
            {isAlertActive && <Alert>É um alerta</Alert>}


        </>
    );
}

export default App;
