# madboxtest
Le test requis par Madbox

# Le temps mis à réaliser l'exercice.
Approximativement 7h répartis sur une journée de 10h du matin à 3h du matin suivant.
3h pour faire tout le code
4h pour faire le système de collision

# Les points qui m'ont posé quelques difficultés et pourquoi
Le système de collisions. 
Je n'avais jamais écrit de système de collision avec three.js donc j'ai du pas mal passer de temps à lire la doc et à faire des tests.
Il y a un sévère manque de références sur ce point précis, donc ça a pas été évident.

# Les points que je pense pouvoir améliorer et comment
Le système de collisions.
Il marche mais il est loin d'être parfait. 
Il ne prend pas en compte la friction, ni l'elasticité de la balle. 
Il ne prend pas en compte de quelconques forces exterieures.
Le système est designé pour marcher uniquement dans le cas précis de l'exercice et ne pourrait absolument pas être réutilisé autre part contrairement à tout le reste du code.
En gros, ça répond à la problématique, mais c'est pas ouf.

# Ce que j'en ai pensé.
L'exercice est asssez drôle, plutôt simple dans l'ensemble.
J'avoue avoir sous estimé le système de collisions parce que je pensais pouvoir le faire aussi vite que j'ai fait le reste. 
Après j'ai surtout pataugé parce que je connaissais pas trop three.js, donc la majorité de mon temps a été passé à lire de la doc.

# Mes éventuels commentaires.
Même si l'énoncé mentionne que je n'ai pas de deadline, vous avez dit que je devais prouver que je pouvais finir une playable ad en moins d'une semaine. 
Je sais pas exactemnt à quel point cet exercice permet de jauger ça. Surtout si vous avez déjà des systèmes de prêts.
Après c'est pas à moi d'en juger vu que je manque d'infos, c'est juste que j'ai pas trouvé ce point super clair.

A noter, dans le code y'a toute une partie commentée nommée "Debug Helpers". C'est les traces de quand j'ai fait plein de tests pour le système de collisions, donc je l'ai laissé au cas ou ça t'intéresserait de voir ce qu'il en est. Si tu le décommente fais aussi bien attention a décommenter la ligne 80 de scene.js aussi, sinon ça s'update pas bien.