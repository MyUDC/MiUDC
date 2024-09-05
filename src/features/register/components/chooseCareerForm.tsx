"use client";

import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

interface Props {
    careers: { id: string; name: string }[];
}

interface FormInputs {
    accountNumber: number | null;
    career: string;
    semester: number;
}

const semesters = [
    { value: "1", label: "Primero" },
    { value: "2", label: "Segundo" },
    { value: "3", label: "Tercero" },
    { value: "4", label: "Cuarto" },
    { value: "5", label: "Quinto" },
    { value: "6", label: "Sexto" },
    { value: "7", label: "Séptimo" },
    { value: "8", label: "Octavo" },
]

export default function ChooseCareerForm({ careers }: Props) {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<FormInputs>({
        defaultValues: {
            career: "0",
            semester: 0,
            accountNumber: null
        }
    });

    const onSubmit = async (data: FormInputs) => {
        const { career, semester, accountNumber } = data;
        console.log(career, semester);
        Cookies.set("accountNumber", accountNumber?.toString()!);
        Cookies.set("career", career);
        Cookies.set("semester", semester.toString());
        router.push("/sign-up/register");
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
        >
            <div>
                <div className="flex flex-col gap-1">
                    <label
                        htmlFor="accountNumber"
                        className="text-black font-light font-inter text-base"
                    >
                        Numero de cuenta
                    </label>
                    <input
                        id="accountNumber"
                        type="number"
                        placeholder="Numero de cuenta"
                        className="rounded-lg p-2 pl-4 font-light focus:border-green-500 focus:outline-none bg-smoothGreen shadow-md w-full h-14"
                        {...register("accountNumber", {
                            required: "Este campo es requerido",
                            maxLength: {
                                message: "Numero de cuenta invalido",
                                value: 8
                            },
                            minLength: {
                                message: "Numero de cuenta invalido",
                                value: 8
                            }
                        })}
                    />
                </div>
                {errors.accountNumber && (
                    <span className="px-2 text-sm flex text-red-600 items-center gap-1">
                        <FontAwesomeIcon className="w-2 h-2 text-white bg-red-700 p-1 rounded-full" icon={faInfo} />
                        {errors.accountNumber.message}
                    </span>
                )}
            </div>

            <div>
                <div className="flex flex-col w-full">
                    <label className="text-black font-light font-inter text-base">Carrera</label>
                    <div className="bg-smoothGreen rounded-lg p-2">
                        <select
                            className="p-2 bg-transparent w-full rounded-full"

                            {...register("career", {
                                required: true,
                                validate: (value) => {
                                    if (value === "0") {
                                        return "Este campo es requerido";
                                    }
                                    return true;
                                }
                            })}
                        >
                            <option value="0" disabled className="text-gray-500">Selecciona tu carrera</option>
                            {careers.map((career) => (
                                <option key={career.id} value={career.id}>{career.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {errors.career && (
                    <span className="px-2 text-sm flex text-red-600 items-center gap-1">
                        <FontAwesomeIcon className="w-2 h-2 text-white bg-red-700 p-1 rounded-full" icon={faInfo} />
                        {errors.career.message}
                    </span>
                )}
            </div>

            <div>
                <div className="flex flex-col w-full">
                    <label className="text-black font-light font-inter text-base">Semestre</label>
                    <div className="bg-smoothGreen rounded-lg p-2">
                        <select
                            className="p-2 bg-transparent w-full rounded-full"

                            {...register("semester", {
                                required: true,
                                validate: (value) => {
                                    if (value === 0) {
                                        return "Este campo es requerido";
                                    }
                                    return true;
                                }
                            })}
                        >
                            <option value="0" disabled className="text-gray-500">Selecciona tu semestre</option>
                            {semesters.map((semester) => (
                                <option key={semester.value} value={semester.value}>{semester.label}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {errors.semester && (
                    <span className="px-2 text-sm flex text-red-600 items-center gap-1">
                        <FontAwesomeIcon className="w-2 h-2 text-white bg-red-700 p-1 rounded-full" icon={faInfo} />
                        {errors.semester.message}
                    </span>
                )}
            </div>


            <input
                type="submit"
                value="continuar"
                className="flex bg-green font-semibold text-white text-center shadow-md rounded-full w-full py-3"
            />
        </form>
    );
}