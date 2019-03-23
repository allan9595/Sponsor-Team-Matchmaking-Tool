const add = (a,b) => a+b;

test('should add two numbers', () =>{
    const result = add(3,4);

    if (result !== 7) {
        throw new Error("Basic Add did not pass -> result != 7");
    }
});