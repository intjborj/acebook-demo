module.exports = {
  async up(db, client) {
    await db.collection('restrictions').insertMany([
      {
        code: 'VIEW_ALL_TICKETS',
        path: '#',
        type: "function",
        description: "View All Tickets"
      },
    ]);
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
