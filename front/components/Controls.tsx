"use client"

import { useAppSelector } from "../redux/store";
import { useDispatch } from "react-redux"
import { AppDispatch } from "../redux/store";
import { pauseSong, playSong, setPos, setQueue, setDuration, setSong, setProg } from "../redux/player-slice"
import { Slider } from "@mui/material";
import { useEffect, useState } from "react";
import { Queue } from "./Queue";
import Axios from "axios"
import { Filter } from "./Filter";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const audio = new Audio("")
audio.src=(".mp3")

export const Controls = () => {

    const [songList, setSongs] = useState([]);
    const [shuffleSongs, setShuffle] = useState(false);

    useEffect(() => {
        sleep(100)
        dispatch(setDuration(audio.duration))

        Axios.get("http://localHost:3001/getSongs").then((response) =>{
            setSongs(response.data)
        })
        
        const interval = 
        setInterval(() => {
                dispatch(setProg(audio.currentTime))
        }, 250);

        return () => {
            clearInterval(interval)
        }
    }, []);

        
    const song = useAppSelector((state) => state.playerReducer.value)
    const dispatch = useDispatch<AppDispatch>();
    audio.addEventListener('ended', function () { nextSong()})

    async function playAudio() {
        audio.currentTime = song.progress
        audio.play()
        dispatch(playSong())
    }

    function pauseAudio() {
        audio.pause()
        dispatch(pauseSong())
    }

    async function nextSong() {
        
        audio.pause();
        dispatch(pauseSong())

        if (shuffleSongs) {
            const next = Math.floor(Math.random() * (filtered.length));

            dispatch(setPos(next))
            dispatch(setSong(filtered[next]))
            audio.src=(filtered[next] + ".mp3")
        } 

        else if(song.queue.length == 0) {
            const next = (song.position+1)%filtered.length
            dispatch(setPos(next))
            
            dispatch(setSong(filtered[next]))
            
            audio.src=(filtered[next] + ".mp3")
        } else {
            const name = song.queue[0]
            dispatch(setSong(name))
            audio.src=(name + '.mp3')
            dispatch(setQueue(song.queue.slice(1)))
        }
        await sleep(100)
        dispatch(setDuration(audio.duration))
        
        audio.play();
        dispatch(playSong())
       
    }

    async function prevSong() {
        audio.pause();
        dispatch(pauseSong())

        if(song.progress < 5){
        const prev = song.position > 0 ? song.position-1 : filtered.length-1
        dispatch(setPos(prev))
        
        dispatch(setSong(filtered[prev]))

        audio.src=(filtered[prev] + ".mp3")
        await sleep(100)
        dispatch(setDuration(audio.duration))
        
        } else {
            audio.currentTime = 0
        }

        audio.play();
        dispatch(playSong())
        
    }
    

    async function seekForward(){
        const newPosition = audio.currentTime + 15;
        if(song.duration > newPosition){
            audio.pause()
            audio.currentTime = audio.currentTime + 15
            audio.play()
        } else {
            nextSong()
        }
        
    }

    async function seekBack(){
        const newPosition = audio.currentTime - 15;
        if(newPosition < 0){
            audio.pause()
            audio.currentTime = 0;
            audio.play()
        } 
        else {
            audio.pause()
            audio.currentTime = audio.currentTime - 15;
            audio.play()
        }
        
    }


    async function startSong(songName: string, i: number) {
        audio.src=songName + ".mp3"
        await sleep(100)
        dispatch(setSong(songName))
        dispatch(setPos(i))
        dispatch(setDuration(audio.duration))
        dispatch(setProg(0))
        audio.currentTime = 0
        audio.play()
        dispatch(playSong())
    }

    async function addToQueue(songName: string) {
        dispatch(setQueue([...song.queue, songName]))
    }


    async function shuffle() {
        setShuffle(!shuffleSongs)
    }




    const rows : string[] = []

    songList.forEach((song) => {
        var s : string | undefined = JSON.stringify(song)

        if(typeof s === "string"){
            s=s.slice(1, s.length-5)
            //console.log(s)
            rows.push(s)
        }
        else {
            console.log("getting data")
        }
    })
    
    const jsxRows = []
    const filtered: string[] = []

    for (let i = 0; i < rows.length; i++) {
        if(rows[i].toUpperCase().includes(song.filter.toUpperCase())){

            filtered.push(rows[i])

            jsxRows.push(
            <table id="song">
            <tbody>
                <tr>
                    <td><button className="button" onClick={() => {startSong(rows[i], i)}}>
                    <img width={20} src='https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-play-512.png'/>
                        </button></td>
                    
                    <td><button className="button" onClick={() => {addToQueue(rows[i])}}>
                    <img width={20} src='https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_add-512.png'/>
                    </button></td>
                    
                    <td id='songs'> {rows[i]} </td>
                </tr>
            </tbody>
            </table>
            )}
        }
        


    return (

        <>
        
        
        <div className="footer" id="timer">
        {formatTime(song.progress)} <Slider id="bar" value={song.progress/song.duration*100}/> 
        {String(song.duration) === "NaN"? "00:00" : formatTime(song.duration)}
        </div>

        <table className="footer" id="buttons">
          <tbody>
            <tr>

                <td id="prev"> <button onClick={prevSong} className="button"><img width={30} src='https://cdn1.iconfinder.com/data/icons/ionicons-fill-vol-2/512/play-back-512.png'/></button> </td>
                <td id="seekBack"> <button onClick={seekBack} className="button">-15</button> </td>

                <td id="pausePlay"> <button className="button" onClick={song.playing ? pauseAudio : playAudio}> 
                    <img width={50} src={song.playing ? 'https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-pause-512.png' : 
                        'https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-play-512.png'}/> </button> </td>

                <td id="seekForward"> <button className="button" onClick={seekForward}>+15</button> </td>
                <td id="next"> <button className="button" onClick={nextSong}><img width={30} src='https://cdn1.iconfinder.com/data/icons/ionicons-fill-vol-2/512/play-forward-512.png'/></button> </td>
            </tr>
          </tbody>
        </table>

        <div id="songName">{song.song}</div>

        <Filter/>
        <button id="side" className="button" onClick={shuffle}>{!shuffleSongs? 'Shuffle Next' : "Unshuffle"}</button>
        <Queue />
        
        <div>{jsxRows}</div>
        
        </>
    )
}

function formatTime(t: number){
    const minutes = Math.floor(t / 60);
    const seconds = Math.floor(t - minutes * 60);

    if(seconds < 10){
        return minutes + ":0" + seconds
    }

    return minutes + ":" + seconds
}