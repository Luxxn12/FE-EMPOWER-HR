import MainLayout from "@/components/layouts/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getDetailCompenies, updateCompanies } from "@/utils/apis/companies/api";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function EditCompanies() {
  const navigate = useNavigate();
  const [company, setCompany] = useState({
    company_picture: null as File | null,
    company_name: "",
    npwp: 0,
    address: "",
    email: "",
    phone: "",
    company_address: "",
    signature: null as File | null,
  });

  useEffect(() => {
    fetchCompanies();
  }, []);

  async function fetchCompanies() {
    try {
      const resp = await getDetailCompenies();
      setCompany({
        company_picture:new File([], ""),
        company_name: resp.data?.company_name,
        npwp: resp.data?.npwp,
        address: resp.data?.address,
        email: resp.data?.email,
        phone: resp.data?.phone,
        company_address: resp.data?.company_address,
        signature: new File([], ""),
      });
    } catch (error) {
      toast.error("Failed to fetch companies details");
    }
  }

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = event.target;
    setCompany((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, files } = event.target;
    if (files) {
      setCompany((prevState) => ({
        ...prevState,
        [id]: files[0],
      }));
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    if (company.company_picture) {
      formData.append("company_picture", company.company_picture);
    }
    formData.append("company_name", company.company_name);
    formData.append("npwp", String(company.npwp));
    formData.append("address", company.address);
    formData.append("email", company.email);
    formData.append("phone", company.phone);
    formData.append("company_address", company.company_address);
    if (company.signature) {
      formData.append("signature", company.signature);
    }

    try {
      await updateCompanies(formData);
      toast.success("Companies updated successfully");
      navigate("/companies");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <MainLayout title="" description="">
      <h1 className="text-2xl font-bold">Edit Companies</h1>
      <div className="py-5">
        <div className="w-full mb-3 space-y-2">
          <Label htmlFor="company_picture">Image Companies *</Label>
          <Input id="company_picture" type="file" onChange={handleFileChange} />
        </div>
        <div className="w-full mb-3 space-y-2">
          <Label htmlFor="company_name">Campanies name *</Label>
          <Input type="text" id="company_name" placeholder="Name Perusahaan" value={company.company_name} onChange={handleInputChange} />
        </div>
        <div className="w-full mb-3 space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input type="text" id="email" placeholder="Exemple@gmail.com" value={company.email} onChange={handleInputChange} />
        </div>
        <div className="w-full mb-3 space-y-2">
          <Label htmlFor="npwp">NPWP *</Label>
          <Input type="text" id="npwp" placeholder="12172919729179" value={company.npwp} onChange={handleInputChange} />
        </div>
        <div className="w-full mb-3 space-y-2">
          <Label htmlFor="address">Address *</Label>
          <Input
            type="text"
            id="address"
            placeholder="Jalan Gunung Antena 1 No 11A, Padangan sambian kelod, denpasar barat, bali"
            value={company.address}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-full mb-3 space-y-2">
          <Label htmlFor="company_address">Company Address *</Label>
          <Input
            type="text"
            id="company_address"
            placeholder="Jalan Gunung Antena 1 No 11A, Padangan sambian kelod, denpasar barat, bali"
            value={company.company_address}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-full mb-3 space-y-2">
          <Label htmlFor="signature">Signature *</Label>
          <Input id="signature" type="file" onChange={handleFileChange}
          />
        </div>
        <div className="flex justify-end gap-5 mt-6">
          <Link to={'/companies'}>
          <Button variant={"outline"}>Cancel</Button>
          </Link>
          <Button className="pl-4 pr-4" onClick={handleSubmit}>Save Companies</Button>
        </div>
      </div>
    </MainLayout>
  );
}
