// import request from 'supertest-as-promised'
// import httpStatus from 'http-status'
// import chai from 'chai'
// import { expect, } from 'chai'
// import app from '../../index'
//
// chai.config.includeStack = true
//
// describe('## User APIs', () => {
//   let user = {
//     name: 'test',
//     surname: 'test',
//     email: 'test@mail.com',
//     username: 'test',
//     password: 'Password123',
//   }
//
//   describe('# POST /api/users', () => {
//     it('should create a new user', (done) => {
//       request(app)
//         .post('/api/users')
//         .send(user)
//         .expect(httpStatus.OK)
//         .then((res) => {
//           expect(res.body.name).to.equal(user.name)
//           expect(res.body.surname).to.equal(user.surname)
//           expect(res.body.email).to.equal(user.email)
//           expect(res.body.username).to.equal(user.username)
//           user = res.body
//           done()
//         })
//     })
//   })
//
//   describe('# GET /api/users/:userId', () => {
//     it('should get user details', (done) => {
//       request(app)
//         .get(`/api/users/${user._id}`)
//         .expect(httpStatus.OK)
//         .then((res) => {
//           expect(res.body.name).to.equal(user.name)
//           expect(res.body.surname).to.equal(user.surname)
//           expect(res.body.email).to.equal(user.email)
//           expect(res.body.username).to.equal(user.username)
//           done()
//         })
//     })
//
//     it('should report error with message - Not found, when user does not exists', (done) => {
//       request(app)
//         .get('/api/users/56z787zzz67fc')
//         .expect(httpStatus.INTERNAL_SERVER_ERROR)
//         .then((res) => {
//           expect(res.body.message).to.equal('Internal Server Error')
//           done()
//         })
//     })
//   })
//
//   describe('# PUT /api/users/:userId', () => {
//     it('should update user details', (done) => {
//       user.name = 'KK'
//       request(app)
//         .put(`/api/users/${user._id}`)
//         .send(user)
//         .expect(httpStatus.OK)
//         .then((res) => {
//           expect(res.body.name).to.equal(user.name)
//           expect(res.body.surname).to.equal(user.surname)
//           expect(res.body.email).to.equal(user.email)
//           expect(res.body.username).to.equal(user.username)
//           done()
//         })
//     })
//   })
//
//   describe('# GET /api/users/', () => {
//     it('should get all users', (done) => {
//       request(app)
//         .get('/api/users')
//         .expect(httpStatus.OK)
//         .then((res) => {
//           expect(res.body).to.be.an('array')
//           done()
//         })
//     })
//   })
//
//   describe('# DELETE /api/users/', () => {
//     it('should delete user', (done) => {
//       request(app)
//         .delete(`/api/users/${user._id}`)
//         .expect(httpStatus.OK)
//         .then((res) => {
//           expect(res.body.name).to.equal(user.name)
//           expect(res.body.surname).to.equal(user.surname)
//           expect(res.body.email).to.equal(user.email)
//           expect(res.body.username).to.equal(user.username)
//           done()
//         })
//     })
//   })
// })