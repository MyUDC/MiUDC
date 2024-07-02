# MiUDC

## Configuración inicial

1. Clonar el repositorio
   `git clone https://github.com/MyUDC/FRONT_MyUDC.git`
2. Acceder al directorio del  proyecto
   `cd FRONT_MyUDC`

## Entornos

### Desarrollo (local)

Pasos para levantar el entorno de desarrollo en local.

1. Cambia a la rama dev
   `git switch dev`
2. Copiar el `.env.template`, y renombrar a `.env`
3. Reemplazar las variables de entorno (solo si es necesario)
4. Instalar dependencias de node
   ``npm i``
5. Levantar la base de datos
   `docker compose up -d`
6. Configurar prisma
   ` npm run migrate`
   ` npx prisma generate`
   ` npm run prisma:seed`
7. Ejecutar el servidor de desarrollo de next
   `npm run dev`
