module.exports = {
  async up(db, client) {
    await db.collection('restrictions').insertMany([
      {
        code: 'OVERRIDE_TICKET_DETAILS',
        path: '#',
        type: "both",
        description: "Override Ticket Details"
      },
    ]);
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
