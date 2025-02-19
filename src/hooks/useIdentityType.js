import axios from '@/lib/axios'
import useSWR from 'swr'

const getIdentityTypeList = url =>
  axios()
    .get(url)
    .then(res => res.data)

const useIdentityType = () => {
  const { data: identityTypeList, isLoading } = useSWR(
    'api/identity_types',
    getIdentityTypeList,
  )
  return {
    identityTypeList,
    isLoading,
  }
}

export default useIdentityType
