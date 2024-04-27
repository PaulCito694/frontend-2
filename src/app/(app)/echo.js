import Echo from 'laravel-echo'
import axios from '@/lib/axios'

import Pusher from 'pusher-js'

window.Pusher = Pusher

window.Echo = new Echo({
  broadcaster: 'reverb',
  key: 'styyi5g0mmj6cqdnajww',
  wsHost: 'localhost',
  wsPort: 8080,
  wssPort: 8080,
  forceTLS: false,
  enabledTransports: ['ws', 'wss'],
  authorizer: channel => {
    return {
      authorize: (socketId, callback) => {
        axios
          .post('/api/broadcasting/auths', {
            socket_id: socketId,
            channel_name: channel.name,
          })
          .then(response => {
            callback(false, response.data)
          })
          .catch(error => {
            callback(true, error)
          })
      },
    }
  },
})
