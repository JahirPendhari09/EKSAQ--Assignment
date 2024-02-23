import React, { useState, useEffect } from "react";
import { SpeakToText } from "./SpeakToText";
import { useDispatch } from "react-redux";
import { postSpeech } from "../redux/action";
import '../App.css';
const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

const AudioToText = () => {

    const [isListening, setIsListening] = useState(false);
    const [value, setValue] = useState("");
    const [render, setRender] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        handleListen();
    }, [isListening]);

    const handleListen = () => {
        if (isListening) {
            mic.start();
        } else {
            mic.stop();
        }

        mic.onresult = (event) => {
            const transcript = Array.from(event.results)
                .map((result) => result[0])
                .map((result) => result.transcript)
                .join("");
            setValue(transcript);
        };
    };

    const handleSend = () => {
        if(value == "") return
        
        const newSpeech = {
            speech: value,
            date: new Date()
        }
        dispatch(postSpeech(newSpeech))
        setRender(!render);
        setValue("");
    };

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div className="audioContainer">
            <div className="allBTNS">
                {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
                <button onClick={() => setIsListening(true)} disabled={isListening} className="recordBtn">
                    Record
                </button>
                <button
                    className="stopBtn"
                    onClick={(e) => setIsListening(false)}
                    disabled={!isListening} >
                    Stop
                </button>
                {value && <SpeakToText speech={value} />}
                <button onClick={handleSend} className="addAudioBtn">
                   Add Audio 
                </button>
            </div>
            <div>
                <textarea 
                    value={value}
                    onChange={handleChange}
                    placeholder="Write your answers here..."
                ></textarea>
            </div>
        </div>
    );
};

export { AudioToText };
