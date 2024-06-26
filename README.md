# MiUDC

...

## Entornos

### Desarrollo

Pasos para levantar el entorno de desarrollo.

1. Levantar la base de datos
   `docker compose up -d`
2. copiar el .env.template, y renombralo a .env
3. Reemplazar las variables de entorno (si lo necesitas)
4. Instalar dependencias de node ``npm ``
5. Configurar prisma

   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```
6. Ejecutar el servidor de desarrollo de next  `npm run dev`

# Prisma commands

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```
