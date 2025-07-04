# Documentation Pages - Reactive-JSON

Ce dossier contient les configurations et documentations des pages du site Reactive-JSON.

## 📄 Pages Disponibles

### `home.yaml`
Page d'accueil principale du site avec :
- **🆕 Thème modulaire garanti** : Fichiers CSS externes + variables CSS Bootstrap 5.3
- Hero section avec gradient harmonieux (`#4ecdc4 → #44a08d → #3d8b85`)
- Démonstrations interactives avec boutons variés (primary, secondary, info)
- Guide de démarrage avec cercles numérotés
- Comparaisons avant/après
- Liens avec couleurs harmonisées

**🔧 Architecture CSS modulaire** : 
1. **DevApp.css** : Surcharge complète des classes Bootstrap (`.btn-primary`, `.btn-secondary`, etc.) avec support dark mode
2. **Layout.css** : Styles de navigation et structure globale avec adaptation responsive
3. **Sidebar.css** : Composants de démonstration spécialisés pour la sidebar
4. **Variables CSS YAML** : Support Bootstrap 5.3 complet (`--bs-primary`, `--bs-primary-bg-subtle`, etc.)
5. **Résultat** : Thème cohérent avec maintenance facilitée et performance optimale

### `docs.yaml`
Page de documentation (configuration)

## 🎨 Ressources de Style

### `home-style-guide.md`
**Guide de style complet** avec thème moderne comprenant :
- 🎨 Variables CSS Bootstrap redéfinies - **palette complète**
- 📝 Système typographique hiérarchisé
- 📐 Guidelines d'espacement et button groups
- 🧩 Composants utilisant **toutes** les classes Bootstrap standard
- 🎯 Principes de design avec thème cohérent
- 🔧 Instructions de maintenance pour palette complète
- 📋 Checklist qualité étendue
- 💡 Bonnes pratiques pour thème complet

### `color-palette.yaml`
**Référence technique complète** pour développeurs :
- Variables CSS pour palette complète (primary, secondary, info, links, success, warning, danger)
- **🆕 Support Bootstrap 5.3** : Variables subtiles (`*-bg-subtle`, `*-border-subtle`, `*-text-emphasis`)
- **🌙 Dark Mode Automatique** : Support natif avec `prefers-color-scheme`
- Structure YAML avec toutes les variables modernes
- Classes Bootstrap standard disponibles (boutons, backgrounds, textes)
- Cas d'usage recommandés par couleur thématique
- **🆕 Boutons automatiques** : Plus de problèmes `--bs-btn-bg`
- **✅ bg-light Dark Mode** : Résout le problème classique de visibilité
- Avantages de l'approche thème complet

## 🚀 Utilisation

### 🆕 Approche Modulaire Recommandée (Garantie de Fonctionnement)

Pour créer une page avec thème cohérent qui fonctionne parfaitement :

**Étape 1 : Importation des fichiers CSS**
Les styles du thème sont automatiquement chargés par les composants React :
- `DevApp.css` → Chargé dans `src/hull/DevApp.js`
- `Layout.css` → Chargé dans `src/hull/Layout.jsx` 
- `Sidebar.css` → Chargé dans `src/hull/component-demo/element/Sidebar.jsx`

**Étape 2 : Configuration YAML simplifiée**

```yaml
# Container avec variables CSS (complément Bootstrap 5.3)
- type: div
  attributes:
    style:
      # Palette principale Bootstrap 5.3
      "--bs-primary": "#44a08d"
      "--bs-primary-bg-subtle": "#d4f0ec"   # Backgrounds subtils
      "--bs-primary-border-subtle": "#a8ddd5" # Bordures harmonisées
      "--bs-primary-text-emphasis": "#2b6b5a" # Texte haute emphase
      
      "--bs-secondary": "#3d8b85"
      "--bs-info": "#4ecdc4"
      # ... toutes les variables subtiles
      
      # Couleurs de liens harmonieuses
      "--bs-link-color": "#2d7a73"
      "--bs-link-hover-color": "#44a08d"
  content:
    # 3. Utiliser TOUTES les classes Bootstrap - FONCTIONNEMENT GARANTI
    - type: button
      attributes:
        class: btn btn-primary      # ← Turquoise avec hover parfait
    - type: button
      attributes:
        class: btn btn-secondary    # ← Teal avec hover parfait
    - type: button
      attributes:
        class: btn btn-info         # ← Turquoise clair avec hover parfait
    - type: button
      attributes:
        class: btn btn-outline-primary # ← Outline avec transitions
    - type: a
      attributes:
        href: "/link"
        class: ""                   # ← Couleurs liens harmonisées
      content: "Lien harmonisé"
    
    # 🆕 Nouveaux composants Bootstrap 5.3 disponibles
    - type: div
      attributes:
        class: bg-primary-subtle p-3 rounded  # Arrière-plan subtil
    - type: span
      attributes:
        class: text-primary-emphasis fw-bold  # Texte haute emphase
    - type: div
      attributes:
        class: border border-primary-subtle   # Bordure harmonisée
```

### Exemples d'Usage Concrets

#### Groupe de Boutons (Formulaire)
```yaml
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
```

#### Groupe d'Actions Variées
```yaml
- type: div
  attributes:
    class: d-flex flex-wrap gap-2 mb-3
  content:
    - type: button
      attributes:
        class: btn btn-outline-primary  # Toggle (action principale outline)
    - type: button
      attributes:
        class: btn btn-info btn-sm      # Info (message informatif)
    - type: button
      attributes:
        class: btn btn-outline-secondary btn-sm  # Reset (action reset)
```

### Workflow de Développement

1. **Consulter** `home-style-guide.md` pour comprendre la palette complète
2. **Copier** la structure de variables CSS complète du guide
3. **Utiliser** les classes Bootstrap standard selon l'usage approprié :
   - `btn-primary` pour actions principales
   - `btn-secondary` pour actions secondaires  
   - `btn-info` pour messages informatifs
   - Liens sans classe pour hériter des couleurs harmonisées
4. **Tester** la cohérence visuelle sur tous les éléments
5. **Valider** l'accessibilité avec tous les contrastes

## 📁 Structure des Fichiers CSS

### Organisation Modulaire
```
src/hull/
├── DevApp.css          # 🎨 Thème principal (boutons, couleurs, dark mode)
├── Layout.css          # 🧭 Navigation et structure globale
└── component-demo/
    └── element/
        └── Sidebar.css # 📋 Styles sidebar et démonstrations
```

### Responsabilités par Fichier

**🎨 `DevApp.css` - Cœur du Thème**
- Surcharge complète des classes Bootstrap (`.btn-*`, `.text-*`, `.bg-*`, etc.)
- Support dark mode avec `@media (prefers-color-scheme: dark)`
- Variables CSS personnalisées pour la palette turquoise
- Styles du gradient hero et accordéons

**🧭 `Layout.css` - Structure et Navigation**
- Styles navbar avec adaptation responsive
- Variables CSS pour navigation en mode sombre
- Transitions fluides pour changement de thème
- Dropdown et toggler mobile adaptés

**📋 `Sidebar.css` - Composants Démo**
- Styles spécifiques à la sidebar de démonstration
- Accordion avec flèches personnalisées
- Navigation interne avec états actifs
- Adaptation dark mode pour interface démo

### Import Automatique
Les fichiers CSS sont automatiquement chargés par les composants React :
```javascript
// Dans DevApp.js
import './DevApp.css';

// Dans Layout.jsx  
import './Layout.css';

// Dans Sidebar.jsx
import './Sidebar.css';
```

## 🎯 Avantages de l'Approche

### ✅ Bénéfices Techniques
- **🎯 Fonctionnement Garanti** : Boutons stylés parfaitement avec fichiers CSS externes
- **📁 Architecture Modulaire** : Séparation claire des responsabilités (thème, navigation, démo)
- **🔧 Maintenance Facilitée** : Modifications localisées dans le fichier approprié
- **⚡ Performance Optimisée** : Fichiers CSS cachés par le navigateur, chargement rapide
- **🆕 Bootstrap 5.3 Full Support** : Variables subtiles pour composants modernes
- **✨ États Complets** : Hover, focus, active, disabled tous définis explicitement
- **🎨 Support Outline** : Boutons outline avec transitions parfaites
- **🛡️ Compatibilité Maximale** : Fonctionne avec toutes les versions Bootstrap
- **🧩 Réutilisabilité** : Styles indépendants des configurations YAML
- **🔄 Hot Reload** : Modifications CSS appliquées instantanément en développement
- **🆕 Nouveaux Utilitaires** : `bg-*-subtle`, `text-*-emphasis`, `border-*-subtle`
- **🌙 Dark Mode Cohérent** : Support uniforme dans tous les fichiers CSS
- **✅ Problème bg-light Résolu** : Classes adaptées automatiquement en mode sombre
- **📦 Bundle Optimisé** : CSS groupé et minifié par Webpack/Create React App
- **Accessibilité** : Couleurs choisies avec contrastes appropriés mode clair ET sombre

### ✅ Bénéfices Développeur
- **Simplicité Maximale** : `btn-primary`, `btn-secondary`, `btn-info` au lieu de styles complexes
- **Lisibilité** : Code plus propre et intentions claires
- **Collaboration** : Approche familière pour tous les développeurs Bootstrap
- **Sémantique** : Chaque couleur a un usage logique et prévisible

### ✅ Bénéfices Design
- **Palette Harmonieuse** : Basée sur le gradient du hero (`#4ecdc4 → #44a08d → #3d8b85`)
- **Hiérarchie Visuelle** : Primary > Secondary > Info avec dégradé logique
- **Flexibilité** : Success/Warning/Danger conservées pour les états système

## 🌙 Dark Mode Support

### Problème Classique Résolu

**❌ Problème typique du dark mode** :
```yaml
- type: div
  attributes:
    class: py-5 bg-light    # Reste blanc en dark mode
  content:
    - type: p
      attributes:
        class: text-muted     # Devient gris clair → INVISIBLE !
```

**✅ Notre solution automatique** :
```css
@media (prefers-color-scheme: dark) {
  .bg-light {
    background-color: #2d3338 !important;  /* Devient sombre */
    color: #e9ecef !important;              /* Texte adapté */
  }
  
  .bg-light .text-muted {
    color: #adb5bd !important;              /* Gris visible */
  }
}
```

### Fonctionnalités Dark Mode

#### 🎯 Détection Automatique
- **Système** : S'active selon les préférences OS (`prefers-color-scheme: dark`)
- **Bootstrap 5.3** : Compatible avec `data-bs-theme="dark"`
- **Pure CSS** : Pas de JavaScript requis
- **Instantané** : Switch automatique temps réel

#### 🎨 Palette Adaptée
- **Primary** : `#4ecdc4` (plus lumineux pour contraster sur fond sombre)
- **Secondary** : `#44a08d` (ajusté pour dark mode)
- **Info** : `#66e0d7` (plus contrasté et visible)
- **Liens** : `#5fb3a0` → `#66e0d7` (visibles sur fond sombre)
- **bg-light** : `#2d3338` (gris sombre au lieu de blanc)

#### 🛠️ Classes Automatiquement Adaptées
- ✅ **Backgrounds** : `bg-light`, `bg-dark`, `bg-primary`, `bg-secondary`, `bg-info`
- ✅ **Textes** : `text-muted`, `text-primary`, `text-secondary`, `text-emphasis`
- ✅ **Boutons** : Tous les boutons avec hover/focus adaptés
- ✅ **Utilitaires** : `border-*`, `bg-*-subtle`, `text-*-emphasis`
- ✅ **Composants** : Cards, containers, hero gradient adapté

### Test du Dark Mode

#### Méthodes de Test
1. **Navigateur** : F12 > Rendering > Emulate CSS `prefers-color-scheme: dark`
2. **Système** : Paramètres OS > Apparence > Mode sombre
3. **Bootstrap** : Ajouter `data-bs-theme="dark"` à l'élément `<html>`
4. **Auto** : Certains OS switchent automatiquement selon l'heure

#### Ce qui Change Automatiquement
- 🌑 **Background principal** : Devient `#1a1a1a` (très sombre)
- 📝 **Texte principal** : Devient `#e9ecef` (blanc cassé)
- 🔘 **Sections bg-light** : Deviennent `#2d3338` (gris sombre)
- 🔗 **Liens** : Plus lumineux et contrastés
- 🎨 **Hero gradient** : Adapté avec tons sombres harmonieux
- 💻 **Code terminal** : Texte reste clair sur fond sombre (fix spécifique)

#### ⚠️ Cas Spéciaux : Containers Sombres

**Problème identifié** : `text-light` dans `bg-dark` devient invisible en dark mode  
**Solution complète** : Deux règles CSS couvrent tous les cas :

##### 🔧 Cas 1 : Container sombre + enfant clair
```css
.bg-dark .text-light {
  color: #f8f9fa !important;   /* Enfant reste clair */
}
```
**Exemple** : Hero terminal `config.yaml` (container `bg-dark` + enfant `text-light`)

##### 🔧 Cas 2 : Élément avec les deux classes
```css
.bg-dark.text-light {
  color: #f8f9fa !important;   /* Même élément avec les 2 classes */
}
```
**Exemples** : Section "Get Started" - blocs code `npm install`, `import`, `<ReactiveJsonRoot>`

**Résultat** : Tout le code reste **parfaitement lisible** en dark mode !

## 📚 Liens Rapides

- [Guide de Style Thème Complet](home-style-guide.md) - Architecture CSS complète et tous les composants
- [Palette Technique Complète](color-palette.yaml) - Toutes les variables et cas d'usage
- [Page d'Accueil](home.yaml) - Implémentation de référence avec exemples
- [Documentation Principale](../docs/index.yaml) - Composants Reactive-JSON

## 🔧 Migration et Évolution

### Migration depuis l'Ancienne Approche

Si vous avez des styles inline, voici comment migrer vers le thème complet :

```yaml
# ❌ Ancienne approche (à éviter)
- type: button
  attributes:
    class: btn text-white
    style:
      backgroundColor: "#44a08d"
      borderColor: "#44a08d"

# ✅ Nouvelle approche - Thème complet (recommandée)
- type: div
  attributes:
    style:
      "--bs-primary": "#44a08d"
      "--bs-secondary": "#3d8b85"
      "--bs-info": "#4ecdc4"
      "--bs-link-color": "#2d7a73"
      # ... palette complète
  content:
    - type: button
      attributes:
        class: btn btn-primary  # Plus simple, plus maintenable, plus sémantique
```

### Évolution vers d'Autres Thèmes

Pour créer des thèmes alternatifs complets :

```yaml
# Thème "Ocean Blue"
style:
  "--bs-primary": "#0077be"
  "--bs-secondary": "#005a9c"  
  "--bs-info": "#4dabf7"
  "--bs-link-color": "#004080"

# Thème "Forest Green"  
style:
  "--bs-primary": "#2d8a47"
  "--bs-secondary": "#1e5f31"
  "--bs-info": "#51cf66"
  "--bs-link-color": "#1a4d26"
```

## 📋 Checklist Migration

### Avant d'Adopter le Thème Complet
- [ ] Identifier tous les styles inline de couleurs dans votre code
- [ ] Lister toutes les classes Bootstrap de couleur utilisées
- [ ] Tester la palette complète sur tous vos composants
- [ ] Vérifier les contrastes d'accessibilité
- [ ] Valider sur tous les breakpoints responsive

### Après Migration
- [ ] Toutes les couleurs sont harmonieuses
- [ ] Aucun style inline de couleur résiduel
- [ ] Tous les boutons suivent la hiérarchie logique
- [ ] Les liens sont lisibles et bien contrastés
- [ ] La maintenance est simplifiée (modification de palette en une seule fois) 