export const useProductCheck = () => {
  const checkProduct = async (channelCode: string): Promise<ProductInfo | null> => {
    try {
      if (!process.client) {
        return { isValid: true, productData: null }
      }

      const response = await useFetch('/api/check-product', {
        method: 'POST',
        body: {
          productvalue: channelCode,
          hostname: window.location.hostname
        }
      })
      
      const text = response.data.value as string
      return { isValid: text === '1', productData: text }
    } catch (error) {
      console.error('Product check failed:', error)
      return null
    }
  }

  return {
    checkProduct
  }
}

interface ProductInfo {
  isValid: boolean;
  productData?: any;
} 