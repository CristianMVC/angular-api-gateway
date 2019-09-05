import request                      from 'supertest-as-promised'
import httpStatus                   from 'http-status'
import chai,
       { expect, }                  from 'chai'
import app from '../../index'
import assert from 'assert'

chai.config.includeStack = true


describe('Array', () => {
  describe('# Test Mocha', () => {
    it('should return -1 when the value is not present', () => {
      assert.equal(-1, [1, 2, 3].indexOf(4)) // eslint-disable-line
    })
  })
})



describe('## Misc', () => {
//   describe('# GET /api/health-check', () => {
//     it('should return OK', (done) => {
//       request(app)
//         .get('/api/health-check')
//         .expect(httpStatus.OK)
//         .then((res) => {
//           expect(res.text).to.equal('OK')
//           done()
//         })
//         .catch(done)
//     })
//   })

  describe('# GET /api/404', () => {
    it('should return 404 status', (done) => {
      request(app)
        .get('/api/404')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.status).to.equal(404)
          done()
        })
        .catch(done)
    })
  })

//   describe('# Error Handling', () => {
//     it('should handle mongoose CastError - Cast to ObjectId failed', (done) => {
//       request(app)
//         .get('/api/users/56z787zzz67fc')
//         .expect(httpStatus.INTERNAL_SERVER_ERROR)
//         .then((res) => {
//           expect(res.body.message).to.equal('Internal Server Error')
//           done()
//         })
//         .catch(done)
//     })
//
//     it('should handle express validation error - username is required', (done) => {
//       request(app)
//         .post('/api/users')
//         .send({
//           mobileNumber: '1234567890'
//         })
//         .expect(httpStatus.BAD_REQUEST)
//         .then((res) => {
//           expect(res.body.message).to.equal('"username" is required')
//           done()
//         })
//         .catch(done)
//     })
//   })
})