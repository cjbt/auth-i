exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('auth')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('auth').insert([
        { id: 1, username: 'hamza', password: 'hamza' },
        { id: 2, username: 'kelly', password: 'kelly' },
        { id: 3, username: 'john', password: 'john' },
        { id: 4, username: 'michael', password: 'michael' },
        { id: 5, username: 'nathan', password: 'nathan' }
      ]);
    });
};
