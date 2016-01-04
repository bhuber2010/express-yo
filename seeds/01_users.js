
exports.seed = function(knex, Promise) {
  var tblName = 'users';

  var rows = [
    {display_name: 'Brian Huber', user_id: '113680426776437192073', times_seen: '1', provider: 'google'},
    {display_name: 'Brian Huber', user_id: '10153868433638179', times_seen: '1', provider: 'facebook'},
    {display_name: 'Ryan Douglas', user_id: '109132412609960664179', times_seen: '1', provider: 'google'},
    {display_name: 'Danny Fritz', user_id: '103524170104242138300', times_seen: '1', provider: 'google'},
    {display_name: 'Nidhi Seth', user_id: '116009922747106159261', times_seen: '1', provider: 'google'}
  ]

  return knex(tblName)
    .del()
    .then(function(){
      return knex.insert(rows).into(tblName)
    })
};
