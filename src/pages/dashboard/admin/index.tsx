import { Button } from "@/components/ui/button"
import { getDashboardAdmin } from "@/utils/apis/dashboard/api"
import { DashboardAdminType } from "@/utils/apis/dashboard/type"
import { useAuth } from "@/utils/contexts/token"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ImgDashboard from '@/assets/image-dashboard.png'
import { EmploymentStatus } from "@/components/employment-status"
import { PaiChart } from "@/components/pai-chart"


function DashboardAdmin() {
  const [dataDashboardAdmin, setDataDashboardAdmin] = useState<DashboardAdminType>()
  const { role } = useAuth()

  useEffect(() => {
    fetchDataAdmin()
  }, [])

  async function fetchDataAdmin() {
    try {
      const response = await getDashboardAdmin()
      setDataDashboardAdmin(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const currentDate: Date = new Date();

  const formattedDate = currentDate.toLocaleString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
            <div >
          <div className='py-8 px-12 bg-white border border-gray[#D5D5D5] rounded-sm'>
            <div className='flex justify-between'>
              <div>
              <h1 className='font-bold text-2xl'>Hi!, Empower { dataDashboardAdmin?.name}!</h1>
                <h6 className='text-gray-400 text-sm mt-2'>{formattedDate}</h6>
                <div className='pt-10'>
                  <h6 className='font-bold text-sm mb-4'>Shortcut</h6>
                  <Link to={'/attendance/live-attendance'}>
                    <Button variant="outline" className='rounded-3xl'>Live acttendance</Button>
                  </Link>
                </div>
              </div>
              <div>
                <img alt='img-dashboard.png' src={ImgDashboard} width={225} />
              </div>
            </div>
          </div>
          {role == "admin" ? (
            <div className='grid lg:grid-cols-4 grid-cols-2 gap-5 mt-8'>
              <div className='py-2 px-5 bg-[#E4E9F7] border border-gray[#D5D5D5] rounded-sm'>
                <text>Attendace</text>
                <div className='flex justify-center py-3'>
                <h1 className='font-bold text-5xl'>{dataDashboardAdmin?.attendance.toFixed()}</h1>
                </div>
              </div>
              <div className='py-2 px-5 bg-[#E3FBE4] border border-gray[#D5D5D5] rounded-sm'>
                <text>Leaves</text>
                <div className='flex justify-center py-3'>
                <h1 className='font-bold text-5xl'>{dataDashboardAdmin?.leaves.toFixed()}</h1>
                </div>
              </div>
              <div className='py-2 px-5 bg-[#E8F3F3] border border-gray[#D5D5D5] rounded-sm'>
                <text>Payroll</text>
                <div className='flex justify-center py-3'>
                <h1 className='font-bold text-5xl'>{dataDashboardAdmin?.payroll.toFixed()}</h1>
                </div>
              </div>
              <div className='py-2 px-5 bg-[#F9F6D2] border border-gray[#D5D5D5] rounded-sm'>
                <text>Employees</text>
                <div className='flex justify-center py-3'>
                  <h1 className='font-bold text-5xl'>100</h1>
                </div>
              </div>
            </div>
          ) : null
          }
          <div className='grid lg:grid-cols-2 grid-cols-1 gap-5 mt-8'>
            <div className='py-2 px-5 bg-white border border-gray[#D5D5D5] rounded-sm'>
              <text className='text-xl'>Employment Status</text>
              <EmploymentStatus dataPermanentAdmin={dataDashboardAdmin?.permanent.toFixed()} dataContractAdmin={dataDashboardAdmin?.contract.toFixed()} />
            </div>
            <div className='py-2 px-5 bg-white border border-gray[#D5D5D5] rounded-sm'>
              <text className='text-xl'>Gender Diversity</text>
              <PaiChart dataMaleAdmin={dataDashboardAdmin?.male.toFixed()} dataFemaleAdmin={dataDashboardAdmin?.female.toFixed()} />

            </div>
          </div>

        </div>
  );
}

export default DashboardAdmin;
