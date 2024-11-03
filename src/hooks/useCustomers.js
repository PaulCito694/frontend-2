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

    const findAsyncCustomer = dni =>
      axios()
      .get(`api/customers/find_customer?document_number=${dni}`)
      .then(res => res.data)

    return {
        getCustomerById,
        customerList,
        isLoading,
        createCustomer,
        findCustomerByDni,
        findAsyncCustomer,
    }
}

export default useCustomers
