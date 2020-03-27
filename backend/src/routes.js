const { Router } = require('express')
const OngController = require('./controllers/OngController')
const ProfileController = require('./controllers/ProfileController')
const IncidentController = require('./controllers/IncidentController')
const SessionController = require('./controllers/SessionController')

const routes = Router()

routes.get('/ongs', OngController.index)
routes.post('/ongs', OngController.create)

routes.get('/profile', ProfileController.index)

routes.post('/incidents', IncidentController.create)
routes.get('/incidents', IncidentController.index)
routes.delete('/incidents/:id', IncidentController.delete)

routes.post('/sessions', SessionController.create)

module.exports = routes 