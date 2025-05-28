# Supabase Setup Guide

This guide explains how to configure your wedding gifts website to receive data from Supabase.

## Prerequisites

1. A Supabase account (free at [supabase.com](https://supabase.com))
2. A Supabase project created

## Database Setup

### 1. Create the Gifts Table

In your Supabase SQL Editor, run the following SQL to create the gifts table:

```sql
CREATE TABLE gifts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  value DECIMAL(10,2) NOT NULL,
  icon VARCHAR(10) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE gifts ENABLE ROW LEVEL SECURITY;

-- Allow public read access to gifts
CREATE POLICY "Allow public read access on gifts" ON gifts
  FOR SELECT USING (true);
```

### 2. Insert Sample Data (Optional)

You can insert the sample data from your gifts.json file:

```sql
INSERT INTO gifts (id, name, value, icon) VALUES
(1, 'Fogão', 768.40, '🍳'),
(2, 'Forno', 1859.07, '🔥'),
(3, 'Geladeira', 3683.16, '❄️'),
(4, 'Microondas', 949.00, '🍲'),
(5, 'Air fryer', 624.90, '🍟'),
(6, 'Faqueiro', 500.00, '🍴'),
(7, 'Jogo de copos', 290.00, '🥂'),
(8, 'Aparelho de jantar', 1033.94, '🍽️'),
(9, 'Fogão elétrico 1 boca para mesa', 122.55, '🔥'),
(10, 'Panela de pedra', 339.00, '🍳'),
(11, 'Batedeira', 589.00, '🧁'),
(12, 'Processador', 370.00, '🔪'),
(13, 'Varal suspenso', 258.75, '👕'),
(14, 'Máquina lava e seca', 2669.90, '🧺'),
(15, 'Ferro de passar', 119.00, '🧼'),
(16, 'Cortina', 1337.93, '🪟'),
(17, 'Sofá', 4099.86, '🛋️'),
(18, 'Aparador para altar', 1100.00, '🕯️'),
(19, 'Cama box + colchão', 5700.00, '🛏️');
```

## Environment Configuration

### 1. Get Your Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to Settings → API
3. Copy the following values:
   - **Project URL** (e.g., `https://xyzcompany.supabase.co`)
   - **Anon public key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

### 2. Update Environment Variables

Edit the `.env.local` file in your project root and replace the placeholder values:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

**Important:** Never commit your actual credentials to version control. The `.env.local` file is already in `.gitignore`.

## Testing the Integration

### 1. Run the Development Server

```bash
npm run dev
```

### 2. Check the Integration

- If Supabase is configured correctly, your site will load data from the database
- If there are any issues, the site will fall back to the local `gifts.json` file
- Check the browser console for any error messages

### 3. Verify Data Loading

The application will:
1. First try to fetch data from Supabase
2. If that fails, fall back to the local JSON file
3. Display an error message if both fail

## Table Schema Requirements

Your Supabase `gifts` table must have exactly these columns:

| Column | Type | Required | Description |
|--------|------|----------|-------------|
| `id` | integer | Yes | Unique identifier |
| `name` | text/varchar | Yes | Gift name |
| `value` | decimal/numeric | Yes | Gift price |
| `icon` | text/varchar | Yes | Emoji icon |

## Troubleshooting

### Common Issues

1. **"Error fetching gifts from Supabase"**
   - Check your environment variables are correct
   - Verify your Supabase project is active
   - Ensure the `gifts` table exists

2. **Empty gift list**
   - Check if there's data in your `gifts` table
   - Verify RLS policies allow public read access

3. **CORS errors**
   - This shouldn't happen with the public anon key, but verify your Supabase project settings

### Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your Supabase dashboard shows the correct data
3. Test your API key with Supabase's built-in API explorer

## Next Steps

Once configured, you can:
- Add, edit, or remove gifts directly in Supabase
- Set up real-time updates (requires additional configuration)
- Add authentication for admin features
- Integrate with payment processors
