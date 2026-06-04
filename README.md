# Exam #N: "Exam Title"
## Student: s123456 LASTNAME FIRSTNAME 

## React Client Application Routes

- Route `/`: page content and purpose
- Route `/something/:param`: page content and purpose, param specification
- ...

## API Server

- POST `/api/something`
  - request parameters and request body content
  - response body content
- GET `/api/something`
  - request parameters
  - response body content
- POST `/api/something`
  - request parameters and request body content
  - response body content
- ...

## Database Tables

- Table `stations` - contains id and name of every station
- Table `lines` - contains id and name of every line
- Table `line_station` - contains the list of the IDs of stations stops of each line
- Table `connections` - contains pairs of adjacent station IDs and the line that connects them
- Table `games` - contains data on the previous games, those are game and user id, start and end stations IDs, wether the given route was valid or not, the list of stations chosen by the user in JSON format, final score, start and end timestamps of the game.
- Table `users` - contains information on the users registered in the app, email, username, passwordHash and registering date.

## Main React Components

- `ListOfSomething` (in `List.js`): component purpose and main functionality
- `GreatButton` (in `GreatButton.js`): component purpose and main functionality
- ...

(only _main_ components, minor ones may be skipped)

## Screenshot

![Screenshot](./img/screenshot.jpg)

## Users Credentials

- username, password (plus any other requested info)
- username, password (plus any other requested info)

## Use of AI Tools
Briefly describe whether you used any AI tools (e.g., ChatGPT, GitHub Copilot, Claude) while working on this project, for which purposes (e.g., clarifying concepts, debugging, generating code), and how you verified or adapted their output.
If you did not use any AI tools, simply state so.
