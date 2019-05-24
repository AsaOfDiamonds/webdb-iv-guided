
exports.up = function(knex, Promise) {
  // the tables must be created in the right order
  //tables with a foreign key are created after the referenced parent table
  //create the one table first in the one to many realtionship
  return knex.schema
  .createTable('tracks', tbl => {
    tbl.increments();

    tbl
      .string('name', 128)
      .notNullable()
      .unique()
  })//possible to chain multiple createTable calls
  .createTable('cohorts', tbl => {
    tbl.increments();
    tbl
      .string('name', 128)
      .notNullable()
      .unique()
    tbl
      .integer('track_id')
      .unsigned()
      .references('id')
      .inTable('tracks')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')  
  })
  .createTable('students', tbl => {
    tbl.increments()

    tbl
      .string('name', 128)
      .notNullable()
  })
  .createTable('cohort_students', tbl => {
    // the students and the cohorts table must be created before this table is created
    tbl.increments()

    tbl
      .integer('cohort_id')
      .unsigned()
      .references('id')
      .inTable('cohorts')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      
    tbl
    .integer('student_id')
    .unsigned()
    .references('id')
    .inTable('students')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')  

  })
};

exports.down = function(knex, Promise) {
  // tables with foreign key must be removed before the
  return knex.schema
  .dropTableIfExists('cohorts_students')
  .dropTableIfExists('students') 
  .dropTableIfExists('cohorts') 
  .dropTableIfExists('tracks')  
};
