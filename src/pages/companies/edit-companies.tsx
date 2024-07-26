import MainLayout from "@/components/layouts/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EditCompanies() {
  return (
    <MainLayout title="" description="">
      <h1 className="text-2xl font-bold">Edit Companies</h1>
      <div className="py-5">
        <div className="w-full mb-3 space-y-2">
          <Label htmlFor="picture">Image Companies *</Label>
          <Input id="picture" type="file" />
        </div>
        <div className="w-full mb-3 space-y-2">
          <Label htmlFor="name">Campanies name *</Label>
          <Input type="text" id="name" placeholder="Name Perusahaan" />
        </div>
        <div className="w-full mb-3 space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input type="text" id="email" placeholder="Exemple@gmail.com" />
        </div>
        <div className="w-full mb-3 space-y-2">
          <Label htmlFor="NPWP">NPWP *</Label>
          <Input type="text" id="NPWP" placeholder="12172919729179" />
        </div>
        <div className="w-full mb-3 space-y-2">
          <Label htmlFor="address">Address *</Label>
          <Input
            type="text"
            id="address"
            placeholder="Jalan Gunung Antena 1 No 11A, Padangan sambian kelod, denpasar barat, bali"
          />
        </div>
        <div className="w-full mb-3 space-y-2">
          <Label htmlFor="signature">Signature *</Label>
          <Input
            type="text"
            id="signature"
            placeholder="Signature"
          />
        </div>
        <div className="flex justify-end gap-5 mt-6">
          <Button variant={"link"}>Cancel</Button>
          <Button className="pl-4 pr-4">Save Companies</Button>
        </div>
      </div>
    </MainLayout>
  );
}
