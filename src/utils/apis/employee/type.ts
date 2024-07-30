export interface IEmployeeGetAll {
    id: number
    name: string
    job_position: string
    employment_status: string
    job_level: string
    join_date: string
  }
  
  export interface IEmployeeById {
    id: number
    profile_picture: string
    name: string
    email: string
    phone_number: string
    place_birth: string
    birth_date: string
    gender: string
    religion: string
    nik: number
    address: string
    EmploymentData: EmploymentById[]
  }
  
  export interface EmploymentById {
    join_date: string
    department: string
    job_position: string
    job_level: string
    schedule: string
    approval_line: string
    manager: string
  }

  export interface Personal {
    name: string
    email: string
    phone: string
    place_birth: string
    birth_date: string
    status: string
    gender: string
    religion: string
    nik: string
    address: string
  }
  
  export interface Employment {
    employment_status: string
    schedule: string
    join_date: string
    job_level: string
    department: string
    approval_line: string
    job_position: string
  }
  
  export interface Payroll {
    salary: string
    bank_name: string
    account_number: string
  }
  
  export interface FormData {
    name: string
    email: string
    phone: string
    place_birth: string
    birth_date: string
    status: string
    gender: string
    religion: string
    nik: string
    address: string
    employment_status: string
    schedule: string
    join_date: string
    job_level: string
    department: string
    approval_line: string
    job_position: string
    salary: string
    bank_name: string
    account_number: string
  }
