import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Blog from "App/Models/Blog";

export default class ManagersController {

  public async index ({view, auth}: HttpContextContract) {
      const blogs = await Blog.query().orderBy('created_at', 'desc')
      return view.render('pages/manager/index', {
        user: auth.user,
        blogs
      })
  }
}
