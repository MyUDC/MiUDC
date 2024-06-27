# Development

Pasos para levantar la app en desarrollo

1. Levantar la base de datos

```
docker compose up -d
```

2. Coiar el .env.template, y renombralo a .env
3. Reemplazar las variables de entorno
4. Instalar dependencias de node ``npm install``
5. Ejecutar el comando `npm run dev`
6. Configurar prisma
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```
7. Ejecutar el SEED para [crear la base de datos local](localhost:3000/api/seed)

# Prisma commands

```
npx prisma init
npx prisma migrate dev
npx prisma generate

```

# Prod

# Stage
