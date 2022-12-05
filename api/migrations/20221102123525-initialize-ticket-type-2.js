module.exports = {
  async up(db, client) {
    await db.collection('tickettypes').insertMany([
      {name: "IT Hardware", code:"ITHardware", codePrefix: "05"},
      {name: "IT Graphics", code:"ITGraphics", codePrefix: "06"},
      {name: "Internal Software", code:"InternalSoftware", codePrefix: "07"},
      {name: "Event Reminder", code:"EventReminder", codePrefix: "08"},
      {name: "Housekeeping", code:"Housekeeping", codePrefix: "09"},
      {name: "Engineering", code:"Engineering", codePrefix: "10"},
      {name: "Administrative", code:"Administrative", codePrefix: "11"},
      {name: "Material Mngt", code:"Material Management", codePrefix: "12"},
      {name: "Biomed", code:"Biomed", codePrefix: "13"},
    ]);
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
