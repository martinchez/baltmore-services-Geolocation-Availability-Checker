# Geolocation Availability Checker

## Overview

The **Geolocation Availability Checker** is a React application that allows users to check their availability within specific geolocation boundaries by entering their address. This application leverages the power of maps to enhance service experiences, making it easy for users to determine if they fall within permissible locations for various services.

## Features

- User-friendly form for entering personal and address details.
- Utilizes Mapbox API for geocoding addresses to geographic coordinates.
- Checks if the entered address is within defined geolocation boundaries (e.g., Baltimore).
- Provides immediate feedback to the user regarding their location status.
- Responsive design for a seamless experience on different devices.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Axios**: A promise-based HTTP client for making requests to the Mapbox API.
- **HTML/CSS**: For structuring and styling the application.
- **Mapbox**: For geocoding and mapping functionalities.

## Getting Started

To run the application locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/martincase/geolocation-availability-checker.git
   cd geolocation-availability-checker

   ```

2. **Install dependencies:**

   ```bash
   npm install

   ```

3. ** set up your mapbox account**
   . Replace the `mapboxToken` variable in the `src/App.js` file with your own Mapbox access token.

4. **start Development Server:**

   ```bash
   npm start

   ```

5. **Open Application:**
   .Navigate to `http://localhost:3000` in your web browser.

## Usage

Fill out the eligibility quiz form by entering your personal details and address.
Select your city from the dropdown list.
Click the "Check Address" button to determine if you are within a permissible location.
The application will display a message indicating whether the address is valid or not.

## Contributing

Contributions are welcome! If you would like to contribute to this project, please follow these steps:

## Fork the repository.

    .Create a new branch (git checkout -b feature-branch).
    .Make your changes and commit them (git commit -m 'Add new feature').
    .Push to the branch (git push origin feature-branch).
    .Create a new Pull Request.

## License

This project is licensed under the `MIT License`. See the LICENSE file for more information.

## Acknowledgments

    .Special thanks to Mapbox for providing the mapping API.
    .Inspiration from various resources and documentation for building React applications.

## Contact
For any inquiries or feedback, please reach out to `martinchegee@gmail.com`.

### Customization Tips:

- **Repository Link**: Replace `https://github.com/yourusername/geolocation-availability-checker.git` with the actual URL of your repository.
- **Mapbox Token**: Provide instructions on how users can obtain their own Mapbox token, if applicable.
- **License**: Adjust the license section if you're using a different license.
- **Contact Information**: Update the contact email to your preferred address.
