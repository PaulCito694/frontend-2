import axios from '@/lib/axios'
import useSWR from 'swr'

const getProductList = url => axios.get(url).then(res => res.data)

const useProducts = () => {
  const { data: productList, isLoading, mutate } = useSWR(
    'api/products',
    getProductList,
  )
  const createProduct = async data => {
    try {
      await axios.post('api/products', data)
      mutate()
    } catch (error) {
      console.error('Error al agregar el producto:', error)
    }
  }

  const getProductById = id =>
    useSWR(`api/products/${id}`, url => axios.get(url).then(res => res.data))

  const deleteProductById = id =>
    useSWR(`api/products/${id}`, url => axios.delete(url).then(res => res.data))

  const updateProductById = values =>
    useSWR(`api/products/${values['id']}`, url =>
      axios.put(url, values).then(res => res.data),
    )

  return {
    getProductById,
    productList,
    isLoading,
    createProduct,
    deleteProductById,
    updateProductById,
  }
}

export default useProducts
