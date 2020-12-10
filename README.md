<!-- @format -->

# Node.js & Passport Login

This is a user login and registration app using Node.js, Express, Passport, Mongoose, EJS and some other packages.

### Version: 1.0.0

### Usage

```sh
$ npm install
```

```sh
$ npm start
# Or run with Nodemon
$ npm run dev

# Visit http://localhost:5000
```

### MongoDB

- Open "config/keys.js" and add your MongoDB URI, local or Atlas

### Questions

- What does passport.js do and why we need it?

       Passport is a middleware for express.js. It supports various login types, Basic, Token, Local (username, password), OAuth, OAuth2, etc. We can combine these to allow users to authenticate by signing in with Google, FB, or whatever service with very minimal amount of code. We can also use this to combine external auth services so users can choose to login with one of the selected Strategies, e.g. Google, Twitter. It's much quicker to use passport for authentication than to build one yourself from scratch. This is why we use passport. You don't need passport, it just makes developing quicker. Read more from there website => http://www.passportjs.org/
