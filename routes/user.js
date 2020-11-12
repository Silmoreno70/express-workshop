const express = require('express')
const user = express.Router()
const db = require('../config/database')
const jwt = require('jsonwebtoken')

user.post('/signin', async (req, res, next) => {
    const { user_name, user_mail, user_password } = req.body
    if (user_name && user_mail && user_password) {
        let query = `INSERT INTO user (user_name, user_mail, user_password)`
        query += `VALUES(
    '${user_name}',
    '${user_mail}',
    '${user_password}')`

        const rows = await db.query(query)

        if (rows.affectedRows == 1) {
            return res.status(201).json({
                code: 201,
                message: 'Usuario registrado correctamente'
            })
        }
        return res.status(500).json({
            code: 500,
            message: 'Ocurrió un error ☹'
        })
    }
    return res.status(500).json({
        code: 500,
        message: 'Campos incompletos'
    })
})

user.post('/login', async (req, res, next) => {
    const { user_mail, user_password } = req.body
    const query = `SELECT * FROM user WHERE user_mail = '${user_mail}' AND user_password = '${user_password}'`
    const rows = await db.query(query)

    if (user_mail && user_password) {
        if (rows.length == 1) {
            const token = jwt.sign({
                user_id: rows[0].user_id,
                user_mail: rows[0].user_mail
            }, 'debugkey')

            res.status(200).json({
                code: 200,
                message: token
            })
        }else{
            res.status(200).json({
                code: 200,
                message: 'Usuario y/o contraseña incorrectos',
                auth: false
            })
        }
    }
    return res.status(500).json({
        code: 500,
        message: 'Campos incompletos'
    })
})

user.get('/', async (req, res, next) => {
    const usr = await db.query("SELECT * FROM user")
    res.status(200).json({
        code: 1,
        message: usr
    })
})

module.exports = user