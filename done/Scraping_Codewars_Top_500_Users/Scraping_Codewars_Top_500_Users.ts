import * as jsdom from 'jsdom'


const url = 'https://www.codewars.com/users/leaderboard'

interface IUser {
  name: string,
  clan: string,
  honor: number
}

const getUsers = () =>
  new Promise<{position: {[i: number]: IUser}}>(
    (resolve, reject) => {
      jsdom.env(
        url,
        function (err: Error, window: Window) {
          if (err) { reject(err) }
          const position = [...window.document.querySelectorAll('.leaderboard tr')]
            .slice(1)
            .map((element) => ({
              name: decodeURIComponent(
                (element.querySelector('td:nth-child(2) a') as HTMLAnchorElement)
                  .href
                  .slice(31)
              ),
              clan: ((element.querySelector('td:nth-child(3)') as Element)
                .textContent as string)
                  .replace('&', '&amp;'),
              honor: parseInt(
                (element.querySelector('td:nth-child(4)') as Element)
                  .textContent as string,
                10
              )
            }))
          const leaderboard = {
            position: position
              .reduce(
                (users, user, i) =>
                  ({...users, [i + 1]: user}),
                ({} as {[i: number]: IUser})
              )
          }
          resolve(leaderboard)
        }
      )
})

export default getUsers