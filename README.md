# Personal Portfolio Website

This is a modern, responsive portfolio website built with React and TypeScript. The website features a dark/light theme toggle, multi-language support, and various sections to showcase projects, skills, and contact information.

[Portfolio Preview](https://eneskoyuncu.com)

## 🌟 Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Dark/Light Theme**: Toggle between dark and light modes
- **Multi-language Support**: Currently supports Turkish, English and German
- **Dynamic Content**: Content is fetched from an API for easy updates
- **Modern UI**: Built with modern design principles and animations
- **Project Showcase**: Dynamic project cards with detailed information
- **Contact Form**: Interactive contact form with email functionality
- **Blog Integration**: Medium blog posts integration
- **PDF CV View**: Integrated PDF viewer for resume/CV

## 🛠️ Technologies Used

- **Frontend**:

  - React 18
  - TypeScript
  - Vite
  - SCSS
  - Ant Design
  - FontAwesome Icons
  - React-Tilt
  - Framer Motion

- **State Management**:

  - React Context API

- **Styling**:

  - SCSS Modules
  - CSS-in-JS
  - Responsive Design

- **Additional Libraries**:
  - react-pdf
  - axios
  - react-router-dom

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/portfolio.git
   ```

2. Navigate to the project directory:

   ```bash
   cd portfolio
   ```

3. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

4. Create a `.env` file in the root directory and add your environment variables:

   ```env
   VITE_API_URL=your_api_url
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

The application will start running at `http://localhost:5173`

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── img/
│   └── pdf/
├── src/
│   ├── components/
│   ├── context/
│   ├── css/
│   └── App.tsx
├── .env
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 📱 Responsive Design

The website is fully responsive and optimized for:

- Desktop (1200px and above)
- Tablet (768px to 1199px)
- Mobile (below 768px)

## 🎨 Theme Customization

The website supports both light and dark themes. Theme preferences are stored in local storage for persistence.

## 🌐 Multi-language Support

Currently supports:

- Turkish (tr)
- English (en)
- German (de)

Language preferences are stored in local storage.

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_API_URL=your_api_url
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

If you have any questions or suggestions, feel free to reach out through the contact form on the website.

## 🙏 Acknowledgments

- [React Documentation](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Ant Design](https://ant.design/)
- [FontAwesome](https://fontawesome.com/)
