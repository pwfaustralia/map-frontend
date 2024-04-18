export default interface Client {
  id: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  preferred_name?: string;
  email: string;
  home_phone?: string;
  work_phone?: string;
  mobile_phone?: string;
  fax?: string;
  user_id: string;
  physical_address_id?: string;
  postal_address_id?: string;
}
