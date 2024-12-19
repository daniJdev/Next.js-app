# Todo List App - Frontend

This is the frontend application for the Todo List App, built with **Next.js** and styled using **Tailwind CSS** and **Material-UI**. It interacts with the backend API for CRUD operations on tasks.

## Features

- Add, edit, delete, and toggle tasks.
- Task list with pagination.
- Dynamic forms for task creation and editing.
- Modern, responsive UI using Material-UI and Tailwind CSS.

---

## Technologies Used

- **Next.js**
- **TypeScript**
- **Tailwind CSS**
- **Material-UI**

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- npm or yarn

### Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/daniJdev/Next.js-app.git
   cd Next.js-app
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure environment variables:

   - Create a `.env.local` file in the root directory.
   - Add the following line:
     ```
     NEXT_PUBLIC_API_URL=http://localhost:5000/api
     ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open the app:
   - Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deployment

To build the project for production, run:

```bash
npm run build
npm start
# or
yarn build
yarn start
```

---

## Project Structure

```plaintext
.
├── components/       # Reusable React components (e.g., TaskList, TaskCreationForm)
├── pages/            # Next.js pages
├── services/         # API integration logic
├── utils/            # Utility functions and configurations (e.g., Axios instance)
├── public/           # Static assets (icons, images)
└── styles/           # Global styles (Tailwind CSS setup)
```

---

## License

This project is licensed under the MIT License.
