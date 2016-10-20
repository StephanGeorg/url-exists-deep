var should = require('should');
var urlExistsDeep = require('../lib/url-exists-deep');

describe('Make deep analyze of URL', function() {

  var url = '';

  it('should return url', function(done) {
    url = 'http://www.google.com';
    urlExistsDeep(url)
      .then(function(res) {
        //res.should.be.object;
        done();
        console.log("Response for", url, res.href);
      })
      .catch(function(error) {
        console.log("Error", error);
        done();
      });

  });

    it('should follow redirect and return url', function(done) {
      url = 'https://goo.gl/DrBmYG';
      urlExistsDeep(url)
        .then(function(res) {
          //res.should.be.object;
          done();
          console.log("Response for", url, res.href);
        })
        .catch(function(error) {
          console.log("Error", error);
          done();
        });

    });

    it('should start deeper request and return url', function(done) {
      url = 'http://targobank.de';
      urlExistsDeep(url)
        .then(function(res) {
          //res.should.be.false;
          done();
          console.log("Response for", url, res.href);
        })
        .catch(function(error) {
          console.log("Error", error);
          done();
        });

    });


    it('should be false', function(done) {
      url = 'http://thisisawrongurltotest.com';
      urlExistsDeep(url)
        .then(function(res) {
          //res.should.be.false;
          done();
          console.log("Response for", url, res);
        })
        .catch(function(error) {
          console.log("Error", error);
          done();
        });

    });



});
