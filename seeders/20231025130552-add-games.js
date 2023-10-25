'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Games", [
      {
        title: "Spiderman 2",
        developer: "Insomniac Games",
        platform: "PS5",
        year: 2023,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "God of War Ragnarok",
        developer: "Santa Monica Studio",
        platform: "PS5; PS4",
        year: 2022,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Tekken 7",
        developer: "Bandai Namco",
        platform: "PS4",
        year: 2017,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Games", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
