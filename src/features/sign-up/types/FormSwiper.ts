import { Role } from "@prisma/client";

export interface ProfileTypeData {
  profileType: Role | null;
}

export interface StudentData {
  accountNumber: number | null;
  careerId: string | null;
  semester: string | null;
}

export interface FormSchema {
  profileType: ProfileTypeData;
  studentData: StudentData;
}