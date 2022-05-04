import View from '@ioc:Adonis/Core/View'
import Blog from "App/Models/Blog";


View.global('number', (val: string) => {
  return +val
})

View.global('managerMenu', [
  {
    path: 'manager.home',
    name: "Accueil",
    slug: 'accueil'
  },
  {
    path: 'manager.blogs',
    name: "Blogs",
    slug: 'blogs'
  },
  {
    path: 'manager.users',
    name: 'Users',
    slug: 'users'
  },
  {
    path: 'manager.images',
    name: 'Images',
    slug: 'images'
  }
])

View.global('links', [
  {name: "Accueil", path: 'home'},
  {name: "Blog", path: 'blogs'},
  {name: "Images", path: 'image'}
])

View.global('blogsLast', async () => {
  return Blog.query().orderBy('created_at', 'desc').limit(3)

})
