import {Client, expect} from '@loopback/testlab';
import {CvBackendApplication} from '../..';
import {setupApplication} from './test-helper';

describe('PingController', () => {
  let app: CvBackendApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('invokes GET /bios/count', async () => {
    const res = await client.get('/bios/count').expect(200);
    expect(res.body).to.containEql({count: 0});
  });
});
