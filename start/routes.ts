/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

Route.group(() => {
    Route.get('/health', async ({ response }) => {
        const report = await HealthCheck.getReport()
        return report.healthy ? response.ok(report) : response.badRequest(report)
    })

    //Route.resource('/todolists', 'ToDoListsController').apiOnly() //usar o resource
    Route.post('/todolists', 'ToDoListsController.createTask')
    Route.get('/todolists', 'ToDoListsController.getAllTasks')
    //Route.get('/todolists/favs', 'ToDoListsController.getAllFavsTasks') //tirar essa rota
    Route.get('/todolists/:favs', 'ToDoListsController.getFiltredTasks')
    //repito so favs abaixo? n duplicar
    Route.delete('/todolists/:id', 'ToDoListsController.deleteTask')
    Route.patch('/todolists/:id', 'ToDoListsController.editTask')
}).prefix(`/api`)
