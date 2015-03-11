<h3>scheduler</h3>

<h5>Tech used:</h5>
- node.js
- mongobd 

<h5>Code org:</h5>
- <b>index.js</b> has all confs for initiating the http server. also it has the RESTfull API defined.
- <b> src/lib/dates.js </b> draft of how to handle dates. the idea was to have a module that would be responsible for validating and creating the lesson's dates according to the contract. according to the contract, the slots would be represented as a date and time, where time is when the slot of 30m start. nto finished. 
- <b> src/db/connectDB.js </b> handles the connection to the DB. refactored because atm, I'm connecting to the remote db each time I do a request (change this!)
- <b> src/db/manageDB.js </b> layer that makes requests to db
- <b> public/ </b> frontend (html, css, js)  


<h5>Things I'd change now:</h5>
- refactor index.js and take out the API endopoints from there
- add confs (access to remote db, http init) to /confs/confs.js trim out almost all conde from index.js
- keep db connection on instead of being always opening and closing connection once there's one request
- use angular of other frontend MVC framework do and parse requests to backend 


<h5>Still left to do:</h5>
- refactor the code
- angular and frontend


<h5>Comments:</h5>
- I tried to reach a good compromise between time I had and code quality (most notably, code organization). I fell that I failed a lot here, since I haven't managed to finish everything nor have - in my opinion - an acceptable and easy to read code structure.
- left refactoring to the end, whereas some code should have been organized from the beginning. 
- two bad initial decisions: 1) not to use Mongoose to define a schema for mongodb and keep code cleaner; 2) after defining the contract and request between backend and frontend, I should have started with the frontend and angular and then jump to the db coding
