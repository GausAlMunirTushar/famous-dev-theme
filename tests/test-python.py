# Python Test File - Famous Dev Theme Enhanced Support
# This file demonstrates Python syntax highlighting

# Variables and constants
APP_NAME = 'My Python App'  # Constants in ALL_CAPS
counter = 0
global_var = 'I am global'

# Imports
import os
import sys
from typing import List, Dict, Optional, Union
from dataclasses import dataclass
from datetime import datetime, timedelta
import numpy as np


# Classes
class User:
    """User class with type hints and methods"""
    
    def __init__(self, name: str, email: str):
        self.name = name
        self.email = email
        self.created_at = datetime.now()
    
    def get_info(self) -> str:
        """Get user information"""
        return f"{self.name} - {self.email}"
    
    @classmethod
    def get_data_type(cls) -> str:
        """Get data type of the class"""
        return 'User Object'
    
    @staticmethod
    def validate_email(email: str) -> bool:
        """Validate email format"""
        return '@' in email and '.' in email


# Decorators
def timer_decorator(func):
    """Decorator to time function execution"""
    def wrapper(*args, **kwargs):
        start = datetime.now()
        result = func(*args, **kwargs)
        end = datetime.now()
        print(f"{func.__name__} took {end - start}")
        return result
    return wrapper


@timer_decorator
def calculate_area(length: float, width: float) -> float:
    """Calculate area of rectangle"""
    return length * width


# Dataclasses
@dataclass
class Point:
    x: float
    y: float
    
    def distance_from_origin(self) -> float:
        return (self.x ** 2 + self.y ** 2) ** 0.5


# Type hints and generics
def process_users(users: List[User]) -> Dict[str, User]:
    """Process list of users and return dict"""
    return {user.email: user for user in users}


# Function with default parameters and type hints
def greet_user(name: str = "Anonymous", greeting: str = "Hello") -> str:
    """Greet user with optional name and greeting"""
    return f"{greeting}, {name}!"


# Async/await
import asyncio

async def fetch_data_async() -> Dict[str, any]:
    """Asynchronously fetch data"""
    await asyncio.sleep(1)  # Simulate async operation
    return {"data": "fetched", "timestamp": datetime.now()}


# List comprehensions
numbers = [1, 2, 3, 4, 5]
squared = [x ** 2 for x in numbers if x % 2 == 0]
doubled = [x * 2 for x in numbers]


# Dictionary comprehensions
word_lengths = {word: len(word) for word in ["hello", "world", "python"]}


# Exception handling
def divide_numbers(a: Union[int, float], b: Union[int, float]) -> Optional[float]:
    """Divide two numbers with error handling"""
    try:
        result = a / b
        return result
    except ZeroDivisionError:
        print("Error: Division by zero")
        return None
    except TypeError:
        print("Error: Invalid input types")
        return None
    finally:
        print("Division operation completed")


# Generators
def fibonacci_generator(n: int):
    """Generate fibonacci sequence"""
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b


# Context managers
class DatabaseConnection:
    """Database connection context manager"""
    
    def __enter__(self):
        print("Opening database connection")
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        print("Closing database connection")


# Pattern matching (Python 3.10+)
def handle_response(response: Dict[str, any]) -> str:
    """Handle different response types"""
    match response:
        case {"status": "success", "data": data}:
            return f"Success: {data}"
        case {"status": "error", "message": message}:
            return f"Error: {message}"
        case _:
            return "Unknown response format"


# Main execution
if __name__ == "__main__":
    # Create users
    user1 = User("John Doe", "john@example.com")
    user2 = User("Jane Smith", "jane@example.com")
    
    # Use type hints
    users: List[User] = [user1, user2]
    user_dict: Dict[str, User] = process_users(users)
    
    # Test async function
    async def main():
        data = await fetch_data_async()
        print(f"Fetched data: {data}")
    
    # Run async function
    asyncio.run(main())
    
    # Test decorators
    area = calculate_area(5.0, 3.0)
    print(f"Area: {area}")
    
    # Test generator
    fib_sequence = list(fibonacci_generator(10))
    print(f"Fibonacci: {fib_sequence}")
    
    # Test context manager
    with DatabaseConnection() as db:
        print("Working with database")
    
    print("Python syntax highlighting test complete")