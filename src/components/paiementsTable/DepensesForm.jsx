import { createDepense, createTransaction } from '@/utils/supabase';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const DepenseModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [transactionValue, setTransactionValue] = useState();
  const [transactionDate, setTransactionDate] = useState('');
  const [transactionTitle, setTransactionTitle] = useState('');
  const [transactionCommentaire, setTransactionCommentaire] = useState('');
  const router = useRouter()
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleTransactionSubmit = (e) => {
    e.preventDefault();
    createDepense(transactionTitle,transactionCommentaire,transactionValue, transactionDate)
    setTransactionValue('');
    setTransactionDate('');
    router.refresh()
    toggleModal();
  };

  return (
    <div className=''>
      <button
        data-modal-target="authentication-modal"
        data-modal-toggle="authentication-modal"
        onClick={toggleModal}
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Ajouter depenses
      </button>

      {modalVisible && (
        <div
          id="authentication-modal"
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
        >
          <div className="relative w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
                onClick={toggleModal}
              >
                {/* Close button SVG */}
                close
              </button>
              <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                  Add Transaction
                </h3>
                {/* Add transaction form */}
                <form onSubmit={handleTransactionSubmit} className="space-y-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Titre de Depense :
                    </label>
                    <input
                      type="text"
                      value={transactionTitle}
                      onChange={(e) => setTransactionTitle(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Entrer le titre de depense"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Valeur de Depense :
                    </label>
                    <input
                      type="number"
                      value={transactionValue}
                      onChange={(e) => setTransactionValue(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Enter Depense value"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Date de Depense 
                    </label>
                    <input
                      type="date"
                      value={transactionDate}
                      onChange={(e) => setTransactionDate(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Commentaire 
                    </label>
                    <textarea
                     rows="5"
                      // type="textarea"
                      value={transactionCommentaire}
                      onChange={(e) => setTransactionCommentaire(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Ajouter Depense
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepenseModal;
