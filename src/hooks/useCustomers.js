import axios from '@/lib/axios'
import useSWR from 'swr'

const getCustomerList = url =>
  axios()
    .get(url)
    .then(res => res.data)

const useCustomers = () => {
  const { data: customerList, isLoading, mutate } = useSWR(
    'api/customers',
    getCustomerList,
  )
  const createCustomer = async data => {
    try {
      await axios().post('api/customers', data)
      mutate()
    } catch (error) {
      console.error(
        'Error al agregar el cliente',
        error.response ? error.response.data : error,
      )
    }
  }

  const getCustomerById = id =>
    useSWR(`api/cutomers/${id}`, url =>
      axios()
        .get(url)
        .then(res => res.data),
    )

    const findCustomerByDni = dni => {
        return customerList?.find(customer => customer.person_attributes.dni === dni) || null
    }

    return {
        getCustomerById,
        customerList,
        isLoading,
        createCustomer,
        findCustomerByDni,
    }
}

export default useCustomers
