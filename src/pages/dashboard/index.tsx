import MainLayout from '@/components/layouts/main-layout';
import { Button } from '@/components/ui/button';
import ImgDashboard from '@/assets/image-dashboard.png'
import { Link } from 'react-router-dom';
import { PaiChart } from '@/components/pai-chart';
import { EmploymentStatus } from '@/components/employment-status';
import { useAuth } from '@/utils/contexts/token';

export default function Dashboard() {
  const { role } = useAuth()
  const currentDate: Date = new Date();

  const formattedDate = currentDate.toLocaleString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
  return (
    <MainLayout title='' description=''>
      <div>
        <div className='py-8 px-12 bg-white border border-gray[#D5D5D5] rounded-sm'>
          <div className='flex justify-between'>
            <div>
              <h1 className='font-bold text-2xl'>Hi!, Empower John!</h1>
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
                <h1 className='font-bold text-5xl'>10</h1>
              </div>
            </div>
            <div className='py-2 px-5 bg-[#E3FBE4] border border-gray[#D5D5D5] rounded-sm'>
              <text>Leaves</text>
              <div className='flex justify-center py-3'>
                <h1 className='font-bold text-5xl'>23</h1>
              </div>
            </div>
            <div className='py-2 px-5 bg-[#E8F3F3] border border-gray[#D5D5D5] rounded-sm'>
              <text>Payroll</text>
              <div className='flex justify-center py-3'>
                <h1 className='font-bold text-5xl'>34</h1>
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
            <EmploymentStatus />
          </div>
          <div className='py-2 px-5 bg-white border border-gray[#D5D5D5] rounded-sm'>
            <text className='text-xl'>Gender Diversity</text>
            <PaiChart />

          </div>
        </div>

      </div>
    </MainLayout>
  );
}

