//simple addtion test to see if jest is responding

//fake test - is truth = truth?
test('Fake Test -> JEST working?', () => {
    expect(true).toBeTruthy();
})

const add = (a,b) => a+b;
test('should add two numbers 3,4', () => {
    const result = add(3,4);
    expect(result).toBe(7);
});

//mock functions to set up later use -> automation
//will run during live 
// const hold = jest.fn(() => 7);
