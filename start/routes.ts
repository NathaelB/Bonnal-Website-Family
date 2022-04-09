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
| import './routes/customer''
|
*/
const links = [
  {name: "Accueil", path: 'home'},
  {name: "Blog", path: 'blog'}
]
import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('pages/index', links)
}).as('home')


Route.get('/blog', async ({view}) => {
  return view.render('pages/blog/index', links)
}).as('blog')


Route.group(() => {
  Route.get('/login', 'AuthController.login').as('login')
  Route.get('/register', 'AuthController.register').as('register')

  Route.post('/login', 'AuthController.loginWeb')
  Route.post('/register', 'AuthController.registerWeb')
  Route.post('/logout', 'AuthController.logoutWeb')
}).prefix('authentication')

Route.group(() => {
  Route.get('/', 'ManagersController.index').as('manager.home')

  Route.group(() => {
    Route.get('/', 'UsersController.index').as('manager.users')
  }).prefix('users')
}).prefix('manager')
