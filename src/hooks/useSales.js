import axios from '@/lib/axios'
import useSWRMutation from 'swr/mutation'
import useSWR from 'swr'

const getSaleList = (url, { arg }) =>
  axios.get(`${url}?${arg}`).then(res => res.data)

const useProducts = () => {
  const { data: saleList, isMutating, trigger } = useSWRMutation(
    'api/sales',
    getSaleList,
  )
  console.debug('entra')

  const createSale = async data => {
    try {
      await axios.post('api/sales', data)
      trigger()
    } catch (error) {
      console.error('Error al agregar el producto:', error)
    }
  }

  const getProductById = id => useSWR(`api/sales/${id}`, getSaleList)

  return {
    getProductById,
    saleList,
    isMutating,
    createSale,
    trigger,
  }
}

export default useProducts
