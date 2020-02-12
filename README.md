# DnD Bike
An app for cool DMs that like to do stuff quickly.

## Requirements

Well.. you need Node.JS. So there is that.
You might also want to get yourself a mongodb database setup. This project asumes that you are setting it up on your local machine and are using localhost:3000 and standard mongo ports. I don't personally understand what I just wrote, so if its dumb, ignore me. 


**NPM packages**

    npm init

 - `npm install express --save`
 - `npm install body-parser --save`
 - `npm  install request --save`
 - `npm install mongoose --save`

To start, just use the badass 

    node app.js

command.


#Tables

Due to Wizards of the Coasts copyright of its intellectual property of the DnD rules and content, I am not able to share the tables with you. To receive the benefits of them, you have to input the data yourself if you own a copy of the Dungeon Masters Guide (DMG). If you do so, you can use the included tables.json file to input data. When the data is correclty inputted, when you enter /tables/new, it will automatically update the database with json data and redirect you to /tables with new table (hopefully) showing up.

    {
	    "title": "sometitle",
	    "headers": ["d20", "items"],
	    "cols": [
		    {
			    lowDice: 0,
			    highDice: 50,
			    rows["Potion of healing"]
		    }
		    {
			    lowDice: 51,
			    highDice: 100,
			    rows["Potion of greater healing"]
		    }
	    ]
    }
