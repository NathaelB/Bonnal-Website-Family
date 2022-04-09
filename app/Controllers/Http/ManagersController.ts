import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ManagersController {

  public async index ({view, bouncer, auth, response}: HttpContextContract) {
    if (await bouncer.can('manager')) {
      return view.render('pages/manager/index', {
        user: auth.user
      })
    }
    return response.redirect().toRoute('home')
  }
}
