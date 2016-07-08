import { SettestPage } from './app.po';

describe('settest App', function() {
  let page: SettestPage;

  beforeEach(() => {
    page = new SettestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
