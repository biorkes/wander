import type { OrderData } from '~/types/order'

export default defineEventHandler(async (event) => {
  try {
    // Check request origin and referer
    const origin = getRequestHeader(event, 'origin')
    const referer = getRequestHeader(event, 'referer')
    const host = getRequestHeader(event, 'host')

    // Get allowed domains from env or config
    const allowedDomains = [
      process.env.NUXT_PUBLIC_SITE_URL,
      `https://${host}`,
      'http://localhost:3000' // For development
    ]

    if (!origin || !allowedDomains.includes(origin)) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Forbidden: Invalid origin'
      })
    }

    const body = await readBody<OrderData>(event)
    
    // External API configuration
    const API_URL = process.env.ORDERS_API_URL
    if (!API_URL) {
      throw createError({
        statusCode: 500,
        statusMessage: 'API URL not configured'
      })
    }
    
    // Format cart items
    const cartItems = body.cart.map(item => ({
      id: item.sku,
      qty: item.qty,
      price: item.price / item.qty
    }))

    // Get product value from channelCode (remove http/https/www)
    const domain = process.env.DOMAIN || 'wanderheat.com'
    let productValue
    
    try {
      // Try to parse as URL if it's a full URL
      const url = new URL(body.channelCode)
      const subdomainMatch = url.hostname.match(/^([^.]+)\.(.+)$/)
      const channelValue = url.searchParams.get('ch')
      
      productValue = subdomainMatch
        ? `${subdomainMatch[1]}.${domain}/?ch=${channelValue}`
        : `${domain}/?ch=${channelValue}`
    } catch {
      // If not a valid URL, construct it from channelCode
      productValue = `${domain}/?ch=${body.channelCode}`
    }
    
    // Format data according to API requirements
    const formattedData = [{
      country_iso: body.country_iso, // Get country from domain
      page: productValue,
      name: `${body.firstName} ${body.lastName}`,
      address: body.address,
      city: body.city,
      zip: body.zip,
      tel1: body.phone,
      email: body.email,
      cart: cartItems,
      delivery_tax: body.deliveryTax,
      total: body.total
    }]
    // Make request to external API
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${process.env.ORDERS_AUTH_TOKEN}`
      },
      body: JSON.stringify(formattedData)
    })

    const responseText = await response.text()
    console.log('API Response:', {
      status: response.status,
      text: responseText,
      formattedData
    })

    const data = responseText ? JSON.parse(responseText) : null

    // Check for API error response
    if (data?.status === 'error') {
      throw createError({
        statusCode: 400,
        statusMessage: typeof data.message === 'object' 
          ? Object.values(data.message).flat().join(', ')
          : data.message
      })
    }

    // Check if we have a successful order with order_id
    if (Array.isArray(data) && data[0]?.order_id && data[0]?.status === 'success') {
      return {
        orderId: data[0].order_id,
        status: 'success',
        message: data[0].message
      }
    }

    // If response format is unexpected
    throw createError({
      statusCode: 500,
      statusMessage: 'Invalid response format from order API'
    })

  } catch (error: any) {
    console.error('Order API error:', {
      error,
      message: error.message,
      stack: error.stack
    })
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to process order: ${error.message}`
    })
  }
}) 