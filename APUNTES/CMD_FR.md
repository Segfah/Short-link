# Serveur VPS - Configuration et Déploiement

Ce document contient les étapes nécessaires pour configurer et déployer un projet Node.js sur un serveur Ubuntu 24.04 avec 1GB de RAM.

---

## 1. Mettre à jour le système

```bash
sudo apt update && sudo apt upgrade -y
```

**Remarque :** Cette opération peut désactiver l'accès SSH root. Si nécessaire, réactivez-le ou créez un utilisateur alternatif.

---

## 2. Installer Node.js avec NVM

```bash
# Télécharger et installer NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# Installer Node.js (version 23)
nvm install 23

# Vérifier la version installée
node -v   # Doit afficher "v23.7.0"
nvm current # Doit afficher "v23.7.0"
npm -v    # Doit afficher "10.9.2"

# Mettre à jour npm vers la dernière version (11.1.0)
npm install -g npm@11.1.0
```

---

## 3. Installer PM2 pour gérer les processus

```bash
npm install -g pm2@latest
```

---

## 4. Installer et configurer Nginx

```bash
sudo apt install nginx
```

Modifier le fichier de configuration de Nginx :

```bash
sudo nano /etc/nginx/sites-available/default
```

Appliquer les modifications :

```bash
sudo systemctl restart nginx
```

---

## 5. Certificats SSL avec Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d votre-domaine.com
```

Activer les règles du pare-feu :

```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow 22/tcp
sudo ufw reload
```

---

## 6. Créer un fichier Swap (pour les serveurs avec 1GB de RAM)

```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

Rendre le changement permanent :

```bash
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

---

## 7. Déployer le projet

```bash
npm install
npm run build
pm2 start npm --name "short-link" -- start
```

---

## 8. Commandes de maintenance

### Logs et surveillance

```bash
pm2 logs short-link  # Voir les logs du projet
htop                 # Surveiller l'utilisation des ressources
```

### État des services

```bash
sudo systemctl status nginx  # Vérifier l'état de Nginx
```

### Sauvegarde de la base de données

```bash
pg_dump -U test-user short_links > backup.sql
```

---

## 9. Configuration de la sécurité

```bash
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw enable
```

---

## 10. Commandes PM2

```bash
pm2 list                      # Voir les processus actifs
pm2 show [nom_du_processus]    # Voir les détails d'un processus
pm2 monit                     # Surveillance en temps réel
pm2 logs                      # Voir les logs généraux
pm2 logs [nom_du_processus]    # Voir les logs d'un processus spécifique
```

