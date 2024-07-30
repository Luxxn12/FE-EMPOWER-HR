import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Payroll } from '@/utils/apis/employee/type';

type PayrollDataProps = Payroll & {
  updateFields: (fields: Partial<Payroll>) => void;
};

function FormPayroll({
  salary,
  bank_name,
  account_number,
  updateFields
}:PayrollDataProps) {
  return (
    <>
    <h5 className="text-md font-semibold">Salary</h5>
    <p className="text-gray-500">Input employee salary info</p>
    <form className="my-4 lg:w-3/4">
      <div className="my-3">
        <Label htmlFor="departement">Basic salary *</Label>
        <Input
          id="departement"
          type="text"
            placeholder="Rp. 5.000.000"
            value={salary}
            onChange={e => updateFields({ salary: e.target.value })}
        />
      </div>
      <h5 className="text-md font-semibold">Bank account</h5>
      <p className="text-gray-500">
        The employee’s bank account is used for payroll
      </p>
      <div className="grid gap-6 mb-6 md:grid-cols-2 my-3">
        <div>
          <Label htmlFor="bankName">Bank name *</Label>
            <Select
              onValueChange={(value) => updateFields({ bank_name: value })}
              value={bank_name}
            >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="BCA" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bca">bca</SelectItem>
              <SelectItem value="bni">bni</SelectItem>
              <SelectItem value="bri">bri</SelectItem>
              <SelectItem value="mandiri">mandiri</SelectItem>
              <SelectItem value="btn">btn</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="accountNumber">Acount number *</Label>
          <Input
            id="accountNumber"
            type="text"
              placeholder="123xxxxxxxxx"
              value={account_number}
              onChange={e => updateFields({ account_number: e.target.value })}
          />
        </div>
      </div>
    </form>
  </>
  );
}

export default FormPayroll;
