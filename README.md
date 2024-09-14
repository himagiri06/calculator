# Simple Calculator

### Functionality:

- `C` Clears data
- `-/+` Change sign of the current (last) operand
- `%` Calculate percentage of the last operand and store the percentage value in the same variable
- `/, *, +, -` Terminate the first number, store the operator, start receiving next number.

  If it is the second operator, complete the first operation and store the value in the first number, start receiving the next number.

- `=` If there are two operands and a operator, complete the operation, Clear the operands (initialize with 0) and operators; else do nothing

- `number` If a number is clicked, append it to the parsed float value of the last operand

- `.` Technically Works same as number. Add decimal point to the end of the number if does not exist already

### Live Demo

[Link](https://himagiri06.github.io/calculator/)
