# Kaamelott Soundboard #

Alors, j'ai fait deux fois le tour des Internets pour être sûr, eh ben croyez-moi, croyez-moi pas, je n'ai pas trouvé de plateforme regroupant des répliques sonores de Kaamelott.

_Lorem ipsum dolor sit amet._ Voilà. Et bien ça, par exemple, ça veut absolument rien dire. Et puis ce n'est pas une réplique de Kaamelott. Du coup vous ne pourrez pas l'écouter. Mais vous pouvez toujours proposer d'autres sons en contribuant à ce dépôt en proposant une fusiodemande.

Alors, c'est classe ou c'est pas classe ? Ou c'est classe ?

## Lancer le projet ##

Pour faire fonctionner le projet sur votre machine, vous devrez tout d'abord, depuis la racine, exécuter la commande `bower install` puis accéder au fichier `index.html` via le serveur Web de votre choix (Apache pour moi, quand je ne suis pas sioux et que je ne m'y prends pas comme un commanche). Pour cela vous pouvez utiliser [Docker](https://www.docker.com/) avec les 2 commandes suivantes :
```bash
docker build -t 2ec0b4/kaamelott-soundboard .
docker run -it --rm --name kaamelott-soundboard -p 80:80 -t 2ec0b4/kaamelott-soundboard
```
+ Pour les utilisateurs Windows 10 : Rendez-vous sur la page [http://localhost]()
+ Pour les utilisateurs Windows 7 : Rendez-vous sur la page [http://192.168.99.100]()

Whoooohoooo woa c'est mortel !

## Contribuer ##

1. Scissionnez (cf. [Fork](http://bitoduc.fr/#F)) ce dépôt
2. Créez une nouvelle branche (`git checkout -b sons-qui-envoient-du-pate`)
3. Ajoutez vos sons (format _mp3_) dans le répertoire `sounds/` et référencez-les dans le fichier `sounds/sounds.json`
4. Idéalement, vous pouvez [utiliser Audacity pour uniformiser vos sons](https://github.com/2ec0b4/kaamelott-soundboard/blob/master/Audacity/README.md)
5. Enregistrez les modifications (`git commit -am "Mes sons qui envoient du paté"`)
6. Poussez vos modifications (`git push origin head`)
7. Créez une [fusiodemande](https://github.com/2ec0b4/kaamelott-soundboard/pulls)

## Liens ##

* Reddit : https://www.reddit.com/r/france/comments/5orvyf/kaamelott_soundboard_3/
* Application iOS : https://github.com/tnducrocq/kaamelott-sound-board-ios
* Application Android : https://play.google.com/store/apps/details?id=fr.androdev.kaamelottsounds

Merci, de rien, au revoir m'sieur dame
