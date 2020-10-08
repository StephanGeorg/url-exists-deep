import { expect } from 'chai';
import urlExistsDeep from '../src/index';

describe('Make successfull analyze of URL', () => {
  let url = '';

  describe('Returning a valid URL for (http://www.google.com)', () => {
    it('should return url', (done) => {
      url = 'http://www.google.com';
      urlExistsDeep(url)
        .then((res) => {
          expect(res).to.have.property('href').and.to.be.equal('http://www.google.com/');
          done();
        })
        .catch((error) => {
          console.log('Error', error);
          done();
        });
    });
  });

  describe('Follow a redirect and return valid destination URL', () => {
    it('should follow redirect and return url', (done) => {
      url = 'https://goo.gl/DrBmYG';
      urlExistsDeep(url)
        .then((res) => {
          expect(res).to.have.property('href').and.to.be.equal('https://github.com/StephanGeorg/url-exists-deep');
          done();
        })
        .catch((error) => {
          console.log({ error });
          done();
        });
    }).timeout(0);

    it('should follow redirect and return url', (done) => {
      url = 'https://www.nasa.gov/content/goddard/what-did-hubble-see-on-your-birthday';
      urlExistsDeep(url)
        .then((res) => {
          expect(res).to.have.property('href').and.to.be.equal('https://www.nasa.gov/content/goddard/what-did-hubble-see-on-your-birthday/');
          done();
        })
        .catch((error) => {
          console.log({ error });
          done();
        });
    });
  });

  /* describe('Starting a deeper determination if URL exists', () => {
    it('should start deeper request and return url', (done) => {
      url = 'http://targobank.de';
      urlExistsDeep(url)
        .then((res) => {
          expect(res).to.have.property('href').and.to.be.equal('https://www.targobank.de/');
          done();
        })
        .catch((error) => {
          console.log({ error });
          // done();
        });
    }).timeout(4000);
  }); */
});

describe('Make unsuccessfull analyze of URL', () => {
  let url = '';
  describe('Returning false for non-existing domain', () => {
    it('should catch error', (done) => {
      url = 'http://thisisawrongurltotest.com';
      urlExistsDeep(url)
        .then((res) => {
          expect(res).to.be.equal(false);
          done();
        })
        .catch(done);
    }).timeout(4000);
  });

  describe('Returning false for a 403 url', () => {
    it('should be false', (done) => {
      url = 'https://httpstat.us/403';
      urlExistsDeep(url)
        .then((res) => {
          expect(res).to.be.equal(false);
          done();
          // console.log("Response for", url, res);
        })
        .catch(done);
    }).timeout(0);
  });

  it('should start deeper request after 405', (done) => {
    url = 'https://httpstat.us/405';
    urlExistsDeep(url)
      .then((res) => {
        expect(res).to.be.equal(false);
        done();
      })
      .catch((error) => {
        console.log('Error', error);
        console.log({ error });
        expect(error).to.be.equal(undefined);
        done();
      });
  }).timeout(0);

  describe('Returning false for a 503 url', () => {
    it('should be false', (done) => {
      url = 'https://httpstat.us/503';
      urlExistsDeep(url)
        .then((res) => {
          expect(res).to.be.equal(false);
          done();
        })
        .catch(done);
    }).timeout(0);
  });

  describe('Returning false for a 404 url', () => {
    it('should be false', (done) => {
      url = 'https://httpstat.us/404';
      urlExistsDeep(url)
        .then((res) => {
          expect(res).to.be.equal(false);
          done();
          // console.log("Response for", url, res);
        })
        .catch(done);
    }).timeout(0);
  });
});
