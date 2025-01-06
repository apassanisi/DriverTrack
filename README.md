<div align="center">
  <h2 align="center">DriverTrack</h2>
  <p align="center">A comprehensive system for managing driver assignments and performance
    <br />
<a href="https://drivetrack.netlify.app" style=""><strong>View live »</strong></a>

  <div style="max-width: 75px;">

[![Netlify Status](https://api.netlify.com/api/v1/badges/06b30488-35ec-4913-ba56-5bc3c2dd9a10/deploy-status)](https://app.netlify.com/sites/drivertrack/deploys)


  </div>
  </p>
<small>Built with:</small>
<br/>
<img src="https://img.shields.io/badge/-Vue.js-2b2b2b?logo=vue.js&style=flat-square" alt="Badge">
<img src="https://img.shields.io/badge/TypeScript-2b2b2b?logo=Typescript&style=flat-square" alt="Badge">
<img src="https://img.shields.io/badge/Tailwind-2b2b2b?logo=TailwindCSS&style=flat-square" alt="Badge">
</div>

### Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/apassanisi/drivertrack.git
   cd drivertrack
   ```

2. Install dependencies:
   ```sh
   nvm use
   yarn
   ```

3. Start the development server:
   ```sh
   yarn dev
   ```

### Usage

| Use                    | Command           | URL                                            |
| ---------------------- | ----------------- | ---------------------------------------------- |
| Install locally        | `nvm use && yarn` |                                                |
| Start local dev server | `yarn dev`        | [http://localhost:3000](http://localhost:3000) |
| Static build           | `yarn generate`      |                                                |
| Preview static build   | `yarn serve`      | [http://localhost:4173](http://localhost:4173) |
| Run tests              | `yarn test`      | [http://localhost:4173](http://localhost:4173) |

### Testing

Run unit tests with Vitest:
```sh
yarn test
```

### Storybook

Start Storybook to view and develop UI components in isolation:
```sh
yarn storybook
```

Build Storybook for production:
```sh
yarn build-storybook
```

### Environments

| Environment | URL                                                                                                  |
| ----------- | ---------------------------------------------------------------------------------------------------- |
| Local       | [http://localhost:3000](http://localhost:3000)                                                       |
| Develop     | [https://develop--drivertrack.netlify.app/](https://develop--drivertrack.netlify.app/)               |
| Production  | [https://drivertrack.netlify.app](https://drivertrack.netlify.app)                                           |
| Storybook       | [http://localhost:6006](http://localhost:30600600)                                                       |
