import { IApp } from 'Types';

function removeAppFromHosts(app: IApp, hosts: string[]): IApp {
  const availableHosts = app.host;
  let newHosts: string[] = [];

  hosts.forEach((hostName: string) => {
    const hosts = newHosts.length > 0 ? newHosts : availableHosts;
    newHosts = hosts.filter((host: string) => host !== hostName);
  });
  delete app.host;
  app.host = newHosts;
  return app;
}

export default removeAppFromHosts;
