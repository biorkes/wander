export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)
  const channelCode = body.productvalue
  
  try {
    const response = await fetch(config.public.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        productvalue: `http://${body.hostname}/?ch=${channelCode}`,
        key: config.public.apiKey
      })
    })
    
    return await response.text()
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Failed to check product'
    })
  }
}) 