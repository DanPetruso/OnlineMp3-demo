
import { useDispatch } from "react-redux"
import { AppDispatch, useAppSelector } from "../redux/store";
import { setQueue } from "../redux/player-slice"

export const Queue = () => {

    const queue = useAppSelector((state) => state.playerReducer.value.queue)
    const dispatch = useDispatch<AppDispatch>();

    async function clear(){
        dispatch(setQueue([]))
    }

    const jsxRows = [<div><button className="button" onClick={clear}>Clear Queue</button></div>]

    queue.forEach((song : string) => song.length < 25 ? jsxRows.push(<div>{song}</div>) : jsxRows.push(<div>{song.substring(0,25)}</div>))
    
  return (
    <>
    <div id="clear">{jsxRows}</div>
    </>
    
  )
}
