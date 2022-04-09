import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {

  public async index ({view, bouncer, response, request}: HttpContextContract) {
    if (await bouncer.can('manager')) {
      const page = await request.input('page', 1)
      const users = User.query().paginate(page, 10)
      return view.render('pages/manager/users/index', {
        users
      })
    }
    return response.redirect().toRoute('home')
  }

  public async show ({view,bouncer, response, params}: HttpContextContract) {
    if (await bouncer.can('manager')) {
      const user = await User.findOrFail(params.id)
      return view.render('pages/manager/users/show', {
        user
      })
    }
    return response.redirect().toRoute('home')
  }

  public async destroy ({params, response, session}: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    await user.delete()

    session.flash({
      success: "L'utilisateur a bien été supprimé"
    })
    return response.redirect().toRoute('manager.users')
  }
}
