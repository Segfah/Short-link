# Servidor VPS - Configuración y Despliegue

Este documento contiene los pasos necesarios para configurar y desplegar un proyecto Node.js en un servidor Ubuntu 24.04 con 1 GB de RAM.

---

## 1. Actualizar el Sistema
```bash
sudo apt update && sudo apt upgrade -y
```
**Nota:** Esta operación puede desactivar el acceso SSH root. Si es necesario, volver a activarlo o crear un usuario alternativo.

---

## 2. Instalación de Node.js con NVM
```bash
# Descargar e instalar NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# Instalar Node.js (versión 23)
nvm install 23

# Verificar la versión instalada
node -v   # Debe mostrar "v23.7.0"
nvm current # Debe mostrar "v23.7.0"
npm -v    # Debe mostrar "10.9.2"

# Actualizar npm a la versión más reciente (11.1.0)
npm install -g npm@11.1.0
```

---

## 3. Instalación de PM2 para gestionar procesos
```bash
npm install -g pm2@latest
```

---

## 4. Instalación y Configuración de Nginx
```bash
sudo apt install nginx
```

Editar la configuración de Nginx en:
```bash
sudo nano /etc/nginx/sites-available/default
```

Para aplicar cambios:
```bash
sudo systemctl restart nginx
```

---

## 5. Certificados SSL con Let's Encrypt
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d tu-dominio.com
```

Habilitar reglas de firewall:
```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow 22/tcp
sudo ufw reload
```

---

## 6. Crear un Swap File (Para Servidor con 1GB de RAM)
```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```
Hacer el cambio permanente:
```bash
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

---

## 7. Despliegue del Proyecto
```bash
npm install
npm run build
pm2 start npm --name "short-link" -- start
```

---

## 8. Comandos de Mantenimiento
### Logs y Monitorización
```bash
pm2 logs short-link  # Ver logs del proyecto
htop                 # Monitorear uso de recursos
```

### Estado de Servicios
```bash
sudo systemctl status nginx  # Ver estado de Nginx
```

### Backup de Base de Datos
```bash
pg_dump -U test-user short_links > backup.sql
```

---

## 9. Configuración de Seguridad
```bash
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw enable
```

---

## 10. Comandos de PM2
```bash
pm2 list                      # Ver procesos activos
pm2 show [nombre_del_proceso] # Ver detalles de un proceso
pm2 monit                     # Monitoreo en tiempo real
pm2 logs                      # Ver logs generales
pm2 logs [nombre_del_proceso]  # Ver logs de un proceso específico
```

