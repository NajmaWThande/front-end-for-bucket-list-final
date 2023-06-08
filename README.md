
## Bucket List Project
The Bucket List Project is a web application that allows users to create and manage their personal bucket lists. It provides a platform to keep track of goals, dreams, and experiences users want to accomplish within their lifetime. The project combines the backend framework Sinatra with the frontend library ReactJS to create an interactive and dynamic user experience.

## Features
1. Bucket List Creation: Users can create multiple bucket lists and add items to each list.

2. Item Management: Users can add, edit, and delete items within their bucket lists.
3. Marking Items as Completed: Users can mark items as completed when they have achieved their goals.
4. Categories: Users can create categories to their liking and items to them.

## Technologies Used
# Backend:
1. Sinatra: A lightweight Ruby web application framework that handles routing and backend logic.

2. SQLite: A powerful open-source relational database for data storage.

3. ActiveRecord: A Ruby ORM (Object-Relational Mapping) library for database interactions.

# Frontend:
1. ReactJS: A popular JavaScript library for building user interfaces.

2. HTML: Markup language for structuring the web pages.

3. CSS: Styling language for designing the UI.

4. JavaScript: Programming language for adding interactivity to the application.


## Installation
Clone the repository:

Copy code
git clone https://github.com/your-username/bucket-list-project.git

## Install dependencies:

1. Backend:
bash
Copy code
cd bucket-list-project/backend
bundle install

2. Frontend:
bash
Copy code
cd bucket-list-project/frontend
npm install

3. Database Setup:

Set up a SQLite database and update the database configuration in bucket-list-project/backend/config/database.yml with your database credentials.
4. Run Migrations:

Run the following commands in the bucket-list-project/backend directory to set up the database tables:

bash
Copy code
bundle exec rake db:create
bundle exec rake db:migrate
Start the Servers:

Backend:
bash
Copy code
cd bucket-list-project/backend
bundle exec rackup

Frontend:
bash
Copy code
cd bucket-list-project/frontend
npm start
Access the Application:

Open your web browser and visit http://localhost:3000 to access the Bucket List Project.

## Usage
Create a category you would like
Create a new bucket list and add items to it.
Add items to the category
Manage your items by editing, deleting, or marking them as completed.


## Contributing
Contributions are welcome! If you have any ideas, enhancements, or bug fixes, please submit a pull request or open an issue.

## License
This project is licensed under the MIT License.

## Link to backend for this project.
https://github.com/alanlosenge/backend-for-bucket-list-project

