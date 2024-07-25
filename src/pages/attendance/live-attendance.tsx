import MainLayout from '@/components/layouts/main-layout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function LiveAttendance() {
  return (
    <MainLayout title='' description=''>
      <h1 className='text-2xl font-bold'>Live attendance</h1>
      <div className='py-8 lg:container'>
        <div className='py-6 border bg-white  border-[#D5D5D5] rounded-sm'>
          <div className='border-b border-[#D5D5D5]'>
            <div className='flex flex-col text-center mb-6'>
              <text className='text-3xl font-bold'>
                07: 08 AM
              </text>
              <text >
              24 Jul 2024
              </text>
            </div>
          </div>
          <div className=' border-[#D5D5D5]'>
            <div className='flex flex-col text-center py-6'>
              <text >
              Schedule, 24 Jul 2024
              </text>
              <text className='text-3xl font-bold mt-2'>
              08: 00 AM - 16: 00 PM
              </text>
            </div>
          </div>
          <div className='lg:px-8 py-2 px-4'>
            <text className='font-medium'>Notes (optional)</text>
            <Textarea/>
          </div>
          <div className='lg:px-8 px-4 py-5 grid grid-cols-2 gap-5'>
            <Button>Clock In</Button>
            <Button>Clock Out</Button>
          </div>
        </div>
      </div>

    </MainLayout>
  );
}

