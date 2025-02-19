'use client'

import React from 'react'
import Header from '@/app/(app)/Header'
import { Field, Form } from 'react-final-form'
import useRooms from '@/hooks/useRooms'
import Button from '@/components/Button'
import { clearMutator } from 'utils/mutators'
import { Card, CardContent } from '@mui/material'
import Link from 'next/link'
import Loading from '@/app/Loading'

const Page = () => {
  const { channelList, isLoading, handleCreateChannel } = useRooms()

  if (isLoading) return <Loading />

  return (
    <>
      <Header title="Scrum poker" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <div>
                <p>Tus salas</p>
                <div className="grid gap-2 grid-cols-4">
                  {channelList?.map((channel, index) => (
                    <div key={index}>
                      <Link href={`room/${channel.id}`}>
                        <Card>
                          <CardContent>{channel.name}</CardContent>
                        </Card>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              <Form
                mutators={{ clear: clearMutator }}
                onSubmit={values => handleCreateChannel(values)}
                render={({ handleSubmit, submitting }) => (
                  <form onSubmit={handleSubmit}>
                    <h2>Crear una nueva sala:</h2>
                    <div>
                      <label>Nombre de la sala</label>
                      <Field
                        className="form-input"
                        name="channel_name"
                        component="input"
                      />
                    </div>
                    <Button type="submit" disabled={submitting}>
                      Crear sala
                    </Button>
                  </form>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
