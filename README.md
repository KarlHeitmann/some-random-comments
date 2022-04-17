# OVERVIEW SECOND VERSION V2

After running `npm install`, run

```
npm run dev
```

To get started, everything is ready to work out of the box

# OVERVIEW FIRST VERSION V1

This is a sample web that has a frontend and backend.
The goal is to have everything in vanilla JS and vanilla NodeJS. No npm, no additional packages.
However, there are some functions that were "borrowed" from other places, check the comments
to see where I do get it from.

I've done a course on Pirple about Node.js called (The Node.js Master Class)[https://www.pirple.com/courses/take/the-nodejs-master-class/lessons/3809671-service-1-ping]. 
The course aims to provide you the tools to understand Node.js on it's foundation. No frameworks and no dependencies.
Build a RESTful API, web app GUI and a CLI with no external libraries

So, this is a challenge to put the contents of this course in practice

## How do I run it?

You have to install (node.js)[https://nodejs.org/en/]. This project was created with `v16.14.2`. But it should run on much lower versions of node. It has no dependencies.

Clone this repo
> git clone https://github.com/KarlHeitmann/some-random-comments

Copy the file `seeds.json` into the file `db.json`
> cp backend/seeds.json backend/db.json

go to the folder `backend`
> cd backend

Run the `index.js` file using node.js
> node index.js

Open the file `index.html` located on the root folder on your browser, et voilà. It works.

Persistence is done using your filesystem. The file `seeds.json` has some initial data to 
populate the web page with some comments. Everything else is _almost_ faked. There was no linter used in this version,
and I didn't care very much about clean code. Sorry :(. The next iteration I will follow the guidelines by using React and Express with a database. I don't know yet if I will use
PostgreSQL or MongoDB.



