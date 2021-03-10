import React, { useState } from 'react'

const Item = ({ item: { season, driver } }) => (
  <li>
    <a href='./nowhere'>
      {season} | {driver.givenName} {driver.familyName}
    </a>
  </li>
)

const List = ({ items }) =>
  items.map((item, idx) => <Item item={item} idx={idx} />)

const handleItems = items => {
  const result = []
  // below create code to manipulate items
  // to get required number of items in requested order

  return result
}

const ListContainer = () => {
  const [items, setItems] = useState([])

  // task 1. Data are not loading - why?
  const url = 'http://ergast.com/api/f1/driverStandings/1.json?limit=300'
  fetch(url)
    .then(respone => respone.json())
    .then(data => data.MRData.StandingsTable.StandingsLists)
    // task 2. Update handleItems function to get 15 latest winners ordered by season (from season 2020 to 2006)
    .then(handleItems)
    .then(items =>
      items.map(item => ({
        season: item.season,
        driver: item.DriverStandings[0].Driver
      }))
    )
    .then(items => setItems(items))

  return <List items={items} />
}

export default ListContainer
