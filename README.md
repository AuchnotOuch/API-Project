# Al's BnB
Al's BnB is a clone of AirBnB. It provides a clean and friendly interface for users to find, book, or list vacation spots around the world. Users can provide reviews for spots they've booked to help other users find the best spots to take a break from the hustle and bustle of every day life.

## Wiki
* [API Documentation](https://github.com/AuchnotOuch/API-Project/wiki/API-Documentation)
* [Database Schema](https://github.com/AuchnotOuch/API-Project/wiki/Database-Schema)
* [Feature List](https://github.com/AuchnotOuch/API-Project/wiki/Feature-List)
* [Redux Store Shape](https://github.com/AuchnotOuch/API-Project/wiki/Redux-Store-Shape)
***
## Built With:
 ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

 ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)

![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)

# Features

## Spots:
Display a single spot's details and mount the review component to display reviews for that spot:

![spot-details](https://i.imgur.com/QI4Cpxg.png)
## Reviews:
Add a Review:
![add-review](https://i.imgur.com/2MySQkk.png)
![add-review-form](https://i.imgur.com/sCC56sC.png)
Edit/Delete Review:
![edit-reviews](https://i.imgur.com/JxtMuhq.png)
![edit-review-form](https://i.imgur.com/EDOAdIM.png)


# Future Offerings
* Create, edit, and delete a booking for a spot
* Finely tuned search engine to find the perfect spot to book
* Messaging system between owners and users

# Setup

* Clone repo [here](https://github.com/AuchnotOuch/API-Project).
* run `npm install` to install all dependencies
* create a `.env` and set the `PORT` to `8000` and the `DB_FILE` to `db/dev.db`
* Run `npx dotenv sequelize db:migrate` to migrate database
* run `npx dotenv sequelize db:seed:all` to seed the database with seeder data
* Run `npm start` within the `/frontend` directory AND the `/backend` directory
* Enjoy!

# Contact Me
* [Gmail](alexsamuelauch@gmail.com)
* [LinkedIn]()
