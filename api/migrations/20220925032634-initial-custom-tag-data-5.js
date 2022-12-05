module.exports = {
  async up(db, client) {
    await db.collection('customtags').insertMany([
      {name: "Task", code:"task"},
      {name: "Open", code:"open"},
      {name: "To Receive", code:"to_receive"},
      {name: "Received", code:"received"}
    ]);
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
