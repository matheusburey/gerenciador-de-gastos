import { H3Event } from "h3"

import { getUserByEmail } from "~~/server/db/users"
import { userTransformer } from "~~/server/transformers/user"

export default defineEventHandler(async (event: H3Event) => {
  try {
    const body = await readBody(event)
    const { email, password } = body

    const user = await getUserByEmail(email)

    if (!user || !await verifyPassword(password, user.password)) {
      throw createError({
        statusCode: 400,
        message: 'Email ou senha inválidos'
      })
    }

    const token = generateToken(user.id)

    return {
      token,
      user: userTransformer(user),
    }
  } catch (error: any) {
    console.error('Error logging in:', error)
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      message: 'Ocorreu um erro ao processar seu registro. Por favor, tente novamente.'
    })
  }
})