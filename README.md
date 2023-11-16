# e-plete-admin
Database management portal for administrators of E-Plete system.
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install all dependencies with:

```bash
npm install
# if you encounter issues with installing dependencies, try running:
npm install --legacy-peer-deps
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Database Server

Ensure you have PostgreSQL installed. Optionally, it is recommended to also install pgAdmin 4 for managing the database.

Head to the `src/api` directory in a different terminal using:

```bash
cd src/api
```

Ensure you have Python installed in your system. Install and activate the Python virtual environment, then install the requirements:

```bash
python -m venv venv

# on Unix/MacOS
source venv/bin/activate

# on Windows
.\venv\Scripts\Activate
```

Install the requirements:

```bash
pip install -r requirements.txt
```

Set up your database server and write your database access credentials in `main/settings.py`. If using pgAdmin 4, this is usually:

```py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': '', # <--- name of your database e.g. transactions_db
        'USER': '', # <--- username used to access the server; usually 'postgres' by default.
        'PASSWORD': '', # <--- password used to access the server
        'HOST': 'localhost',
        'PORT': '5432'
    }
}
```

Migrate your App's database schema in `AdminApp/models.py` to your database with:

```bash
python manage.py makemigrations AdminApp
python manage.py migrate AdminApp
```

And finally, start your server with:

```bash
python manage.py runserver
```

If you are running PostgreSQL server locally, open [http://127.0.0.1:8000](http://127.0.0.1:8000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
