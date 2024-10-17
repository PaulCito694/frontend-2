'use client'

import { IconButton } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import VaccinesIcon from '@mui/icons-material/Vaccines'
import InventoryIcon from '@mui/icons-material/Inventory'
import GroupIcon from '@mui/icons-material/Group'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import PointOfSaleIcon from '@mui/icons-material/PointOfSale'
import { usePathname, useRouter } from 'next/navigation'

const Header = () => {
  const pathname = usePathname()
  const { push } = useRouter()
  return (
    <header className="bg-white shadow">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          <div className="flex items-center justify-center">
            <IconButton
              onClick={() => push('./new_sale')}
              sx={{
                backgroundColor: pathname === '/new_sale' ? '#67e8f9' : '',
              }}
              size="large"
              className="flex flex-col bg-cyan-300">
              <ShoppingCartIcon />
              Venta rapida
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: pathname === '/sales' ? '#67e8f9' : '',
              }}
              size="large"
              className="flex flex-col"
              onClick={() => push('./sales')}>
              <FormatListBulletedIcon />
              Listado de ventas
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: pathname === '/sale_resume' ? '#67e8f9' : '',
              }}
              size="large"
              className="flex flex-col"
              onClick={() => push('./sale_resume')}>
              <PointOfSaleIcon />
              Caja chica
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: pathname === '/products' ? '#67e8f9' : '',
              }}
              size="large"
              className="flex flex-col"
              onClick={() => push('./products')}>
              <VaccinesIcon />
              Productos
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: pathname === '/inventory' ? '#67e8f9' : '',
              }}
              size="large"
              className="flex flex-col"
              onClick={() => push('./inventory')}>
              <InventoryIcon />
              Inventario
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: pathname === '/users' ? '#67e8f9' : '',
              }}
              size="large"
              className="flex flex-col"
              onClick={() => push('./users')}>
              <GroupIcon />
              Usuarios
            </IconButton>
          </div>
        </h2>
      </div>
    </header>
  )
}

export default Header
