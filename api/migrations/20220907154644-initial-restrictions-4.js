module.exports = {
  async up(db, client) {
    await db.collection('restrictions').insertMany([
      {
        code: 'CONFIG_SUPPLIER_PAGE',
        path: '#',
        type: "both",
        description: "Cofigure supplier page"
      },
    ]);
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
