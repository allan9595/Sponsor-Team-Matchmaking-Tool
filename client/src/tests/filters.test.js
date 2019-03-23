import moment from 'moment'; //import moment
import {setTextFilter} from '../actions/filterAction'

//moment stuck in datetime??
// test('Generate text filter', () =>{
// const action = setTextFilter(moment(0));
//     expect(action).toEqual({
//         setTextFilter: moment(0),
//         type: ''
//     });
// });

//ah testing fails because its not live moment?
test('Generate text filter object with moment text values', () => {
    const action = setTextFilter('Something in');
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: 'Something in'
    });
});

//is the filter being called with default values?
test('should generate set text filter object with default', () => {
    const action = setTextFilter();
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    });
});
