import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfileForm({
  className,
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        {/** agregar el cambiar foto */}
        <Label htmlFor="name">Nombre de usuario</Label>
        <Input
          type="text"
          id="name"
          placeholder="Escribe tu nombre"
          defaultValue="John Doe"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="biography">Biografía</Label>
        <Input
          type="text"
          id="biography"
          maxLength={160}
          placeholder="Escribe tu biografía"
        />
        <span className="text-sm text-gray-500">Máximo 160 caracteres</span>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="major">Carrera Universitaria</Label>
        {/** cambiar por un select de shadcn*/}
        <Input type="text" id="major" defaultValue="Ingeniería en Sistemas" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="semester">Semestre</Label>
        <Input type="number" id="semester" defaultValue={3} min={1} max={10} />
      </div>
    </form>
  );
}
