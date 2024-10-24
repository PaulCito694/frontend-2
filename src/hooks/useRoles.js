import axios from '@/lib/axios'
import useSWR from 'swr'

const getRolesList = url => axios.get(url).then(res => res.data)

const useRoles = () => {
    const { data: roleList, isLoading, mutate } = useSWR(
        'api/roles',
        getRolesList,
    )
    
    return {
        roleList,
        isLoading,
    }
}

export default useRoles