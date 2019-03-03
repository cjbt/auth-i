exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('auth')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('auth').insert([
        { username: 'hamza', password: 'hamza' },
        { username: 'kelly', password: 'kelly' },
        { username: 'john', password: 'john' },
        { username: 'michael', password: 'michael' },
        { username: 'nathan', password: 'nathan' }
      ]);
    });
};
