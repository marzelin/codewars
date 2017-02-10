import getUsers from './Scraping_Codewars_Top_500_Users'

describe('getUsers', function () {
  it('returns an object with 500 users', function () {
    this.timeout(12000)
    return getUsers()
      .then(({position}) => Object.keys(position).length.should.equal(500))
  })
})