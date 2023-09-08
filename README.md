# :green_heart: Matcha :green_heart:

*Because, love too can be industrialized.*

## Introduction

This project aims to create a dating website

Users will be able to register, log in, complete their profile, search and view the profiles  
of other users, and show interest in them with a “like”1, chat with those that “liked” back.

### General instructions

- Your application must not have any errors, warning or notice, either server-side or
client-side.

- For this project, you are free to use any programming language of your choice.

- You are fre to use UI libraries such as React, Angular, Vue, Bootstrap, Semantic or any combination of them.

- No security breaches are allowed. You must handle at least what's in the mandatory part, but we encourage you to go even further. Everything depends on it.

- We will consider that a "micro-frameworks" includes a router and possibly templating, but does not include an ORM, validators, or a User Account Manager. As long as you respet these constraints you are free to use what you like.

- You should use a relational or graph-oriented database. The database should be a free one such as MySQL, MariaDB, PostgreSQL, Cassandra, InfluxDB, Neo4j, etc. You will also need to create your queries manually, like mature developers do. Homewever, if your're clever, you can create your own library to simplify your queries.

- You are free to choose the web server that best suits your needs, whether it is Apache, Nging or a built-in web server.

- Your entire app must be compatible with at least the latest versions of Firefox and Chrome.

- Your website must have a decent layout: at least a header, a main section and a footer.

- Your website must be usable on a mobile phone and keep an acceptable layout on small resolutions.

- All your forms should have proper validation and the entire website must be secure.  
This is a mandatory part and will be extensively checked during the defense. To give you an idea, here are a few elements that are considered insecure:
    - Storing plain text passwords in your database.
    - Allowing injection of HTML or user javascript code in unprotected variables.
    - Allowing upload of unwanted content.
    - Allowing alteration of SQL requests.

# Mandatory Part

You will need to create a Web App with the following features:

## 1 Registration and Signing-in

The app must allow a user to register by requesting at least their email address, username,
last name, first name, and a password that is somehow protected. After registration, an
email with a unique link must be sent to the registered user to verify their account.  

The user must be able to login using their username and password, and also receive
an email allowing them to reset their password if they forget it. Additionally, the user
must be able to log out with just one click from any page on the site.  

## 2 User Profile

- Once a user is connected, they must fill out their profile by providing the following
information:
    - The gender.
    - Sexual Preferences
    - A biography
    - A list of interests with tags wich must be reusable
    - Up to 5 pictures, including one to be used as a profile picture.  

  - At any time, the user must be able to modify this information, as well as their last name, first name and email address.

- The user must be able to check who has viewed their profile,

- as well as who has “liked” them.

- The user must have a public “fame rating"

- The user must be located using GPS positioning, up to their neighborhood. If
the user does not want to be positioned, you must find a way to locate them even
without their knowledge. The user must be able to modify their GPS position in
their profile.

## 3 Browsing

The user must be able to easily get a list of suggestions that match their profile.

- You will only propose “interesting” profiles. For example, only men for a hetero-
sexual girls. You must manage bisexuality.If the user’s orientation isn’t specified,
they will be considered bisexual.

- You must cleverly match based on:
    - Same geographic area as the user.
    - A maximum of common tags.
    - A maximum "fame rating".

- You must prioritize showing people from the same geographical area. 
- The list must be sortable by age, location, “fame rating”, and common tags. 
- The list must be filterable by age, location, “fame rating”, and common tags.

## 4 Research

The user must be able to conduct an advanced search by selecting one or more criteria,
such as:

    - An age gap
    - A "fame rating" gap.
    - A location
    - One or multiple interest tags.

For the suggested list, the resulting list must be sortable and filterable by age, location, "fame rating" and tags.

## 5 Profile of other users

A user must be able to view the profiles of other users. Profiles must contain all available
information about them, except for the email address and password.
When a user views a profile, it must be added to their visit history.
The user must also be able to:

- “Like” another user’s profile picture. When two people “like” each other’s profiles,
they will be considered “connected” and can start chatting. If the current user does
not have a profile picture, they cannot complete this action.

- You should also remove your “like” to an user whom you had previously “liked”,
The user will no longer generate notifications, and you will not be able to chat with
them anymore.

- Check the “fame rating” of another user.

- See if a user is currently online, and if not, see the date and time of their last
connection.

- Report a user as a "fake account"

- Block a user. A blocked user will no longer appear in the search results and will
not generate additional notifications. And, of course, it will no longer be possible
to chat with him.

A user can clearly see if the profile they are viewing is connected or has “like” their
profile and must be able to “unlike” or disconnected from that profile.

## 6 Chat

When two users are connected, they must be able to "chat" in real time. The implementation of the chat is up to you. The user must be able to see from any page if a new message is received.

## 7 Notifications

A user must be notified of the following events:

- When the user receive a "like".
- When the users's profile has been viewed.
- When the user receives a message.
- When "liked" user also "likes" the user back.
-  When a connected user "unlikes" the user.

A user must be able to see, from any page, that a notification hasn't been read.

## BONUS

Possible bonuses that you can implement to get extra points.

- Add Omniauth strategies for user authentification.
- Allow importing pictures from social network(snapchat, facebook, etc...)
- Develop an interactive map of users, which requires more precise GPS localization via javascript
- Integration of video or audia chat for connected users.
- Implementation of a feature to schedule and organize real-life dates or events for matched users.

