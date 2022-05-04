import Factory from '@ioc:Adonis/Lucid/Factory'
import User from "App/Models/User";
import Env from "@ioc:Adonis/Core/Env";


export const UserFactory = Factory
  .define(User, () => {
   return {
     username: "Bruno",
     email: Env.get('ADMIN_MAIL'),
     password: Env.get('ADMIN_MDP'),
     access: true
   }
}).build()

