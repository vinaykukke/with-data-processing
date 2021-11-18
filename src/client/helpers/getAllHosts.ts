/**
 * Returns all the available hosts without duplicates
 */
import { IApp } from 'Types';

function getAllHosts(apps: IApp[]) {
  var hosts: any[] = [];

  // Complexity: O(n^2)
  apps.forEach((app: IApp) => {
    const availableHosts = app.host;
    availableHosts.forEach((host) => {
      !hosts.includes(host) && hosts.push(host);
    });
  });

  return hosts;
}

export default getAllHosts;
