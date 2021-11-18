import getAllHosts from 'Helpers/getAllHosts';
import getAppsByHost from 'Helpers/getAppsByHost';
import Card from './components/Card';
import { IApp } from 'Types';

// fetch('/data').then(res => res.json()).then((apps: IApp[]) => {
//   // Complexity: O(n^2)
//   const availableHosts = getAllHosts(apps);
//
//   // Complexity: O(n)
//   availableHosts.forEach((host: string) => {
//     // Make a new card for every host
//     // Complexity: O(n^2) + O(n log(n)).
//     const topSatisfiedApps = getAppsByHost(host, apps);
//     const card = new Card(host, topSatisfiedApps);
//     // Complexity: O(n), because it uses `topSatisfiedApps`
//     card.create();
//   });
// });

// ASYNC: Returns a promise that needs to be resolved
// In this case since the function doesnt return anything its ok
// Can also be done with generators
// async function fetchData() {
//   const response = await fetch('/data');
//   const apps: IApp[] = await response.json();
//   const availableHosts = getAllHosts(apps);
//
//   availableHosts.forEach((host: string) => {
//     const topSatisfiedApps = getAppsByHost(host, apps);
//     const card = new Card(host, topSatisfiedApps);
//     card.create();
//   });
// };
//
// fetchData();

// GENERATORS: The same can be accomplished with generators as well
run(function* fetchData() {
  const response = yield fetch('/data');
  const apps: IApp[] = yield response.json();
  const availableHosts = getAllHosts(apps);

  availableHosts.forEach((host: string) => {
    const topSatisfiedApps = getAppsByHost(host, apps);
    const card = new Card(host, topSatisfiedApps);
    card.create();
  });
});

function run(generator) {
  const iterator = generator();

  function iterate(iteration) {
    if (iteration.done) return iteration.value;
    const promise = iteration.value;
    return promise.then(res => iterate(iterator.next(res)));
  }
  // Can return this value if you want to call `.then()` on the `run()`
  iterate(iterator.next());
}
