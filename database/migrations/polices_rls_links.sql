CREATE POLICY links_select_own
ON links
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY links_insert_own
ON links
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY links_update_own
ON links
FOR UPDATE
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY links_delete_own
ON links
FOR DELETE
TO authenticated
USING (user_id = auth.uid());
