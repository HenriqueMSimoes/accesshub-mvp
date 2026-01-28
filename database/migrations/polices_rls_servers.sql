CREATE POLICY servers_select_own
ON servers
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY servers_insert_own
ON servers
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY servers_update_own
ON servers
FOR UPDATE
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY servers_delete_own
ON servers
FOR DELETE
TO authenticated
USING (user_id = auth.uid());
