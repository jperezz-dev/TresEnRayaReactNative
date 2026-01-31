import * as SQLite from 'expo-sqlite';

export const inicializarDB = () => {
    db.execSync(`
    CREATE TABLE IF NOT EXISTS puntuaciones (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT,
      dificultad TEXT,
      tiempo TEXT
    );
  `);
};

export const guardarPuntuacion = (nombre: string, dificultad: string, tiempo: string) => {
    return db.runSync(
        'INSERT INTO puntuaciones (nombre, dificultad, tiempo) VALUES (?, ?, ?)',
        [nombre, dificultad, tiempo]
    );
};

export const obtenerPuntuaciones = (dificultad: string) => {
    return db.getAllSync(
        'SELECT * FROM puntuaciones WHERE dificultad = ? ORDER BY tiempo ASC',
        [dificultad]
    );
};

// Export de la base de datos
export const db = SQLite.openDatabaseSync('puntuaciones.db');