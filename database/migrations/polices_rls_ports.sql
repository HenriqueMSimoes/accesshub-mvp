CREATE POLICY ports_select_own
ON ports
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY ports_insert_own
ON ports
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY ports_update_own
ON ports
FOR UPDATE
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY ports_delete_own
ON ports
FOR DELETE
TO authenticated
USING (user_id = auth.uid());
