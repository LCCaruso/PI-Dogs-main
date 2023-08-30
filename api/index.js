const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ alter: true }).then(() => { 
  // force:true es para eliminar si existe una tabla
  // alter:true si queremos modificar
  server.listen(3001, () => {
    console.log('Servidor funcionando en puerto 3001'); // eslint-disable-line no-console
  });
});