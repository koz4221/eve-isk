import { EveIskPage } from './app.po';

describe('eve-isk App', function() {
  let page: EveIskPage;

  beforeEach(() => {
    page = new EveIskPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
