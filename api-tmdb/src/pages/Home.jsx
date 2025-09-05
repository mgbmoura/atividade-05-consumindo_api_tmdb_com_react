// --- Bloco de Importações ---
// Importa a biblioteca React e os "hooks" (ferramentas) que vamos usar.
// - useState: para criar e gerenciar "estados" (variáveis que, quando mudam, atualizam a tela).
// - useEffect: para executar "efeitos colaterais" (como buscar dados na API) em momentos específicos.
import React, { useState, useEffect } from 'react';

// Importa nossos componentes reutilizáveis para que possamos usá-los nesta página.
import MovieCard from '../components/MovieCard'; // Componente que exibe a capa e título de um filme.
import Pagination from '../components/Pagination'; // Componente que exibe os botões "Anterior" e "Próximo".

// --- Bloco de Constantes ---
// Pega a nossa chave secreta da API (nosso "crachá") das variáveis de ambiente do Vite.
const API_KEY = import.meta.env.VITE_API_KEY;

// Define a URL base da API do TMDB para não precisarmos repeti-la toda vez.
const API_URL = `https://api.themoviedb.org/3`;


// --- Definição do Componente "Home" ---
// Um componente em React é basicamente uma função que retorna um HTML (JSX).
const Home = () => {

    // --- Bloco de Definição de Estados (useState) ---
    // Cada 'useState' cria uma "caixinha" para guardar uma informação e uma função para atualizá-la.
    
    // Guarda a lista de filmes que a API retorna. Começa como um array vazio.
    const [movies, setMovies] = useState([]);
    
    // Guarda o texto que o usuário digita no campo de busca. Começa como um texto vazio.
    const [searchTerm, setSearchTerm] = useState("");
    
    // Controla se a mensagem 'Carregando...' deve ser exibida. Começa como 'false'.
    const [loading, setLoading] = useState(false);
    
    // Guarda qualquer mensagem de erro que possa acontecer. Começa como 'null' (sem erro).
    const [error, setError] = useState(null);
    
    // Guarda o número da página atual. Começa na página 1.
    const [currentPage, setCurrentPage] = useState(1);
    
    // Guarda o número total de páginas de resultados. Começa com 0.
    const [totalPages, setTotalPages] = useState(0);

    // Guarda o último termo que foi efetivamente pesquisado. Essencial para a paginação funcionar.
    const [currentSearch, setCurrentSearch] = useState("");


    // --- Bloco de Funções de Lógica ---

    // Função assíncrona para buscar os filmes mais populares na API.
    const fetchPopular = async (page = 1) => {
        setLoading(true); // Avisa a aplicação que uma busca começou.
        setError(null);   // Limpa qualquer erro anterior.
        try {
            // Tenta fazer a requisição à API para a lista de populares.
            const response = await fetch(`${API_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=${page}`);
            const data = await response.json(); // Converte a resposta em um objeto JavaScript.
            
            // Atualiza nossos estados com os dados recebidos da API.
            setMovies(data.results);
            setCurrentPage(data.page);
            setTotalPages(data.total_pages);
        } catch (err) {
            // Se algo der errado (ex: sem internet), guarda a mensagem de erro.
            setError('Não foi possível carregar os filmes populares.');
        } finally {
            // Aconteça o que acontecer (sucesso ou erro), avisa que a busca terminou.
            setLoading(false);
        }
    };

    // Função assíncrona para buscar filmes com base no termo digitado.
    const searchMovies = async (title, page = 1) => {
        if (!title) return; // Se o título for vazio, não faz nada.
        setLoading(true);
        setError(null);
        try {
            // Faz a requisição, mas agora usando o endpoint de busca (`/search/movie`) e o `query`.
            const response = await fetch(`${API_URL}/search/movie?api_key=${API_KEY}&query=${title}&language=pt-BR&page=${page}`);
            const data = await response.json();
            
            // Atualiza os estados com os resultados da busca.
            setMovies(data.results);
            setCurrentPage(data.page);
            setTotalPages(data.total_pages);
        } catch (err) {
            // Se der erro, guarda a mensagem.
            setError(err.message);
            setMovies([]); // Limpa a lista de filmes para não mostrar resultados antigos.
        } finally {
            setLoading(false);
        }
    };
    
    // Este hook 'useEffect' é executado apenas uma vez quando o componente é montado na tela.
    // O array vazio `[]` no final é o que garante que ele rode só uma vez.
    // Sua responsabilidade é chamar `fetchPopular()` para que a página não comece vazia.
    useEffect(() => {
        fetchPopular(1);
    }, []);

    // Função que é chamada quando o usuário efetivamente busca por algo (clica no botão ou aperta Enter).
    const handleSearch = (term) => {
        if (term) { // Só busca se o termo não for vazio.
            setCurrentSearch(term); // Guarda o termo buscado para a paginação usar depois.
            searchMovies(term, 1);  // Inicia a busca sempre pela página 1.
        }
    };

    // Função chamada pelos botões de paginação.
    const handlePageChange = (page) => {
        window.scrollTo(0, 0); // Leva o usuário para o topo da página ao mudar de página.
        // Verifica se existe uma busca ativa.
        if (currentSearch) {
            // Se sim, busca a próxima página dos resultados da busca.
            searchMovies(currentSearch, page);
        } else {
            // Se não, busca a próxima página dos filmes populares.
            fetchPopular(page);
        }
    };

    // --- Bloco de Renderização (JSX) ---
    // O que esta função/componente retorna para ser exibido na tela.
    return (
        // Container principal da página, estilizado com classes do Tailwind CSS.
        <div className="w-full max-w-6xl mx-auto px-4 py-8 flex flex-col items-center">
            
            {/* Título da página, com spans para poder ter cores diferentes em cada parte. */}
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
                <span className="text-amber-400">Busca Filmes</span>
                <span className="text-blue-500 ml-2">+praTi</span>
            </h1>

            {/* Container para o campo de busca e o botão. */}
            <div className="flex gap-2 mb-8 w-full max-w-md">
                {/* O campo de input para o usuário digitar. */}
                <input
                    type="text"
                    placeholder="Digite o nome de um filme..."
                    value={searchTerm} // O valor do input é controlado pelo nosso estado 'searchTerm'.
                    onChange={(e) => setSearchTerm(e.target.value)} // A cada letra digitada, atualiza o estado 'searchTerm'.
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchTerm)} // Se a tecla Enter for pressionada, chama a função de busca.
                    className="flex-grow p-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
                {/* O botão de busca. */}
                <button
                    onClick={() => handleSearch(searchTerm)} // Ao ser clicado, chama a função de busca.
                    className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                    Buscar
                </button>
            </div>

            {/* Container que vai exibir os resultados ou as mensagens de estado (loading/error). */}
            <div className="w-full">
                {/* Renderização Condicional: Só exibe o <p> se 'loading' for verdadeiro. */}
                {loading && <p className="text-center text-lg mt-8">Carregando...</p>}
                
                {/* Renderização Condicional: Só exibe o <p> se 'error' tiver algum conteúdo. */}
                {error && <p className="text-center text-lg text-red-500 mt-8">{error}</p>}

                {/* A 'prateleira' onde os cards dos filmes serão exibidos. */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {/* Renderização Condicional: Só executa isso se não estiver carregando E a lista de filmes tiver pelo menos 1 item. */}
                    {!loading && movies.length > 0 && movies.slice(0, 10).map((movie) => (
                        // Para cada filme na lista (limitada a 10), renderiza um componente MovieCard.
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>

                {/* Renderização Condicional: Só exibe se não estiver carregando E a lista de filmes estiver vazia E não houver erro. */}
                {!loading && movies.length === 0 && !error && (
                    <p className="text-center text-lg text-slate-400 mt-8">Nenhum filme encontrado. Tente buscar por algo!</p>
                )}
            </div>

            {/* Renderização Condicional: Só exibe a paginação se não estiver carregando E houver mais de uma página de resultados. */}
            {!loading && totalPages > 1 && (
                <Pagination
                    currentPage={currentPage} // Passa a página atual para o componente filho.
                    totalPages={totalPages}     // Passa o total de páginas.
                    onPageChange={handlePageChange} // Passa a função que deve ser chamada quando um botão for clicado.
                />
            )}
        </div>
    );
};

// Exporta o componente 'Home' para que ele possa ser usado em outros arquivos (como no 'App.jsx').
export default Home;