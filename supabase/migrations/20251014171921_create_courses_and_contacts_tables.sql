/*
  # Create Courses and Contact Details Tables

  1. New Tables
    - `six_month_courses`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `fee` (numeric)
      - `duration` (text)
      - `created_at` (timestamp)
    
    - `six_week_courses`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `fee` (numeric)
      - `duration` (text)
      - `created_at` (timestamp)
    
    - `contact_inquiries`
      - `id` (uuid, primary key)
      - `name` (text)
      - `phone` (text)
      - `email` (text)
      - `selected_courses` (jsonb)
      - `total_amount` (numeric)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access to course tables
    - Add policies for authenticated users to create contact inquiries
*/

-- Create six_month_courses table
CREATE TABLE IF NOT EXISTS six_month_courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  fee numeric NOT NULL DEFAULT 0,
  duration text NOT NULL DEFAULT '6 months',
  created_at timestamptz DEFAULT now()
);

-- Create six_week_courses table
CREATE TABLE IF NOT EXISTS six_week_courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  fee numeric NOT NULL DEFAULT 0,
  duration text NOT NULL DEFAULT '6 weeks',
  created_at timestamptz DEFAULT now()
);

-- Create contact_inquiries table
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  selected_courses jsonb NOT NULL DEFAULT '[]',
  total_amount numeric NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE six_month_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE six_week_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Policies for six_month_courses (public read)
CREATE POLICY "Anyone can view six month courses"
  ON six_month_courses FOR SELECT
  USING (true);

-- Policies for six_week_courses (public read)
CREATE POLICY "Anyone can view six week courses"
  ON six_week_courses FOR SELECT
  USING (true);

-- Policies for contact_inquiries (anyone can create)
CREATE POLICY "Anyone can create contact inquiries"
  ON contact_inquiries FOR INSERT
  WITH CHECK (true);

-- Insert sample six-month courses
INSERT INTO six_month_courses (name, description, fee) VALUES
  ('First Aid', 'Learn essential first aid skills including CPR, wound care, and emergency response procedures.', 1500),
  ('Sewing', 'Master garment construction, pattern making, and professional sewing techniques.', 1500),
  ('Landscaping', 'Comprehensive training in garden design, plant care, and landscape maintenance.', 1500),
  ('Life Skills', 'Develop essential life skills including financial literacy, communication, and time management.', 1500)
ON CONFLICT DO NOTHING;

-- Insert sample six-week courses
INSERT INTO six_week_courses (name, description, fee) VALUES
  ('Child Minding', 'Professional childcare training covering child development, safety, and activities.', 750),
  ('Cooking', 'Culinary skills training including meal preparation, nutrition, and kitchen safety.', 750),
  ('Garden Maintenance', 'Learn practical garden maintenance, pruning, and seasonal plant care.', 750)
ON CONFLICT DO NOTHING;