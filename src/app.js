// @ts-check
import eejsl from 'express-ejs-layouts'
import session from 'express-session'
import { join, resolve } from 'path'
import passport from './passport.js'
import flash from 'connect-flash'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

const app = express()

app.set('port', process.env.PORT || 3000)
app.set('views', join(resolve(process.cwd()), 'src', 'views'))
app.set('view engine', 'ejs')
app.use(eejsl)
app.set('layout', 'layouts/layout')

//middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(join(resolve(process.cwd()), 'src', 'public')))

app.use(flash())
app.use(
    session({
        secret: 'thisIsASecretShhh',
        resave: false,
        saveUninitialized: false
    })
)
app.use(passport.initialize())
app.use(passport.session())

const server = app.listen(app.get('port'), () => {
    console.log(`listen on http://localhost:${app.get('port')}`)
})

export default { server, app }
