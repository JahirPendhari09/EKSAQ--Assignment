import { useSpeechSynthesis } from "react-speech-kit";
import { useEffect, useState, } from "react";
import '../App.css';

export const SpeakToText = ({ speech }) => {
  const { speak } = useSpeechSynthesis();
  const [ clickToSpeak , setClickToSpeak]= useState(false);
  
  useEffect(() => {
    speak({
      text: speech,
    });
  }, [clickToSpeak]);

  return (
    <button onClick={()=> setClickToSpeak(!clickToSpeak)} className="btn">
        Play
    </button>
  );
};
