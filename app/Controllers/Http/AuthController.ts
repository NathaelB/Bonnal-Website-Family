import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import StoreValidator from 'App/Validators/users/StoreValidator'
import User from 'App/Models/User'

export default class AuthController {

  public async login ({view}: HttpContextContract) {
    return view.render('pages/authentication/login')
  }

  public async register ({ view }: HttpContextContract) {
    return view.render('pages/authentication/register')
  }

  public async registerWeb ({request, response}: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    await User.create({
      ...data,
      access: false
    })

    return response.redirect().toRoute('home')
  }

  public async loginWeb ({ request, auth, response, session}: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      await auth.use('web').attempt(email, password)
      await response.redirect().toRoute('home')
    } catch  {
      session.flash({error: "Identifiants Incorrects"})
      response.redirect().toRoute('home')
    }
  }

  public async logoutWeb ({ auth, response }: HttpContextContract) {
    await auth.use('web').logout()
    return response.redirect().toRoute('home')
  }
}
