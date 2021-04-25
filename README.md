# Hacker News with React, Express, MongoDB

This is my own version of [Hacker News](https://news.ycombinator.com/).  
Frontend was developed with React, and the backend with Express and MongoDB.  

## Getting Started

You can run the application by doing the followings:
### Clone and Install

```bash
# Clone the repo
git clone https://github.com/youxiberlin/hackernews-react-express-mongo.git

# Navigate to clonned folder and Install dependencies
cd hackernews-react-express-mongo
yarn

```

### Start the application

#### Frontend
```
cd client
yarn start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### Backend
```
cd backend
yarn start
```

You can set the configuration for port and MongoDB's host and port inside `./config.js`.  
The default port for the server is `8080`.
 

### How to use the application

#### Frontend  
You can post a set of a URL and a title.  
For each story, you can post comments or reply to comments.  

#### Backend
The posted stories and comments are saved to MongoDB, and you can get the data by accessing following endpoints.

- GET: `http://localhost:8080/topStories` : you can get the list of posted stories
- GET: `http://localhost:8080/comments/:storyId` : you can get the list of posted comments of a story
- GET: `http://localhost:8080/story/:storyId` : you can get a story with the story's ID
- POST: `http://localhost:8080/story` : Endpoint to post a story
- POST: `http://localhost:8080/comment` : Endpoint to post a comment