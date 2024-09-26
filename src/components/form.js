import React, { useState } from 'react'
import axios from 'axios'
import './App.css'

const baltimorePolygon = {
  type: 'Feature',
  geometry: {
    type: 'Polygon',
    coordinates: [
      [
        [-76.7116584777832, 39.22639499999999],
        [-76.52813911437988, 39.22639499999999],
        [-76.52813911437988, 39.37346000000001],
        [-76.7116584777832, 39.37346000000001],
        [-76.7116584777832, 39.22639499999999],
      ],
    ],
  },
}

const citiesToStates = {
  Baltimore: 'MD',
  'New York': 'NY',
  'Los Angeles': 'CA',
  Chicago: 'IL',
  Houston: 'TX',
  Washington: 'DC',
}

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    ethnicity: '',
    income: '',
    adults: 1,
    children: 0,
    address: '',
    city: '',
    state: '',
    zipcode: '',
  })

  const [result, setResult] = useState('')

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))

    if (id === 'city') {
      setFormData((prev) => ({
        ...prev,
        state: citiesToStates[value] || '',
      }))
    }
  }

  const pointInPolygon = (point, polygon) => {
    const [x, y] = point
    const coords = polygon.geometry.coordinates[0]
    let inside = false
    for (let i = 0, j = coords.length - 1; i < coords.length; j = i++) {
      const xi = coords[i][0],
        yi = coords[i][1]
      const xj = coords[j][0],
        yj = coords[j][1]
      const intersect =
        yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
      if (intersect) inside = !inside
    }
    return inside
  }

  const checkAddress = () => {
    const { address, city, state, zipcode } = formData
    const fullAddress = `${address}, ${city}, ${state} ${zipcode}`

    const mapboxToken =
      'pk.eyJ1IjoiY2Vjd2ViLWlvIiwiYSI6ImNtMGJ4MnpqeTBiaGEya3NhbzZzYzY4YmcifQ.-86EdP6T1Yzy8ZfSKeLJFg'
    const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      fullAddress
    )}.json?access_token=${mapboxToken}`

    axios
      .get(geocodingUrl)
      .then((response) => {
        if (response.data.features.length > 0) {
          const coordinates = response.data.features[0].geometry.coordinates // [longitude, latitude]
          const isWithinPolygon = pointInPolygon(coordinates, baltimorePolygon)
          setResult(
            isWithinPolygon
              ? 'You are within a permissible location!'
              : 'You are outside the permissible location.'
          )
        } else {
          setResult('Address not found.')
        }
      })
      .catch((error) => {
        console.log('Geocoding error: ', error)
        setResult('An error occurred while checking the address.')
      })
  }

  return (
    <section className="eligibility-form">
      <h2>Step 2: Fill out the eligibility quiz.</h2>
      <form id="eligibility-form">
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            placeholder="First Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            id="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone *</label>
          <input
            type="text"
            id="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <h3>Demographic Information</h3>
        <div className="form-group">
          <label htmlFor="ethnicity">Race or Ethnicity *</label>
          <input
            type="text"
            id="ethnicity"
            placeholder="Race or Ethnicity"
            value={formData.ethnicity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="income">Total Household Annual Income *</label>
          <input
            type="number"
            id="income"
            placeholder="Annual Income"
            value={formData.income}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="adults">Number of Adults in Household *</label>
          <input
            type="number"
            id="adults"
            value={formData.adults}
            min="1"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="children">Number of Children in Household *</label>
          <input
            type="number"
            id="children"
            value={formData.children}
            min="0"
            onChange={handleChange}
            required
          />
        </div>

        <h3>Current Home Address</h3>
        <div className="form-group">
          <label htmlFor="address">Street Address *</label>
          <input
            type="text"
            id="address"
            placeholder="Enter your street address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City *</label>
          <select
            id="city"
            value={formData.city}
            onChange={handleChange}
            required
          >
            <option value="">Select a City</option>
            {Object.keys(citiesToStates).map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="state">State *</label>
          <input
            type="text"
            id="state"
            placeholder="State"
            value={formData.state}
            readOnly
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="zipcode">Zip Code *</label>
          <input
            type="text"
            id="zipcode"
            placeholder="Zip Code"
            value={formData.zipcode}
            onChange={handleChange}
            required
          />
        </div>

        <button type="button" onClick={checkAddress}>
          Check Address
        </button>
      </form>

      {result && (
        <div
          id="result"
          style={{
            marginTop: '20px',
            color: result.includes('not found') ? 'red' : 'green',
          }}
        >
          {result}
        </div>
      )}
    </section>
  )
}

export default App
