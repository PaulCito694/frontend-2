'use client'

import React from 'react'
import Header from '@/app/(app)/Header'
import useRooms from '@/hooks/useRooms'
import { Card, CardContent, CardHeader } from '@mui/material'
require('../../echo')

const Page = ({ params }) => {
  const { getRoomById } = useRooms()
  const { data: room, isLoading } = getRoomById(params.id)
  const values = [1, 2, 3, 5, 8, 13]

  if (isLoading) return <div>Cargando prro...</div>

  return (
    <>
      <Header title={room?.name} />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <div className="grid gap-2 grid-cols-4">
                {values.map((value, index) => (
                  <Card key={index}>
                    <CardHeader>Holi</CardHeader>
                    <CardContent>{value}</CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
