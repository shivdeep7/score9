'use client';
import { MicrophoneIcon } from "@heroicons/react/24/solid"
import { useRef, useState, useEffect, useCallback, useMemo } from "react";

type MediaRecordingStatusTypes = "recording" | "inactive" | "stopped";
type TimerTypes = {time: number, percentage: number}

const AudioRecorder = ({time, className}: {className: String, time: number}) => {

    const percentageDecrement = useMemo(() => (100 / time), [time])
    const [browserPermission, setBrowserPermision] = useState<boolean>(true)
    const mediaRecorderRef = useRef<MediaRecorder>({} as MediaRecorder)
    const timeOutRef = useRef<NodeJS.Timeout | undefined>();
    const [mediaStream, setMediaStream] = useState<MediaStream | undefined>({} as MediaStream);
    const [audioChunks, setAudioChunks] = useState<Blob[] | undefined>()
    const [audio, setAudio] = useState<string | undefined>();
    const [timer, setTimer] = useState<TimerTypes>({time: time, percentage: 100});


    useEffect(() => {
        

        if ( timer.time < 0) {
          mediaRecorderRef.current && mediaRecorderRef.current.state == "recording" && stopRecording()
          
        }

    }, [timer])

    // Stop audio recording
    const stopRecording = async () => {
      

        setTimer({
            time: time, 
            percentage: 100
          })
        clearTimeout(timeOutRef.current);
        mediaRecorderRef.current.stop();
         // On Audio stop
        mediaRecorderRef.current.onstop = async () => {
          const audioWavFile = new Blob(audioChunks, { type: "audio/mp4" });
          const audioUrl = URL.createObjectURL(audioWavFile);
          setAudio(audioUrl)
          setAudioChunks([]); // Clear the audio chunks 
        }

    }

    const countdown = useCallback(() => {
         timeOutRef.current = setInterval(() => {
            setTimer(prevState => {
               return {
                    time: prevState.time -1, 
                    percentage: prevState.percentage - percentageDecrement
                }
            })    
        }, 1000)
    }, [])

    // Start audio recording 
    const startRecording = async () => {
       

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
            audio: true
        });

         
        // Media Recorder 
        mediaRecorderRef.current = new MediaRecorder(stream);

        // Start the media recording
        mediaRecorderRef.current.start()

        mediaRecorderRef.current.onstart = () => {
            countdown();
        }

        // Collect the audio chunks 
        let audioChucksData: Blob[] = [];
        mediaRecorderRef.current.ondataavailable = (e) => {
            if (e.data.size === 0) return;
            audioChucksData.push(e.data)
        }
        setAudioChunks(audioChucksData)

            
        } catch (error) {
            setBrowserPermision(false);
        }
        


       
    }

    const handleRecordingButtonToggle = () => {
        // Get the current status
        const recordingStatus = mediaRecorderRef.current.state;
        if ( recordingStatus !== "recording") {
           return startRecording()
        } 
       return stopRecording() // Otherwise stop the recording

    }



    if ( !browserPermission ) {
        return  (<div className={`flex flex-1 justify-center items-center w-full p-4 bg-red-400 text-white rounded-md shadow-md ${className}`}>
              <div className="flex flex-col justify-center items-center spacey-2">
                  <span>Microphone permission not granted</span>
                  <button className="border border-white p-2 mt-2 rounded-md">Learn More</button>
              </div>
        </div>)
    }

    return (
        <>
        <div className={`flex flex-1 justify-center items-center w-full p-4  bg-gray-200 rounded-md shadow-md ${className}`}>
            <div className={"flex relative flex-col justify-center items-center spacey-2 relaitve"}>
                <span>Click to Record</span>
                <div className="flex relative">
                <p className={`relaitve z-10 flex border-0 rounded-full bg-gray-300 p-3 cursor-pointer hover:bg-red-400 hover:text-white ${mediaRecorderRef.current.state === "recording" && "bg-red-400 text-white "}`} onClick={() => handleRecordingButtonToggle()}>
                    <MicrophoneIcon className="w-6 h-6" />
                </p>
                 {mediaRecorderRef.current.state == "recording" && <p className="animate-ping z-0 absolute h-full w-full rounded-full bg-red-400 opacity-75"></p>}

                </div>
               
            </div>
        </div>

        {
            mediaRecorderRef.current.state == "recording" && <div className="radial-progress" style={{"--value":timer.percentage}} role="progressbar">{timer.time}</div>
        }
            {audio ? (
        <div className="audio-container">
            <audio src={audio} controls></audio>
            <a download href={audio}>
                Download Recording
            </a>
        </div>
        ) : null}
        </>
       
    )
}

export default AudioRecorder;