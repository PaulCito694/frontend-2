import axios from '@/lib/axios'
import useSWR from 'swr'

const getProductList = url =>
  axios()
    .get(url)
    .then(res => res.data)

const useUnitOfMeasures = () => {
  const { data: unitOfMeasureList, isLoading, mutate } = useSWR(
    'api/unit_of_measures',
    getProductList,
  )
  const createUnitOfMeasure = async data => {
    await axios().post('api/unit_of_measures', data)
    mutate()
  }

  return {
    unitOfMeasureList,
    isLoading,
    createUnitOfMeasure,
  }
}

export default useUnitOfMeasures
