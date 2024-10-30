import { TablePagination } from '@mui/material'
import React from 'react'

const Pagination = ({ page, setPage, rowsPerPage, setRowsPerPage, count }) => {
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <TablePagination
      rowsPerPageOptions={[10, 20]}
      count={count}
      onPageChange={handleChangePage}
      page={page}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      slotProps={{
        select: {
          inputProps: {
            'aria-label': 'Filas por pagina',
          },
          native: true,
        },
      }}
    />
  )
}

export default Pagination
