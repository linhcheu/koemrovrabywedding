-- Create the wedding_wishes table in Supabase SQL Editor

CREATE TABLE wedding_wishes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE wedding_wishes ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read wishes
CREATE POLICY "Anyone can view wishes" ON wedding_wishes
FOR SELECT USING (true);

-- Create policy to allow anyone to insert wishes
CREATE POLICY "Anyone can insert wishes" ON wedding_wishes
FOR INSERT WITH CHECK (true);

-- Create index for better performance
CREATE INDEX idx_wedding_wishes_created_at ON wedding_wishes(created_at DESC);
