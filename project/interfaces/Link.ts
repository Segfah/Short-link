export interface Link {
  id: string;
  short_code: string;
  original_url: string;
  creation_date: string;
  is_disabled: boolean;
  user_id?: number | null;
}