import React, { useEffect } from 'react'
import { AudioToText } from './AudioToText'
import { useDispatch, useSelector } from 'react-redux'
import { SpeakToText } from './SpeakToText'
import { getSpeeches } from '../redux/action'
import '../App.css';

const MainAudio = () => {
  const dispatch = useDispatch();
  const { speeches } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getSpeeches())
  }, [])
  
  return (
    <div className='mainBox'>
      <h1>Audio Recording App</h1>
      <AudioToText />
      <div className='speechBox'>
        {
          speeches?.length > 0 && speeches?.map((item) => {
            return <div className='singleSpeech' key={item._id}>
                  <p>"{item.speech}"</p>
                  <SpeakToText  {...item} />
            </div>
          })
        }
      </div>
      {
        speeches?.length == 0 && <h5>No Audio's Available</h5>
      }
    </div>
  )
}

export default MainAudio
