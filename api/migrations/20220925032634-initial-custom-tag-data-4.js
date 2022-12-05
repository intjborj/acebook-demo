module.exports = {
  async up(db, client) {
    await db.collection('customtags').insertMany([
      {name: "Work On Progress", code:"work_on_progress"},
      {name: "Task Received", code:"task_received"},
      {name: "Task Completed", code:"task_completed"},
      {name: "Task Failed", code:"task_failed"},
      {name: "Task Closed", code:"task_closed"},
      {name: "Closed", code:"closed"},
      {name: "Approved", code:"approved"},
      {name: "Disapproved", code:"disapproved"},
    ]);
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
