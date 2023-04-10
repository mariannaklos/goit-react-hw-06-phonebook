import { useDispatch, useSelector } from 'react-redux';
import { filterContacts } from 'redux/Slice';

export const FindFilt = () => {
  const dispatch = useDispatch();
  const inputValue = useSelector(state => state.filter);
  return (
    <div className='filtr'>
      <span>Find contacts by name</span>
      <input
        type="text"
        value={inputValue}
        onChange={e => dispatch(filterContacts(e.target.value))}
      />
    </div>
  );
};
