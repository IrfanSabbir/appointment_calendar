import Dexie from 'dexie';

const db = new Dexie('Doctor');
db.version(1).stores({ appointment: 'id,[date]' });

export default db;