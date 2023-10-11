# Ajout de balises `<link rel="canonical>` aux fichiers HTML

Ce programme Node.js vous permet d'ajouter des balises `<link rel="canonical>` aux fichiers HTML dans un dossier spécifié en utilisant une URL de base. La balise `<link rel="canonical>` est couramment utilisée pour indiquer la version canonique d'une page HTML.

## Configuration

1. Clonez ce référentiel sur votre ordinateur.

2. Installez les dépendances nécessaires en exécutant la commande suivante :

```bash
npm install
```

3. Créez un fichier `.env` à la racine de votre projet pour stocker les variables d'environnement suivantes :

```env
SITE_URL=https://votre-url-de-base.com
IN=chemin/vers/vos/fichiers/html
```

Assurez-vous de remplacer les valeurs par votre URL de base et le chemin vers le dossier contenant vos fichiers HTML.

## Exécution

1. Exécutez le script Node.js en utilisant la commande suivante :

```bash
npm start
```

2. Le programme parcourra récursivement le dossier spécifié (`IN`) pour trouver tous les fichiers HTML. Il ajoutera ensuite une balise `<link rel="canonical>` à chaque fichier HTML avec l'URL de base et le chemin du fichier actuel, tout en supprimant le chemin du dossier `IN` de l'URL finale.

3. Les fichiers HTML dans le dossier spécifié auront désormais des balises `<link rel="canonical>` ajoutées dans leur en-tête.

## Personnalisation

Vous pouvez personnaliser ce script en fonction de vos besoins spécifiques. Par exemple, vous pouvez ajuster le format de la balise `<link>` ou ajouter d'autres métadonnées si nécessaire.

N'oubliez pas de vérifier les autorisations d'écriture sur les fichiers HTML dans le dossier `IN` pour que le script puisse les modifier.

---

N'hésitez pas à apporter des modifications supplémentaires à ce README en fonction de votre projet ou pour fournir des informations supplémentaires aux utilisateurs.
