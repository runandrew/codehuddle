'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const {resolve} = require('path');
const passport = require('passport');
const PrettyError = require('pretty-error');
const socketio = require('socket.io');

// Bones has a symlink from node_modules/APP to the root of the app.
// That means that we can require paths relative to the app root by
// saying require('APP/whatever').
//
// This next line requires our root index.js:
const pkg = require('APP');

const app = express();

if (!pkg.isProduction && !pkg.isTesting) {
  // Logging middleware (dev only)
  app.use(require('volleyball'));
}

// Pretty error prints errors all pretty.
const prettyError = new PrettyError();

// Skip events.js and http.js and similar core node files.
prettyError.skipNodeFiles();

// Skip all the trace lines about express' core and sub-modules.
prettyError.skipPackage('express');

module.exports = app
  // We'll store the whole session in a cookie
  .use(require('cookie-session')({
    name: 'session',
    keys: [process.env.SESSION_SECRET || 'an insecure secret key']
  }))

  // Body parsing middleware
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())

  // Authentication middleware
  .use(passport.initialize())
  .use(passport.session())

  // Serve static files from ../public
  .use(express.static(resolve(__dirname, '..', 'public')))

  // Serve our api
  .use('/api', require('./api'))

  // Send index.html for anything else.
  .get('/*', (_, res) => res.sendFile(resolve(__dirname, '..', 'public', 'index.html')))

  .use((err, req, res, next) => {
    console.log(prettyError.render(err));
    res.status(500).send(err);
    next();
  });

// Store room data locally for reload
const roomData = {
  editor: {
    data: 'default text'
  }
};

if (module === require.main) {
  // Start listening only if we're the main module.
  //
  // https://nodejs.org/api/modules.html#modules_accessing_the_main_module
  const server = app.listen(
    process.env.PORT || 1337,
    () => {
      console.log(`--- Started HTTP Server for ${pkg.name} ---`);
      console.log(`Listening on ${JSON.stringify(server.address())}`);

      // Sockets
      const io = socketio(server);

      const setText = text => ({
        type: 'SET_TEXT',
        text });

      io.on('connection', (socket) => {
        console.log('Socket client connected', socket.id);
        let action = setText(roomData.editor.data);
        console.log('Emitting action', action);
        socket.emit('action', action);

        socket.on('action', (action) => { // When an action is received, send it out. This acts like a reducer.
          roomData.editor.data = action.text;
          action.meta.remote = false; // Remove the remote true to prevent continuous back and forth.
          socket.broadcast.emit('action', action); // Broadcast out to everyone but the sender.
        });
      });
    }
  );
}
