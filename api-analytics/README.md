# PropiedadEnRD Analytics API

API para analytics, favoritos y leads del portal PropiedadEnRD.com

## Base de Datos

Usa Neon PostgreSQL dedicada solo para analytics:
- `analytics_events` - Eventos de tracking
- `user_favorites` - Favoritos sincronizados
- `leads` - Leads generados

## Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/api/analytics` | Recibir un evento |
| POST | `/api/analytics/batch` | Recibir múltiples eventos |
| GET | `/api/stats/property/:slug` | Stats de una propiedad |
| GET | `/api/stats/top-properties` | Propiedades más vistas |
| GET | `/api/stats/overview` | Resumen general |
| GET | `/api/stats/locations` | Stats por ubicación |
| POST | `/api/favorites` | Guardar favoritos |
| GET | `/api/favorites/:userId` | Obtener favoritos |
| POST | `/api/leads` | Guardar lead |
| GET | `/api/leads` | Obtener leads |

## Despliegue en Hetzner VPS

### 1. Conectar al VPS

```bash
ssh root@tu-ip-hetzner
```

### 2. Crear directorio y subir archivos

```bash
mkdir -p /opt/propiedadenrd-api
cd /opt/propiedadenrd-api
```

Sube los archivos:
```bash
# Desde tu máquina local
scp -r api-analytics/* root@tu-ip-hetzner:/opt/propiedadenrd-api/
```

### 3. Instalar dependencias

```bash
# Instalar Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install nodejs -y

# Instalar dependencias
cd /opt/propiedadenrd-api
npm install
```

### 4. Configurar variables de entorno

```bash
cp .env.example .env
nano .env
```

La DATABASE_URL ya está configurada en el código, pero puedes sobrescribirla en .env si necesitas.

### 5. Ejecutar migraciones (ya ejecutadas)

Las tablas ya fueron creadas, pero si necesitas recrearlas:
```bash
npm run migrate
```

### 6. Iniciar con PM2

```bash
npm install -g pm2
pm2 start server.js --name propiedadenrd-analytics
pm2 save
pm2 startup
```

### 7. Configurar Nginx

```nginx
# /etc/nginx/sites-available/api.propiedadenrd.com
server {
    listen 80;
    server_name api.propiedadenrd.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
ln -s /etc/nginx/sites-available/api.propiedadenrd.com /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx

# SSL con Certbot
apt install certbot python3-certbot-nginx -y
certbot --nginx -d api.propiedadenrd.com
```

### 8. O usar Docker

```bash
docker build -t propiedadenrd-analytics .
docker run -d --name analytics -p 3001:3001 propiedadenrd-analytics
```

## Configurar en Astro

Agrega la variable de entorno en Vercel/Cloudflare:

```
PUBLIC_ANALYTICS_API=https://api.propiedadenrd.com
```

## Verificar

```bash
curl https://api.propiedadenrd.com/health
# {"status":"ok","timestamp":"..."}
```

## Mantenimiento

```bash
# Ver logs
pm2 logs propiedadenrd-analytics

# Reiniciar
pm2 restart propiedadenrd-analytics

# Actualizar código
cd /opt/propiedadenrd-api
git pull  # o scp nuevos archivos
pm2 restart propiedadenrd-analytics
```
