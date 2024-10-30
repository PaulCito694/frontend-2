import { LineChart } from '@mui/x-charts'

export const metadata = {
  title: 'Laravel - Dashboard',
}

const Dashboard = () => {
  return (
    <>
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <div>
                <LineChart
                  series={[
                    {
                      id: 'series-1',
                      data: [3, 4, 1, 6, 5],
                      label: 'A',
                      area: true,
                      stack: 'total',
                      highlightScope: {
                        highlight: 'item',
                      },
                      color: '#b1a3dd',
                    },
                    {
                      id: 'series-2',
                      data: [4, 3, 1, 5, 8],
                      label: 'B',
                      area: true,
                      stack: 'total',
                      highlightScope: {
                        highlight: 'item',
                      },
                      color: '#d09ea6',
                    },
                    {
                      id: 'series-3',
                      data: [4, 2, 5, 4, 1],
                      label: 'C',
                      area: true,
                      stack: 'total',
                      highlightScope: {
                        highlight: 'item',
                      },
                      color: '#84c5ca',
                    },
                  ]}
                  xAxis={[
                    {
                      data: [0, 3, 6, 9, 12],
                      scaleType: 'linear',
                      id: 'axis1',
                    },
                  ]}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
