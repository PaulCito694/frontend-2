import axios from '@/lib/axios'
import useSWRMutation from 'swr/mutation'
import useSWR from 'swr'

const getSaleList = (url, { arg }) =>
  axios()
    .get(`${url}?${arg}`)
    .then(res => res.data)

const usePurchase = () => {
  const { data: saleList, isMutating, trigger } = useSWRMutation(
    'api/purchases',
    getSaleList,
  )

  const createPurchase = async data => {
    await axios().post('api/purchases', data)
    trigger()
  }

  const getProductById = id => useSWR(`api/purchases/${id}`, getSaleList)

  return {
    getProductById,
    saleList,
    isMutating,
    createPurchase,
    trigger,
  }
}

export default usePurchase
