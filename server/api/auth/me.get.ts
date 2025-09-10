import { getUserById } from "~~/server/db/users"
import { userTransformer } from "~~/server/transformers/user"

export default defineEventHandler(async (event) => {
  try {
    const userId = event.context.userId
    const user = await getUserById(userId)

    if (!user) {
      throw new Error('User not found')
    }

    return {
      user: userTransformer(user)
    }

  } catch (error) {
    throw createError({ statusCode: 401, message: 'Invalid token' })
  }
})