import axios from '@/lib/axios'
import useSWR from 'swr'

const getEmployeesList = url => axios.get(url).then(res => res.data)

const useEmployees = () => {
    const { data: employeeList, isLoading, mutate } = useSWR(
        'api/employees',
        getEmployeesList,
    )
    const createEmployee = async data => {
        try {
            await axios.post('api/employees', data)            
            mutate()
        } catch (error) {
            console.error('Error al agregar el cliente', error.response ? error.response.data : error)
        }
    }

    const getEmployeeById = id =>
        useSWR(`api/employees/${id}`, url => axios.get(url).then(res => res.data))

    return {
        getEmployeeById,
        employeeList,
        isLoading,
        createEmployee,
    }
}

export default useEmployees