import { updateUser } from "~~/server/db/users"
import { userTransformer } from "~~/server/transformers/user"

export default defineEventHandler(async (event) => {
  const { name, email, password, profileImage } = await readBody(event)
  if (!name || !email || !password || !profileImage) {
    throw createError({ statusCode: 400, message: 'Missing required fields' })
  }

  try {
    const userId = event.context.userId
    const user = await updateUser(userId, {
      name,
      email,
      password: await hashPassword(password),
      profileImage,
    })

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