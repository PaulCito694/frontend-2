import axios from '@/lib/axios'
import useSWR from 'swr'

const getChannelList = url => axios.get(url).then(res => res.data)

const useRooms = () => {
  const { data: channelList, isLoading, mutate } = useSWR(
    'api/channels',
    getChannelList,
  )

  const createChannel = async data => {
    try {
      await axios.post('api/sendWhatsappMessage', data)
      mutate()
    } catch (error) {
      console.error('Error al agregar el canal:', error)
    }
  }

  const getRoomById = id =>
    useSWR(`api/channels/${id}`, url => axios.get(url).then(res => res.data))

  return {
    getRoomById,
    channelList,
    isLoading,
    handleCreateChannel: createChannel,
  }
}

export default useRooms
