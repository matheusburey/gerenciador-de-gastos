export default defineEventHandler(async (event) => {
  // ignore health check and auth routes
  const url = event.node.req.url!
  if (['/api/health', '/api/auth/login', '/api/auth/signup'].includes(url)) return

  const authHeader = getHeader(event, 'authorization')

  if (!authHeader) {
    throw createError({ statusCode: 401, message: 'No token provided' })
  }

  try {
    const token = authHeader.split(' ')[1]

    const userId = decodeToken(token)
    event.context.userId = userId

  } catch (error) {
    throw createError({ statusCode: 401, message: 'Invalid token' })
  }
})