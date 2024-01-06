'use server'

import { CreateUserParams, UpdateUserParams } from "@/types"
import { handleError } from "../utils"
import { connectToDb } from "../database"
import User from "../database/models/user.model"
import { revalidatePath } from "next/cache"
import Event from "../database/models/event.model"
import Order from "../database/models/Order.model"

export  const createUser=async(user:CreateUserParams)=>{
    try{
        await connectToDb()
        console.log('connected est')
        const newUser= await User.create(user)

        return JSON.parse(JSON.stringify(newUser))
    }catch(err)
    {
        handleError(err)
    }

}
export  const updateUser=async(user:UpdateUserParams,clerkId:string)=>{
    try{
        await connectToDb()

        const updatedUser= await User.findByIdAndUpdate({clerkId},user,{new:true})
        if(!updatedUser)throw new Error("User update failed")
        return JSON.parse(JSON.stringify(updatedUser))
    }catch(err)
    {
        handleError(err)
    }

}


export async function deleteUser(clerkId: string) {
    try {
      await connectToDb()
  
      // Find user to delete
      const userToDelete = await User.findOne({ clerkId })
  
      if (!userToDelete) {
        throw new Error('User not found')
      }
  
      // Unlink relationships
      await Promise.all([
        // Update the 'events' collection to remove references to the user
        Event.updateMany(
          { _id: { $in: userToDelete.events } },
          { $pull: { organizer: userToDelete._id } }
        ),
  
        // Update the 'orders' collection to remove references to the user
        Order.updateMany({ _id: { $in: userToDelete.orders } }, { $unset: { buyer: 1 } }),
      ])
  
      // Delete user
      const deletedUser = await User.findByIdAndDelete(userToDelete._id)
      revalidatePath('/')
  
      return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null
    } catch (error) {
      handleError(error)
    }
  }