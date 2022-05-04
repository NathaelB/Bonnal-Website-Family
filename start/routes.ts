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
import Blog from "App/Models/Blog";


import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  const articles = await Blog.query().orderBy('created_at', 'desc').limit(3)
  return view.render('pages/index', {
    articles
  })
}).as('home')

Route.group(() => {
  Route.get('/', 'BlogsController.global').as('blogs')
  Route.get('/:id', 'BlogsController.visit').as('blog')
}).prefix('blogs')

Route.get('/images', 'ImagesController.global').as('image')



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
    Route.get('/', 'BlogsController.index').as('manager.blogs')
    Route.get('/new', 'BlogsController.create').as('manager.blogs.create')
    Route.post('/new', 'BlogsController.store')

    Route.get('/:id', 'BlogsController.show').as('manager.blog')
    Route.put('/:id', 'BlogsController.update' )
    Route.delete('/:id', 'BlogsController.destroy')
  }).prefix('blogs')

  Route.group(() => {
    Route.get('/', 'ImagesController.index').as('manager.images')
    Route.get('/new', 'ImagesController.create').as('manager.images.create')
    Route.post('/new', 'ImagesController.store')

    Route.get('/:id', 'ImagesController.show').as('manager.image')
    Route.delete('/:id', 'ImagesController.destroy')
  }).prefix('images')



  Route.group(() => {
    Route.get('/', 'UsersController.index').as('manager.users')
    Route.get('/new', 'UsersController.create').as('manager.users.create')
    Route.delete('/new', 'UsersController.store')

    Route.get('/:id', 'UsersController.show').as('manager.user')
    Route.delete('/:id', 'UsersController.destroy')
  }).prefix('users')
}).prefix('manager').middleware(['manager'])
