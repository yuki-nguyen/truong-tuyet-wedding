ALTER TABLE rsvps ADD COLUMN event_side TEXT CHECK(event_side IS NULL OR event_side IN('groom','bride'));
CREATE INDEX IF NOT EXISTS ix_rsvp_event_side ON rsvps(event_side,updated_at DESC);
