// fontawesome.js

import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Ajoutez les icônes à la bibliothèque FontAwesome
library.add(faGithub);

// Exportez le composant FontAwesomeIcon pour une utilisation dans d'autres fichiers
export default FontAwesomeIcon;
