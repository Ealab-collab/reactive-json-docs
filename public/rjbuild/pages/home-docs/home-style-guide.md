# Style Guide - Page d'Accueil Reactive-JSON

## 🎨 Palette de Couleurs - Thème Complet

### Variables CSS Bootstrap Redéfinies - Palette Complète

Au niveau du container principal, nous redéfinissons **toutes** les variables Bootstrap pour créer un thème cohérent :

```yaml
style:
  # Palette principale basée sur le gradient turquoise - Bootstrap 5.3 Complet
  "--bs-primary": "#44a08d"           # Turquoise-vert (couleur principale)
  "--bs-primary-rgb": "68, 160, 141"
  "--bs-primary-bg-subtle": "#d4f0ec"   # 🆕 Arrière-plan subtil primary
  "--bs-primary-border-subtle": "#a8ddd5" # 🆕 Bordure subtile primary
  "--bs-primary-text-emphasis": "#2b6b5a" # 🆕 Texte emphasis primary
  
  "--bs-secondary": "#3d8b85"         # Teal profond (du gradient)
  "--bs-secondary-rgb": "61, 139, 133"
  "--bs-secondary-bg-subtle": "#d0e6e4" # 🆕 Arrière-plan subtil secondary
  "--bs-secondary-border-subtle": "#9cccc7" # 🆕 Bordure subtile secondary
  "--bs-secondary-text-emphasis": "#275852" # 🆕 Texte emphasis secondary
  
  "--bs-info": "#4ecdc4"              # Turquoise clair (du gradient)
  "--bs-info-rgb": "78, 205, 196"
  "--bs-info-bg-subtle": "#d7f3f1"     # 🆕 Arrière-plan subtil info
  "--bs-info-border-subtle": "#aeeae6" # 🆕 Bordure subtile info
  "--bs-info-text-emphasis": "#328a82" # 🆕 Texte emphasis info
  
  # Couleurs de liens harmonieuses
  "--bs-link-color": "#2d7a73"        # Turquoise foncé pour lisibilité
  "--bs-link-hover-color": "#44a08d"  # Primary au hover
  
  # Couleurs d'état harmonisées - Système complet Bootstrap 5.3
  "--bs-success": "#198754"           # Vert Bootstrap (inchangé)
  "--bs-success-rgb": "25, 135, 84"
  "--bs-success-bg-subtle": "#d1e7dd"   # 🆕 Backgrounds subtils
  "--bs-success-border-subtle": "#a3cfbb" # 🆕 Bordures subtiles
  "--bs-success-text-emphasis": "#0f5132" # 🆕 Texte emphasis
  
  "--bs-warning": "#fd7e14"           # Orange plus doux que Bootstrap
  "--bs-warning-rgb": "253, 126, 20"
  "--bs-warning-bg-subtle": "#fff3cd"   # 🆕 + variantes subtiles
  "--bs-warning-border-subtle": "#ffda6a"
  "--bs-warning-text-emphasis": "#984c0c"
  
  "--bs-danger": "#dc3545"            # Rouge Bootstrap (inchangé)
  "--bs-danger-rgb": "220, 53, 69"
  "--bs-danger-bg-subtle": "#f8d7da"    # 🆕 + variantes subtiles
  "--bs-danger-border-subtle": "#f1aeb5"
  "--bs-danger-text-emphasis": "#842029"
```

Cette approche permet à **TOUS** les composants Bootstrap d'hériter automatiquement de notre palette turquoise harmonisée.

### 🔧 Bootstrap 5.3 - Variables Subtiles Expliquées

Les nouvelles variables `*-bg-subtle`, `*-border-subtle` et `*-text-emphasis` sont utilisées par Bootstrap pour :

#### Boutons (Solution au problème --bs-btn-bg)
- **États Hover/Focus** : Les boutons utilisent automatiquement les variantes subtiles
- **Boutons Outline** : Bordures et textes utilisent les nouvelles variables
- **États Active** : Backgrounds subtils pour les états pressés

#### Utilitaires Modernes  
- **`.bg-primary-subtle`** : Arrière-plan discret pour alertes, cards
- **`.text-primary-emphasis`** : Texte haute emphase pour hiérarchie  
- **`.border-primary-subtle`** : Bordures harmonisées

#### Composants Automatiques
- **Alertes** : `alert-primary` utilise `--bs-primary-bg-subtle`
- **Badges** : Variantes subtiles pour badges discrets
- **Dropdowns** : États hover avec backgrounds subtils

**Résultat** : Plus besoin de surcharger `--bs-btn-bg` ou autres variables internes !

### Couleurs du Gradient (Hero Section)
- **Turquoise Clair** : `#4ecdc4` - Point de départ du gradient, **utilisé pour btn-info**
- **Turquoise-Vert** : `#44a08d` - Couleur médiane, **couleur principale (primary)**
- **Teal Profond** : `#3d8b85` - Point final, **utilisé pour secondary**

### Couleurs Thématiques par Usage
- **Primary** : `#44a08d` - Actions principales, CTA importants, navigation active
- **Secondary** : `#3d8b85` - Actions secondaires, boutons Cancel, éléments de support  
- **Info** : `#4ecdc4` - Messages informatifs, tips, notifications positives
- **Links** : `#2d7a73` - Liens dans le contenu textuel (plus foncé pour lisibilité)
- **Success** : `#198754` - Confirmations, états positifs, validation
- **Warning** : `#fd7e14` - Alertes, états d'attention (orange plus doux)
- **Danger** : `#dc3545` - Erreurs, suppressions, actions destructives

## 📝 Typographie

### Hiérarchie des Titres
- **H1 Hero** : `display-3 fw-bold` - Titre principal, impact maximum
- **H2 Sections** : `h1 fw-bold` - Titres de sections importantes
- **H4 Features** : `fw-bold` - Titres des cartes de fonctionnalités
- **H5 Subsections** : `mb-3` - Sous-titres dans les démos
- **H6 Components** : `fw-bold mb-2` - Titres de sections démo

### Corps de Texte
- **Lead** : `lead text-muted` - Descriptions principales des sections
- **Body** : Standard - Contenu général
- **Small** : `small text-white-75` - Badges et métadonnées
- **Monospace** : `font-monospace small` - Données techniques et état

## 📐 Espacement

### Système de Spacing
- **Hero Section** : `py-5` + `py-5` container = 160px total vertical
- **Sections Standard** : `py-5` = 80px vertical
- **Containers** : `container` avec responsive breakpoints
- **Grid Gaps** : `g-4` (sections), `g-5` (hero) pour espacement harmonieux
- **Button Groups** : `gap-2` (8px entre boutons)

### Marges Spécifiques
- **Titres** : `mb-3`, `mb-4` selon l'importance
- **Paragraphes** : `mb-4` pour aération
- **Colonnes** : `mb-5 mb-lg-0` responsive
- **Composants démo** : `mt-3`, `mt-2` pour espacement vertical

## 🧩 Composants

### Architecture CSS Modulaire - Solution Complète

Le thème utilise une **approche modulaire** avec des fichiers CSS séparés pour garantir un fonctionnement parfait et une maintenance optimale :

#### 1. Fichiers CSS Externes Dédiés
Les styles du thème turquoise sont maintenant organisés dans des fichiers CSS spécialisés :

**📁 `src/hull/DevApp.css`** - Thème principal
```css
/* Surcharge des classes Bootstrap pour le thème turquoise */
.btn-primary {
  --bs-btn-color: #fff;
  --bs-btn-bg: #44a08d;
  --bs-btn-border-color: #44a08d;
  --bs-btn-hover-bg: #3d8b85;
  --bs-btn-hover-border-color: #3d8b85;
  /* ... tous les états */
}

.btn-secondary {
  --bs-btn-bg: #3d8b85;
  --bs-btn-hover-bg: #2d7a73;
  /* ... */
}

.btn-info {
  --bs-btn-bg: #4ecdc4;
  --bs-btn-hover-bg: #44a08d;
  /* ... */
}

/* + outline buttons, links, backgrounds, borders, dark mode */
```

**📁 `src/hull/Layout.css`** - Styles de navigation
```css
/* Navbar et navigation avec support dark mode */
.navbar-brand { font-weight: 600; margin-left: 1rem; }
/* Variables CSS pour navbar en mode sombre */
/* Transitions et états adaptatifs */
```

**📁 `src/hull/component-demo/element/Sidebar.css`** - Styles sidebar
```css
/* Sidebar de démonstration avec accordion */
.rj-demo-sidebar { background-color: var(--bs-light); }
/* Styles spécifiques aux composants de démo */
```

**Avantages de l'approche modulaire :**
- ✅ **Séparation des Responsabilités** : Chaque fichier a un rôle spécifique
- ✅ **Maintenance Facilitée** : Modifications localisées dans le bon fichier
- ✅ **Réutilisabilité** : CSS indépendant de la configuration YAML
- ✅ **Performance** : Fichiers cachés par le navigateur
- ✅ **Compatibilité Totale** : Fonctionne avec toutes les versions Bootstrap
- ✅ **Variables CSS Natives** : Utilise les vraies variables Bootstrap (`--bs-btn-*`)
- ✅ **États Complets** : Hover, focus, active, disabled tous définis
- ✅ **Support Dark Mode** : Gestion cohérente dans tous les composants

#### 2. Variables CSS Custom Properties (Complément dans YAML)
```yaml
style:
  "--bs-primary": "#44a08d"
  "--bs-primary-bg-subtle": "#d4f0ec"
  "--bs-secondary": "#3d8b85"
  "--bs-info": "#4ecdc4"
  # ... toutes les autres variables
```

### 🧠 Pourquoi l'Approche Modulaire est Optimale

**Séparation Claire** :
- **DevApp.css** → Thème principal et surcharges Bootstrap
- **Layout.css** → Navigation et structure globale  
- **Sidebar.css** → Composants de démonstration spécifiques
- **YAML** → Variables CSS et configuration réactive

**Maintenance Simplifiée** :
- Modifications du thème → `DevApp.css` uniquement
- Ajustements navigation → `Layout.css` uniquement  
- Styles démo → `Sidebar.css` uniquement
- Pas de gestion de `<style>` inline dans les configurations YAML

## 🌙 Dark Mode Support

### Détection Automatique du Mode Sombre

Le thème inclut un **support natif du dark mode** qui s'active automatiquement selon les préférences système de l'utilisateur :

```css
@media (prefers-color-scheme: dark) {
  :root {
    /* Redéfinition des couleurs pour mode sombre */
    --bs-body-bg: #1a1a1a;
    --bs-body-color: #e9ecef;
    
    /* bg-light devient sombre */
    --bs-light: #2d3338;
    
    /* Palette turquoise adaptée au dark mode */
    --bs-primary: #4ecdc4;              /* Plus lumineux */
    --bs-primary-bg-subtle: #1a3330;    /* Arrière-plans sombres */
    --bs-secondary: #44a08d;
    --bs-info: #66e0d7;                 /* Plus contrasté */
    
         /* Liens plus visibles sur fond sombre */
     --bs-link-color: #5fb3a0;
     --bs-link-hover-color: #66e0d7;
     
     /* Navigation links clairs */
     --bs-nav-link-color: #adb5bd;
     --bs-nav-link-hover-color: #66e0d7;
     --bs-nav-link-disabled-color: #6c757d;
  }
}
```

### Problèmes Résolus

#### ❌ Problème classique du dark mode
```yaml
- type: div
  attributes:
    class: py-5 bg-light  # Reste clair en dark mode
  content:
    - type: p
      attributes:
        class: text-muted   # Devient clair aussi → invisible !
```

#### ✅ Solution automatique
```css
@media (prefers-color-scheme: dark) {
  .bg-light {
    background-color: var(--bs-light) !important;  /* Devient sombre */
    color: var(--bs-body-color) !important;        /* Texte adapté */
  }
  
  .bg-light .text-muted {
    color: var(--bs-secondary-color) !important;   /* Gris visible */
  }
}
```

### ⚠️ Problème Spécifique : Code Terminal (Hero)

#### ❌ Problème terminal/code blocks
```yaml
- type: div
  attributes:
    class: bg-dark rounded shadow-lg p-4  # Fond reste sombre
  content:
    - type: pre
      attributes:
        class: text-light small mb-0       # Texte devient sombre → INVISIBLE !
```

#### ✅ Solution spécifique
```css
@media (prefers-color-scheme: dark) {
  /* Cas 1: Code dans containers sombres (hero) */
  .bg-dark .text-light,
  .bg-dark pre.text-light {
    color: #f8f9fa !important;              /* Force le texte à rester clair */
  }
  
  /* Cas 2: Éléments avec bg-dark ET text-light (Get Started) */
  pre.bg-dark.text-light,
  .bg-dark.text-light {
    color: #f8f9fa !important;              /* Force le texte à rester clair */
    background-color: #0d1117 !important;   /* Assure fond très sombre */
  }
  
  /* Titres fichiers dans le terminal */
  .bg-dark .text-muted {
    color: #8b949e !important;              /* Gris GitHub pour "config.yaml" */
  }
}
```

**Principe** : Quand un container reste sombre (`bg-dark`), son contenu texte doit rester clair.

### 🔧 Deux Cas de Figure

#### Cas 1 : Container sombre avec texte enfant clair
```yaml
- type: div
  attributes:
    class: bg-dark                    # Container sombre
  content:
    - type: pre
      attributes:
        class: text-light             # Texte enfant clair
```

#### Cas 2 : Élément avec les deux classes
```yaml
- type: pre
  attributes:
    class: bg-dark text-light         # Même élément avec les 2 classes
```

**Exemples concrets** :
- **Hero terminal** : Container `bg-dark` + enfant `text-light` (Cas 1)
- **Get Started** : `<pre class="bg-dark text-light">` (Cas 2)

### Palette Dark Mode

#### Couleurs de Base Adaptées
- **Background principal** : `#1a1a1a` (très sombre)
- **Texte principal** : `#e9ecef` (blanc cassé)
- **bg-light** : `#2d3338` (gris sombre au lieu de blanc)
- **bg-dark** : `#f8f9fa` (clair au lieu de sombre - inversion)

#### Palette Turquoise Optimisée Dark Mode
- **Primary** : `#4ecdc4` → Plus lumineux pour contraster sur fond sombre
- **Secondary** : `#44a08d` → Maintenu mais ajusté
- **Info** : `#66e0d7` → Plus lumineux et contrasté
- **Liens** : `#5fb3a0` → Plus visibles sur fond sombre
- **Navigation** : `#adb5bd` → Liens navbar clairs, hover `#66e0d7` (turquoise)

#### Arrière-plans Subtils Dark Mode
- **primary-bg-subtle** : `#1a3330` (turquoise très sombre)
- **secondary-bg-subtle** : `#1a2f2c` (teal très sombre)
- **info-bg-subtle** : `#1a3330` (turquoise sombre)

### Compatibilité Bootstrap 5.3

Le dark mode est compatible avec :
- ✅ **Détection automatique** : `prefers-color-scheme: dark`
- ✅ **Bootstrap natif** : `data-bs-theme="dark"`
- ✅ **Toutes les classes** : `bg-light`, `text-muted`, `card`, etc.
- ✅ **Notre thème turquoise** : Maintenu et adapté au mode sombre

### Test du Dark Mode

Pour tester le dark mode :
1. **Navigateur** : Outils développeur > Rendering > Emulate CSS prefers-color-scheme
2. **Système** : Paramètres OS > Apparence > Mode sombre
3. **Bootstrap** : Ajouter `data-bs-theme="dark"` à l'élément HTML

### Structure CSS Hybride Complète

Le fichier utilise cette approche hybride pour une compatibilité maximale :

```yaml
# Container principal avec thème complet
- type: div
  attributes:
    style:
      "--bs-primary": "#44a08d"
      "--bs-secondary": "#3d8b85" 
      "--bs-info": "#4ecdc4"
      "--bs-link-color": "#2d7a73"
      "--bs-warning": "#fd7e14"
      # ... toutes les autres variables
  content:
    # Tout le contenu hérite des nouvelles couleurs
```

### Hero Section
```yaml
class: hero-section text-white py-5
style:
  background: "linear-gradient(135deg, #4ecdc4 0%, #44a08d 50%, #3d8b85 100%)"
```

### Boutons - Fonctionnement Garanti 🎯

#### Primaires (Hero)
- **Get Started** : `btn btn-light btn-lg px-4`
- **Try Demo** : `btn btn-outline-light btn-lg px-4`

#### Palette Turquoise (avec CSS complet)
- **Primary** : `btn btn-primary` ← Turquoise `#44a08d` → Hover `#3d8b85`
- **Primary Outline** : `btn btn-outline-primary` ← Outline turquoise avec transitions
- **Secondary** : `btn btn-secondary` ← Teal `#3d8b85` → Hover `#2d7a73`
- **Secondary Outline** : `btn btn-outline-secondary` ← Outline teal avec transitions
- **Info** : `btn btn-info` ← Turquoise clair `#4ecdc4` → Hover `#44a08d`
- **Info Outline** : `btn btn-outline-info` ← Outline turquoise clair avec transitions

#### États (harmonisés avec le thème)
- **Success** : `btn btn-success` ← Vert Bootstrap (inchangé)
- **Warning** : `btn btn-warning` ← Orange doux `#fd7e14`
- **Danger** : `btn btn-danger` ← Rouge Bootstrap (inchangé)

#### ✨ États Interactifs Complets
- **Hover** : Transitions douces vers couleurs plus foncées
- **Focus** : Ombres colorées harmonisées (`focus-shadow-rgb`)
- **Active** : États pressed avec couleurs appropriées
- **Disabled** : États désactivés (automatiques Bootstrap)

#### Exemples d'Usage dans la Page
```yaml
# Groupe de boutons dans le formulaire démo
- type: div
  attributes:
    class: d-flex gap-2
  content:
    - type: button
      attributes:
        class: btn btn-primary    # Submit (action principale)
    - type: button
      attributes:
        class: btn btn-secondary  # Cancel (action secondaire)

# Groupe de boutons dans les interactions
- type: div
  attributes:
    class: d-flex flex-wrap gap-2 mb-3
  content:
    - type: button
      attributes:
        class: btn btn-outline-primary  # Toggle (action outline)
    - type: button
      attributes:
        class: btn btn-info btn-sm      # Info (message informatif)
    - type: button
      attributes:
        class: btn btn-outline-secondary btn-sm  # Reset (action reset)
```

### Links - Couleurs Harmonisées

Les liens héritent automatiquement des couleurs thématiques :
```yaml
# Liens normaux (couleur foncée pour lisibilité)
- type: a
  attributes:
    href: "/docs"
    class: ""  # Hérite de --bs-link-color (#2d7a73)
  content: "documentation"

# Au hover : automatiquement --bs-link-hover-color (#44a08d)
```

### Cards & Containers

#### Dashboard Cards (Exemples de Background)
```yaml
# Primary background
class: bg-primary text-white p-4 rounded text-center  # Turquoise principal

# Info background  
class: bg-info text-white p-4 rounded text-center     # Turquoise clair

# Secondary background
class: bg-secondary text-white p-4 rounded text-center # Teal profond
```

#### Alert Components
```yaml
# Alert info (hérite de la couleur info)
class: alert alert-info mt-2

# BsAlert avec variant
attributes:
  variant: info  # Utilise automatiquement la couleur info redéfinie
```

## 🎯 Guidelines de Design

### Avantages de l'Approche Hybride

1. **Fonctionnement Garanti** : Boutons stylés avec toutes les versions Bootstrap
2. **Thème Cohérent** : Toutes les couleurs Bootstrap harmonisées
3. **Compatibilité Maximale** : Fonctionne même si les variables CSS ne sont pas supportées
4. **Maintenabilité Totale** : Une modification change toute la palette
5. **Performance Optimale** : CSS optimisé, pas de styles inline
6. **Simplicité Maximale** : Classes standards Bootstrap, pas de styles customs
7. **États Complets** : Hover, focus, active, disabled tous gérés
8. **Évolutivité** : Facile d'ajouter des thèmes alternatifs complets
9. **Accessibilité** : Couleurs choisies avec contrastes appropriés

### Responsive Design
- **Mobile-first** : Classes responsive (`mb-5 mb-lg-0`)
- **Breakpoints** : Adaptation pour `col-lg-*` aux écrans larges
- **Espacement adaptatif** : Marges réduites sur mobile
- **Button Groups** : `flex-wrap gap-2` pour adaptation mobile

### Accessibilité
- **Contraste** : Ratios respectés pour WCAG AA avec nouvelles couleurs
- **Structure** : HTML sémantique (`header`, `main`, `section`)
- **Navigation** : Liens avec `href` descriptifs et couleurs lisibles
- **Focus** : États de focus automatiquement harmonisés

## 🔧 Maintenance

### Architecture Modulaire - Nouveauté
Les styles sont maintenant organisés dans des fichiers CSS externes pour une maintenance optimale :

**📁 Modifications du Thème Principal** → `src/hull/DevApp.css`
```css
/* Modifier les surcharges Bootstrap directement */
.btn-primary {
  --bs-btn-bg: #nouvelle-couleur;
  --bs-btn-hover-bg: #nouvelle-couleur-hover;
}
```

**📁 Ajustements Navigation** → `src/hull/Layout.css`
```css
/* Adapter la navbar et navigation */
.navbar-brand { /* modifications navbar */ }
```

**📁 Styles Démonstration** → `src/hull/component-demo/element/Sidebar.css`
```css
/* Personnaliser la sidebar démo */
.rj-demo-sidebar { /* modifications sidebar */ }
```

### Changer Tout le Thème (Variables YAML)
Pour modifier les variables Bootstrap via la configuration YAML :
```yaml
style:
  "--bs-primary": "#nouvelle-couleur-principale"
  "--bs-secondary": "#nouvelle-couleur-secondaire"  
  "--bs-info": "#nouvelle-couleur-info"
  "--bs-link-color": "#nouvelle-couleur-liens"
  # ... autres variables selon besoin
```

### Ajouter de Nouvelles Couleurs
Pour étendre le thème :
```yaml
style:
  # Variables existantes...
  "--bs-light": "#nouvelle-couleur-light"
  "--bs-dark": "#nouvelle-couleur-dark"
  # Couleurs customs
  "--custom-accent": "#couleur-accent"
```

### Extensions Futures
- Variables supplémentaires pour modes thématiques
- Mode sombre avec palette alternative complète
- Animations et transitions harmonisées
- Thèmes saisonniers ou événementiels

## 📋 Checklist Qualité

### Avant Publication
- [ ] Toutes les variables CSS définies au niveau parent
- [ ] Palette complète testée (primary, secondary, info, success, warning, danger)
- [ ] Couleurs de liens testées (normal et hover)
- [ ] Tous les boutons visuellement cohérents
- [ ] Contraste vérifié pour chaque couleur
- [ ] Responsive testé sur tous breakpoints
- [ ] Accessibilité validée avec nouvelles couleurs

### Tests Visuels Complets
- [ ] Hero section avec gradient harmonieux
- [ ] Boutons primary/secondary/info cohérents dans toute la page
- [ ] Liens avec couleurs appropriées et lisibles
- [ ] Cards dashboard avec différents backgrounds
- [ ] Alerts et notifications bien intégrées
- [ ] Cercles numérotés visuellement équilibrés
- [ ] Section finale harmonisée

## 💡 Bonnes Pratiques

### ✅ À Faire
- Utiliser toutes les classes Bootstrap standard disponibles
- Redéfinir la palette complète au niveau parent
- Maintenir la cohérence avec le gradient du hero  
- Tester toutes les variantes de couleurs
- Prévoir les cas d'usage de chaque couleur thématique

### ❌ À Éviter
- Styles inline pour les couleurs (sauf gradient hero)
- Mélange de couleurs Bootstrap standard et customs
- Oubli de définir les versions RGB des couleurs
- Couleurs non harmonisées avec la palette principale
- Surcharge inutile de variables CSS 