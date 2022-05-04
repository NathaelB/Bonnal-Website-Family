import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import Image from "App/Models/Image";
import {string} from "@ioc:Adonis/Core/Helpers";

export default class ImagesController {

  public async index ({view}: HttpContextContract) {
    const images = await Image.query().orderBy('created_at', 'desc')
    return view.render('pages/manager/images/index', {
      images
    })
  }

  public async global ({view}: HttpContextContract) {
    const images = await Image.all()
    return view.render('pages/images/index', {
      images
    })
  }

  public async create ({view}: HttpContextContract) {
    return view.render('pages/manager/images/create')
  }

  public async store ({request, response}: HttpContextContract) {
    const title: string = await request.input('title')
    const thumbnail = request.file('thumbnail')
    const newName = string.generateRandom(32) + '.' + thumbnail?.extname
    await thumbnail?.moveToDisk('./', {
      name: newName,
    })
    console.log(thumbnail)
    await Image.create({
      title: title,
      thumbnail: thumbnail?.fileName
    })
    return response.redirect().toRoute('manager.images')
  }

  public async show ({ params, view }: HttpContextContract) {
    const image = await Image.findOrFail(params.id)
    return view.render('pages/manager/users/show', {
      image
    })
  }

  public async destroy ({params, response}: HttpContextContract) {
    console.log('test')
    const image = await Image.findOrFail(params.id)
    await image.delete()
    return response.redirect().toRoute('manager.images')
  }
}
