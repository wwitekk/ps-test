import React, { useEffect, useState } from 'react'

const Item = ({ item: { season, driver } }) => (
  <li>
    <a href='./nowhere'>
      {season} | {driver.givenName} {driver.familyName}
    </a>
  </li>
)

const List = ({ items }) =>
  items.map((item, idx) => <Item item={item} idx={idx} />)

const sortBySeasonDesc = (a, b) => {
  const aNum = parseInt(a.season)
  const bNum = parseInt(b.season)
  return bNum - aNum
}

const ListContainer = () => {
  const [items, setItems] = useState([])

  // task 1. Data are not loading - why?
  useEffect(() => {
    const url = 'http://ergast.com/api/f1/driverStandings/1.json?limit=300'
    fetch(url)
      .then(respone => respone.json())
      .then(data => data.MRData.StandingsTable.StandingsLists)
      // task 2. Get 30 latest winners (from season 2020 to 2006)
      .then(items =>
        items.sort(sortBySeasonDesc).filter((item, idx) => idx < 15)
      )
      .then(items =>
        items.map(item => ({
          season: item.season,
          driver: item.DriverStandings[0].Driver
        }))
      )
      .then(items => setItems(items))
  }, [])

  return <List items={items} />
}

export default ListContainer
