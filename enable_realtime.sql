-- ================================================
-- ENABLE SUPABASE REALTIME FOR WEBSOCKET SYNC
-- ================================================
-- Run this in Supabase SQL Editor to enable real-time
-- synchronization for all tables.
--
-- This allows WebSocket connections to receive instant
-- updates when data changes (INSERT/UPDATE/DELETE)
--
-- IMPORTANT: You must run this BEFORE testing real-time sync
-- ================================================

-- Enable Realtime for employees table
ALTER PUBLICATION supabase_realtime ADD TABLE employees;

-- Enable Realtime for worklogs table
ALTER PUBLICATION supabase_realtime ADD TABLE worklogs;

-- Enable Realtime for products table  
ALTER PUBLICATION supabase_realtime ADD TABLE products;

-- Enable Realtime for promotions table
ALTER PUBLICATION supabase_realtime ADD TABLE promotions;

-- ================================================
-- VERIFICATION QUERY
-- ================================================
-- Run this to verify tables are enabled for Realtime:

SELECT 
    tablename,
    'ENABLED' as status
FROM 
    pg_publication_tables
WHERE 
    pubname = 'supabase_realtime'
ORDER BY 
    tablename;

-- Expected output: Should show employees, worklogs, products, promotions

-- ================================================
-- NOTES
-- ================================================
-- * Free tier supports 200 concurrent connections
-- * No additional cost for Realtime on Free tier
-- * Changes are pushed via WebSocket (instant)
-- * Polling runs every 60s as automatic fallback
--
-- After running this script:
-- 1. Refresh your app
-- 2. Look for "Tiempo Real" status (purple icon)
-- 3. Open app on 2 devices and test cross-device sync
-- ================================================
