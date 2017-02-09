import { DgcActivationWebServerPage } from './app.po';

describe('dgc-activation-web-server App', function() {
  let page: DgcActivationWebServerPage;

  beforeEach(() => {
    page = new DgcActivationWebServerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
