import pool from './pool.js'

const estadosServicioDomicilio = () => {
    const q = `select * from estado_servicio_domicilio where estado = 1`

    return new Promise((resolve, reject) => {
        pool.query(q, (err, data) => {
            if (err) {
                console.log(err)
                reject(err)
            }

            resolve(JSON.parse(JSON.stringify(data)))
        })
    })
}

const estadosTareaExterna = () => {
    const q = `select * from estado_tarea where estado = 1`

    return new Promise((resolve, reject) => {
        pool.query(q, (err, data) => {
            if (err) {
                console.log(err)
                reject(err)
            }

            resolve(JSON.parse(JSON.stringify(data)))
        })
    })
}

const formasPago = () => {
    const q = `select * from forma_pago where estado = 1`

    return new Promise((resolve, reject) => {
        pool.query(q, (err, data) => {
            if (err) {
                console.log(err)
                reject(err)
            }

            resolve(JSON.parse(JSON.stringify(data)))
        })
    })
}

const roles = () => {
    const q = `select * from rol where estado = 1`

    return new Promise((resolve, reject) => {
        pool.query(q, (err, data) => {
            if (err) {
                console.log(err)
                reject(err)
            }

            resolve(JSON.parse(JSON.stringify(data)))
        })
    })
}

const sucursales = () => {
    const q = `select * from sucursal where estado = 1`

    return new Promise((resolve, reject) => {
        pool.query(q, (err, data) => {
            if (err) {
                console.log(err)
                reject(err)
            }

            resolve(JSON.parse(JSON.stringify(data)))
        })
    })
}

const tiposServicio = () => {
    const q = `select * from tipo_servicio where estado = 1`

    return new Promise((resolve, reject) => {
        pool.query(q, (err, data) => {
            if (err) {
                console.log(err)
                reject(err)
            }

            resolve(JSON.parse(JSON.stringify(data)))
        })
    })
}

const tiposTrabajo = () => {
    const q = `select * from tipo_trabajo where estado = 1`

    return new Promise((resolve, reject) => {
        pool.query(q, (err, data) => {
            if (err) {
                console.log(err)
                reject(err)
            }

            resolve(JSON.parse(JSON.stringify(data)))
        })
    })
}

export default {
    estadosServicioDomicilio,
    estadosTareaExterna,
    formasPago,
    roles,
    sucursales,
    tiposServicio,
    tiposTrabajo
}