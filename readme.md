Steps to run the application :
# Download the zip file and extract it.
# Open the extracted folder on your code editor (Eg:visual studio code ) and then download the dependencies below .
# install depedencies 
npm i (run in the terminal of your project directory )
# create a .env file in your project folder and paste the below URL
DATABASE_URL=<Paste your mongo db connection string>
sample connection string DATABASE_URL=mongodb://<your-username>:<your-password>@<your-cluster-url>/<your-database-name>
#start the server 
nodemon index.js  
# This will connect to your mongodb database by displaying your server port number in terminal.

Documentation for APIs
1.Retrieve all books using GET
Endpoint:  http://localhost:3000/api/books/
Description: Retrieve a list of all books in the database.
expected response:array of all book objects
eg:[
    {
        "_id": "65755f725db00b7c3b847f9b",
        "title": "Book1",
        "author": "Author1",
        "publication_year": 2022,
        "__v": 0
    },
    {
        "_id": "65755f725db00b7c3b847f9c",
        "title": "Book2",
        "author": "Author2",
        "publication_year": 2023,
        "__v": 0
    },
    <!-- other books if any present -->
]
Error handling:If there is an error during the attempt to fetch all books, it will respond with a 500 Internal Server Error along with a descriptive message.


2.Add a new book using POST
Endpoint: http://localhost:3000/api/books/
Description : Add new book to the database with the provided details.
sample Payload:
{
  "title": "New Book",
  "author": "New Author",
  "publication_year": 2023
}
Response:
{
  "_id": "new_unique_id",
  "title": "New Book",
  "author": "New Author",
  "publication_year": 2023
}
Error Handling:
For missing fields:If there is any missing field in the payload then it will give the error message 
 "Missing required fields. Ensure 'title', 'author', and 'publication_year' are provided".
For Duplicate entries:If you give duplicate entries i.e if you send the title and author that is already existing,then it will give you error message.
"A book with the same title and author already exists."


3.Update book deatils using PUT.
Endpoint:  http://localhost:3000/api/books/{id}
Description: Update the details of a book identified by the unique identifier.
You can send the required fields of the required book as a payload to get updated .
Sample Payload:
{
  "title": "Updated Book",
  "author": "Updated Author",
  "publication_year": 2024
}
Response:
{
  "_id": <existing_unique_id>,
  "title": "Updated Book",
  "author": "Updated Author",
  "publication_year": 2024
}
Error Handling:
If you give invalid id of a book then it will display the error message
"Not possible to update non-existent book".