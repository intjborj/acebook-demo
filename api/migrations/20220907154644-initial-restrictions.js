module.exports = {
  async up(db, client) {
    await db.collection('restrictions').insertMany([
      {
        code: 'ALL_RESTRICTIONS',
        path: '#',
        type: "both", //function or page
        description: "All Restrictions"
      },
      {
        code: 'POLL_INVESTOR_VOTE_PAGE',
        path: '#',
        type: "both",
        description: "Poll Investor Vote"
      },
      {
        code: 'POLL_INVESTOR_VIEW_RESULTS_PAGE',
        path: '#',
        type: "both",
        description: "Poll Investor View Results"
      },
      {
        code: 'CONFIGURATION_PAGE',
        path: '/configurations',
        type: "both",
        description: "Configuration Page"
      },
      {
        code: 'INVESTORS_PAGE',
        path: '/investors',
        type: "both",
        description: "Investor's Page"
      },
      {
        code: 'CONFIG_TICKET_TYPE_PAGE',
        path: '/tickets/types',
        type: "both",
        description: "Configuration Ticket Type Page"
      },
      {
        code: 'CONFIG_FEEDBACK_QA_PAGE',
        path: '/feedback/categories',
        type: "both",
        description: "Configuration Feedback Page"
      },
      {
        code: 'CONFIG_INVESTORS_PAGE',
        path: '/investors/configuration',
        type: "both",
        description: "Configuration Investors Page"
      },
      {
        code: 'VIEW_NOTIFICATION_FUNC',
        path: '#',
        type: "function",
        description: "View Notification Functionality"
      }
    ]);
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
