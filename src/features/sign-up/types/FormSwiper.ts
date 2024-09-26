import { Role } from "@prisma/client";

export interface ProfileTypeData {
  profileType: Role | null;
}

export interface StudentData {
  accountNumber: number | null;
  careerId: string | null;
  semester: number | null;
}

export interface FormSchema {
  profileType: ProfileTypeData | null;
  studentData: StudentData | null;
}