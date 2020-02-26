'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('users', 'UserController.store').validator('User')
Route.post('sessions', 'SessionController.store').validator('Session')

Route.post('passwords', 'ForgotPasswordController.store')
  .validator('ForgotPassword')
Route.put('passwords', 'ForgotPasswordController.update')
  .validator('ResetPassword')

Route.get('/files/:file', 'FileController.show')

Route.group(() => {
  Route.post('/files', 'FileController.store')

  Route.resource('projects', 'ProjectController')
    .apiOnly()
    .validator(new Map([
      [['project.store'], ['Project']]
    ]))

  Route.resource('projects.tasks', 'TaskController')
    .apiOnly()
    .validator(new Map([
      [['project.tasks.store'], ['Task']]
    ]))
}).middleware(['auth'])
