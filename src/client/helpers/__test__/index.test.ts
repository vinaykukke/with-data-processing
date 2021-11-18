import addAppToHosts from 'Helpers/addAppToHosts';
import removeAppFromHosts from 'Helpers/removeAppFromHosts';
import getAllHosts from 'Helpers/getAllHosts';
import getAppsByHost from 'Helpers/getAppsByHost';
import { IApp } from 'Types';
import request from 'request';

let appWithHosts: IApp;
let appWithoutHosts: IApp;
let apps: IApp[];

beforeEach(() => {
  appWithHosts = {
    name:"Small Fresh Pants - Kautzer - Boyer, and Sons",
    contributors:["Edwin Reinger","Ofelia Dickens","Hilbert Cole","Helen Kuphal","Maurine McDermott Sr."],
    version:7,
    apdex:68,
    host:[
      "7e6272f7-098e.dakota.biz",
      "9a450527-cdd9.kareem.info",
      "e7bf58af-f0be.dallas.biz"
    ]
  };

  appWithoutHosts = {
    name:"Small Fresh Pants - Kautzer - Boyer, and Sons",
    contributors:["Edwin Reinger","Ofelia Dickens","Hilbert Cole","Helen Kuphal","Maurine McDermott Sr."],
    version:7,
    apdex:68,
    host:[]
  }

  apps = [
    {
      name:"Small Fresh Pants - Kautzer - Boyer, and Sons",
      contributors:["Edwin Reinger","Ofelia Dickens","Hilbert Cole","Helen Kuphal","Maurine McDermott Sr."],
      version:7,
      apdex:68,
      host:[
        "7e6272f7-098e.dakota.biz",
        "9a450527-cdd9.kareem.info",
        "e7bf58af-f0be.dallas.biz"
      ]
    },
    {
      name:"Apple, Inc",
      contributors:["Vinay kukke"],
      version:7,
      apdex:99,
      host:[]
    },
    {
      name:"Google, Inc",
      contributors:["Vinay kukke"],
      version:10,
      apdex:99,
      host:[
        "100e.dakota.biz",
        "87362.kareem.info",
        "987978.california.biz"
      ]
    }
  ]
});

describe("addAppToHost()", () => {
  it("returns a app with an added host", () => {
    const modifiedApp: IApp = addAppToHosts(appWithHosts, ['test-f0be.test.biz']);
    expect(modifiedApp).toEqual({
      name:"Small Fresh Pants - Kautzer - Boyer, and Sons",
      contributors:["Edwin Reinger","Ofelia Dickens","Hilbert Cole","Helen Kuphal","Maurine McDermott Sr."],
      version:7,
      apdex:68,
      host:[
        "7e6272f7-098e.dakota.biz",
        "9a450527-cdd9.kareem.info",
        "e7bf58af-f0be.dallas.biz",
        "test-f0be.test.biz"
      ]
    });
  });

  it("returns a app with an added host, if no hosts exist", () => {
    const modifiedApp: IApp = addAppToHosts(appWithoutHosts, ['test-f0be.test.biz']);
    expect(modifiedApp).toEqual({
      name:"Small Fresh Pants - Kautzer - Boyer, and Sons",
      contributors:["Edwin Reinger","Ofelia Dickens","Hilbert Cole","Helen Kuphal","Maurine McDermott Sr."],
      version:7,
      apdex:68,
      host:["test-f0be.test.biz"]
    });
  });
});

describe("removeAppFromHosts()", () => {
  it("returns an app with the specific host removed", () => {
    const modifiedApp: IApp = removeAppFromHosts(appWithHosts, ['e7bf58af-f0be.dallas.biz']);
    expect(modifiedApp).toEqual({
      name:"Small Fresh Pants - Kautzer - Boyer, and Sons",
      contributors:["Edwin Reinger","Ofelia Dickens","Hilbert Cole","Helen Kuphal","Maurine McDermott Sr."],
      version:7,
      apdex:68,
      host:[
        "7e6272f7-098e.dakota.biz",
        "9a450527-cdd9.kareem.info",
      ]
    });
  });

  it("returns an app with all hosts removed", () => {
    const modifiedApp: IApp = removeAppFromHosts(appWithHosts, [
      "7e6272f7-098e.dakota.biz",
      "9a450527-cdd9.kareem.info",
      "e7bf58af-f0be.dallas.biz"
    ]);
    expect(modifiedApp).toEqual({
      name:"Small Fresh Pants - Kautzer - Boyer, and Sons",
      contributors:["Edwin Reinger","Ofelia Dickens","Hilbert Cole","Helen Kuphal","Maurine McDermott Sr."],
      version:7,
      apdex:68,
      host:[]
    });
  });
});

describe("getAllHosts()", () => {
  it("returns all the available hosts in a list containing a single app of type IApp[]", () => {
    const availableHosts: string[] = getAllHosts([appWithHosts]);
    expect(availableHosts).toEqual([
      "7e6272f7-098e.dakota.biz",
      "9a450527-cdd9.kareem.info",
      "e7bf58af-f0be.dallas.biz"
    ]);
  });

  it("returns all the available hosts in a list of apps of type IApp[]", () => {
    const availableHosts: string[] = getAllHosts(apps);
    expect(availableHosts).toEqual([
      "7e6272f7-098e.dakota.biz",
      "9a450527-cdd9.kareem.info",
      "e7bf58af-f0be.dallas.biz",
      "100e.dakota.biz",
      "87362.kareem.info",
      "987978.california.biz"
    ]);
  });
});

describe("getAppsByHost()", () => {
  xit("should return the top 25 apps ordered by apdex for a specific host", () => {
    const fetch = jest.fn(() => new Promise(resolve => resolve()));
    fetch('/data').then(res => res.json()).then((apps: IApp[]) => {
      const topSatisfiedApps = getAppsByHost('e7bf58af-f0be.dallas.biz', apps);
      expect(topSatisfiedApps).toHaveLength(25);
    });
  });
});
