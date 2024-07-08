# About

This project was created when I first started learning backend development. The primary goal was to implement a login and signup system independently, without receiving any external help. As a beginner, I made several questionable decisions, some of which introduced security risks. Nowadays, this project can serve as a CTF (Capture the Flag) challenge, where users try to exploit the site. I can confirm there is at least one vulnerability in this site, so have fun finding it!

# How to Run Locally

1. Ensure you have Node.js v20.11.0 installed. Relatively newer and older versions might also work.
2. Install the dependencies listed in the `package.json` file. You can do this automatically by running the command:
   ```sh
   npm i
   ```
   This will make Node's package manager (npm) automatically install all the dependencies of this project.
3. Run the `index.js` file with the following command:
   ```sh
   node index.js
   ```
4. Visit the site at [http://localhost:8080](http://localhost:8080).