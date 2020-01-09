# Sponsor-Team-Matchmaking-Tool

**Sponsor-Team-Matchmaking-Tool** is a tool allow sponsors and university professors connect better!

Project URL: https://matchmeunt.herokuapp.com

## How to setup on local machine

git clone https://github.com/allan9595/Sponsor-Team-Matchmaking-Tool.git

Create a config file named "keys_dev.js" under /config

You will need the following variable in order for the app work locally

mongoURI : 'YOUR mongoDB cloud secret',
secretOrKey: 'YOUR JWT PRIVATE KEY',
sendGridKey: 'YOUR SENDGRID private key', ***SendGrid is an email service provide*** 
redirectDomain: 'http://localhost:3000' ***This is for get account back through password reset link from email***

the file should look like the following: 

module.exports = {
  mongoURI : 'YOUR_KEY',
  secretOrKey: 'YOUR_KEY',
  sendGridKey: 'YOUR_KEY',
  redirectDomain: 'http://localhost:3000'
};

Open a terminal under the folder and type in "npm install" 

Open your browser and go to localhost:3000

The path for admin: 

[http://localhost:3000/login-admin](http://localhost:3000/login-admin)

[http://localhost:3000/adminsignup](http://localhost:3000/adminsignup)


## Video Walkthrough

Here's a walkthrough of implemented user stories (final sprint admin and team adding demo):

<img src='https://github.com/allan9595/Sponsor-Team-Matchmaking-Tool/blob/master/walkthrough-sponsor-app-sprint3.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

please eamil to bohan9595@gmail.com for admin account user and password

Here's a walkthrough of implemented user stories:

<img src='https://github.com/allan9595/Sponsor-Team-Matchmaking-Tool/blob/master/walkthrough-sponsor-app.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with [LiceCap](http://www.cockos.com/licecap/).


## License

    Copyright 2019 TEAM BLUE

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
