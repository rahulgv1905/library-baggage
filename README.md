🚀 Library Baggage Management System
A secure, QR-code-based web application built with the MERN stack to digitally manage baggage storage and retrieval in a library or a similar institution. This project is designed to replace manual token systems with an efficient and trackable digital solution.
✨ Core Features
Dual User Roles: Separate, secure login portals for Students and Security Admins.
Domain-Specific Login: Student registration and login are restricted to the @vitstudent.ac.in email domain.
QR Code Workflow:
Deposit Initiation: Admin places a bag in a container and generates a temporary QR code.
Student Verification: The student scans the admin's QR code, enters their details, and receives a unique, permanent QR code as a digital receipt.
Secure Retrieval: The admin scans the student's unique QR code to verify their identity and retrieve the correct bag.
Secure Authentication: User sessions are managed using JSON Web Tokens (JWT), with passwords securely hashed using bcryptjs.
Real-time Tracking: The system tracks container availability and the status of each deposit (deposited/collected).
Modern UI: A clean and responsive user interface built with React and Material-UI.
🛠️ Tech Stack
This project is built using the MERN stack and other modern web technologies.
Frontend:
React.js
React Router for client-side routing.
Material-UI (MUI) for a modern component library.
Axios for making API requests.
Backend:
Node.js
Express.js
MongoDB (with Mongoose)
JSON Web Tokens (JWT) for authentication.
Bcrypt.js for password hashing.
qrcode for generating QR codes.
Database:
MongoDB Atlas for cloud-hosted database.
⚙️ Getting Started
To get a local copy up and running, follow these simple steps.
Prerequisites
Node.js (which includes npm)
Git
A free MongoDB Atlas account.
Installation & Setup
Clone the repository:
code
Sh
git clone https://github.com/your-username/library-baggage-system.git
cd library-baggage-system
Install Backend Dependencies:
code
Sh
cd server
npm install
Install Frontend Dependencies:
code
Sh
cd ../client
npm install
🔑 Environment Variables
The backend requires a .env file for configuration.
Navigate to the server directory.
Create a file named .env.
Add the following variables, replacing the placeholder values:
code
Env
# Port for the backend server
PORT=5001

# Your MongoDB Atlas connection string
MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/YourDatabaseName?retryWrites=true&w=majority

# A long, random, and secret string for signing JWTs
JWT_SECRET=your_super_secret_jwt_string
🏃 Running the Application
You will need to run the backend and frontend servers in two separate terminals.
Start the Backend Server:
Navigate to the server directory.
Run the command:
code
Sh
npm start
The server will start on http://localhost:5001.
Start the Frontend Client:
Navigate to the client directory.
Run the command:
code
Sh
npm start
The React application will open in your browser at http://localhost:3000.
📈 Future Improvements

Implement a "Forgot Password" feature.

Create an admin dashboard to view all active deposits and system logs.

Add real-time notifications (e.g., using WebSockets) for deposit confirmations.

Allow students to view their deposit history.

Dockerize the application for easier deployment.
