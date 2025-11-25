# 🚀 Quick Setup Guide

Follow these steps to get your PhotoStore application running!

## Step 1: Supabase Project Setup

1. **Go to [supabase.com](https://supabase.com) and sign in**

2. **Create a new project:**
   - Click "New Project"
   - Choose an organization
   - Enter project name: "PhotoStore" (or any name you prefer)
   - Generate a secure database password
   - Select a region close to you
   - Click "Create new project"
   - Wait 2-3 minutes for setup to complete

## Step 2: Database Setup

1. **Go to SQL Editor** (left sidebar)
2. **Click "New query"**
3. **Copy and paste the following SQL** (from SUPABASE_SCHEMA.md):

### Create profiles table:
```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT,
  storage_used BIGINT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);
```

4. **Click "Run"**

### Create photos table:
```sql
CREATE TABLE photos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  title TEXT,
  url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own photos"
  ON photos FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own photos"
  ON photos FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own photos"
  ON photos FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own photos"
  ON photos FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX idx_photos_user_id ON photos(user_id);
CREATE INDEX idx_photos_created_at ON photos(created_at DESC);
```

5. **Click "Run"**

### Create update trigger:
```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_photos_updated_at BEFORE UPDATE ON photos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

6. **Click "Run"**

## Step 3: Storage Setup

1. **Go to Storage** (left sidebar)
2. **Click "Create a new bucket"**
3. **Enter bucket name:** `photos`
4. **Check "Public bucket"** ✓
5. **Click "Create bucket"**

### Add Storage Policies:

1. **Click on the `photos` bucket**
2. **Go to "Policies" tab**
3. **Click "New Policy"**
4. **Add these policies one by one:**

**Policy 1: Upload**
```sql
CREATE POLICY "Users can upload photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'photos' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
```

**Policy 2: View Own**
```sql
CREATE POLICY "Users can view own photos"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'photos' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
```

**Policy 3: Public View**
```sql
CREATE POLICY "Public can view photos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'photos');
```

**Policy 4: Delete**
```sql
CREATE POLICY "Users can delete own photos"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'photos' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
```

## Step 4: Get API Credentials

1. **Go to Settings** (gear icon in left sidebar)
2. **Click "API"**
3. **Copy these two values:**
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (long string starting with `eyJ...`)

## Step 5: Configure Your App

1. **Create `.env` file** in the project root (if it doesn't exist)
2. **Add your credentials:**

```env
VITE_SUPABASE_URL=paste_your_project_url_here
VITE_SUPABASE_ANON_KEY=paste_your_anon_key_here
```

**Example:**
```env
VITE_SUPABASE_URL=https://abcdefghijk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Step 6: Run the App

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser!

## ✅ Verification Checklist

- [ ] Supabase project created
- [ ] Database tables created (profiles, photos)
- [ ] Storage bucket 'photos' created and set to public
- [ ] Storage policies applied
- [ ] .env file created with correct credentials
- [ ] npm run dev runs without errors
- [ ] Can register a new account
- [ ] Can upload a photo
- [ ] Photo appears in the grid

## 🐛 Troubleshooting

### "Missing Supabase environment variables"
- Make sure `.env` file exists in project root
- Check that variables start with `VITE_`
- Restart the dev server after creating `.env`

### Can't upload photos
- Verify storage bucket is named exactly `photos`
- Ensure bucket is set to public
- Check all storage policies are applied

### Can't see uploaded photos
- Check browser console for errors
- Verify RLS policies are applied to photos table
- Ensure user is authenticated

## 🎉 You're All Set!

Your PhotoStore app is now ready to use. Enjoy storing and managing your photos!

Need help? Check the main README.md or open an issue on GitHub.
