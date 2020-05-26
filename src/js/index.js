// Load Bootstrap Library
import 'bootstrap';

// Load custom SASS
import '../scss/style.scss';

// Load Route Modules
import ViewStudents from './pages/ViewStudents';

const routes = {
  '/view' : ViewStudents,
};

document.addEventListener('DOMContentLoaded', () => {

  const currentRoute = window.location.hash.split('#');

  (currentRoute.length === 1) ? window.location.hash = '/view' : routes[currentRoute[1]]();
});

window.addEventListener('hashchange', (e) => {
  const newRoute = e.newURL.split('#')[1];

  routes[newRoute]();
});