CREATE TABLE public.rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  bringing_plus_one boolean NOT NULL DEFAULT false,
  plus_one_name text CHECK (plus_one_name IS NULL OR char_length(plus_one_name) <= 100),
  phone text NOT NULL CHECK (char_length(phone) BETWEEN 5 AND 20),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.rsvps TO anon, authenticated;
GRANT ALL ON public.rsvps TO service_role;
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit an RSVP" ON public.rsvps FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE TABLE public.guest_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  message text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 2000),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.guest_messages TO anon, authenticated;
GRANT ALL ON public.guest_messages TO service_role;
ALTER TABLE public.guest_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can leave a message" ON public.guest_messages FOR INSERT TO anon, authenticated WITH CHECK (true);