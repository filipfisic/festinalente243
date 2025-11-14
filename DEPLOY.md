# Upute za Deploy FESTINA LENTE 243 Website

## Git Setup

### Prije pushanja na Git:

1. **Provjeri osjetljive podatke:**
   - ✅ Nema API ključeva ili lozinki u kodu
   - ✅ Kontakt informacije su javne (to je u redu)
   - ✅ Nema privatnih podataka

2. **Struktura projekta:**
   ```
   FORKO/
   ├── index.html          # Glavna HTML stranica
   ├── css/                # CSS stilovi
   │   ├── reset.css
   │   ├── style.css
   │   └── responsive.css
   ├── js/                 # JavaScript
   │   └── main.js
   ├── images/             # Slike
   └── README.md
   ```

3. **Git komande:**
   ```bash
   cd /Users/filip/Desktop/FORKO
   git init
   git add .
   git commit -m "Initial commit - FESTINA LENTE 243 website"
   git branch -M main
   git remote add origin <tvoj-git-repo-url>
   git push -u origin main
   ```

## DNS i Deploy Opcije

### Opcija 1: GitHub Pages (Besplatno)

1. **Pushaj kod na GitHub:**
   - Kreiraj novi repository na GitHub
   - Pushaj kod (CNAME fajl je već uključen)

2. **Aktiviraj GitHub Pages:**
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: main, folder: / (root)
   - GitHub će automatski prepoznati CNAME fajl

3. **DNS zapisi za GitHub Pages:**
   - **CNAME zapis** (u DNS postavkama tvoje domene):
     ```
     Type: CNAME
     Name: www
     Value: tvoj-username.github.io
     TTL: 3600 (ili default)
     ```
   - **A zapisi** (za apex domenu - festinalente243.hr bez www):
     ```
     Type: A
     Name: @ (ili prazno)
     Value: 185.199.108.153
     
     Type: A
     Name: @
     Value: 185.199.109.153
     
     Type: A
     Name: @
     Value: 185.199.110.153
     
     Type: A
     Name: @
     Value: 185.199.111.153
     ```

### Opcija 2: Netlify (Preporučeno - Besplatno)

1. **Deploy na Netlify:**
   - Poveži GitHub repo s Netlify
   - Build command: (ostavi prazno - statična stranica)
   - Publish directory: `/` (root)

2. **DNS zapisi za Netlify:**
   - Netlify će ti dati **A zapise** ili **CNAME zapis**
   - U Netlify dashboardu: Domain settings → Add custom domain
   - Dodaj svoju domenu
   - Netlify će ti dati točne DNS zapise

   Tipično:
   - **A zapis** ili **CNAME zapis** prema Netlify load balanceru
   - Netlify će automatski generirati SSL certifikat

### Opcija 3: Vercel (Besplatno)

1. **Deploy na Vercel:**
   - Poveži GitHub repo s Vercel
   - Framework Preset: Other
   - Root Directory: ./

2. **DNS zapisi za Vercel:**
   - Vercel će ti dati DNS zapise u dashboardu
   - Settings → Domains → Add domain

### Opcija 4: Custom Hosting (cPanel, FTP, itd.)

1. **Upload fajlova:**
   - Uploadaj sve fajlove u `public_html/` ili `www/` folder

2. **DNS zapisi:**
   - **A zapis**: IP adresa hosting servera (dobiš od hosting providera)
   - **CNAME zapis** (za www): `www -> tvoja-domena.com`

## DNS Zapisi - Općenito

### Ako koristiš samo domenu (bez www):
```
Type: A
Name: @ (ili prazno)
Value: IP adresa hostinga
TTL: 3600 (ili default)
```

### Ako koristiš www subdomenu:
```
Type: CNAME
Name: www
Value: tvoja-domena.com (ili IP ako hosting ne podržava CNAME)
TTL: 3600
```

### Ako koristiš i domenu i www:
```
Type: A
Name: @
Value: IP adresa

Type: CNAME
Name: www
Value: tvoja-domena.com
```

## Provjera nakon Deploy-a

1. **Provjeri da sve radi:**
   - [ ] Stranica se učitava
   - [ ] Slike se prikazuju
   - [ ] CSS stilovi rade
   - [ ] JavaScript animacije rade
   - [ ] Responsive dizajn radi na mobilnim uređajima

2. **SEO provjera:**
   - [ ] Meta tagovi su ispravni
   - [ ] Title tag je postavljen
   - [ ] Alt tekstovi na slikama

3. **Performance:**
   - Optimiziraj slike ako su prevelike
   - Provjeri brzinu učitavanja (Google PageSpeed Insights)

## Optimizacija Slika (Opcionalno)

Ako su slike prevelike, možeš ih optimizirati:
- Koristi online alate kao što su TinyPNG ili Squoosh
- Ili instaliraj image optimization alate

## Backup

- Redovito backupaj kod na Git
- Backupaj i slike ako su važne

