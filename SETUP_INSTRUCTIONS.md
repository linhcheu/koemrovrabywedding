# 🌟 Wedding Site Database Setup Instructions

## 📋 **Complete Setup Checklist**

### ✅ **Step 1: Create Supabase Account (FREE)**
1. Go to [supabase.com](https://supabase.com)
2. Sign up with GitHub/Google account (it's completely free!)
3. Click "New Project"
4. Choose organization (use your personal org)
5. Fill in project details:
   - **Name**: `wedding-comments` (or any name you like)
   - **Database Password**: Choose a strong password (save it!)
   - **Region**: Choose closest to your users
6. Click "Create new project"
7. Wait 2-3 minutes for setup to complete

### ✅ **Step 2: Create Database Table**
1. In your Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click "New Query"
3. Copy and paste the entire content from `database_schema.sql` file
4. Click "Run" to create the table and security policies

### ✅ **Step 3: Get Your Database Credentials**
1. In Supabase dashboard, go to **Settings > API** (left sidebar)
2. Copy these two values:
   - **Project URL** (looks like: `https://abcdefghijk.supabase.co`)
   - **anon public key** (long string starting with `eyJhbGci...`)

### ✅ **Step 4: Update Environment Variables**
1. Open the `.env.local` file in your project
2. Replace the placeholder values with your actual credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-actual-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci... (your actual anon key)
   ```
3. Save the file

### ✅ **Step 5: Test Locally**
1. Run `npm run dev` in your terminal
2. Open your wedding site in browser
3. Go to the wishes section
4. Try submitting a test wish
5. Check if it appears and persists after page refresh

### ✅ **Step 6: Deploy to Vercel**
1. In Vercel dashboard, go to your project
2. Go to **Settings > Environment Variables**
3. Add both environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your anon key
4. Redeploy your site

## 🎉 **Features You Now Have:**
- ✅ **Global Comments**: All visitors see the same wishes/comments
- ✅ **Real-time**: Comments appear instantly for all users
- ✅ **Persistent**: Comments are permanently saved in database
- ✅ **Free Forever**: Supabase free tier is very generous
- ✅ **Secure**: Built-in security with Row Level Security (RLS)
- ✅ **Fast**: Optimized database queries
- ✅ **Professional**: Loading states and error handling

## 🔒 **Security Features:**
- Row Level Security (RLS) enabled
- Anyone can read wishes (public viewing)
- Anyone can add wishes (public submissions)
- No malicious actions possible
- Input validation and sanitization

## 📊 **Supabase Free Tier Limits:**
- **Database**: 500MB storage (thousands of comments!)
- **API calls**: 50,000 requests/month
- **Bandwidth**: 2GB/month
- **Projects**: Up to 2 projects
- **Perfect for wedding sites!** 🎊

## 🚨 **Important Notes:**
- Keep your environment variables secure
- Never commit `.env.local` to Git (it's already in .gitignore)
- The anon key is safe to use in frontend (it's designed for public access)
- Comments are public and visible to everyone (perfect for wedding wishes!)

## 💡 **Troubleshooting:**
- If comments don't load: Check browser console for errors
- If can't submit: Verify environment variables are set correctly
- If 404 errors: Make sure you ran the SQL schema in Supabase
- Need help? Check Supabase documentation or contact support

**🎉 Your wedding site now has a professional comment system that works for all your guests! 💕**
