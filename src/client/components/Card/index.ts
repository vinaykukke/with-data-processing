import { IApp } from 'Types';

class Card {
  private hostName: string;
  private apps: any[];

  constructor(host: string, apps: any[]) {
    this.hostName = host;
    this.apps = apps;
  }

  public create() {
    this.createNodes();

    // Complexity: O(n)
    for (let i = 0; i < this.apps.length; i++) {
      const app: IApp = this.apps[i];
      if (i > 5) break;
      this.fillNodes(app);
    }
  }

  private createNodes() {
    const root = document.getElementById('root');
    const card = document.createElement('div');
    const cardHeader = document.createElement('div');
    const cardBody = document.createElement('div');
    const input = document.getElementById('input-checkbox');
    const eventHandler = () => {
      if ( card.className.indexOf('inline') !== -1 ) {
        card.className = card.className.replace('inline', '');
      } else {
        card.className += ' inline';
      }
    };

    card.className = 'card inline';
    card.id = 'card';
    cardHeader.className = 'card-header';
    cardBody.className = 'card-body';
    cardBody.id = `card-${this.hostName}`;
    cardHeader.innerHTML = this.hostName;

    // Remove any existing event listners
    input.removeEventListener('click', eventHandler);
    input.addEventListener('click', eventHandler);

    card.appendChild(cardBody);
    card.insertBefore(cardHeader, cardBody);
    root.appendChild(card);
  }

  private fillNodes(app: IApp) {
    const cardBody = document.getElementById(`card-${this.hostName}`);
    const div = document.createElement('div');
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');

    p1.className = 'apdex';
    p2.className = 'app-name';

    div.appendChild(p1).innerHTML = app.apdex.toString();
    div.appendChild(p2).innerHTML = app.name;
    div.addEventListener('click', () => {
      alert(`Release Version: ${app.version}`);
    });
    cardBody.appendChild(div);
  }
}

export default Card;
