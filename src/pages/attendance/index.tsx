import MainLayout from '@/components/layouts/main-layout';
import { CircleAlert, CircleCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Attendance() {
  return (
    <MainLayout title='' description=''>
      <h1 className='text-2xl font-bold'>Attendance</h1>
      <div className='py-8'>
        <div className='flex gap-5'>
          <Link to={'/attendance/live-attendance'}>
            <div className='p-5 border border-[#9CA3AF] rounded-md cursor-pointer'>
              <div className='flex justify-between items-center gap-10'>
                <div className='flex flex-col'>
                  <text className='text-2xl'>Clock in</text>
                  <text className='text-sm text-gray-400'>1 Juni 2024 - 09.14</text>
                </div>
                <div className='flex flex-col'>
                  <CircleCheck size={50} className='text-green-600' />
                </div>
              </div>
            </div></Link>
          <Link to={'/attendance/live-attendance'}>
            <div className='p-5 border border-[#9CA3AF] rounded-md cursor-pointer'>
              <div className='flex justify-between items-center gap-10'>
                <div className='flex flex-col'>
                  <text className='text-2xl'>Clock out</text>
                  <text className='text-sm text-gray-400'>1 Juni 2024 - 09.14</text>
                </div>
                <div className='flex flex-col'>
                  <CircleAlert size={50} className='text-[#F59E0B]' />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}

