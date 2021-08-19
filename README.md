# Question Api

Question its an api that can automate messages and responses provided by clients.

## Installation

For instalation, clone this repository, then install the dependencies.

```bash
git clone https://github.com/FranciscoJBL/questionsapi
cd questionsapi
npm install
```

## Usage

Run Api:

```bash
npm start
```

### Get and send messages:

You connect to the service through socket.io as client, the application port its 3001 and the configuration its already aware of cors request for localhost:3000 (so, your front end can be in this direction). Please note that this is not a production api, so, if you want to use it you should add those parámeters on a ```.env``` file.

When connected, the api will send you a welcome message, and you can send back an "accept" response, then, it will send in order all the messages added to the pool until done.

### Add a new question (WIP):

```bash
curl http://yourlocalip:3001/add-question/TEXT/EXPECTATION/POSITION
```

Alternatively, you can call the same url in you navigator. (or call it using a function such as fetch on get mode)

### The text, expectation and position must be sent the following format:

TEXT: Your question text, espaces have to be replaced by "-" character.

EXPECTATION: you can choose one of the following: ```'bin'``` for yes or not questions, ```'text'``` for custom user input questions and ```'accept'``` for confirmation messages.

POSITION: Determines the order of the question on the pool, if none has been provided, the question will be placed at the end.


## License
[MIT](https://choosealicense.com/licenses/mit/)