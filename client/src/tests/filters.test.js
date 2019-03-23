import moment from 'moment'; //import moment
import {setTextFilter} from '../actions/filterAction'

test('Generate text filter', () =>{
const action = setTextFilter(moment(0));
    expect(action).toEqual({
        setTextFilter: moment(0)
    });
});