module.exports = {
  test: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: 'learnco_blog_test'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: 'learnco_blog'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
