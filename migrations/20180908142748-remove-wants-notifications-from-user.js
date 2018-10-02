module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'wants_notifications')
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users',
      'wants_notifications',
      Sequelize.BOOLEAN
    )
  }
}
