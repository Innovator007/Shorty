# Shorty
url shortener made with node.js

##### Copy paste the following commands in the terminal/command-prompt
```
git clone https://github.com/Innovator007/Shorty.git
cd Shorty
npm install
cd client && npm install
cd ..

```
##### If you don't have nodemon installed then paste the following line in terminal/command-prompt
For MAC/Linux Users:
```
sudo npm install -g nodemon

```
For Windows:
```
npm install -g nodemon

```

##### Next create a folder inside the projects folder named config and then create index.js in config folder
For MAC/Linux Users:
```
mkdir config/
cd config && touch index.js

```
And open the index.js file just created in any editor of your choice and paste the following code in that:
```
module.exports = {
	mongoUri: "your-mongodb-url eg.mongodb://localhost/url-shortener",
	sessionKey: "<<<<session-key>>>>"
};

```
#### Development Setup completed now to start the server:
```
npm run dev

```

Copygright: Iliyas Attarwala
