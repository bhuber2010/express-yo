
exports.up = function(knex, Promise) {
  return knex.schema.hasTable('users')
    .then(function(exists){
      if (exists) {
        return knex.schema.table('users', function(tbl){
          tbl.string('options', 60)
        })
      }
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(tbl){
    tbl.dropColumn('options')
  })
};
