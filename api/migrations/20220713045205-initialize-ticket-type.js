module.exports = {
  async up(db, client) {
    await db.collection('tickettypes').insertMany([
      {name: "Equipment Maintenance", code:"EquipmentMaintenance", codePrefix: "01"},
      {name: "CCTV Review", code:"CCTVReview", codePrefix: "02"},
      {name: "HIS Client Concern", code:"HISClientConcern" , codePrefix: "03"},
      {name: "HIS Development Request", code:"HISDevelopmentRequest", codePrefix: "04"},
    ]);
  },

  async down(db, client) {
    
  }
};
