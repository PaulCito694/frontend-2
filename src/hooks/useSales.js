import axios from '@/lib/axios'
import useSWRMutation from 'swr/mutation'
import useSWR from 'swr'

const getSaleList = (url, { arg }) =>
  axios()
    .get(`${url}?${arg}`)
    .then(res => res.data)

const useProducts = () => {
  const { data: saleList, isMutating, trigger } = useSWRMutation(
    'api/sales',
    getSaleList,
  )

  const createSale = async data => {
    await axios().post('api/sales', data)
    trigger()
  }

  const getProductById = id => useSWR(`api/sales/${id}`, getSaleList)

  const sendSunat = id =>
    axios()
      .post(`api/sales/${id}/send_sunat`)
      .then(res => res.data)

  const querySunat = id =>
    axios()
      .post(`api/sales/${id}/query_sunat`)
      .then(res => res.data)

  const cancel = id =>
    axios()
      .put(`api/sales/${id}/cancel`)
      .then(res => res.data)

  return {
    getProductById,
    saleList,
    isMutating,
    createSale,
    trigger,
    sendSunat,
    cancel,
    querySunat,
  }
}

export default useProducts
