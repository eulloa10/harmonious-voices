<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Harmonious-Voices](/screenshots/splash.png "Harmonious Voices")](https://harmonious-voices.herokuapp.com/)

Harmonious Voices is a Discord inspired website with frontend and backend support for Servers, Channels, Messages, and Direct Messaging features.

#### Direct Messaging

Easily search for a friend to start a direct messaging thread

![Direct-Messaging](/screenshots/directmessaging2.png)

#### Explore

Browser through various user created servers and join any that match your interests

![Explore-Servers](/screenshots/explore.png)

#### Channels

Use the server channels to engage with the community

![Channel-Messaging](/screenshots/channels.png)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [React](https://reactjs.org/)
- [Flask](https://flask.palletsprojects.com/en/2.2.x/)
- [Postgres](https://www.postgresql.org/)
- [SQLAlchemy](https://www.sqlalchemy.org/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Installation

### Backend

1. Clone this repository

   ```bash
   git clone https://github.com/eulloa10/harmonious-voices
   ```

2. Install dependencies

   ```bash
   pipenv install -r requirements.txt
   pipenv install boto3
   ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

### Frontend

1. Navigate to the react-app folder and npm install

   ```bash
   cd react-app
   npm install
   ```

2. Start the React app

   ```bash
   npm start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

- [Sungmin Lee](https://github.com/sungminlee417)
- [Andrew Parks](https://github.com/FrontLineCoding)
- [Edgar Ulloa](https://github.com/eulloa10)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Additional Resources

- [Flask-SQLAlchemy Quick Reference](https://hackmd.io/@jpshafto/H1VbmP3yO#Query-Format)
- [AWS S3 Reference](https://hackmd.io/@jpshafto/SyWY45KGu)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
