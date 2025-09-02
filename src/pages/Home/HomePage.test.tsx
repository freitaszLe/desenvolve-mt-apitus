import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './index';
import { type PaginatedResponse, type Pessoa } from '../../services/api';

// Mockamos todo o nosso módulo de serviço
vi.mock('../../services/api', () => ({
  getPessoas: vi.fn(),
  getPersonById: vi.fn(),
}));

// Criamos nossa base de dados de teste
const mockPessoas: Pessoa[] = [
  { id: 1, nome: 'João da Silva', idade: 32, sexo: 'MASCULINO', urlFoto: '', ultimaOcorrencia: { dataLocalizacao: null, encontradoVivo: false, dtDesaparecimento: '', status: 'DESAPARECIDO' } },
  { id: 2, nome: 'Maria Oliveira', idade: 25, sexo: 'FEMININO', urlFoto: '', ultimaOcorrencia: { dataLocalizacao: null, encontradoVivo: false, dtDesaparecimento: '', status: 'DESAPARECIDO' } },
  { id: 3, nome: 'Pedro Martins', idade: 45, sexo: 'MASCULINO', urlFoto: '', ultimaOcorrencia: { dataLocalizacao: '2025-01-01', encontradoVivo: true, dtDesaparecimento: '', status: 'LOCALIZADO' } },
];

const mockResponse: PaginatedResponse<Pessoa> = {
  content: mockPessoas,
  totalPages: 1,
  totalElements: 3,
  number: 0,
  size: 12,
};

import { getPessoas } from '../../services/api';


describe('HomePage Integration Flow', () => {

  beforeEach(() => {
    (getPessoas as vi.Mock).mockResolvedValue(mockResponse);
  });

  it('should render the initial list of people', async () => {
    render(<MemoryRouter><HomePage /></MemoryRouter>);

    await waitFor(() => {
      expect(screen.getByText('João da Silva')).toBeInTheDocument();
      expect(screen.getByText('Maria Oliveira')).toBeInTheDocument();
      expect(screen.getByText('Pedro Martins')).toBeInTheDocument();
    });
  });

  it('should filter by status and only show "Localizado" people', async () => {
    // Para este teste, a API continuará retornando a lista completa.
    // A lógica de filtro no front-end é que será testada.
    render(<MemoryRouter><HomePage /></MemoryRouter>);

    // Espera a lista inicial carregar
    await screen.findByText('Pedro Martins');

    // A CORREÇÃO ESTÁ AQUI: Clicamos para abrir o formulário primeiro
    const toggleButton = screen.getByText('Abrir Filtros de Busca');
    fireEvent.click(toggleButton);

    // Agora que o formulário está visível, podemos interagir com ele
    fireEvent.change(screen.getByLabelText('Status'), { target: { value: 'LOCALIZADO' } });
    fireEvent.click(screen.getByText('Buscar'));

    // Verificação Final: O Pedro (Localizado) está na tela, mas os outros não?
    await waitFor(() => {
      expect(screen.getByText('Pedro Martins')).toBeInTheDocument();
      expect(screen.queryByText('João da Silva')).not.toBeInTheDocument();
      expect(screen.queryByText('Maria Oliveira')).not.toBeInTheDocument();
    });
  });
});