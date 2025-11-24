// JavaScript Test File - Famous Dev Theme Enhanced Support
// This file demonstrates JavaScript syntax highlighting

// Variables and constants
const appName = 'My JavaScript App';
let counter = 0;
var globalVar = 'I am global';

// Classes
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.createdAt = new Date();
  }

  // Methods
  getInfo() {
    return `${this.name} - ${this.email}`;
  }

  static getDataType() {
    return 'User Object';
  }
}

// Async/await and promises
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Array methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
const evens = numbers.filter(num => num % 2 === 0);

// Destructuring
const { name, email } = new User('John Doe', 'john@example.com');
const [first, second, ...rest] = [1, 2, 3, 4, 5];

// Functions
function calculateArea(length, width) {
  return length * width;
}

const arrowFunction = (param) => {
  return param.toUpperCase();
};

// Template literals
const greeting = `Hello, ${name}! Today is ${new Date().toLocaleDateString()}.`;

// Import/export syntax
// import { someFunction } from './module';
// export { User, fetchData, calculateArea };

// Modules
export default class App {
  constructor() {
    this.users = [];
    this.state = {
      loading: false,
      error: null
    };
  }

  async initialize() {
    this.state.loading = true;
    try {
      this.users = await fetchData();
      this.state.loading = false;
    } catch (error) {
      this.state.error = error.message;
      this.state.loading = false;
    }
  }

  render() {
    return {
      element: 'div',
      props: {
        id: 'app-root',
        className: 'app-container',
        children: this.users.map(user => user.getInfo())
      }
    };
  }
}

// Decorators (if using Babel/TypeScript)
// @component
// class MyComponent {}

// Spread operator
const originalObj = { a: 1, b: 2 };
const extendedObj = { ...originalObj, c: 3 };

// Modules and namespaces
import * as utils from './utils';
export { App as Application };

// Function with default parameters
function greetUser(name = 'Anonymous', greeting = 'Hello') {
  return `${greeting}, ${name}!`;
}

// IIFE (Immediately Invoked Function Expression)
(function() {
  console.log('This runs immediately');
})();

console.log('JavaScript syntax highlighting test complete');