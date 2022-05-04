import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export default class ManagerPolicy extends BasePolicy {
	public async view(user: User) {
	  if (user.access) {
	    console.log("true")
    }
    return user.access
  }
}
