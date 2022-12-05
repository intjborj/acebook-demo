module.exports = {
  async up(db, client) {
    await db.collection('restrictions').insertMany([
      {
        code: 'DISABLE_VIEW_NOTIFICATION_FUNC',
        path: '#',
        type: "function",
        description: "Disable View Notification Functionality"
      },
      {
        code: 'CONFIG_ASSET_PAGE',
        path: '#',
        type: "both",
        description: "Configuration Asset Page"
      },
      {
        code: 'CONFIG_PROMOTION_PAGE',
        path: '#',
        type: "both",
        description: "Configuration Promotion Page"
      },
      {
        code: 'CONFIG_MANUFACTURER_PAGE',
        path: '#',
        type: "both",
        description: "Configuration of Manufacturer Page"
      },
      {
        code: 'CONFIG_ASSET_LIST_PAGE',
        path: '#',
        type: "both",
        description: "Configuration Asset List Page"
      },
    ]);
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
