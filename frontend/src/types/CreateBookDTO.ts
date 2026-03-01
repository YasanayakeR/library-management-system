export interface CreateBookDTO {
  title: string;
  author: string;
  description?: string;
  categoryId: string;
}