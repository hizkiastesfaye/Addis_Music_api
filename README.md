# Addis_Music

The backend of the Music Management Full-Stack Application is built with Node.js and Express.js.  
It provides RESTful APIs for managing the music collection and generating statistics.  
The backend uses MongoDB (via Mongoose) as the database and is designed to be secure and scalable.  
  
# Features
- CRUD Operations: Create, read, update, and delete songs with attributes like title, artist, album, and genre.  
- Statistical Insights: Provides data on total songs, albums, artists, genres, and more.  
- API Endpoints: Designed for easy integration with the frontend or other applications.  
- Environment Variables: Configurable using .env for secure and flexible deployment.  
- How to Run Locally  
- Clone the Repository:  

bash  
Copy code  
git clone [Backend Repository URL]  
cd [Backend Repository Folder]  
Set Up Environment Variables:  
Create a .env file in the backend directory with the following content:  
  
create .env file in root of project  
```touch .env```  
Copy code in .env  
```MONGO_URI='[Your MongoDB URI]'```  
```PORT=3007```  
Install Dependencies:  
  
bash  
Copy code  
```npm install```  
Start the Backend Server:  
  
bash  
Copy code  
```npm run dev```  
Access the Backend: The backend will run on http://localhost:3007.  
Test endpoints using Postman or integrate with the frontend.  
  
Deployment  
The backend is deployed on Render and can be accessed at:  
https://addis-music-api-hizkiyas.onrender.com/  
