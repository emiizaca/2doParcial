const {pool} = require('../config/config');

const getTutoriales = async () => {
    const tutoriales = await pool.query('SELECT * FROM TUTORIAL');
    return tutoriales.rows;
};


const getTutorial = async (id) => {
    const query = {
        text: 'SELECT * FROM TUTORIAL WHERE ID = $1',
        values: [id]
      }
    const tutoriales = await pool.query(query);
    return tutoriales.rows[0];
};


const removeTutorial = async (id) => {
    const query = {
        text: 'DELETE FROM TUTORIAL WHERE ID = $1',
        values: [id]
      }
    const removeRow = await pool.query(query);
    return removeRow.rowCount;
};

const removeTutoriales = async () => {
    const tutoriales = await pool.query('DELETE FROM TUTORIAL');
    return tutoriales.rows;
}
 

const addTutorial = async (tutorial) => {
    const query = {
        text: 'INSERT INTO TUTORIAL (id, titulo, descripcion, publicado ) VALUES ($1, $2, $3, $4)',
        values: [tutorial.id, tutorial.titulo, tutorial.descripcion, tutorial.publicado]
      }
    const addRow = await pool.query(query);
    return addRow.rowCount;
}


module.exports =  { getTutoriales, addTutorial, getTutorial, removeTutorial, removeTutoriales };