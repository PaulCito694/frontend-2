import axios from '@/lib/axios'
import useSWR from 'swr'

const getSaleList = url => axios.get(url).then(res => res.data)

const useProducts = () => {
  const { data: saleList, isLoading, mutate } = useSWR('api/sales', getSaleList)

  const createSale = async data => {
    try {
      await axios.post('api/sales', data)
      mutate()
    } catch (error) {
      console.error('Error al agregar el producto:', error)
    }
  }

  const getProductById = id => useSWR(`api/sales/${id}`, getSaleList)

  return {
    getProductById,
    saleList,
    isLoading,
    createSale,
  }
}

export default useProducts
