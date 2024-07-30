import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Personal } from "@/utils/apis/employee/type";



type PersonalDataProps = Personal & {
  updateFields: (fields: Partial<Personal>) => void
}

export function FormPersonal({
  name,
  email,
  phone,
  place_birth,
  birth_date,
  status,
  gender,
  religion,
  nik,
  address,
  updateFields,
}: PersonalDataProps) {
  
  return (
    <>
      <h5 className="text-md font-semibold">Personal data</h5>
      <p className="text-gray-500">
        Fill all employee personal basic information data
      </p>
      <form className="space-y-3 my-4 lg:w-3/4">
        <div>
          <Label htmlFor="fullName">Fullname*</Label>
          <div className="mt-1">
            <Input
              id="fullName"
              type="text"
              data-testid="fullName"
              defaultValue=""
              placeholder="John doe"
              value={name}
              onChange={e => updateFields({ name: e.target.value })}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="email">email*</Label>
          <div className="mt-1">
            <Input
              id="email"
              type="email"
              data-testid="email"
              defaultValue=""
              placeholder="employee@company.com"
              value={email}
              onChange={e => updateFields({ email: e.target.value })}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="phoneNumber">Phone number*</Label>
          <div className="mt-1">
            <Input
              id="phoneNumber"
              type="text"
              data-testid="username"
              defaultValue=""
              placeholder="+628xxxxxxxx"
              value={phone}
              onChange={e => updateFields({ phone: e.target.value })}
            />
          </div>
        </div>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <Label htmlFor="placeOfBirth">Place of birth*</Label>
            <div className="mt-1">
              <Input
                id="placeOfBirth"
                name="placeOfBirth"
                type="text"
                data-testid="placeOfBirth"
                defaultValue=""
                placeholder="Jakarta"
                value={place_birth}
                onChange={e => updateFields({ place_birth: e.target.value })}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="dateOfBirth">Date of birth*</Label>
            <div className="mt-1">
              <Input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                data-testid="dateOfBirth"
                defaultValue=""
                placeholder="01-01-2010"
                value={birth_date}
                onChange={e => updateFields({ birth_date: e.target.value })}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="gender">Gender*</Label>
            <div className="mt-1">
              <Input
                id="gender"
                name="gender"
                type="text"
                data-testid="gender"
                defaultValue=""
                placeholder="Male"
                value={gender}
                onChange={e => updateFields({ gender: e.target.value })}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="status">Status*</Label>
            <div className="mt-1">
              <Input
                id="status"
                name="status"
                type="text"
                data-testid="status"
                defaultValue=""
                placeholder="Single"
                value={status}
                onChange={e => updateFields({ status: e.target.value })}
              />
            </div>
          </div>
        </div>
        <div>
          <Label htmlFor="religion">Religion*</Label>
          <div className="mt-1">
            <Input
              id="religion"
              name="religion"
              type="text"
              data-testid="religion"
              defaultValue=""
              placeholder="secret"
              value={religion}
              onChange={e => updateFields({ religion: e.target.value })}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="nik">Nik *</Label>
          <div className="mt-1">
            <Input
              id="nik"
              name="nik"
              type="text"
              data-testid="nik"
              defaultValue=""
              placeholder="313122311"
              value={nik}
              onChange={e => updateFields({ nik: e.target.value })}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="address">Adress *</Label>
          <Textarea
            id="address"
            placeholder="Jalan Gunung Antena 1 No 11A, Denpasar Barat, Bali."
            value={address}
            onChange={e => updateFields({ address: e.target.value })}
            data-testid="address"
          />
        </div>
      </form>
    </>
  );
}
