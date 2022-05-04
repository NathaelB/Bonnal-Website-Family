import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Manager {
  public async handle({auth, response}: HttpContextContract, next: () => Promise<void>) {
    if (auth.user?.access == false) return response.redirect().toRoute('home')
    await next()
  }
}
