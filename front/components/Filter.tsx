import { ChangeEvent } from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { setFilter } from '../redux/player-slice';

export const Filter = () => {
    const dispatch = useDispatch<AppDispatch>();
    
  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    dispatch(setFilter(event.target.value))
  }

  return (
    <input id="filter" onChange={handleChange} />
  )
}
