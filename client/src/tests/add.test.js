const add = (a,b) => a+b;

test('should add two numbers 3,4', () =>{
    const result = add(3,4);
    expect(result).toBe(7);
});