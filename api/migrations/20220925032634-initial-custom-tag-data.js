module.exports = {
  async up(db, client) {
    await db.collection('customtags').insertMany([
      {name: "Ticket Approval", code:"ticket_approval"},
      {name: "Post To Ticket", code:"post_to_ticket"},
      {name: "Post", code:"post"},
      {name: "Comment", code:"comment"},
      {name: "Tagged Department", code:"tagged_department"},
    ]);
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
