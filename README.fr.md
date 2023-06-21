<!-- Langue : Français -->

## Langues
- [English](README.md)
- [Français](README.fr.md)

# Carte au trésor

## Contexte

Le gouvernement péruvien a autorisé les aventuriers à explorer les 85 182 km² de la région de Madre de Dios. Votre tâche est de créer un système qui suit les déplacements et les collections de trésors de ces aventuriers. Le gouvernement péruvien met l'accent sur l'importance d'un code de haute qualité, lisible et maintenable, ce qui inclut l'écriture de tests.

## Description du problème

### La carte

La carte de Madre de Dios est une grille rectangulaire, où chaque case a la même taille. La carte contient des plaines, des montagnes et des trésors.

Les dimensions de la carte sont définies dans le fichier d'entrée comme suit :

```
# {C comme Carte} - {Nombre de colonnes} - {Nombre de lignes}
C - 3 - 4
```

Par défaut, toutes les cases de la carte sont des plaines que les aventuriers peuvent traverser sans obstacles. Les cases sont numérotées d'ouest en est et du nord au sud, en commençant par zéro.

Les montagnes sont des obstacles infranchissables pour les aventuriers. Chaque montagne dans la carte de Madre de Dios est indiquée dans le fichier d'entrée comme suit :

```
# {M comme Montagne} - {Coordonnée horizontale} - {Coordonnée verticale}
M - 1 - 1
```

L'aspect le plus important pour les aventuriers est le trésor. Plusieurs trésors peuvent être situés sur la même case, et le nombre de trésors sur une case est indiqué dans le fichier d'entrée comme suit :

```
# {T comme Trésor} - {Coordonnée horizontale} - {Coordonnée verticale} - {Nombre de trésors}
T - 0 - 3 - 2
```

Exemple pour une carte de 3x4 :

```
C - 3 - 4
M - 1 - 1
M - 2 - 2
T - 0 - 3 - 2
T - 1 - 3 - 1
```

Ce qui peut être représenté comme suit :

```
. . .
. M .
. . M
T(2) T(1) .
```

### Les aventuriers

Un aventurier est caractérisé par sa position sur la carte et son orientation (nord, sud, est ou ouest). Il peut se déplacer d'une case à la fois dans la direction déterminée par son orientation. Cependant, il peut changer d'orientation en tournant de 90 degrés à droite ou à gauche. Les aventuriers commencent avec une orientation initiale (nord, sud, est ou ouest) et une séquence prédéfinie de mouvements composés d'actions (Avancer, Tourner à gauche, Tourner à droite). Les aventuriers ne sont pas des montagnards, donc ils ne peuvent pas traverser les cases de montagne.

Exemple de séquence de mouvement :

```
AGGADADA devient : Avancer, Tourner à gauche, Tourner à gauche, Avancer, Tourner à droite, Avancer, Tourner à droite, Avancer.
```

Les aventuriers présents sur la carte sont indiqués dans le fichier d'entrée comme suit :

```
# {A comme Aventurier} - {Nom de l'aventurier} - {Coordonnée horizontale} - {Coordonnée verticale} - {Orientation} - {Séquence de mouvement}
A - Indiana - 1 - 1 - S - AADADA
```

Exemple pour une carte de 3x4 :

```
Au départ :
. . .
. A .
M . .
. . .

Après les mouvements, indiqués par le nombre entre parenthèses :
. . .
. . .
M (1) .
A (2) .
```

### Format du fichier d'entrée

Le programme doit être capable de lire le fichier d'entrée dans le format suivant :


```
C - 3 - 4
M - 1 - 0
M - 2 - 1
T - 0 - 3 - 2
T - 1 - 3 - 3
A - Lara - 1 - 1 - S - AADADAGGA
```

### Format du fichier de sortie

Le programme doit écrire le fichier de sortie dans le format suivant :

```
C - 3 - 4
M - 1 - 0
M - 2 - 1
T - 1 - 3 - 2
A - Lara - 0 - 3 - S - 3
```

## Utilisation

- Installez les dépendances nécessaires avec npm :

```npm install```

- Exécutez le programme avec la commande suivante :

```npm start```

- Le résultat sera écrit dans le fichier `./data/output.txt`.

## Test

Vous pouvez exécuter les tests unitaires avec la commande suivante :

```npm test```