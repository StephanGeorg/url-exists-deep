var should = require('should');
var urlExistsDeep = require('../src/lib/url-exists-deep');

describe('Make deep analyze of URL', function() {

  var url = '';

  describe('Returning a valid URL for (http://www.google.com)', function () {
    it('should return url', function (done) {
      url = 'http://www.google.com';
      urlExistsDeep(url)
        .then(function(res) {
          // console.log("Response for", url, res.href);
          res.should.have.property('href', 'http://www.google.com/');
          done();

        })
        .catch(function(error) {
          console.log("Error", error);
          done();
        });
    });
  });

  describe('Follow a redirect and return valid destination URL', function () {
    it('should follow redirect and return url', function(done) {
      url = 'https://goo.gl/DrBmYG';
      urlExistsDeep(url)
        .then(function(res) {
          // console.log("Response for", url, res.href);
          res.should.have.property('href', 'https://github.com/StephanGeorg/url-exists-deep');
          done();
        })
        .catch(function(error) {
          console.log("Error", error);
          done();
        });
    });
  });

  describe('Starting a deeper determination if URL exists', function () {
    it('should start deeper request and return url', function(done) {
      url = 'http://targobank.de';
      urlExistsDeep(url)
        .then(function(res) {
            res.should.have.property('href', 'https://www.targobank.de/');
          done();
          //console.log("Response for", url, res.href);
        })
        .catch(function(error) {
          console.log("Error", error);
          done();
        });

    });
  });

  describe('Returning false for non-existing domain', function () {
    it('should be false', function(done) {
      url = 'http://thisisawrongurltotest.com';
      urlExistsDeep(url)
        .then(function(res) {
          // console.log('then', res);
          // res.should.be.false;
          // done();
          // console.log("Response for", url, res);
        })
        .catch(function (error) {
          // console.log('catch', error);
          error.should.be.false;
          done();
          // console.log("Response for", url, error);
        });

    });
   });

   describe('Returning false for a 403 url', function () {
     it('should be false', function(done) {
       url = 'https://httpstat.us/403';
       urlExistsDeep(url)
         .then(function(res) {
           res.should.be.false;
           done();
           // console.log("Response for", url, res);
         })
         .catch(function(error) {
           // error.should.be.false;
           // done();
           // console.log("Response for", url, error);
         });

     });
    });
});
