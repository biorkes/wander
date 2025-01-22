import type { OrderData } from '~/types/order'
import type { Package, PackageItem } from '~/types/packages'

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
    
    console.log('Received order body:', body)
    
    // Validate required data
    if (!body?.cart?.length) {
      console.error('Invalid cart data:', { body, cart: body?.cart })
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid cart data'
      })
    }

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
      price: Number(item.price) / Number(item.qty)
    }))
    
    if (cartItems.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Cart is empty or invalid'
      })
    }
    
    console.log('Formatted cart items:', cartItems)
    
    // Format data according to API requirements
    const formattedData = [{
      country_iso: body.country_iso,
      page: `${process.env.DOMAIN || 'wanderheat.com'}/?ch=${body.channelCode}`,
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
    const response = await $fetch<any>(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${process.env.ORDERS_AUTH_TOKEN}`
      },
      body: formattedData
    })

    // Check for API error response
    if (response?.status === 'error') {
      throw createError({
        statusCode: 400,
        statusMessage: typeof response.message === 'object' 
          ? Object.values(response.message).flat().join(', ')
          : response.message
      })
    }

    // Check if we have a successful order with order_id
    if (Array.isArray(response) && response[0]?.order_id && response[0]?.status === 'success') {
      return {
        orderId: response[0].order_id,
        status: 'success',
        message: response[0].message
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