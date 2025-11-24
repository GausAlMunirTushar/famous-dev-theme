<?php
// PHP Test File - Famous Dev Theme Enhanced Support
// This file demonstrates PHP syntax highlighting

// Variables
$appName = 'My PHP App';
$counter = 0;
$globalVar = 'I am global';

// Constants
define('MAX_USERS', 100);
const DB_HOST = 'localhost';

// Classes
class User {
    private $name;
    private $email;
    private $createdAt;
    
    // Constructor
    public function __construct($name, $email) {
        $this->name = $name;
        $this->email = $email;
        $this->createdAt = new DateTime();
    }
    
    // Methods
    public function getInfo() {
        return $this->name . ' - ' . $this->email;
    }
    
    public function getName() {
        return $this->name;
    }
    
    public function getEmail() {
        return $this->email;
    }
    
    // Static method
    public static function getDataType() {
        return 'User Object';
    }
}

// Interfaces
interface UserRepository {
    public function save(User $user);
    public function findById($id);
}

// Traits
trait Timestamps {
    private $createdAt;
    private $updatedAt;
    
    public function setCreatedAt() {
        $this->createdAt = new DateTime();
    }
    
    public function setUpdatedAt() {
        $this->updatedAt = new DateTime();
    }
}

// Class using trait
class Customer extends User {
    use Timestamps;
    
    private $customerId;
    
    public function __construct($name, $email, $customerId) {
        parent::__construct($name, $email);
        $this->customerId = $customerId;
    }
    
    public function getCustomerId() {
        return $this->customerId;
    }
}

// Functions
function calculateArea($length, $width) {
    return $length * $width;
}

function &getReference() {
    $value = 'I am a reference';
    return $value;
}

// Arrays
$users = [
    new User('John Doe', 'john@example.com'),
    new User('Jane Smith', 'jane@example.com')
];

$numbers = [1, 2, 3, 4, 5];
$associativeArray = [
    'name' => 'John',
    'age' => 30,
    'active' => true
];

// Control structures
if (count($users) > 0) {
    foreach ($users as $user) {
        echo $user->getInfo() . "\n";
    }
} elseif (count($users) === 0) {
    echo "No users found\n";
} else {
    echo "Unexpected condition\n";
}

// Switch statement
$role = 'admin';
switch ($role) {
    case 'admin':
        echo "Administrator access granted\n";
        break;
    case 'user':
        echo "Standard user access granted\n";
        break;
    default:
        echo "Access denied\n";
        break;
}

// Try-catch
try {
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=test", $username, $password);
} catch (PDOException $e) {
    error_log("Database connection failed: " . $e->getMessage());
} catch (Exception $e) {
    error_log("General error: " . $e->getMessage());
} finally {
    // Cleanup code
    echo "Connection attempt finished\n";
}

// Namespaces
namespace App\Controllers;

use App\Models\User as UserModel;
use DateTime;

class UserController {
    public function index() {
        $users = UserModel::all();
        return $users;
    }
    
    public function show($id) {
        $user = UserModel::find($id);
        return $user;
    }
}

// Magic methods
class MagicClass {
    private $properties = [];
    
    public function __set($name, $value) {
        $this->properties[$name] = $value;
    }
    
    public function __get($name) {
        return $this->properties[$name] ?? null;
    }
    
    public function __call($method, $args) {
        echo "Method $method called with args: " . print_r($args, true);
    }
    
    public function __toString() {
        return "This is a MagicClass instance";
    }
}

// Closures
$multiply = function($x, $y) {
    return $x * $y;
};

$numbers = [1, 2, 3, 4, 5];
$doubled = array_map(function($n) { return $n * 2; }, $numbers);

// Arrow functions (PHP 7.4+)
$squared = array_map(fn($n) => $n * $n, $numbers);

echo "PHP syntax highlighting test complete\n";
?>