# 💰 Expense Tracker

My personal modern expense tracking application built with Vue 3, featuring real-time data synchronization and user authentication.

## 🚀 Tech Stack

<div align="center">

![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Vuetify](https://img.shields.io/badge/Vuetify-1867C0?style=for-the-badge&logo=vuetify&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-FFD859?style=for-the-badge&logo=pinia&logoColor=black)
![Vue Router](https://img.shields.io/badge/Vue_Router-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

### 🛠️ Core Technologies

- **Vue 3** - Progressive JavaScript framework for building user interfaces
- **Vite** - Next-generation frontend build tool for lightning-fast development
- **Vuetify** - Material Design component framework for Vue.js
- **Supabase** - Backend-as-a-Service for authentication and real-time database
- **Pinia** - Modern state management library for Vue 3
- **Vue Router** - Official routing library for Vue.js
- **ESLint** - Code quality and consistency tool
- **Prettier** - Opinionated code formatter
- **Vercel** - Deployment platform

## ✨ Features

- 🔐 User authentication (Login/Register)
- 📊 Expense tracking and management
- 🎨 Modern Material Design UI with Vuetify
- 💾 Real-time data synchronization with Supabase
- 📱 Responsive design for mobile and desktop
- 🔄 State management with Pinia
- ✅ Form validation

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account

## 🔧 Installation

1. **Clone the repository**

```sh
git clone <repository-url>
cd Expense-Tracker
```

2. **Install dependencies**

```sh
npm install
```

3. **Environment Setup**

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Run the development server**

```sh
npm run dev
```

## 📜 Available Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start development server with hot-reload |
| `npm run build`   | Build for production                     |
| `npm run preview` | Preview production build locally         |
| `npm run lint`    | Lint and fix code with ESLint            |
| `npm run format`  | Format code with Prettier                |

## 📁 Project Structure

```
Expense-Tracker/
├── public/              # Static assets
├── src/
│   ├── assets/         # CSS and static resources
│   ├── components/     # Vue components
│   │   ├── auth/      # Authentication components
│   │   ├── commons/   # Shared components
│   │   └── layout/    # Layout components
│   ├── composables/    # Vue composables
│   ├── router/         # Vue Router configuration
│   ├── stores/         # Pinia stores
│   ├── utils/          # Utility functions
│   ├── views/          # Page components
│   ├── App.vue         # Root component
│   └── main.js         # Application entry point
├── .env                # Environment variables
├── eslint.config.js    # ESLint configuration
├── vite.config.js      # Vite configuration
└── package.json        # Project dependencies
```

## 🔐 Supabase Configuration

### Required Settings

1. **Authentication → Providers**

   - ✅ Enable Email provider
   - ✅ Enable sign ups

2. **Authentication → URL Configuration**

   - Site URL: `http://localhost:5173`
   - Redirect URLs: `http://localhost:5173/**`

3. **Authentication → Settings**
   - ✅ Disable email confirmations (for development)

## 🚀 Deployment

This project is configured for deployment on Vercel:

```sh
npm run build
```

The build output will be in the `dist/` directory.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Vue.js team for the amazing framework
- Supabase team for the excellent BaaS platform
- Vuetify team for the beautiful Material Design components
