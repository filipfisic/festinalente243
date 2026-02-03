# Git Checklist - Prije Pushanja

## ✅ Provjere prije commit-a:

- [x] **Nema osjetljivih podataka** - Provjereno, nema passworda, API ključeva, tokena
- [x] **.gitignore kreiran** - Dodan .gitignore s OS i editor fajlovima
- [x] **.DS_Store uklonjen** - Mac system fajlovi uklonjeni
- [ ] **Kontakt informacije** - Provjeri da su točne (email, telefon)
- [ ] **Social media linkovi** - Dodaj stvarne linkove ili ukloni ako nemaš
- [ ] **Slike optimizirane** - Provjeri veličine slika (opcionalno)

## 📝 Što pushati na Git:

```
✅ index.html
✅ css/ (svi CSS fajlovi)
✅ js/ (svi JS fajlovi)
✅ images/ (sve slike)
✅ README.md
✅ DEPLOY.md
✅ .gitignore
```

## ❌ Što NE pushati:

```
❌ .DS_Store (Mac system fajlovi)
❌ .vscode/, .idea/ (Editor settings)
❌ *.log (Log fajlovi)
❌ .env (Environment variables - ako ih imaš)
❌ node_modules/ (Ako koristiš npm - trenutno ne koristiš)
```

## 🚀 Git Komande:

```bash
# Inicijaliziraj Git repo
cd /Users/filip/Desktop/FORKO
git init

# Dodaj sve fajlove
git add .

# Provjeri što će biti commitano
git status

# Napravi prvi commit
git commit -m "Initial commit - FESTINA LENTE 243 website"

# Dodaj remote (zamijeni s tvojim repo URL-om)
git remote add origin https://github.com/tvoj-username/tvoj-repo.git

# Pushaj na Git
git branch -M main
git push -u origin main
```

## ⚠️ Važno:

1. **Provjeri kontakt informacije** u `index.html` prije pushanja
2. **Social media linkovi** - Ako nemaš stvarne linkove, možeš ostaviti `#` ili ukloniti
3. **Telefon broj** - Provjeri da je točan (`+385 XX XXX XXXX`)

