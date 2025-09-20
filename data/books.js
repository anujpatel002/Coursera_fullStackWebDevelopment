// Book data with preloaded information
const books = {
  1: {
    isbn: "978-0-123456-47-2",
    author: "Chinua Achebe",
    title: "Things Fall Apart",
    reviews: {
      "user1": { rating: 4, comment: "A powerful and moving story" },
      "user2": { rating: 5, comment: "Masterpiece of African literature" }
    }
  },
  2: {
    isbn: "978-0-987654-32-1",
    author: "Hans Christian Andersen",
    title: "Fairy tales",
    reviews: {
      "user3": { rating: 5, comment: "Timeless stories for all ages" }
    }
  },
  3: {
    isbn: "978-1-234567-89-0",
    author: "Dante Alighieri",
    title: "The Divine Comedy",
    reviews: {
      "user1": { rating: 5, comment: "Epic journey through afterlife" },
      "user4": { rating: 4, comment: "Challenging but rewarding read" }
    }
  },
  4: {
    isbn: "978-0-456789-12-3",
    author: "Unknown",
    title: "The Epic Of Gilgamesh",
    reviews: {
      "user2": { rating: 4, comment: "Ancient wisdom in epic form" }
    }
  },
  5: {
    isbn: "978-1-567890-23-4",
    author: "Unknown",
    title: "The Book Of Job",
    reviews: {
      "user5": { rating: 5, comment: "Profound exploration of suffering" }
    }
  },
  6: {
    isbn: "978-0-678901-34-5",
    author: "Unknown",
    title: "One Thousand and One Nights",
    reviews: {
      "user3": { rating: 5, comment: "Enchanting collection of tales" },
      "user6": { rating: 4, comment: "Rich storytelling tradition" }
    }
  },
  7: {
    isbn: "978-1-789012-45-6",
    author: "Unknown",
    title: "Nj\u00e1l's Saga",
    reviews: {}
  },
  8: {
    isbn: "978-0-890123-56-7",
    author: "Jane Austen",
    title: "Pride and Prejudice",
    reviews: {
      "user1": { rating: 5, comment: "Witty and romantic" },
      "user7": { rating: 4, comment: "Great character development" }
    }
  },
  9: {
    isbn: "978-1-901234-67-8",
    author: "Honor\u00e9 de Balzac",
    title: "P\u00e8re Goriot",
    reviews: {
      "user4": { rating: 4, comment: "Insightful look at society" }
    }
  },
  10: {
    isbn: "978-0-012345-78-9",
    author: "Samuel Beckett",
    title: "Molloy, Malone Dies, The Unnamable, the trilogy",
    reviews: {
      "user8": { rating: 3, comment: "Complex modernist work" }
    }
  }
};

// User data for authentication
const users = {
  "admin": {
    password: "$2a$10$G2eZcnUpej26l/fWWfybUO4Tiu2q4BGFt50Be2lrxEzD4eEYbMfGK", // secret
    role: "admin",
    email: "admin@bookstore.com"
  },
  "user1": {
    password: "$2a$10$G2eZcnUpej26l/fWWfybUO4Tiu2q4BGFt50Be2lrxEzD4eEYbMfGK", // secret  
    role: "user",
    email: "user1@bookstore.com"
  },
  "testuser": {
    password: "$2a$10$hnH.hJlz1KHF.GPknyKMxuQfS5u5QbZAoSTwMhIZ/Eh9sdVcz/VUC", // password123
    role: "user",
    email: "testuser@bookstore.com"
  },
  "john_doe": {
    password: "$2a$10$yA2huMeEsyDLvjNqPF92T.jkT5dGIYATiq1GbGmP0oywIzsCaiUxm", // mypassword
    role: "user", 
    email: "john.doe@bookstore.com"
  }
};

module.exports = { books, users };