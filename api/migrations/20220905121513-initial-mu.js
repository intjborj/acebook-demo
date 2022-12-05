const  bcrypt = require('bcryptjs');

module.exports = {
  async up(db, client) {

    await db.collection('musers').insert({
      "username": "user",
      "firstName": "Default",
      "middleName": "Default",
      "password": "$2a$10$orAs/D3EyLH.URovkOWe5.zMnviuVhAwoW1ZirTN58JErXkxIIjFy",
      "lastName": "Default",
      "restrictionCode": ["ALL_RESTRICTIONS"]
    });
  },
  

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
