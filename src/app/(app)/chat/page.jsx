'use client'

import React, { useEffect, useState } from 'react'
import axios from '@/lib/axios'
import Button from '@/components/Button'

const Page = () => {
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [event, setEvent] = useState({})

  const webSocketChannel = `channel_for_everyone`
  const connectWebSocket = () => {
    window.Echo.join(webSocketChannel)
      .here(users => {
        setEvent({ join: users })
      })
      .joining(user => {
        setEvent({ joining: user })
      })
      .leaving(user => {
        setEvent({ leaving: user })
      })
      .listen('CardMessageSent', async () => {
        await getMessages()
      })
  }

  const getMessages = async () => {
    try {
      const m = await axios.get(`api/cards`)
      setMessages(m.data)
      // setTimeout(scrollToBottom, 0)
    } catch (err) {
      setMessage(err)
    }
  }

  useEffect(() => {
    getMessages()
    connectWebSocket()

    return () => {
      window.Echo.leave(webSocketChannel)
    }
  }, [])

  const handleClick = async () => {
    await axios.post('api/card', {
      text: message,
    })
    setMessage('')
  }

  return (
    <div>
      {messages.map((_message, index) => {
        return <div key={index}>{_message.text}</div>
      })}
      {event}
      <input
        onChange={e => setMessage(e.target.value)}
        className="form-input"
        value={message}
      />
      <Button onClick={handleClick}>Crear tarjeta</Button>
    </div>
  )
}

export default Page
