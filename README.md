# Introduction
CheckLogRun is a JavaScript library designed to manage the execution flow of functions with flexible callback capabilities. It allows users to define a primary function and optionally integrate callbacks that run before, after, or modify the return value of the main function.

# Table of Contents
- [Installation](#installation)- [Usage](#usage)
  - [Basic Structure](#basicstructure)
  - [Methods](#method)
  - [Examples](#examples)
- [Contributing](#ontributing)

## Installation
To use CheckLogRun, simply clone this repository or include the files in your project. It is structured as a modular library, and you can import only the parts you need.

```bash
git clone https://github.com/your-repo/checklogrun.git
```

If using via npm:
```bash
npm install checklogrun
```

## Usage
### Basic Structure
The main concept behind CheckLogRun is that you initialize it with a primary function using the `.main()` method. After that, you can attach additional callbacks (before, after, or on return) that will modify the behavior.

The library exposes several key methods:

1. main(callback) - Defines the primary function to be executed.
2. cbb(callback) - Adds a "before" callback, which runs before the main function.
3. cba(callback) - Adds an "after" callback, which runs after the main function.
4. cbr(callback) - Modifies the returned value from the main function.
5. getFunction() - Returns the final composed function, ready to be called.

### Methods
`.main(callback)`

This is the core method where you define the main function to be executed. This function will be called during the composed function execution.

```javascript
import checklogrun from 'checklogrun';

const myFunction = (input) => { return `Processing ${input}`; };

checklogrun()
   .main(myFunction)
   .getFunction()("data");
// Output: "Processing data"
```

`.cbb(callback)`

This method allows you to define a callback that will run before the main function.

```javascript
checklogrun()
  .main(myFunction)
  .cbb((input) => console.log(`Before Main with ${input}`))
  .getFunction()("data");
// Output: 
// "Before Main with data"
// "Processing data"
```

`.cba(callback)`

Similar to .cbb(), but the callback will run after the main function.

```javascript
checklogrun()
  .main(myFunction)
  .cba((returnValue, input) => console.log(`After Main: ${returnValue}, Input: ${input}`))
  .getFunction()("data");
// Output: 
// "Processing data"
// "After Main: Processing data, Input: data"
```

`.cbr(callback)`

This method modifies the returned value of the main function. It is useful when you need to adjust the output.

```javascript
const returnValueModifier = (returnValue, input) => return `Modified: ${returnValue} on ${input}`;

checklogrun()
  .main(myFunction)
  .cbr(returnValueModifier)
  .getFunction()("data");
// Output: "Modified: Processing data on data"

```

## Examples
Here’s a simple example of chaining callbacks together:

```javascript
import checklogrun from 'checklogrun'

const mainFunction = (input) => `Main Executed on ${input}`;
const beforeCallback = (input) => console.log(`Before with ${input}`);
const afterCallback = (returnValue, input) => console.log(`After with ${returnValue} and ${input}`);
const returnModifier = (returnValue, input) => `Modified ${returnValue} for ${input}`;

const composedFunction = checklogrun()
  .main(mainFunction)
  .cbb(beforeCallback)
  .cba(afterCallback)
  .cbr(returnModifier)
  .getFunction();

console.log(composedFunction("data"));
// Output: 
// "Before with data"
// "Main Executed on data"
// "After with Main Executed on data and data"
// "Modified Main Executed on data for data"
```

## Contributing
Contributions are welcome! If you would like to contribute to CheckLogRun, please fork the repository and create a pull request with your changes.