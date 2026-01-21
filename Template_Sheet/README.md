# SDC - Système De Combat
## Character Sheet pour Roll20

### 📋 Description

Character sheet custom pour le **Système De Combat (SDC)**, conçu pour Roll20.

---

### ✨ Fonctionnalités

| Fonctionnalité | Description |
|----------------|-------------|
| **7 Statistiques** | Force, Agilité, Technique, Endurance, Intuition, Déduction, Éloquence |
| **Dés progressifs** | Conversion automatique (stat → D10 à D100) |
| **Boutons de jet** | Neutre, Attaque (avec zone ciblée), Défense (avec MC) |
| **Défense verrouillable** | Choix caché révélé au moment de l'attaque |
| **Blessures par zone** | 6 zones corporelles avec tracking complet |
| **Conversion auto** | 3 légères → 1 grave → handicapante |
| **Malus automatiques** | Calculés par zone et appliqués aux stats |
| **Condition létale** | Détection automatique (2 handicapantes adjacentes) |
| **Effets spéciaux** | Étourdi, Souffle coupé, Hémorragie, etc. |
| **Initiative** | Calcul automatique (Agilité + Intuition) / 2 |
| **Déplacement** | Réduit automatiquement par blessures jambes |
| **Inventaire** | Avec système de taille d'objets |
| **Inventaire rapide** | Mains + 6 slots (action mineure) |
| **Compétences** | Liste dynamique avec coût Endurance |
| **Roll Templates** | Messages stylisés dans le chat |

---

### 🚀 Installation

1. Allez dans votre campagne Roll20
2. **Settings** (⚙️) → **Game Settings**
3. Dans "Character Sheet Template", sélectionnez **Custom**
4. Copiez le contenu de :
   - `sheet-combined.html` → Onglet **HTML**
   - `sheet-combined.css` → Onglet **CSS**
5. **Save Changes**

---

### 📖 Guide d'utilisation

#### Statistiques et Jets

| Bouton | Fonction | Output |
|--------|----------|--------|
| **Neutre** | Jet simple | 1d[stat_die] |
| **Attaque** | Jet offensif | Score d'attaque + zone ciblée |
| **Défense** | Révèle MC | Modificateur de Confrontation |

#### Système de Confrontation

```
Force    → bat → Agilité
Agilité  → bat → Technique  
Technique → bat → Force
```

- **Gagne** : +MC en D10 à la défense
- **Perd** : -MC en D10 à la défense
- **Égalité** : Pas de modificateur

#### Défense Verrouillée

1. Le joueur choisit sa défense (physique + mentale)
2. Clique sur 🔒 **Verrouiller**
3. La défense reste cachée jusqu'à l'attaque
4. Le MJ peut 🔓 **Déverrouiller** après révélation

#### Blessures

| Gravité | Malus | Conversion |
|---------|-------|------------|
| Légère | -5 stat | 3 → 1 Grave |
| Grave | -10 stat + effet | 3 → 1 Handicapante |
| Handicapante | Effet majeur | 2 adjacentes → Létale |

#### Zones Adjacentes

```
         [Tête]
           ↓
[Bras G]←[Torse]→[Bras D]
           ↓
    [Jambe G] [Jambe D]
```

---

### 📁 Structure des fichiers

```
sdc-roll20/
├── sheet-combined.html  ← Pour Roll20 (HTML)
├── sheet-combined.css   ← Pour Roll20 (CSS)
├── sheet.html           ← Source HTML
├── sheet.css            ← Source CSS  
├── sheet.js             ← Source Sheet Workers
├── roll-templates.html  ← Templates séparés
├── roll-templates.css   ← Styles templates
└── README.md            ← Ce fichier
```

---

### 🔧 Personnalisation

#### Ajouter des slots rapides

Modifier `attr_quick_slot_bonus` pour débloquer des slots supplémentaires.

#### Modifier la capacité d'inventaire

Modifier `attr_inventory_bonus` pour augmenter la capacité de base (20).

#### Ajuster les malus de blessures

Dans le JavaScript, modifier `MALUS_CONFIG` :

```javascript
const MALUS_CONFIG = {
    'tete': {
        stat: ['intuition', 'deduction'],
        legere: 5,  // ← Modifier ici
        grave: 10,  // ← Modifier ici
        // ...
    },
    // ...
};
```

---

### ⚠️ Limitations connues

- Le verrouillage de défense est côté client (un joueur tech-savvy peut le contourner)
- Les malus ne se soustraient pas automatiquement des jets (affichage informatif)
- L'inventaire rapide n'a pas de validation de capacité

---

### 📜 Licence

Créé pour le système SDC. Libre d'utilisation et de modification.

---

### 🐛 Bugs / Suggestions

Contacte Yanis pour signaler des problèmes ou proposer des améliorations.