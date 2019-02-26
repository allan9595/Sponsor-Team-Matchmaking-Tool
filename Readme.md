Note, I didn't include the /config/keys.js for security reason. If you clone this repo,

add /config/keys.js in your project.

Then write:

module.exports = {

mongoURI : 'Your MongoDB URL',

secretOrKey: 'Your key (can be anything u made up)'

}
