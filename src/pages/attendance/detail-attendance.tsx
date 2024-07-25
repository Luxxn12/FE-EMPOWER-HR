import MainLayout from "@/components/layouts/main-layout";
import imageMaps from "@/assets/img-maps.png";
export default function DetailAttendance() {
  return (
    <MainLayout title="" description="">
      <h1 className="text-2xl font-bold">Detail Attendance</h1>
      <div className="py-4 mt-8">
        <img src={imageMaps} width={600} />
      </div>
      <div className="flex flex-col xl:py-4 py-2">
        <div className="flex flex-col mb-4">
          <text className="font-bold">Clock in time</text>
          <text className="mt-1" >09.10 ( 5 Agustus2024 )</text>
        </div>
        <div className="flex flex-col mb-4">
          <text className="font-bold">Shift</text>
          <text className="mt-1" >( 09:00 - 18:00 )</text>
        </div>
        <div className="flex flex-col mb-4">
          <text className="font-bold">Address</text>
          <text className="mt-1" >Jalan Gunung Anthena 1 No 11A</text>
        </div>
        <div className="flex flex-col mb-4">
          <text className="font-bold">Location GPS name</text>
          <text className="mt-1" >PT Mekar Sentosa</text>
        </div>
        <div className="flex flex-col mb-4">
          <text className="font-bold">Note</text>
          <text className="mt-1 xl:w-7/12" >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab at quod rem sit consectetur quisquam enim esse veritatis provident ipsa sint dolor hic delectus dolorem consequatur facere, quaerat fugit qui?
          </text>
        </div>
      </div>
    </MainLayout>
  );
}
