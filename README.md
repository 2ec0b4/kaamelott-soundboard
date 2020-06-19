# Kaamelott Soundboard #

Alors, j'ai fait deux fois le tour des Internets pour être sûr, eh ben croyez-moi, croyez-moi pas, je n'ai pas trouvé de plateforme regroupant des répliques sonores de Kaamelott.

_Lorem ipsum dolor sit amet._ Voilà. Et bien ça, par exemple, ça veut absolument rien dire. Et puis ce n'est pas une réplique de Kaamelott. Du coup vous ne pourrez pas l'écouter. Mais vous pouvez toujours proposer d'autres sons en contribuant à ce dépôt en proposant une fusiodemande.

Alors, c'est classe ou c'est pas classe ? Ou c'est classe ?

## Lancer le projet ##

Pour faire fonctionner le projet sur votre machine, vous devrez tout d'abord, depuis la racine, exécuter la commande `bower install` puis accéder au fichier `index.html` via le serveur Web de votre choix (Apache pour moi, quand je ne suis pas sioux et que je ne m'y prends pas comme un commanche). Sinon vous pouvez aussi utiliser [Docker](https://www.docker.com/) avec les commandes suivantes :
```bash
make init
make install
make start
```
(cf. le fichier `Makefile`)

Whoooohoooo woa c'est mortel !

## Contribuer ##

1. Scissionnez (cf. [Fork](http://bitoduc.fr/#F)) ce dépôt
2. Créez une nouvelle branche (`git checkout -b sons-qui-envoient-du-pate`)
3. Ajoutez vos sons (format _mp3_) dans le répertoire `sounds/` et référencez-les dans le fichier `sounds/sounds.json`
4. Enregistrez les modifications (`git commit -am "Mes sons qui envoient du paté"`)
5. Poussez vos modifications (`git push origin head`)
6. Créez une [fusiodemande](https://github.com/2ec0b4/kaamelott-soundboard/pulls)
7. Patientez 😇

## Liens ##

* [Reddit](https://www.reddit.com/r/france/comments/5orvyf/kaamelott_soundboard_3/)
* [Application iOS](https://github.com/tnducrocq/kaamelott-sound-board-ios)
* [Visualisation graphique des répliques du _soundboard_](https://github.com/aluriak/kaamelott-soundboard-viz)
* [Application Android](https://gitlab.com/astran/kaamelottsb) pas encore sur le store mais il y a un [lien pour l'apk de dev](https://gitlab.com/astran/kaamelottsb/-/jobs/artifacts/master/raw/app/build/outputs/apk/debug/app-debug.apk?job=assembleDebug) 
* [Bot Telegram](https://github.com/klmp200/kaamelott-soundboard-telegram-bot)

Merci, de rien, au revoir m'sieur dame
