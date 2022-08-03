
import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import StoreValidator from "App/Validators/blogs/StoreValidator";
import {string} from "@ioc:Adonis/Core/Helpers";
import Blog from "App/Models/Blog";
import UpdateValidator from "App/Validators/blogs/UpdateValidator";

export default class BlogsController {
  public async index ({view}: HttpContextContract) {
    const blogs = await Blog.query().orderBy('created_at', 'desc')
    return view.render('pages/manager/blogs/index', {
      blogs
    })
  }

  public async global ({view, request}: HttpContextContract) {
    const page = await request.input('page', 1)
    const articles = await Blog.query().paginate(page, 3)
    return view.render('pages/blogs/index', {
      articles
    })
  }

  public async visit ({view, params}: HttpContextContract) {
    const article = await Blog.findBy('slug',params.id)
    return view.render('pages/blogs/show', {
      article
    })
  }

  public async show ({view, params}: HttpContextContract) {
    const article = await Blog.findOrFail(params.id)
    return view.render('pages/manager/blogs/show', {
      article
    })

  }

  public async create ({view}: HttpContextContract) {
    return view.render('pages/manager/blogs/create')
  }

  public async store ({request, response}: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    const slug = data.title.split(' ').join('-').toLowerCase()

    const thumbnail = request.file('thumbnail')
    const newName = string.generateRandom(32) + '.' + thumbnail?.extname
    await thumbnail?.moveToDisk('./', {
      name: newName,
    })
    await Blog.create({
      ...data,
      slug: slug,
      thumbnail: thumbnail?.fileName
    })

    return response.redirect().toRoute('manager.home')
  }

  public async update ({request, params, response}: HttpContextContract) {
    const article = await Blog.findOrFail(params.id)
    const data = await request.validate(UpdateValidator)
    const slug = data.title?.split(' ').join('-').toLowerCase()

    const thumbnail = request.file('thumbnail')
    const newName = string.generateRandom(32) + '.' + thumbnail?.extname
    await thumbnail?.moveToDisk('./', {name: newName})
    console.log(request.allFiles())
    await article.merge({
      ...data,
      slug: slug,
      thumbnail: thumbnail?.fileName
    }).save()
    return response.redirect().toRoute('manager.home')
  }

  public async destroy ({params, response}: HttpContextContract) {
    const article = await Blog.findOrFail(params.id)
    await article.delete()
    return response.redirect().toRoute('manager.home')
  }
}
