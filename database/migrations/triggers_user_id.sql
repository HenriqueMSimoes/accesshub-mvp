CREATE TRIGGER set_clients_user_id
BEFORE INSERT ON clients
FOR EACH ROW EXECUTE FUNCTION set_user_id();

CREATE TRIGGER set_servers_user_id
BEFORE INSERT ON servers
FOR EACH ROW EXECUTE FUNCTION set_user_id();

CREATE TRIGGER set_ports_user_id
BEFORE INSERT ON ports
FOR EACH ROW EXECUTE FUNCTION set_user_id();

CREATE TRIGGER set_softwares_user_id
BEFORE INSERT ON softwares
FOR EACH ROW EXECUTE FUNCTION set_user_id();

CREATE TRIGGER set_links_user_id
BEFORE INSERT ON links
FOR EACH ROW EXECUTE FUNCTION set_user_id();
