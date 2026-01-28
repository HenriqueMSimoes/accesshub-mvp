-- SELECT
CREATE POLICY clients_select_own
ON clients
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- INSERT
CREATE POLICY clients_insert_own
ON clients
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

-- UPDATE
CREATE POLICY clients_update_own
ON clients
FOR UPDATE
TO authenticated
USING (user_id = auth.uid());

-- DELETE
CREATE POLICY clients_delete_own
ON clients
FOR DELETE
TO authenticated
USING (user_id = auth.uid());
