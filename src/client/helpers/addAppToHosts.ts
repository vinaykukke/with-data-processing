import { IApp } from 'Types';

function addAppToHosts(app: IApp, hosts: string[]): IApp {
  const availableHosts = app.host;
  hosts.forEach((host: string) => availableHosts.push(host));
  return app;
}

export default addAppToHosts;
