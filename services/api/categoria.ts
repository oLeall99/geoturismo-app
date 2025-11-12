import { api } from '../config';

export interface Categoria {
  id: number;
  nome: string;
}

export const CategoriaService = {
  async getAll(): Promise<Categoria[]> {
    const response = await api.get('/Categoria');
    return response.data;
  },
};