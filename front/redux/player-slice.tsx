import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
    value: PlayerState;
}

type PlayerState = {
    song: string,
    queue: string[],
    filter: string,
    position: number,
    progress: number,
    duration: number,
    playing: boolean
}

const initialState = {
    value:{
        song: "",
        filter: "",
        queue: [],
        position: 0,
        progress: 0,
        duration: 0,
        playing: false
    } as PlayerState
} as InitialState

export const playerSlice = createSlice({
    name: "player",
    initialState,

    reducers: {
        playSong: (state) => {
            return {
                value: {
                    song: state.value.song,
                    queue: state.value.queue,
                    filter: state.value.filter,
                    position: state.value.position,
                    progress: state.value.progress,
                    duration: state.value.duration,
                    playing: true
                }
            }
        },

        pauseSong: (state) => {
            return {
                value: {
                    song: state.value.song,
                    queue: state.value.queue,
                    filter: state.value.filter,
                    position: state.value.position,
                    progress: state.value.progress,
                    duration: state.value.duration,
                    playing: false
                }
            }
        },


        setPos: (state, action) => {
            return {
                value: {
                    song: state.value.song,
                    queue: state.value.queue,
                    filter: state.value.filter,
                    position: action.payload,
                    progress: state.value.progress,
                    duration: state.value.duration,
                    playing: state.value.playing
                }
            }
        },

        setProg: (state, action) => {
            return {
                value: {
                    song: state.value.song,
                    queue: state.value.queue,
                    filter: state.value.filter,
                    position: state.value.position,
                    progress: action.payload,
                    duration: state.value.duration,
                    playing: state.value.playing
                }
            }
        },

        setDuration: (state, action) => {
            return {
                value: {
                    song: state.value.song,
                    queue: state.value.queue,
                    filter: state.value.filter,
                    position: state.value.position,
                    progress: state.value.progress,
                    duration: action.payload,
                    playing: state.value.playing
                }
            }
        },


        setFilter: (state, action) => {
            return {
                value: {
                    song: state.value.song,
                    queue: state.value.queue,
                    filter: action.payload,
                    position: state.value.position,
                    progress: state.value.progress,
                    duration: state.value.duration,
                    playing: state.value.playing
                }
            }
        },




        setSong: (state, action) => {
            return {
                value: {
                    song: action.payload,
                    queue: state.value.queue,
                    filter: state.value.filter,
                    position: state.value.position,
                    progress: state.value.progress,
                    duration: state.value.duration,
                    playing: state.value.playing
                }
            }
        },

        setQueue: (state, action) => {
            return {
                value: {
                    song: state.value.song,
                    queue: action.payload,
                    filter: state.value.filter,
                    position: state.value.position,
                    progress: state.value.progress,
                    duration: state.value.duration,
                    playing: state.value.playing
                }
            }
        },


    }
})

export const { pauseSong, playSong, setPos, setFilter, setQueue, setProg, setDuration, setSong } = playerSlice.actions;

export default playerSlice.reducer;