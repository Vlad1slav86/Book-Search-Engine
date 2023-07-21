const fetchBooksFromRestfulAPI = require('./fetchBooksFromRestfulAPI'); 

const resolvers = {
  Query: {
    searchBooks: async (_, { keyword }) => {
      // Implement the logic to fetch data from existing RESTful API
      const books = await fetchBooksFromRestfulAPI(keyword);
      return books;
    },
  },
};

module.exports = resolvers;
