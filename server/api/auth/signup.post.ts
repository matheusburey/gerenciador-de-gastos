import { createUser, getUserByEmail } from '~~/server/db/users'
import { userTransformer } from '~~/server/transformers/user'

export default defineEventHandler(async (event) => {
  const { name, email, password } = await readBody(event)

  // Input validation
  if (!name || !email || !password) {
    throw createError({
      statusCode: 400,
      message: 'Missing required fields'
    })
  }

  if (password.length < 8) {
    throw createError({
      statusCode: 400,
      message: 'Password must be at least 8 characters long'
    })
  }

  try {
    // Check if user already exists
    const existingUser = await getUserByEmail(email)

    if (existingUser) {
      throw createError({
        statusCode: 400,
        message: 'Email already registered'
      })
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    const userData = {
      name,
      email,
      password: hashedPassword,
      profileImage: 'https://www.gravatar.com/avatar/?d=mp'
    }

    // Create new user
    const user = await createUser(userData)

    // Return user data and token
    return {
      user: userTransformer(user)
    }
  } catch (error: any) {
    throw error
  }
})