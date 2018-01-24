## About this project
JoyStick is a simple blog application that supports user authentication, and ensures that only authenticated users are able to add blog posts.

## Installation
```
git clone https://github.com/KidzGaming/JoyStick.git
cd JoyStick
npm install
```

## Usage
In development, it can be useful to have nodemon installed, to watch for file changes (so you do not have to keep entering ``` node app.js ```). To install nodemon globally, run ``` npm i -g nodemon ```.

To run the app, run ``` nodemon app.js ```.

## File structure
Before running the app, create an mLab database at https://www.mlab.com, and change the db config in config/database.js to your database's URL. All views are contained in the views folder.

## Technologies
Majorly, JoyStick runs on a MEN (MongoDB, Express, NodeJS) stack. It also uses Passport.js for authentication, Body Parser for parsing x-www-url-form-encoded requests. In Frontend, it uses the PUG templater for templating, and the Bulma CSS framework (Note, you will need a little jQuery snippet to make the navigation drawer open and close on smaller screen sizes.)

## License
MIT License.

## Issues
You are free to share any issues you may have with this app. I will try my best to address as many of them that arise.
