import { Button, CircularProgress } from '@mui/material'
import { green } from '@mui/material/colors'
import React from 'react'
import useSales from '@/hooks/useSales'

const SunatButton = ({ buttonText, saleId, trigger, action = 'send' }) => {
  const [loading, setLoading] = React.useState(false)
  const { sendSunat, querySunat } = useSales()

  return (
    <div className="relative">
      <Button
        variant="text"
        //sx={buttonSx}
        disabled={loading}
        onClick={() => {
          setLoading(true)
          if (action === 'send') {
            sendSunat(saleId).finally(() => {
              setLoading(false)
              trigger()
            })
          } else {
            querySunat(saleId).finally(() => {
              setLoading(false)
              trigger()
            })
          }
        }}>
        {buttonText}
      </Button>
      {loading && (
        <CircularProgress
          size={24}
          sx={{
            color: green[500],
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-12px',
            marginLeft: '-12px',
          }}
        />
      )}
    </div>
  )
}

export default SunatButton
