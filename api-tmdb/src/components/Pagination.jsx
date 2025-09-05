import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    // Container principal da paginação
    <div className="flex justify-center items-center gap-4 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        // Estilos do botão, incluindo estados :hover e :disabled
        className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-slate-500 disabled:cursor-not-allowed transition-colors duration-300"
      >
        &laquo; Anterior
      </button>

      <span className="font-bold text-slate-300">
        Página {currentPage} de {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-slate-500 disabled:cursor-not-allowed transition-colors duration-300"
      >
        Próximo &raquo;
      </button>
    </div>
  );
};

export default Pagination;