module.exports = {
  async up(db, client) {
    await db.collection('companyconfigs').insert({
      investor: {
        sharesPerBlock: 10,
        votesPerShare: 15
      }
    });
  },

};
