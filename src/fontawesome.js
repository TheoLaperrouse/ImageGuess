// fontawesome.js

import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Ajoutez les icônes à la bibliothèque FontAwesome
library.add(faGithub);
library.add(faExpand);

// Exportez le composant FontAwesomeIcon pour une utilisation dans d'autres fichiers
export default FontAwesomeIcon;
