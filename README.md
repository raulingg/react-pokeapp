# Welcome to Pokeapp

A modern, production-ready Pokeapp SPA written in Typescript using react-router@7, TaildwindCSS and Vite

Check it out 👉 [Demo](https://react-pokeapp-9896.onrender.com/) 👀 

__Demo Credentials:__ username: `admin`, password: `admin`

## Features

- Authentication with username/password ()
- Paginated Pokemon List
- Pokemon Detail View
- Pokemon Search Bar

Read [Acceptance criteria (AC)](./acceptance-criteria.md)

## Design

- Why using typescript? I think there are several benefits of using it over only javascript, the main benefits for me are early error detection in your code and DX. Besides, if we plan to build new features (as it seems the case) the app will grow, so Typescript is probably better for large projects.
- I decided to choose react-router framework along with Vite to build the application because of the short learning curve, popularity, familiarity, design. Why choosing the react-router v7 (latest) ? So, I want to learn this new version by building (more challenging, more fun! 😄). By the way, this new version is pretty cool 😎 🚀
- For styling I chose TailwindCSS since it helped me focus more on the functionality rather than styles. Plus, The majority of UI components were created using [shadcn](https://ui.shadcn.com/) which is set of pre-styled UI components helping create common/reusable UI blocks blazingly fast 🔥 🚀
- Which things are missing? Linting, Testing 😬, ...

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
