import routes from './routes.mjs';

export default function(pathname) {
  if (pathname === '/') {
    return routes.INDEX;
  }

  if (pathname === '/about') {
    return routes.ABOUT;
  }

  if (pathname.startsWith('/questions/')) {
    return routes.QUESTIONS;
  }
}
