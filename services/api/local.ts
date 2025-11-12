import { api } from '../config';

export interface Local {
  id: number;
  usuario_id: number;
  nome: string;
  descricao: string;
  endereco: string;
  latitude: number;
  longitude: number;
}

export const LocalService = {
  async getAll(): Promise<Local[]> {
    const response = await api.get('/Locais');
    return response.data;
  },

  async getById(id: number): Promise<Local> {
    const response = await api.get(`/Locais/${id}`);
    return response.data;
  },

  async create(dados: Omit<Local, 'id'>): Promise<Local> {
    const response = await api.post('/Locais', dados);
    return response.data;
  },
};
