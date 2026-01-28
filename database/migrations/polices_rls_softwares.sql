CREATE POLICY softwares_select_own
ON softwares
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY softwares_insert_own
ON softwares
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY softwares_update_own
ON softwares
FOR UPDATE
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY softwares_delete_own
ON softwares
FOR DELETE
TO authenticated
USING (user_id = auth.uid());
