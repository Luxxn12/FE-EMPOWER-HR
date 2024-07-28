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