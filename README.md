# Flask Messaging

## Table of Contents
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Run Application](#run-application)
4. [Test Application](#test-application)

## Introduction
This repository is a chat web application built with Flask, React, and Postgres. This application provides users the ability to send and receive real-time messages with other users.

## Installation
To install this repository open your terminal and run the following code 
```bash 
git clone https://github.com/Nephthalim/flask-messaging.git
```
Now navigate into the application folder
```
cd flask-messaging
```

## Run Application
To run the service, assuming you have followed the steps in Installation, open your terminal and direct yourself into the /server folder. 
```
cd server
```
Once you are in the /server folder run
```python3
python3 -m env
source env/bin/activate
``` 
to create and activate a virtual environment, this will be used to install the required packages for this service. Now run the following line to install the required packages 
```python3
pip3 install -r requirements.txt
```
Installing the required packages may take a minute...

After the installation is completed run the following line to start the service
```
cd ..
python3 app.py
```

## Test Application
To test this service, make sure the application is running. Open a web browser (Chrome, Safari, FireFox) and http://localhost:5000. Since this is a chat application, you will need two web browsers. Open a second, different, web browser (an Incognito window of the same browser will also work) and open http://localhost:5000. 

On the first web browser, click the register button and enter a username and password. Do the same on the second web browser. Remember these usernames as it will be used to search each other when looking for a user to message.

Now you have registered two accounts into the application. On the first browser, search the username of the second account you created in the search bar in the top left corner, and click on the second users name. Now you have created a chat room with the second user. 

Type a message in the textbox at the bottom of the window and click enter. Open up the second browser and refresh the screen. Now on the second browser you will see the first user's username on the Contacts sidebar. Click on the first user and you will see the message your received.

Now you can message back and forth and see the messages being received in real time.