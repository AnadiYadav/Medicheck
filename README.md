# Medicheck

**Identify Medicines Instantly Through Images of Their Packaging**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![Gemini API](https://img.shields.io/badge/Gemini%20API-00DCFA?style=flat&logo=api&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## 🚀 Overview

Medicheck is a web application that empowers users to identify medicines simply by uploading or capturing an image of the medicine's packaging. Utilizing cutting-edge image recognition and the robust Gemini API, Medicheck provides detailed information on the uses and composition of the identified medicine.

## 🌟 Features

- **Instant Medicine Identification**: Upload or capture images to identify medicines on the fly.
- **Comprehensive Information**: Access detailed data about medicine uses, composition, and more.
- **User-Friendly Interface**: Clean and intuitive design with responsive layout for all devices.
- **Secure and Reliable**: Built with modern technologies ensuring data security and performance.

## 🎬 Demo

![Medicheck Demo](https://your-image-url.com/medicheck-demo.gif)

*Check out a quick demo of Medicheck in action!*

## 🛠️ Installation

Follow these steps to get Medicheck up and running on your local machine.

### Prerequisites

- **Node.js** (v14.0.0 or higher)
- **npm** (v6.0.0 or higher)
- **Gemini API Key** (Sign up [here](https://www.gemini.com/) if you don't have one)

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/medicheck.git
   cd medicheck
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   - Create a `.env` file in the root directory.
   - Add your Gemini API credentials:
     ```env
     GEMINI_API_KEY=your_gemini_api_key
     GEMINI_API_SECRET=your_gemini_api_secret
     ```

4. **Start the Application**
   ```bash
   node server.js
   ```
   *Alternatively, you can use nodemon for hot reloading:*
   ```bash
   nodemon server.js
   ```

5. **Access Medicheck**
   - Open your browser and navigate to `http://localhost:3000`

## 📷 Usage

1. **Home Page**
   - You'll be greeted with a simple interface to upload or capture an image.

2. **Uploading an Image**
   - Click on the **Upload** button to select an image from your device.

3. **Capturing an Image**
   - Use the **Camera** feature to take a picture if you're on a device with a camera.

4. **Processing**
   - Once the image is uploaded, Medicheck processes it using the Gemini API.

5. **Results**
   - View detailed information about the identified medicine, including its uses and composition.

## 🌐 Technologies Used

- **Frontend**
  - HTML5
  - CSS3
- **Backend**
  - Node.js
  - Express.js
- **APIs**
  - Gemini API (for medicine data)
- **Image Recognition**
  - [Include any libraries or services used, e.g., TensorFlow.js, OpenCV]

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the Repository**
2. **Create a Branch**
   ```bash
   git checkout -b feature/YourFeature
   ```
3. **Commit Your Changes**
   ```bash
   git commit -m "Add YourFeature"
   ```
4. **Push to the Branch**
   ```bash
   git push origin feature/YourFeature
   ```
5. **Open a Pull Request**

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

- **Email**: [anadiyadav33@gmail.com](mailto:anadiyadav33@gmail.com)
- **GitHub**: [yourusername](https://github.com/AnadiYadav)

## 💡 Future Enhancements

- **Add User Authentication**: Enable users to create accounts and save their search history.
- **Multilingual Support**: Provide information in multiple languages.
- **Medicine Interaction Warnings**: Alert users about possible interactions with other medicines.
- **Offline Mode**: Allow the app to function without an internet connection using service workers.

## 🙏 Acknowledgements

- **Gemini API**: For providing a comprehensive database of medicine information.
- **Open Source Libraries**: Thanks to all the developers who created the tools that made this project possible.
