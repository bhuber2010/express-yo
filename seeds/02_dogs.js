
exports.seed = function(knex, Promise) {
  var tblName = 'dogs';

  var rows = [
    {name: 'Bernie', breed: 'Chihuahua', session_sid: 'CehLRv0zOm5lPNS-lNssJIrjAf6kxwL3', user_id: '113680426776437192073'},
    {name: 'Reese', breed: 'Chow/Lab', session_sid: 'CehLRv0zOm5lPNS-lNssJIrjAf6kxwL3', user_id: '113680426776437192073'},
    {name: 'Angie', breed: 'Borzoi', session_sid: 'CehLRv0zOm5lPNS-lNssJIrjAf6kxwL3', user_id: '113680426776437192073'},
    {name: 'Kaya', breed: 'Husky', session_sid: 'CehLRv0zOm5lPNS-lNssJIrjAf6kxwL3', user_id: '113680426776437192073'},
    {name: 'Sasha', breed: 'Chow/Husky', session_sid: 'CehLRv0zOm5lPNS-lNssJIrjAf6kxwL3', user_id: '113680426776437192073'},
    {name: 'Lucky', breed: 'Golden Retriever', session_sid: 'otjkXMlqwETTh1CsLM9GxlAdTokxrp7K', user_id: '109132412609960664179'},
    {name: 'Lacey', breed: 'American Bulldog/Boxer', session_sid: 'otjkXMlqwETTh1CsLM9GxlAdTokxrp7K', user_id: '109132412609960664179'},
    {name: 'Ringo', breed: 'Rhodesian Ridgeback/Lab-Mix', session_sid: 'otjkXMlqwETTh1CsLM9GxlAdTokxrp7K', user_id: '109132412609960664179'},
    {name: 'Kaizer', breed: 'Golden retriever', session_sid: 'MR9aQXhZeEc4fFWsMiYdYUF7sQ3OcFDK', user_id: '116009922747106159261'},
    {name: 'Pollo', breed: 'Lab', session_sid: 'CehLRv0zOm5lPNS-lNssJIrjAf6kxwL3', user_id: '113680426776437192073'},
    {name: 'Lassie', breed: 'Lab', session_sid: 'tIOn89c3NndEU0DZs4qCn4Wn41Z5nAnS', user_id: '103524170104242138300'},
    {name: 'Lena', breed: 'Borzoi', session_sid: 'CehLRv0zOm5lPNS-lNssJIrjAf6kxwL3', user_id: '113680426776437192073'},
    {name: 'Duke', breed: 'Akita', session_sid: 'CehLRv0zOm5lPNS-lNssJIrjAf6kxwL3', user_id: '113680426776437192073'},
    {name: 'Reeser Piecer', breed: 'Chow/Lab mix', session_sid: 'CehLRv0zOm5lPNS-lNssJIrjAf6kxwL3', user_id: '10153868433638179'}
  ]

  return knex(tblName)
    .del()
    .then(function(){
      return knex.insert(rows).into(tblName)
    })
};
