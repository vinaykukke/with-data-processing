/**
 * Returns the top 25 apps for given hostName
 */
import { IApp } from 'Types';

function getAppsByHost(hostName: string, apps: IApp[]) {
  var topApps: any[] = [];
  // Apps sorted by apdex largest to smallest
  // Array.prototype.sort() is a MergeSort. Complexity: O(n log(n)).
  var sortedApps: IApp[] = apps.sort((a, b) => b.apdex - a.apdex);

  // Complexity: O(n^2)
  sortedApps.forEach((app: IApp, index, arr) => {
    const appHosts: string[] = app.host;
    appHosts.forEach((host: string) => {
      if (topApps.length < 25 && (hostName === host)) {
        topApps.push(app);
      }
    });
  });

  return topApps;
}

export default getAppsByHost;
