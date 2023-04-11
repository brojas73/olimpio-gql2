import { createPool } from 'mysql'

const pool = createPool({
                connectionLimit: 10,
                host: "localhost",
                user: "root",
                password: "Ol!mp!0!!@@",
                database: "olimpio"
             })

export default pool
