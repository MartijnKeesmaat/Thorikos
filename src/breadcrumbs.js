import { capitalize } from './helpers';

export function renderPath(path, pathIndex, pathText) {
  const pathQuery = document.querySelector('#path');
  const entry = capitalize(path[pathIndex].toLowerCase());
  if (path.length > 1) pathText += ` > ${entry}`;
  else pathText += `${entry}`;
  pathQuery.innerHTML = pathText;
  pathIndex++;
}
