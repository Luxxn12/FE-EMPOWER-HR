import { Button } from "@/components/ui/button"
import { getDashboardAdmin } from "@/utils/apis/dashboard/api"
import { DashboardAdminType } from "@/utils/apis/dashboard/type"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ImgDashboard from '@/assets/image-dashboard.png'
import { Pie, PieChart } from "recharts"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Squircle } from "lucide-react"

const chartConfig = {
  desktop: {
    label: "Employment Status",
    color: "hsl(var(--chart-1))",
  },
  chrome: {
    label: "Male",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Female",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;


function DashboardAdmin() {
  const [dataDashboardAdmin, setDataDashboardAdmin] = useState<DashboardAdminType>()

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

  const chartData = [
    {
      month: "Permanent",
      desktop: parseInt(dataDashboardAdmin?.permanent.toFixed() || "0", 10),
      fill: "#029BDE",
    },
    {
      month: "Contract",
      desktop: parseInt(dataDashboardAdmin?.contract.toFixed() || "0", 10),
      fill: "#F96D20",
    },
  ];

  const maleVisitors = isNaN(Number(dataDashboardAdmin?.male.toFixed())) ? 0 : Number(dataDashboardAdmin?.male.toFixed());
  const femaleVisitors = isNaN(Number(dataDashboardAdmin?.female.toFixed())) ? 0 : Number(dataDashboardAdmin?.female.toFixed());

  const chartDataPai = [
    { browser: "Male", visitors: maleVisitors, fill: "#5D54D5" },
    { browser: "Female", visitors: femaleVisitors, fill: "#029BDE" },
  ];

  return (
    <div >
      <div className='py-8 px-12 bg-white border border-gray[#D5D5D5] rounded-sm'>
        <div className='flex justify-between'>
          <div>
            <h1 className='font-bold text-2xl'>Hi!, Empower {dataDashboardAdmin?.name}!</h1>
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
      <div className='grid lg:grid-cols-4 grid-cols-2 gap-5 mt-8'>
        <div className='py-2 px-5 bg-[#E4E9F7] border border-gray[#D5D5D5] rounded-sm'>
          <p>Attendace</p>
          <div className='flex justify-center py-3'>
            <h1 className='font-bold text-5xl'>{dataDashboardAdmin?.attendance.toFixed()}</h1>
          </div>
        </div>
        <div className='py-2 px-5 bg-[#E3FBE4] border border-gray[#D5D5D5] rounded-sm'>
          <p>Leaves</p>
          <div className='flex justify-center py-3'>
            <h1 className='font-bold text-5xl'>{dataDashboardAdmin?.leaves.toFixed()}</h1>
          </div>
        </div>
        <div className='py-2 px-5 bg-[#E8F3F3] border border-gray[#D5D5D5] rounded-sm'>
          <p>Payroll</p>
          <div className='flex justify-center py-3'>
            <h1 className='font-bold text-5xl'>{dataDashboardAdmin?.payroll.toFixed()}</h1>
          </div>
        </div>
        <div className='py-2 px-5 bg-[#F9F6D2] border border-gray[#D5D5D5] rounded-sm'>
          <p>Employees</p>
          <div className='flex justify-center py-3'>
            <h1 className='font-bold text-5xl'>{dataDashboardAdmin?.total_users}</h1>
          </div>
        </div>
      </div>
      <div className='grid lg:grid-cols-2 grid-cols-1 gap-5 mt-8'>
        <div className='py-2 px-5 bg-white border border-gray[#D5D5D5] rounded-sm'>
          <text className='text-xl'>Employment Status</text>
          <div className="pt-10">
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={chartData}
                margin={{
                  top: 20,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 20)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={5}>
                  <LabelList
                    position="top"
                    offset={5}
                    className="fill-foreground"
                    fontSize={10}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </div>
        </div>
        <div className='py-2 px-5 bg-white border border-gray[#D5D5D5] rounded-sm'>
          <text className='text-xl'>Gender Diversity</text>
          {/* <PaiChart dataMaleAdmin={dataDashboardAdmin?.male.toFixed()} dataFemaleAdmin={dataDashboardAdmin?.female.toFixed()} /> */}
          <div>
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie data={chartDataPai} dataKey="visitors" nameKey="browser" />
              </PieChart>
            </ChartContainer>
            <div className="flex flex-col gap-3 p-5">
              <div className="flex justify-between">
                <div className="flex gap-3">
                  <Squircle className="bg-[#5D54D5] text-[#5D54D5] rounded-md" />
                  <p>Male</p>
                </div>
                <div>
                  <p>{maleVisitors}</p>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-3">
                  <Squircle className="bg-[#029BDE] text-[#029BDE] rounded-md" />
                  <p>Female</p>
                </div>
                <div>
                  <p>{femaleVisitors}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default DashboardAdmin;
