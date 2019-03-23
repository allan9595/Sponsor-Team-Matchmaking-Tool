import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

const add = (a,b) => a+b;

test('should add two numbers', () =>{
    const result = add(3,4);

    if (result !== 7) {
        throw new Error("Basic Add did not pass -> result != 7");
    }
});